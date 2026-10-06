"""Trusted, per-testcase cgroup v2 accounting; shared mode is explicit."""

from __future__ import annotations

import fcntl
import os
import time
import uuid
from dataclasses import dataclass
from pathlib import Path


class ResourceError(RuntimeError):
    pass


def cpu_set(value: str) -> set[int]:
    result: set[int] = set()
    for item in value.strip().split(","):
        if not item:
            continue
        bounds = item.split("-")
        if len(bounds) > 2:
            raise ValueError("Invalid CPU list")
        start, end = int(bounds[0]), int(bounds[-1])
        if start < 0 or end < start or end > 1048576:
            raise ValueError("Invalid CPU range")
        result.update(range(start, end + 1))
    return result


def counters(path: Path) -> dict[str, int]:
    return {
        key: int(value)
        for key, value in (line.split() for line in path.read_text().splitlines())
    }


@dataclass(frozen=True)
class Budget:
    cpu_ms: int
    wall_ms: int


def execution_budget(time_ms: int, threaded: bool, cpu_count: int = 1) -> Budget:
    if not 1 <= time_ms <= 60000 or cpu_count < 1:
        raise ResourceError("Invalid execution time budget")
    if threaded:
        return Budget(time_ms * cpu_count, time_ms)
    return Budget(time_ms, max(1000, time_ms * 5))


class ResourceManager:
    def __init__(self) -> None:
        mode = os.environ.get("CODERPUZZLE_RESOURCE_MODE", "shared")
        if mode not in {"shared", "isolated"}:
            raise ResourceError("Unknown resource mode")
        self.isolated = mode == "isolated"
        self.shared_control = os.environ.get("CODERPUZZLE_SHARED_CONTROL", "0") == "1"
        self.root = Path(os.environ.get("CODERPUZZLE_CGROUP_ROOT", "/judge-cgroup"))
        self.cpus = os.environ.get("CODERPUZZLE_EXECUTION_CPUS", "")
        self.profile = os.environ.get("CODERPUZZLE_RESOURCE_PROFILE", "shared-wall-v1")
        self.cpu_count = len(cpu_set(self.cpus)) if self.isolated else 1
        if self.isolated:
            if not self.cpu_count or self.profile == "shared-wall-v1":
                raise ResourceError(
                    "Isolated mode requires execution CPUs and a resource profile"
                )
            self.lease = open(
                os.environ.get("CODERPUZZLE_SLOT_LOCK", "/judge-slot.lock"), "rb"
            )
            try:
                fcntl.flock(self.lease, fcntl.LOCK_EX | fcntl.LOCK_NB)
            except BlockingIOError as error:
                self.lease.close()
                raise ResourceError("Execution slot already has a worker") from error
            try:
                self.validate()
                # A killed worker may leave empty groups; a live worker cannot
                # coexist because the host-provided slot lease is still held.
                for stale in (self.root / "runs").glob("case-*"):
                    if counters(stale / "cgroup.events")["populated"]:
                        raise ResourceError(
                            "Slot contains a live orphan execution group"
                        )
                    stale.rmdir()
            except BaseException:
                self.lease.close()
                raise

    def validate(self) -> None:
        if not self.isolated:
            return
        root, runs = self.root, self.root / "runs"
        if (root / "cpuset.cpus.partition").read_text().strip() != (
            "member" if self.shared_control else "root"
        ):
            raise ResourceError("Slot CPU partition is not exclusive")
        if (runs / "cpuset.cpus.partition").read_text().strip() != "isolated":
            raise ResourceError("Execution CPU partition is not isolated")
        available = cpu_set((runs / "cpuset.cpus.effective").read_text())
        if not cpu_set(self.cpus) <= available:
            raise ResourceError("Execution CPUs are outside the reserved partition")
        if set(os.sched_getaffinity(0)) & available:
            raise ResourceError("Supervisor and execution CPUs overlap")
        groups = (runs,) if self.shared_control else (root, runs)
        for group in groups:
            if (group / "cpu.max").read_text().split()[0] != "max":
                raise ResourceError(
                    "Isolated execution must not be CPU quota throttled"
                )
            if (group / "memory.swap.max").read_text().strip() != "0":
                raise ResourceError("Isolated execution requires swap disabled")
            if (group / "memory.max").read_text().strip() == "max":
                raise ResourceError("A finite memory budget is required")
        if not {"cpu", "cpuset", "memory", "pids"} <= set(
            (runs / "cgroup.subtree_control").read_text().split()
        ):
            raise ResourceError("Execution controllers are not delegated")

    def case(self, memory_mb: int, processes: int) -> RunGroup:
        self.validate()
        if any((self.root / "runs").glob("case-*")):
            raise ResourceError("Execution slot contains an unfinished testcase")
        return RunGroup(self, memory_mb, processes)


class RunGroup:
    def __init__(self, manager: ResourceManager, memory_mb: int, processes: int):
        if not 16 <= memory_mb <= 8192 or not 1 <= processes <= 1024:
            raise ResourceError("Invalid physical memory or process budget")
        parent = manager.root / "runs"
        memory = memory_mb * 1024 * 1024
        if memory > int((parent / "memory.max").read_text()):
            raise ResourceError("Problem memory budget exceeds the execution slot")
        self.path = parent / ("case-" + uuid.uuid4().hex)
        self.path.mkdir(mode=0o755)
        try:
            for name, value in {
                "cpuset.cpus": manager.cpus,
                "cpuset.mems": (parent / "cpuset.mems.effective").read_text().strip(),
                "memory.max": str(memory),
                "memory.swap.max": "0",
                "memory.oom.group": "1",
                "pids.max": str(processes),
            }.items():
                (self.path / name).write_text(value)
            # Probe all required interfaces before launching any user code.
            self.metrics()
            if not (self.path / "cgroup.kill").exists():
                raise ResourceError("Kernel lacks cgroup.kill")
        except BaseException:
            self.path.rmdir()
            raise

    def cpu_ms(self) -> float:
        return counters(self.path / "cpu.stat")["usage_usec"] / 1000

    def metrics(self) -> dict:
        cpu = counters(self.path / "cpu.stat")
        events = counters(self.path / "memory.events")
        return {
            "cpu_time_ms": cpu["usage_usec"] // 1000,
            "cpu_throttled_ms": cpu.get("throttled_usec", 0) // 1000,
            "memory_peak_bytes": int((self.path / "memory.peak").read_text()),
            "oom_kill": events.get("oom_kill", 0),
        }

    def kill(self) -> None:
        (self.path / "cgroup.kill").write_text("1")

    def finish(self) -> dict:
        self.kill()
        deadline = time.monotonic() + 2
        while counters(self.path / "cgroup.events")["populated"]:
            if time.monotonic() >= deadline:
                raise ResourceError("Execution group did not become empty")
            time.sleep(0.01)
        return self.metrics()

    def close(self) -> None:
        self.path.rmdir()
