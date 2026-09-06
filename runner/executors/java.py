import json
import os
import signal
import subprocess
import time
from pathlib import Path
from typing import Any, Optional

from .base import ExecutorError, PreparedProgram
from .compiled import sandboxed_compiler_command


class JavaExecutor:
    """JDK 21 compiler/runtime plugin for LeetCode-style Java classes."""

    language = "java"
    # HotSpot reserves substantially more virtual address space than its
    # resident heap. Physical memory remains capped by JVM flags and cgroups.
    address_space_overhead_mb = 1792
    max_processes = 48
    java_path = "/usr/bin/java"
    javac_path = "/usr/bin/javac"
    harness_classes = Path("/runner/java-classes")
    reference_benchmark_ms = 75.0
    compiler_uid = 65534
    compiler_gid = 65534
    compiler_timeout_seconds = 10

    _vm_options = (
        "-XX:+UseSerialGC",
        "-XX:ActiveProcessorCount=1",
        "-XX:CICompilerCount=2",
        "-Xms16m",
        "-Xmx192m",
        "-Xss512k",
        "-XX:MaxMetaspaceSize=64m",
        "-XX:CompressedClassSpaceSize=32m",
        "-XX:ReservedCodeCacheSize=32m",
        "-XX:MaxDirectMemorySize=16m",
    )

    def calibrate(self) -> tuple[float, float]:
        started = time.perf_counter()
        try:
            subprocess.run(
                (
                    self.java_path,
                    *self._vm_options,
                    "-cp",
                    str(self.harness_classes),
                    "OpenOJJavaHarness",
                    "--benchmark",
                ),
                check=True,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                timeout=10,
                env={"PATH": "/usr/bin:/bin", "HOME": "/nonexistent"},
            )
        except (OSError, subprocess.SubprocessError) as error:
            raise ExecutorError(f"Java calibration failed: {error}") from error
        elapsed_ms = (time.perf_counter() - started) * 1000
        factor = min(3.0, max(0.75, elapsed_ms / self.reference_benchmark_ms))
        return elapsed_ms, factor

    def compiler_command(self, command: tuple[str, ...], job_root: Path) -> list[str]:
        """The command that forks javac: the sandboxed compiler wrapper by
        default (rlimits plus the uid drop prepare() chowns the job
        directory for). cli.cmd_judge neutralizes this hook so an author
        judging their own reference solutions compiles plainly."""
        return sandboxed_compiler_command(command, 2048, self.max_processes, self.compiler_timeout_seconds)

    def prepare(
        self,
        job_root: Path,
        scratch: Path,
        code: str,
        invocation: dict[str, Any],
        limits: dict[str, Any],
        assembly: dict[str, dict[str, str]] | None = None,
    ) -> PreparedProgram:
        supervisor_uid = os.getuid()
        supervisor_gid = os.getgid()
        class_name = invocation.get("class_name", "Solution")
        if not isinstance(class_name, str) or not class_name.isidentifier():
            raise ExecutorError("The Java entry class name is invalid")
        source_path = job_root / f"{class_name}.java"
        source_path.write_text(code, encoding="utf-8")
        source_path.chmod(0o444)
        # The assembled program: the problem's own provided/ sources (every
        # well-known structure its wire needs — docs/CODECS.md) compile
        # together with the submission as flat same-package units, so
        # submissions use ListNode with no import.
        assembly_sources = []
        for name, content in sorted((assembly or {}).get("provided", {}).items()):
            if not name.endswith(".java"):
                continue
            # javac requires the file name to match the public class.
            part_dir = job_root / "assembly" / "provided"
            part_dir.mkdir(parents=True, exist_ok=True)
            part_path = part_dir / name
            part_path.write_text(content, encoding="utf-8")
            part_path.chmod(0o444)
            assembly_sources.append(str(part_path))
        # javac parses hostile source. Give it a writable job directory, then
        # drop it to the same disposable identity used for runtime execution.
        # Popen changes cwd before the privilege-drop hook runs, so the trusted
        # supervisor needs traverse permission while UID 65534 retains ownership.
        job_root.chmod(0o711)
        os.chown(job_root, self.compiler_uid, self.compiler_gid)
        compiler_environment = {
            "PATH": "/usr/bin:/bin",
            "HOME": "/nonexistent",
            "TMPDIR": "/tmp",
            "LANG": "C.UTF-8",
        }
        command = (
            self.javac_path,
            "-J-Xms16m",
            "-J-Xmx192m",
            "-J-XX:+UseSerialGC",
            "-J-Xss512k",
            "-J-XX:ActiveProcessorCount=1",
            "-J-XX:CICompilerCount=2",
            "-J-XX:MaxMetaspaceSize=96m",
            "-J-XX:CompressedClassSpaceSize=32m",
            "-J-XX:ReservedCodeCacheSize=32m",
            "-proc:none",
            "-encoding",
            "UTF-8",
            "-g:none",
            "-classpath",
            str(self.harness_classes),
            "-d",
            str(job_root),
            str(source_path),
            *assembly_sources,
        )
        process: Optional[subprocess.Popen[bytes]] = None
        try:
            process = subprocess.Popen(
                self.compiler_command(command, job_root),
                cwd=job_root,
                env=compiler_environment,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                start_new_session=True,
            )
            compiler_output, _ = process.communicate(timeout=self.compiler_timeout_seconds)
        except subprocess.TimeoutExpired as error:
            if process is not None:
                try:
                    os.killpg(process.pid, signal.SIGKILL)
                except ProcessLookupError:
                    pass
                process.wait()
            raise ExecutorError(
                f"Compilation exceeded the {self.compiler_timeout_seconds} second limit"
            ) from error
        except OSError as error:
            raise ExecutorError(f"Java compiler could not start: {error}") from error
        finally:
            os.chown(job_root, supervisor_uid, supervisor_gid)
            job_root.chmod(0o700)
        if process.returncode != 0:
            diagnostic = (
                compiler_output.decode("utf-8", errors="replace")[-16_384:].strip()
                if "compiler_output" in locals()
                else ""
            )
            raise ExecutorError(
                f"Compilation failed\n{diagnostic}"
                if diagnostic
                else "Compilation failed"
            )

        for class_file in job_root.glob("**/*.class"):
            os.chown(class_file, supervisor_uid, supervisor_gid)
            class_file.chmod(0o444)

        # Harness classes precede the submission's output: a source that
        # declares a class named like the harness entrypoint must not shadow
        # it. The harness owns the OpenOJ* names; no legitimate submission
        # class collides.
        classpath = os.pathsep.join((str(self.harness_classes), str(job_root)))
        return PreparedProgram(
            command=(
                self.java_path,
                *self._vm_options,
                f"-Djava.io.tmpdir={scratch}",
                "-Duser.home=/nonexistent",
                "-cp",
                classpath,
                "OpenOJJavaHarness",
            ),
            environment={
                "PATH": "/usr/bin:/bin",
                "HOME": "/nonexistent",
                "TMPDIR": str(scratch),
                "LANG": "C.UTF-8",
            },
        )

    def encode_case(self, invocation: dict[str, Any], case_input: Any) -> bytes:
        return json.dumps(
            {"invocation": invocation, "input": case_input},
            ensure_ascii=False,
            separators=(",", ":"),
        ).encode()
