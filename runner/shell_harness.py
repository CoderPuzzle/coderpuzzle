import json
import os
import subprocess
import sys
import tempfile

sys.path.insert(0, "/runner")

from protocol import PROTOCOL_PREFIX, emit_protocol
import timing

MAX_CAPTURED_STDERR = 16_384
OUTPUT_KB_ENV = "CODERPUZZLE_OUTPUT_KB"
DEFAULT_OUTPUT_KB = 64


def _run(script: str) -> dict:
    """Run `bash script` with stdin passed through untouched.

    The case input arrives as raw text (no JSON envelope), so the harness
    reads nothing itself: the submission consumes the judge's stdin bytes
    directly, and its captured stdout — trailing newlines stripped — is
    the judged value, compared by the API under the invocation's mode
    (usually `exact` against a string). Stderr is spooled to a scratch
    file (bounded by the child's own RLIMIT_FSIZE) so a chatty submission
    can never deadlock the single-threaded stdout read.
    """
    cap = int(os.environ.get(OUTPUT_KB_ENV, DEFAULT_OUTPUT_KB)) * 1024
    with tempfile.TemporaryFile() as stderr_file:
        try:
            started = timing.mark()
            process = subprocess.Popen(
                ["bash", script],
                stdin=sys.stdin,
                stdout=subprocess.PIPE,
                stderr=stderr_file,
                close_fds=True,
            )
        except OSError as error:
            return {
                "status": "runtime_error",
                "error": f"Failed to start bash: {error}"[:1000],
                "stdout": "",
            }
        collected = bytearray()
        while True:
            chunk = process.stdout.read(65_536)
            if not chunk:
                break
            collected += chunk
            if len(collected) > cap:
                process.kill()
                process.wait()
                timing.add(started)
                return {
                    "status": "runtime_error",
                    "error": f"Output limit exceeded ({cap // 1024} KiB)",
                    "stdout": "",
                }
        code = process.wait()
        timing.add(started)
        stderr_file.seek(0, os.SEEK_END)
        stderr_size = stderr_file.tell()
        stderr_file.seek(max(0, stderr_size - MAX_CAPTURED_STDERR))
        diagnostics = stderr_file.read().decode("utf-8", "replace")
        if code != 0:
            lines = [line for line in diagnostics.strip().splitlines() if line.strip()]
            detail = "\n".join(lines[-5:]) or f"nonzero exit status {code}"
            return {
                "status": "runtime_error",
                "error": detail[:1000],
                "stdout": "",
            }
        text = collected.decode("utf-8", "replace")
        return {"status": "completed", "actual": _fit(text.rstrip("\n"), cap), "stdout": ""}


def _fit(actual: str, cap: int) -> str:
    """Trim actual so its JSON-escaped form fits the protocol budget.

    The protocol line shares the runtime sandbox's RLIMIT_FSIZE cap with
    everything else in the response; a write crossing the cap truncates
    mid-JSON and surfaces as a misleading "unparseable protocol output".
    (python_harness budgets the same way — see its _json_safe.)"""
    budget = max(1024, cap - 512)
    if len(json.dumps(actual)) <= budget:
        return actual
    low, high = 0, len(actual)
    while low < high:
        mid = (low + high + 1) // 2
        if len(json.dumps(actual[:mid])) <= budget:
            low = mid
        else:
            high = mid - 1
    return actual[:low]


def main() -> None:
    argv = sys.argv[1:]
    if "--" in argv:
        argv = argv[argv.index("--") + 1 :]
    script = argv[0] if argv else ""
    if not script:
        response = {
            "status": "runtime_error",
            "error": "shell harness started without a script path",
            "stdout": "",
        }
    else:
        response = _run(script)
    response.update(timing.report())
    emit_protocol(PROTOCOL_PREFIX + json.dumps(response, ensure_ascii=False, separators=(",", ":")))


if __name__ == "__main__":
    main()
