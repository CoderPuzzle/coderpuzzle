import json
import math
import os
import shutil
import signal
import subprocess
import sys
import tempfile
import threading
import time
import traceback
from pathlib import Path
from typing import Any

# Isolated mode intentionally omits the script directory from sys.path. Add
# only the immutable runner image directory so trusted executor plugins remain
# importable without exposing the submission workspace.
sys.path.insert(0, "/runner")

from executors import get_executor, supported_languages
from executors.base import ExecutorError, LanguageExecutor, PreparedProgram
from executors.go import WRAPPER_IMPORTS
from formatters import FormatError, format_source
from protocol import parse_protocol as _parse_protocol


QUEUE_DIR = Path(os.environ.get("OPENOJ_QUEUE_DIR", "/queue"))
WORK_DIR = Path(os.environ.get("OPENOJ_WORK_DIR", "/work"))
POLL_INTERVAL = float(os.environ.get("OPENOJ_POLL_INTERVAL", "0.05"))
NOBODY_UID = 65534
NOBODY_GID = 65534
RUNTIME_SANDBOX = "/runner/runtime_sandbox.py"
SUPERVISOR_PYTHON = "/usr/local/bin/coderpuzzle-supervisor-python"
CALIBRATION_FACTORS: dict[str, float] = {}


def _sandboxed_runtime_command(
    command: tuple[str, ...],
    limits: dict[str, Any],
    output_bytes: int,
) -> tuple[str, ...]:
    cpu_seconds = max(1, math.ceil(int(limits.get("time_ms", 2000)) / 1000))
    return (
        SUPERVISOR_PYTHON,
        RUNTIME_SANDBOX,
        str(int(limits.get("memory_mb", 256))),
        str(cpu_seconds),
        str(output_bytes),
        str(int(limits.get("processes", 16))),
        *command,
    )


# The judge protocol travels on a dedicated inherited fd so ordinary stdout
# noise never masquerades as protocol output; harnesses fall back to stdout
# only when the fd is absent (local authoring tooling). This is hygiene, not
# protection: the submission's own process inherits fd 63 and could write a
# protocol line directly. The real guarantee is validation — the judge takes
# the last parseable protocol line, and an accepted result must still carry
# output matching the expected value.
PROTOCOL_FD = 63


# True while the prewarm thread is running a toolchain build. The kill sweep
# below targets the shared submission UID, which the prewarm builds also run
# under — sweeping mid-prewarm would kill the warm build (and risk a torn
# shared Go build cache). No submission can be lingering during prewarm
# anyway; the next sweep after prewarm ends catches anything that does.
_prewarming = False


def _kill_lingering_children() -> None:
    """Remove processes a submission attempted to leave behind.

    The sweep kills every NOBODY_UID process in the PID namespace, which is
    only correct because the stack deploys a single worker container per PID
    namespace (docker-compose runs one web/worker service): there are no
    other workers whose live submissions could be caught by the sweep. A
    multi-worker deployment sharing one namespace would kill its siblings'
    submissions here.
    """
    if _prewarming:
        return
    for status_path in Path("/proc").glob("[0-9]*/status"):
        try:
            status = status_path.read_text(encoding="utf-8", errors="ignore")
            uid_line = next(line for line in status.splitlines() if line.startswith("Uid:"))
            if int(uid_line.split()[1]) == NOBODY_UID:
                os.kill(int(status_path.parent.name), signal.SIGKILL)
        except (FileNotFoundError, PermissionError, ProcessLookupError, StopIteration, ValueError):
            continue


def _run_case(
    job_root: Path,
    case_input: Any,
    invocation: dict[str, Any],
    limits: dict[str, Any],
    executor: LanguageExecutor,
    program: PreparedProgram,
) -> dict[str, Any]:
    scratch = job_root / "scratch"
    scratch.mkdir(mode=0o700)
    # The capability-minimized supervisor needs execute permission to chdir;
    # only the submission UID retains read/write access.
    scratch.chmod(0o711)
    os.chown(scratch, NOBODY_UID, NOBODY_GID)
    output_limit = int(limits.get("output_kb", 64)) * 1024
    nominal_time_ms = int(limits.get("time_ms", 2000))
    calibrated_time_ms = max(100, round(nominal_time_ms * CALIBRATION_FACTORS[executor.language]))
    effective_limits = {
        **limits,
        "time_ms": calibrated_time_ms,
        # Managed runtimes reserve address space for the VM in addition to the
        # problem's user-memory allowance. The executor declares that overhead.
        # Thread stacks and per-thread allocator arenas come out of the
        # address-space allowance, the same way a managed runtime's VM does,
        # so a declared schedule brings its own headroom.
        "memory_mb": (
            int(limits.get("memory_mb", 256))
            + executor.address_space_overhead_mb
            + int(limits.get("threads", 0)) * 2
        ),
        # A concurrency problem's schedule needs one OS thread per scheduled
        # call, and threads count against the process cap. RLIMIT_NPROC is a
        # budget shared by every process of the submission uid — including
        # ones outside this container — so it cannot be sized tightly around a
        # schedule; a problem that declares threads gets generous headroom,
        # and containment rests on the memory, CPU and wall-clock limits plus
        # the process-group kill. Problems that declare nothing keep the old
        # cap.
        "processes": (
            min(256, executor.max_processes + int(limits["threads"]) * 2 + 32)
            if limits.get("threads")
            else executor.max_processes
        ),
    }
    timeout_seconds = calibrated_time_ms / 1000
    if getattr(executor, "encode_case_with_limits", False):
        payload = executor.encode_case(invocation, case_input, limits)
    else:
        payload = executor.encode_case(invocation, case_input)

    with tempfile.TemporaryFile(mode="w+b", dir="/tmp") as output_file, \
            tempfile.TemporaryFile(mode="w+b", dir="/tmp") as protocol_file:
        protocol_fd = protocol_file.fileno()
        channel = os.dup2(protocol_fd, PROTOCOL_FD)
        started = time.monotonic()
        try:
            process = subprocess.Popen(
                _sandboxed_runtime_command(program.command, effective_limits, output_limit),
                cwd=scratch,
                stdin=subprocess.PIPE,
                stdout=output_file,
                stderr=subprocess.STDOUT,
                env=program.environment,
                start_new_session=True,
                pass_fds=(channel,),
            )
            try:
                process.communicate(payload, timeout=timeout_seconds)
            except subprocess.TimeoutExpired:
                try:
                    os.killpg(process.pid, signal.SIGKILL)
                except ProcessLookupError:
                    pass
                process.wait()
                _kill_lingering_children()
                return {
                    "status": "time_limit_exceeded",
                    "runtime_ms": int((time.monotonic() - started) * 1000),
                    "timeout_ms": calibrated_time_ms,
                }

            runtime_ms = int((time.monotonic() - started) * 1000)
            output_file.seek(0)
            output = output_file.read(output_limit).decode("utf-8", errors="replace")
            protocol_file.seek(0)
            protocol = protocol_file.read(1 << 20).decode("utf-8", errors="replace")
            # Trust the dedicated protocol channel; stdout parsing remains
            # only as the fallback for harnesses that could not use it.
            parsed = _parse_protocol(protocol) if protocol.strip() else _parse_protocol(output)
        finally:
            os.close(channel)
        parsed["runtime_ms"] = runtime_ms
        parsed["timeout_ms"] = calibrated_time_ms
        if process.returncode != 0 and parsed["status"] == "runtime_error" and not parsed.get("error"):
            parsed["error"] = f"{executor.language} exited with status {process.returncode}"
        _kill_lingering_children()
        return parsed


def _write_response(job_dir: Path, response: dict[str, Any]) -> None:
    # The API tears a job directory down when it stops waiting (its poll
    # timeout, or an API restart); the answer for an abandoned job has no
    # reader, so skip quietly instead of crashing the worker.
    if not job_dir.is_dir():
        print(f"CoderPuzzle job {job_dir.name} abandoned before its result", file=sys.stderr, flush=True)
        return
    temporary = job_dir / "result.tmp"
    temporary.write_text(json.dumps(response, separators=(",", ":")), encoding="utf-8")
    os.replace(temporary, job_dir / "result.json")
    (job_dir / "ready").unlink(missing_ok=True)


def _process_format_job(job_dir: Path, request: dict[str, Any]) -> None:
    """Answer a format job.

    Formatting shares the queue with judging because the toolchains live here
    and nowhere else, but it shares nothing else: the source is never run, so
    there is no sandbox, no case loop, and no verdict — just the formatted
    text or the reason it could not be produced.
    """
    job_id = request.get("job_id", job_dir.name)
    try:
        code = request.get("code")
        if not isinstance(code, str) or not code or len(code) > 100_000:
            raise FormatError("Invalid source code")
        response = {
            "version": 2,
            "job_id": job_id,
            "code": format_source(request.get("language", ""), code),
        }
    except FormatError as error:
        response = {"version": 2, "job_id": job_id, "error": str(error)}
    except Exception as error:  # noqa: BLE001
        print(f"Runner format job {job_dir.name} failed:\n{traceback.format_exc()}", file=sys.stderr, flush=True)
        response = {"version": 2, "job_id": job_id, "error": f"Runner rejected job: {error}"}
    _write_response(job_dir, response)


def _process_job(job_dir: Path) -> None:
    request_path = job_dir / "request.json"
    request: dict[str, Any] = {}
    try:
        loaded_request = json.loads(request_path.read_text(encoding="utf-8"))
        if not isinstance(loaded_request, dict):
            raise ValueError("Runner request must be an object")
        request = loaded_request
        if request.get("version") != 2:
            raise ValueError("Unsupported runner request")
        if request.get("kind") == "format":
            _process_format_job(job_dir, request)
            return
        executor = get_executor(request.get("language", ""))
        code = request.get("code")
        if not isinstance(code, str) or not code or len(code) > 100_000:
            raise ValueError("Invalid source code")

        job_root = Path(
            tempfile.mkdtemp(prefix=f"coderpuzzle-{request['job_id'][:12]}-", dir=WORK_DIR)
        )
        try:
            program = executor.prepare(
                job_root,
                job_root / "scratch",
                code,
                request["invocation"],
                request.get("limits", {}),
                request.get("assembly"),
            )
            job_root.chmod(0o755)
            results = []
            request_cases = request.get("cases", [])
            for case_index, case in enumerate(request_cases):
                result = _run_case(
                    job_root,
                    case["input"],
                    request["invocation"],
                    request.get("limits", {}),
                    executor,
                    program,
                )
                results.append(result)
                scratch = job_root / "scratch"
                try:
                    os.chown(scratch, os.getuid(), os.getgid())
                    scratch.chmod(0o700)
                except FileNotFoundError:
                    pass
                shutil.rmtree(scratch, ignore_errors=True)
                if result["status"] != "completed":
                    results.extend(
                        {
                            "status": "skipped",
                            "error": "Not run after the preceding testcase stopped execution",
                            "runtime_ms": 0,
                        }
                        for _ in request_cases[case_index + 1:]
                    )
                    break
        finally:
            os.chown(job_root, os.getuid(), os.getgid())
            job_root.chmod(0o755)
            shutil.rmtree(job_root, ignore_errors=True)
        response = {"version": 2, "job_id": request["job_id"], "results": results}
    except ExecutorError as error:
        case_count = max(1, len(request.get("cases", [])))
        response = {
            "version": 2,
            "job_id": request.get("job_id", job_dir.name),
            "results": [
                {"status": "compile_error", "error": str(error), "runtime_ms": 0}
                for _ in range(case_count)
            ],
        }
    except Exception as error:
        case_count = max(1, len(request.get("cases", [])))
        print(f"Runner job {job_dir.name} failed:\n{traceback.format_exc()}", file=sys.stderr, flush=True)
        response = {
            "version": 2,
            "job_id": job_dir.name,
            "results": [
                {"status": "system_error", "error": f"Runner rejected job: {error}", "runtime_ms": 0}
                for _ in range(case_count)
            ],
        }

    _write_response(job_dir, response)


def _reap_orphans() -> None:
    """Reap zombie children this process inherited.

    SIGKILLed submission processes reparent to the worker when it is the
    container's PID 1, and nothing else reaps them: left alone they would
    accumulate against the container's pid budget until the worker could no
    longer spawn compilers. The worker's own children are waited explicitly
    and are already gone by the time this runs; the one race — the prewarm
    thread's build exiting between our waitpid and its subprocess.run —
    only makes that check see a benign status of 0."""
    while True:
        try:
            pid, _ = os.waitpid(-1, os.WNOHANG)
        except ChildProcessError:
            return
        if pid == 0:
            return


# Entries under /tmp the worker manages itself (the shared Go build cache
# the executors compile against, and the prewarm build directory).
PREWARM_DIR = Path(os.environ.get("OPENOJ_PREWARM_DIR", "/tmp/coderpuzzle-prewarm"))
_MANAGED_TMP = {"coderpuzzle-gocache", PREWARM_DIR.name}


def _sweep_tmp() -> None:
    """Delete what runtime processes dropped directly into /tmp.

    The runtime sandbox runs submissions as `nobody` in a world-writable
    /tmp outside the per-job work directory, and RLIMIT_FSIZE bounds single
    files, not the directory: without this sweep, discarded files would
    accumulate against the container's tmpfs budget until the shared Go
    build cache and compiler temp files started failing. Runs between jobs
    (the worker processes one job at a time), so nothing live is deleted."""
    try:
        entries = list(os.scandir("/tmp"))
    except OSError:
        return
    for entry in entries:
        if entry.name in _MANAGED_TMP:
            continue
        try:
            if entry.is_dir(follow_symlinks=False):
                shutil.rmtree(entry.path, ignore_errors=True)
            else:
                os.unlink(entry.path)
        except OSError:
            continue


_last_tmp_sweep = 0.0


def _hygiene() -> None:
    """Reap inherited zombies every pass; sweep /tmp at most once a second."""
    global _last_tmp_sweep
    _reap_orphans()
    now = time.monotonic()
    if now - _last_tmp_sweep >= 1.0:
        _last_tmp_sweep = now
        _sweep_tmp()


def _prewarm_toolchains_once() -> None:
    """Compile throwaway programs so a user's first submission never pays
    the cold toolchain cost (page-cache faults dominate rustc/g++/javac/tsc
    cold starts; the shared compile budget measures wall clock)."""
    global _prewarming
    warm_dir = PREWARM_DIR
    _prewarming = True
    try:
        warm_dir.mkdir(parents=True, exist_ok=True)
        # The Go job runs as the compiler uid so it can share its build cache;
        # make the directory writable by that uid.
        warm_dir.chmod(0o1777)
        environment = {"PATH": "/usr/local/bin:/usr/bin:/bin", "HOME": "/nonexistent", "TMPDIR": str(warm_dir)}
        jobs = []
        rust_source = warm_dir / "warm.rs"
        rust_source.write_text("fn main() {}\n", encoding="utf-8")
        jobs.append((
            ("/usr/bin/rustc", "--edition=2021", "-C", "opt-level=2", "-C", "debuginfo=0",
             "-C", "strip=symbols", "-o", str(warm_dir / "warm-rust"), str(rust_source)),
            environment,
            None,
        ))
        cpp_source = warm_dir / "warm.cpp"
        cpp_source.write_text("int main() { return 0; }\n", encoding="utf-8")
        jobs.append((
            ("/usr/bin/g++", "-std=c++20", "-O2", "-pipe", "-o", str(warm_dir / "warm-cpp"), str(cpp_source)),
            environment,
            None,
        ))
        go_source = warm_dir / "warm-go"
        go_dir = warm_dir / "go"
        go_dir.mkdir(exist_ok=True)
        (go_dir / "go.mod").write_text("module warm\n\ngo 1.24\n", encoding="utf-8")
        # Every submission imports the wrapper stdlib packages (see
        # GoExecutor) and most solutions add a handful more (sort, heap,
        # strconv, ...), so the warm build imports the whole observed set —
        # blank imports pull their archives into the shared GOCACHE without
        # needing symbols. An empty main only warms the runtime chain.
        go_warm_imports = WRAPPER_IMPORTS + (
            "sort", "container/heap", "container/list", "strconv", "strings",
            "math/bits", "math/big", "bufio", "bytes", "errors",
            "unicode", "unicode/utf8", "time", "cmp",
        )
        (go_dir / "main.go").write_text(
            "package main\n\n"
            + "".join(f'import _ "{package}"\n' for package in sorted(set(go_warm_imports)))
            + "\nfunc main() {}\n",
            encoding="utf-8",
        )
        # The cache is shared with real submissions (see GoExecutor), so this
        # build leaves the standard library precompiled for every job. The Go
        # toolchain refuses to reuse a build cache written by another uid, so
        # the warm build drops to the compiler uid (65534) that submissions
        # run under; the directory is chowned to match.
        go_cache = Path("/tmp/coderpuzzle-gocache")
        go_cache.mkdir(parents=True, exist_ok=True)
        go_cache.chmod(0o1777)
        os.chown(go_cache, NOBODY_UID, NOBODY_GID)
        jobs.append((
            (SUPERVISOR_PYTHON, "/runner/compiler_sandbox.py", "2048", "32", "240",
             "/usr/bin/go", "build", "-trimpath", "-o", str(warm_dir / "warm-go-bin"), str(go_dir / "main.go")),
            {**environment, "GOCACHE": str(go_cache), "GOENV": "off", "GOPROXY": "off", "CGO_ENABLED": "0"},
            None,
        ))
        java_source = warm_dir / "Warm.java"
        java_source.write_text("class Warm {}\n", encoding="utf-8")
        jobs.append((
            ("/usr/bin/javac", "-proc:none", "-g:none", "-d", str(warm_dir), str(java_source)),
            environment,
            None,
        ))
        ts_source = warm_dir / "warm.ts"
        ts_source.write_text("const value: number = 1;\nconsole.log(value);\n", encoding="utf-8")
        jobs.append((
            ("/usr/local/bin/tsc", "--target", "ES2022", "--module", "commonjs",
             "--skipLibCheck", "--outDir", str(warm_dir / "ts"), str(ts_source)),
            environment,
            None,
        ))
        for command, job_environment, preexec in jobs:
            try:
                subprocess.run(
                    command, env=job_environment, cwd=warm_dir,
                    preexec_fn=preexec,
                    stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                    timeout=240, check=False,
                )
            except (OSError, subprocess.SubprocessError) as error:
                print(f"CoderPuzzle pre-warm skipped {' '.join(command[:2])}: {error}", file=sys.stderr, flush=True)
    except OSError as error:
        print(f"CoderPuzzle pre-warm disabled: {error}", file=sys.stderr, flush=True)
    finally:
        _prewarming = False


def _prewarm_loop() -> None:
    interval = float(os.environ.get("OPENOJ_PREWARM_INTERVAL", "600"))
    while True:
        _prewarm_toolchains_once()
        time.sleep(interval)


def main() -> None:
    for language in supported_languages():
        elapsed_ms, factor = get_executor(language).calibrate()
        CALIBRATION_FACTORS[language] = factor
        print(
            f"CoderPuzzle {language} calibration: {elapsed_ms:.1f} ms, deadline factor {factor:.2f}x",
            file=sys.stderr,
            flush=True,
        )
    # Serve immediately; warming runs alongside queue polling so startup is
    # never delayed, and repeats periodically to keep the toolchains warm.
    threading.Thread(target=_prewarm_loop, name="coderpuzzle-prewarm", daemon=True).start()
    QUEUE_DIR.mkdir(parents=True, exist_ok=True)
    WORK_DIR.mkdir(parents=True, exist_ok=True)
    while True:
        found = False
        for ready in QUEUE_DIR.glob("*/ready"):
            found = True
            try:
                _process_job(ready.parent)
            except Exception:  # noqa: BLE001 — one bad job must never kill the worker
                print(
                    f"Runner job {ready.parent.name} crashed:\n{traceback.format_exc()}",
                    file=sys.stderr,
                    flush=True,
                )
            _hygiene()
        if not found:
            _hygiene()
            time.sleep(POLL_INTERVAL)


if __name__ == "__main__":
    main()
