import json
import subprocess
import time
from pathlib import Path
from typing import Any

from .base import ExecutorError, PreparedProgram


class Python3Executor:
    """CPython 3.14 executor plugin for LeetCode-style invocations."""

    encode_case_with_limits = True
    language = "python3"
    address_space_overhead_mb = 0
    max_processes = 16
    python_path = "/usr/local/bin/python3.14"
    harness_path = Path("/runner/python_harness.py")
    # Timed as a subprocess, like every other executor: a testcase pays for
    # a fresh interpreter and then the work, and timing the loop in-process
    # instead made python3 the one language whose benchmark excluded its own
    # startup. On the deployment host the same loop measures 67.8 ms
    # in-process against 113.7 ms spawned, so the old figure understated this
    # host's python cost by a third. The constant is re-based by that ratio,
    # which leaves the derived factor where it was: the measurement was
    # wrong, the host's relative speed was not.
    reference_benchmark_ms = 92.0
    benchmark_source = (
        "accumulator = 0x12345678\n"
        "for value in range(750_000):\n"
        "    accumulator = ((accumulator << 5) - accumulator + value) & 0xFFFFFFFF\n"
    )

    def calibrate(self) -> tuple[float, float]:
        started = time.perf_counter()
        try:
            subprocess.run(
                (self.python_path, "-I", "-S", "-c", self.benchmark_source),
                check=True,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                timeout=10,
                env={"PATH": "/usr/local/bin:/usr/bin:/bin", "HOME": "/nonexistent"},
            )
        except (OSError, subprocess.SubprocessError) as error:
            raise ExecutorError(f"{self.language} calibration failed: {error}") from error
        elapsed_ms = (time.perf_counter() - started) * 1000
        factor = min(3.0, max(0.75, elapsed_ms / self.reference_benchmark_ms))
        return elapsed_ms, factor

    def prepare(
        self,
        job_root: Path,
        scratch: Path,
        code: str,
        invocation: dict[str, Any],
        limits: dict[str, Any],
        assembly: dict[str, dict[str, str]] | None = None,
    ) -> PreparedProgram:
        source_path = job_root / "solution.py"
        source_path.write_text(code, encoding="utf-8")
        source_path.chmod(0o444)
        # The assembled program: the problem's own provided/ sources exec
        # into the submission's namespace ahead of the submission itself,
        # in stable filename order.
        assembly_paths = []
        for name, content in sorted((assembly or {}).get("provided", {}).items()):
            if not name.endswith(".py"):
                continue
            part_path = job_root / f"assembly_provided_{name}"
            part_path.write_text(content, encoding="utf-8")
            part_path.chmod(0o444)
            assembly_paths.append(str(part_path))
        return PreparedProgram(
            command=(
                self.python_path,
                "-I",
                "-S",
                str(self.harness_path),
                *assembly_paths,
                "--",
                str(source_path),
            ),
            environment={
                "PATH": "/usr/local/bin:/usr/bin:/bin",
                "PYTHONHASHSEED": "0",
                "PYTHONDONTWRITEBYTECODE": "1",
                "HOME": "/nonexistent",
                "TMPDIR": str(scratch),
            },
        )

    def encode_case(
        self, invocation: dict[str, Any], case_input: Any, limits: dict[str, Any] | None = None
    ) -> bytes:
        payload: dict[str, Any] = {"invocation": invocation, "input": case_input}
        if limits is not None:
            payload["limits"] = {"output_kb": int(limits.get("output_kb", 64))}
        return json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode()
