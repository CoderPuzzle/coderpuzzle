import os
import resource
import sys

from privileges import drop_privileges


SUBMISSION_UID = 65534
SUBMISSION_GID = 65534


def main() -> int:
    if len(sys.argv) < 6:
        print("Invalid runtime sandbox command", file=sys.stderr)
        return 126

    try:
        memory_mb = int(sys.argv[1])
        cpu_seconds = int(sys.argv[2])
        output_bytes = int(sys.argv[3])
        max_processes = int(sys.argv[4])
    except ValueError:
        print("Invalid runtime sandbox limits", file=sys.stderr)
        return 126

    if not 16 <= memory_mb <= 8192:
        print("Runtime memory limit is out of range", file=sys.stderr)
        return 126
    if not 1 <= cpu_seconds <= 60:
        print("Runtime CPU limit is out of range", file=sys.stderr)
        return 126
    if not 1024 <= output_bytes <= 16 * 1024 * 1024:
        print("Runtime output limit is out of range", file=sys.stderr)
        return 126
    if not 1 <= max_processes <= 1024:
        print("Runtime process limit is out of range", file=sys.stderr)
        return 126

    command = sys.argv[5:]
    memory_bytes = memory_mb * 1024 * 1024
    resource.setrlimit(resource.RLIMIT_AS, (memory_bytes, memory_bytes))
    resource.setrlimit(resource.RLIMIT_CPU, (cpu_seconds, cpu_seconds + 1))
    resource.setrlimit(resource.RLIMIT_FSIZE, (output_bytes, output_bytes))
    resource.setrlimit(resource.RLIMIT_NOFILE, (32, 32))
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
        os._exit(126)
    os._exit(126)


if __name__ == "__main__":
    raise SystemExit(main())
