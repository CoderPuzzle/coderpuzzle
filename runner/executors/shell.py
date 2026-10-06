from pathlib import Path
from typing import Any

from .base import ExecutorError, PreparedProgram
from .python3 import Python3Executor


class ShellExecutor(Python3Executor):
    """POSIX-shell executor: the submission is a bash script.

    The judged program is the script itself — no wrapper or assembled
    bundle dependencies. Case input is the raw text fed on stdin; the script's
    stdout (trailing newlines stripped, see the harness) is the value the
    API compares under the invocation's mode. Calibration is inherited:
    the interpreter startup the harness adds dominates a shell run the
    same way it does a Python one.
    """

    language = "shell"
    harness_path = Path("/runner/shell_harness.py")

    def prepare(
        self,
        job_root: Path,
        scratch: Path,
        code: str,
        invocation: dict[str, Any],
        limits: dict[str, Any],
        assembly: dict[str, dict[str, str]] | None = None,
    ) -> PreparedProgram:
        if (assembly or {}).get("provided"):
            raise ExecutorError("shell submissions take no assembled sources")
        source_path = job_root / "solution.sh"
        source_path.write_text(code, encoding="utf-8")
        source_path.chmod(0o444)
        return PreparedProgram(
            command=(
                self.python_path,
                "-I",
                "-S",
                str(self.harness_path),
                "--",
                str(source_path),
            ),
            environment={
                "PATH": "/usr/local/bin:/usr/bin:/bin",
                "HOME": "/nonexistent",
                "TMPDIR": str(scratch),
                # The harness caps captured stdout here because the raw
                # stdin wire carries no limits envelope for it to read.
                "CODERPUZZLE_OUTPUT_KB": str(int(limits.get("output_kb", 64))),
            },
        )

    def encode_case(self, invocation: dict[str, Any], case_input: Any, limits: dict[str, Any] | None = None) -> bytes:
        if not isinstance(case_input, str):
            raise ExecutorError("shell case input must be the raw file text")
        return case_input.encode("utf-8")
