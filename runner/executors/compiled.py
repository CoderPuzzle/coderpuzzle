import os
import signal
import stat
import subprocess
import tempfile
import time
from pathlib import Path
from typing import Optional

from .base import ExecutorError


COMPILER_SANDBOX = "/runner/compiler_sandbox.py"
SUPERVISOR_PYTHON = "/usr/local/bin/openoj-supervisor-python"


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


class CompiledExecutor:
    """Shared calibration and hostile-compiler sandbox for native plugins."""

    compiler_uid = 65534
    compiler_gid = 65534
    compiler_timeout_seconds = 10
    compiler_memory_mb = 512
    max_processes = 32
    language: str
    benchmark_command: tuple[str, ...]
    reference_benchmark_ms: float

    def calibrate(self) -> tuple[float, float]:
        started = time.perf_counter()
        try:
            subprocess.run(
                self.benchmark_command,
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
                        self.max_processes,
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
