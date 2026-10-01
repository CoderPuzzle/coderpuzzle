import json
import os
import resource
import sys

from privileges import drop_privileges
from protocol import PROTOCOL_FD, PROTOCOL_PREFIX


SUBMISSION_UID = 65534
SUBMISSION_GID = 65534


def main() -> int:
    # The worker's per-case nonce marks this launcher's failure lines: the
    # launcher writes the marker on the protocol fd for every 126 path, and
    # the env var is popped before execvpe, so the submission never sees the
    # nonce and cannot forge a marker of its own. worker.py attributes a
    # system_error only to a 126 exit that carries the matching marker.
    nonce = os.environ.pop("CODERPUZZLE_RUN_NONCE", "")

    def _fail(message: str) -> int:
        print(message, file=sys.stderr)
        if nonce:
            try:
                os.write(PROTOCOL_FD, (PROTOCOL_PREFIX + json.dumps(
                    {"status": "launcher_failure", "nonce": nonce},
                    separators=(",", ":")) + "\n").encode())
            except OSError:
                pass
        return 126

    if len(sys.argv) < 6:
        return _fail("Invalid runtime sandbox command")

    try:
        memory_mb = int(sys.argv[1])
        cpu_seconds = int(sys.argv[2])
        output_bytes = int(sys.argv[3])
        max_processes = int(sys.argv[4])
    except ValueError:
        return _fail("Invalid runtime sandbox limits")

    if not 16 <= memory_mb <= 8192:
        return _fail("Runtime memory limit is out of range")
    if not 1 <= cpu_seconds <= 3600:
        return _fail("Runtime CPU limit is out of range")
    if not 1024 <= output_bytes <= 16 * 1024 * 1024:
        return _fail("Runtime output limit is out of range")
    if not 1 <= max_processes <= 1024:
        return _fail("Runtime process limit is out of range")

    # Only the trusted launcher sees this setting. Joining before the UID
    # drop makes every exec/fork descendant subject to the same resource group.
    cgroup = os.environ.pop("CODERPUZZLE_RUN_CGROUP", None)
    if cgroup:
        try:
            with open(os.path.join(cgroup, "cgroup.procs"), "w") as control:
                control.write(str(os.getpid()))
        except OSError:
            return _fail("Cannot attach runtime to its resource group")
    command = sys.argv[5:]
    memory_bytes = memory_mb * 1024 * 1024
    resource.setrlimit(resource.RLIMIT_AS, (memory_bytes, memory_bytes))
    resource.setrlimit(resource.RLIMIT_CPU, (cpu_seconds, cpu_seconds + 1))
    resource.setrlimit(resource.RLIMIT_FSIZE, (output_bytes, output_bytes))
    resource.setrlimit(resource.RLIMIT_NOFILE, (32, 32))
    # RLIMIT_NPROC is shared by this UID across containers; isolated runs
    # use the exact per-cgroup pids.max instead.
    if not cgroup:
        resource.setrlimit(resource.RLIMIT_NPROC, (max_processes, max_processes))
    resource.setrlimit(resource.RLIMIT_CORE, (0, 0))
    drop_privileges(SUBMISSION_UID, SUBMISSION_GID)
    # exec never returns on success; a failure (missing binary, OOM in the
    # exec path) must still surface as the designed invalid-command exit
    # rather than a Python traceback, and _exit skips any cleanup a forked
    # child must not run.
    try:
        os.execvpe(command[0], command, os.environ)
    except BaseException:
        # _exit skips any cleanup a forked child must not run; the marker
        # tells the worker this was a launcher failure, not the submission's.
        _fail("Runtime sandbox exec failed")
        os._exit(126)
    os._exit(126)


if __name__ == "__main__":
    raise SystemExit(main())
