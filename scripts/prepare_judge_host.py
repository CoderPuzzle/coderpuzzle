#!/usr/bin/env python3
"""Provision one exclusive, bounded cgroup v2 slot on a dedicated Linux host.

Run as root before starting the slot's runner. No Docker socket is mounted in
containers. The emitted env file is consumed by compose.isolated.yaml.
"""

from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
import re
import subprocess
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "runner"))
from resources import cpu_set  # noqa: E402


CGROUP = Path("/sys/fs/cgroup")


def write(path: Path, value: str | int) -> None:
    path.write_text(str(value))


def cpu_list(cpus: set[int]) -> str:
    return ",".join(map(str, sorted(cpus)))


def whole_cores(cpus: set[int]) -> None:
    for cpu in cpus:
        siblings = cpu_set(
            Path(
                f"/sys/devices/system/cpu/cpu{cpu}/topology/thread_siblings_list"
            ).read_text()
        )
        if not siblings <= cpus:
            raise ValueError(
                f"CPU {cpu}: include all SMT siblings {cpu_list(siblings)}"
            )


def provision(args: argparse.Namespace) -> dict[str, str]:
    if (
        sys.platform != "linux"
        or os.geteuid() != 0
        or not (CGROUP / "cgroup.controllers").exists()
    ):
        raise ValueError("Run as root on a Linux cgroup v2 host")
    if not re.fullmatch(r"[a-z][a-z0-9]{0,24}", args.slot):
        raise ValueError(
            "Slot must contain lowercase letters and digits, starting with a letter"
        )
    if not re.fullmatch(r"[A-Za-z0-9_.-]{1,120}", args.profile):
        raise ValueError(
            "Profile must be an identifier for the hardware and runner image"
        )
    control, execution = cpu_set(args.control_cpus), cpu_set(args.reserved_cpus)
    active = cpu_set(args.execution_cpus)
    online = cpu_set((CGROUP / "cpuset.cpus.effective").read_text())
    if (
        not control
        or not execution
        or control & execution
        or not active
        or not active <= execution
    ):
        raise ValueError(
            "Control/reserved CPUs must be nonempty and disjoint; execution CPUs must be reserved"
        )
    if not (control | execution) <= online:
        raise ValueError("Requested CPUs are not available")
    if not args.shared_control and not (control | execution) < online:
        raise ValueError("A local partition must leave CPUs for the host; use --shared-control")
    whole_cores(control)
    whole_cores(execution)
    for number in (args.control_memory_mb, args.execution_memory_mb, args.headroom_mb):
        if not 64 <= number <= 1048576:
            raise ValueError("Memory budgets must be between 64 MiB and 1 TiB")
    total = args.control_memory_mb + args.execution_memory_mb + 128
    available_kb = int(
        next(
            line.split()[1]
            for line in Path("/proc/meminfo").read_text().splitlines()
            if line.startswith("MemAvailable:")
        )
    )
    if (total + args.headroom_mb) * 1024 > available_kb:
        raise ValueError("Insufficient available memory for the slot and host headroom")
    info = json.loads(
        subprocess.check_output(["docker", "info", "--format", "{{json .}}"], text=True)
    )
    if str(info.get("CgroupVersion")) != "2":
        raise ValueError("Docker must use cgroup v2")
    driver = info["CgroupDriver"]
    name = "coderpuzzle" + args.slot
    if driver == "systemd":
        slot_name = name + ".slice"
        control_name = name + "-control.slice"
        root = CGROUP / slot_name
        control_path = root / control_name
        parent = control_name
    elif driver == "cgroupfs":
        root = CGROUP / name
        control_path = root / "control"
        parent = "/" + name + "/control"
    else:
        raise ValueError("Only rootful Docker systemd/cgroupfs drivers are supported")
    if root.exists():
        raise ValueError(
            f"Slot already exists: {root}; stop and remove it before reprovisioning"
        )
    if driver == "systemd":
        for unit, cpus in ((slot_name, control | execution), (control_name, control)):
            path = Path("/run/systemd/system") / unit
            if path.exists():
                raise ValueError(f"Refusing to replace existing unit {path}")
            path.write_text(
                "[Unit]\nDescription=CoderPuzzle resource slot\n[Slice]\n"
                f"AllowedCPUs={cpu_list(cpus)}\nCPUAccounting=yes\nMemoryAccounting=yes\nTasksAccounting=yes\n"
                f"MemoryMax={(total if unit == slot_name else args.control_memory_mb) * 1024 * 1024}\n"
                "MemorySwapMax=0\nTasksMax=2048\n"
            )
        subprocess.run(["systemctl", "daemon-reload"], check=True)
        subprocess.run(["systemctl", "start", control_name], check=True)
    else:
        write(CGROUP / "cgroup.subtree_control", "+cpu +cpuset +memory +pids")
        root.mkdir()
    mems = (CGROUP / "cpuset.mems.effective").read_text().strip()
    write(root / "cpuset.mems", mems)
    write(root / "cpuset.cpus", cpu_list(control | execution))
    partition = "member" if args.shared_control else "root"
    if args.shared_control:
        write(root / "cpuset.cpus.exclusive", cpu_list(execution))
    write(root / "cpuset.cpus.partition", partition)
    if (root / "cpuset.cpus.partition").read_text().strip() != partition:
        raise ValueError("Cannot reserve this slot's CPUs; check other partitions")
    write(root / "cpu.max", "max 100000")
    write(root / "memory.max", total * 1024 * 1024)
    write(root / "memory.swap.max", 0)
    write(root / "pids.max", 2048)
    write(root / "cgroup.subtree_control", "+cpu +cpuset +memory +pids")
    control_path.mkdir(exist_ok=True)
    write(control_path / "cpuset.cpus", cpu_list(control))
    write(control_path / "cpuset.mems", mems)
    write(control_path / "memory.max", args.control_memory_mb * 1024 * 1024)
    write(control_path / "memory.swap.max", 0)
    write(control_path / "cgroup.subtree_control", "+cpu +cpuset +memory +pids")
    runs = root / "runs"
    runs.mkdir()
    if args.shared_control:
        write(runs / "cpuset.cpus.exclusive", cpu_list(execution))
    for key, value in {
        "cpuset.cpus": cpu_list(execution),
        "cpuset.mems": mems,
        "cpuset.cpus.partition": "isolated",
        "cpu.max": "max 100000",
        "memory.max": args.execution_memory_mb * 1024 * 1024,
        "memory.swap.max": 0,
        "pids.max": 1024,
        "cgroup.subtree_control": "+cpu +cpuset +memory +pids",
    }.items():
        write(runs / key, value)
    if (runs / "cpuset.cpus.partition").read_text().strip() != "isolated":
        raise ValueError("Kernel cannot create an isolated execution partition")
    # Only delegate creation/attachment, not the parent's hard ceilings or
    # partition settings. The common ancestor procs permission permits moves
    # from the Docker control subtree into this slot's execution groups.
    os.chown(root / "cgroup.procs", 10000, 10001)
    os.chown(runs, 10000, 10001)
    for key in ("cgroup.procs", "cgroup.threads", "cgroup.subtree_control"):
        os.chown(runs / key, 10000, 10001)
    lock = Path("/run/coderpuzzle") / f"{args.slot}.lock"
    lock.parent.mkdir(mode=0o755, exist_ok=True)
    lock.touch(exist_ok=False)
    os.chown(lock, 10000, 10001)
    lock.chmod(0o600)
    return {
        "CODERPUZZLE_SHARED_CONTROL": "1" if args.shared_control else "0",
        "CODERPUZZLE_CGROUP_PARENT": parent,
        "CODERPUZZLE_CGROUP_HOST_PATH": str(root),
        "CODERPUZZLE_SLOT_LOCK_HOST_PATH": str(lock),
        "CODERPUZZLE_CONTROL_CPUS": cpu_list(control),
        "CODERPUZZLE_EXECUTION_CPUS": cpu_list(active),
        "CODERPUZZLE_CONTROL_MEMORY_MB": str(args.control_memory_mb),
        "CODERPUZZLE_RESOURCE_PROFILE": args.profile,
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--slot", required=True)
    parser.add_argument(
        "--shared-control",
        action="store_true",
        help="Share control CPUs with host services; reserve only execution cores",
    )
    parser.add_argument("--control-cpus", required=True)
    parser.add_argument(
        "--reserved-cpus",
        required=True,
        help="Whole physical cores including SMT siblings",
    )
    parser.add_argument(
        "--execution-cpus", required=True, help="Logical CPUs used by each testcase"
    )
    parser.add_argument("--control-memory-mb", type=int, default=768)
    parser.add_argument("--execution-memory-mb", type=int, default=512)
    parser.add_argument("--headroom-mb", type=int, default=1024)
    parser.add_argument("--profile", required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    if args.output.exists():
        parser.error("Refusing to overwrite an existing environment file")
    try:
        values = provision(args)
        args.output.write_text(
            "".join(f"{key}={value}\n" for key, value in values.items())
        )
    except (OSError, ValueError, subprocess.SubprocessError) as error:
        parser.exit(
            1,
            f"Cannot provision slot: {error}\nInspect any partially created slot before retrying.\n",
        )
    print(f"Prepared slot {args.slot}; configuration: {args.output}")


if __name__ == "__main__":
    main()
