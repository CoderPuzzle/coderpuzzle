import os
import signal
import stat
import subprocess
import tempfile
import time
from pathlib import Path
from typing import Any, Optional

from .base import ExecutorError
from .typed import encode_case


COMPILER_SANDBOX = "/runner/compiler_sandbox.py"
SUPERVISOR_PYTHON = "/usr/local/bin/coderpuzzle-supervisor-python"


def sandboxed_compiler_command(
    command: tuple[str, ...],
    memory_mb: int,
    max_processes: int,
    cpu_seconds: int,
) -> tuple[str, ...]:
    return (
        SUPERVISOR_PYTHON,
        COMPILER_SANDBOX,
        str(memory_mb),
        str(max_processes),
        str(cpu_seconds),
        *command,
    )


def run_benchmark(
    language_label: str,
    command: tuple[str, ...],
    environment: dict[str, str],
    reference_ms: float,
) -> tuple[float, float]:
    """Time one benchmark subprocess and return (elapsed_ms, factor), the
    factor clamped into [0.75, 3.0] against the reference duration. The
    calibration loop shared by every executor's ``calibrate``."""
    started = time.perf_counter()
    try:
        subprocess.run(
            command,
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            timeout=10,
            env=environment,
        )
    except (OSError, subprocess.SubprocessError) as error:
        raise ExecutorError(f"{language_label} calibration failed: {error}") from error
    elapsed_ms = (time.perf_counter() - started) * 1000
    factor = min(3.0, max(0.75, elapsed_ms / reference_ms))
    return elapsed_ms, factor


class CompiledExecutor:
    """Shared calibration and hostile-compiler sandbox for native plugins."""

    compiler_uid = 65534
    compiler_gid = 65534
    compiler_timeout_seconds = 10
    compiler_memory_mb = 512
    # Separate from the runtime process cap: compiler toolchains may need
    # more helper processes even though the resulting submission may not.
    compiler_max_processes: int | None = None
    max_processes = 32
    language: str
    benchmark_command: tuple[str, ...]
    reference_benchmark_ms: float

    def calibrate(self) -> tuple[float, float]:
        return run_benchmark(
            self.language,
            self.benchmark_command,
            {"PATH": "/usr/local/bin:/usr/bin:/bin", "HOME": "/nonexistent"},
            self.reference_benchmark_ms,
        )

    def compile(
        self,
        job_root: Path,
        command: tuple[str, ...],
        output_path: Path,
        environment: dict[str, str],
    ) -> None:
        supervisor_uid = os.getuid()
        supervisor_gid = os.getgid()
        job_root.chmod(0o711)
        os.chown(job_root, self.compiler_uid, self.compiler_gid)
        process: Optional[subprocess.Popen[bytes]] = None
        try:
            with tempfile.TemporaryFile(mode="w+b", dir="/tmp") as compiler_output:
                process = subprocess.Popen(
                    sandboxed_compiler_command(
                        command,
                        self.compiler_memory_mb,
                        self.compiler_max_processes or self.max_processes,
                        self.compiler_timeout_seconds,
                    ),
                    cwd=job_root,
                    env=environment,
                    stdout=compiler_output,
                    stderr=subprocess.STDOUT,
                    start_new_session=True,
                )
                try:
                    process.wait(timeout=self.compiler_timeout_seconds)
                except subprocess.TimeoutExpired as error:
                    try:
                        os.killpg(process.pid, signal.SIGKILL)
                    except ProcessLookupError:
                        pass
                    process.wait()
                    raise ExecutorError(
                        f"Compilation exceeded the {self.compiler_timeout_seconds} second limit"
                    ) from error
                compiler_output.seek(0, os.SEEK_END)
                output_size = compiler_output.tell()
                compiler_output.seek(max(0, output_size - 16_384))
                diagnostic = compiler_output.read().decode("utf-8", errors="replace").strip()
        except ExecutorError:
            raise
        except OSError as error:
            raise ExecutorError(f"{self.language} compiler could not start: {error}") from error
        finally:
            os.chown(job_root, supervisor_uid, supervisor_gid)
            job_root.chmod(0o700)

        if process.returncode != 0:
            raise ExecutorError(
                f"Compilation failed\n{diagnostic}" if diagnostic else "Compilation failed"
            )
        try:
            mode = output_path.lstat().st_mode
        except FileNotFoundError as error:
            raise ExecutorError("Compiler did not produce an executable program") from error
        if not stat.S_ISREG(mode):
            raise ExecutorError("Compiler output is not a regular file")
        os.chown(output_path, supervisor_uid, supervisor_gid)
        output_path.chmod(0o555)

    def encode_case(self, invocation: dict[str, Any], case_input: Any) -> bytes:
        if invocation.get("type") == "interactive":
            from .typed import encode_interactive_case

            return encode_interactive_case(invocation, case_input)
        if invocation.get("type") == "design":
            from .design_interactive import encode_design_case

            return encode_design_case(invocation, case_input)
        return encode_case(invocation, case_input, self.language)
