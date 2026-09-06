import os
import resource
import sys

from privileges import drop_privileges


COMPILER_UID = 65534
COMPILER_GID = 65534
INVALID_EXIT_CODE = 126


def main() -> int:
    if len(sys.argv) < 5:
        print("Invalid compiler sandbox command", file=sys.stderr)
        return INVALID_EXIT_CODE

    try:
        memory_mb = int(sys.argv[1])
        max_processes = int(sys.argv[2])
        # CPU backstop matches the caller's wall-clock compile budget (the
        # wall timeout is the binding limit; this only stops a runaway
        # spinner). Scaled per call so a legitimately slow compile — a cold
        # Go build cache on a small VM — is not cut early by a fixed limit.
        cpu_seconds = int(sys.argv[3])
    except ValueError:
        print("Invalid compiler sandbox limits", file=sys.stderr)
        return INVALID_EXIT_CODE
    if not 32 <= memory_mb <= 4096 or not 1 <= max_processes <= 64 or not 1 <= cpu_seconds <= 600:
        print("Compiler sandbox limits are out of range", file=sys.stderr)
        return INVALID_EXIT_CODE

    command = sys.argv[4:]
    memory = memory_mb * 1024 * 1024
    resource.setrlimit(resource.RLIMIT_AS, (memory, memory))
    resource.setrlimit(resource.RLIMIT_CPU, (cpu_seconds, cpu_seconds + 1))
    resource.setrlimit(
        resource.RLIMIT_FSIZE,
        (32 * 1024 * 1024, 32 * 1024 * 1024),
    )
    # Go's build cache keeps many package archives open while linking; 64
    # was hit routinely once the shared GOCACHE warmed up. 1024 matches the
    # container's default and still bounds a hostile compiler.
    resource.setrlimit(resource.RLIMIT_NOFILE, (1024, 1024))
    resource.setrlimit(resource.RLIMIT_NPROC, (max_processes, max_processes))
    resource.setrlimit(resource.RLIMIT_CORE, (0, 0))
    drop_privileges(COMPILER_UID, COMPILER_GID)
    os.execvpe(command[0], command, os.environ)
    return 126


if __name__ == "__main__":
    raise SystemExit(main())
