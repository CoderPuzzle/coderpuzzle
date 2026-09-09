import json
import time
from pathlib import Path
from typing import Any

from .base import PreparedProgram


class Python3Executor:
    """CPython 3.14 executor plugin for LeetCode-style invocations."""

    encode_case_with_limits = True
    language = "python3"
    address_space_overhead_mb = 0
    max_processes = 16
    python_path = "/usr/local/bin/python3.14"
    harness_path = Path("/runner/python_harness.py")
    reference_benchmark_ms = 55.0

    def calibrate(self) -> tuple[float, float]:
        started = time.perf_counter()
        accumulator = 0x12345678
        for value in range(750_000):
            accumulator = ((accumulator << 5) - accumulator + value) & 0xFFFFFFFF
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
