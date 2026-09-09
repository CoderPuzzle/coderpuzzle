import json
import os
import subprocess
import sys
import tempfile

sys.path.insert(0, "/runner")

from protocol import emit_protocol

PROTOCOL_PREFIX = "__CODERPUZZLE_RESULT__"
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
                return {
                    "status": "runtime_error",
                    "error": f"Output limit exceeded ({cap // 1024} KiB)",
                    "stdout": "",
                }
        code = process.wait()
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
        return {"status": "completed", "actual": text.rstrip("\n"), "stdout": ""}


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
    emit_protocol(PROTOCOL_PREFIX + json.dumps(response, ensure_ascii=False, separators=(",", ":")))


if __name__ == "__main__":
    main()
