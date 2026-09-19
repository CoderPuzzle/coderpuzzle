import fcntl
import hashlib
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
from contextlib import contextmanager
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
from resources import ResourceManager, execution_budget


QUEUE_DIR = Path(os.environ.get("CODERPUZZLE_QUEUE_DIR", "/queue"))
WORK_DIR = Path(os.environ.get("CODERPUZZLE_WORK_DIR", "/work"))
POLL_INTERVAL = float(os.environ.get("CODERPUZZLE_POLL_INTERVAL", "0.05"))
NOBODY_UID = 65534
NOBODY_GID = 65534
RUNTIME_SANDBOX = "/runner/runtime_sandbox.py"
SUPERVISOR_PYTHON = "/usr/local/bin/coderpuzzle-supervisor-python"
CALIBRATION_FACTORS: dict[str, float] = {}
RESOURCES: ResourceManager | None = None


def _audit(event: str, **fields: Any) -> None:
    """Opt-in operator timing log; never include source, inputs or outputs."""
    if os.environ.get("CODERPUZZLE_RESOURCE_AUDIT") == "1":
        print("__RESOURCE_AUDIT__" + json.dumps({
            "event": event, "monotonic_ns": time.monotonic_ns(),
            "slot": os.environ.get("CODERPUZZLE_SLOT_ID", "default"), **fields,
        }, separators=(",", ":")), file=sys.stderr, flush=True)


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


# Prewarming and judging must never overlap. Besides distorting measured
# timings, a compiler warm-up can consume enough of a shared-mode container's
# CPU or memory to kill the testcase beside it. A queued job cancels the
# current warm-up and takes this lock as soon as its process group has exited.
# `_prewarming` also keeps cache hygiene away from a warm-up's files.
_prewarming = False
_execution_lock = threading.Lock()
_prewarm_cancel = threading.Event()


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


def _effective_memory_mb(
    limits: dict[str, Any], executor: LanguageExecutor
) -> int:
    """Return the runtime's virtual-address allowance.

    Managed runtimes reserve address space for the VM in addition to the
    problem's physical-memory allowance. Thread stacks add a per-thread term;
    runtimes that reserve another region as soon as any schedule exists can
    declare one flat schedule term as well. Physical memory remains bounded
    separately by the execution cgroup.
    """
    threads = int(limits.get("threads", 0))
    return (
        int(limits.get("memory_mb", 256))
        + executor.address_space_overhead_mb
        + threads * 2
        + (getattr(executor, "schedule_address_space_mb", 0) if threads else 0)
    )


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
        "memory_mb": _effective_memory_mb(limits, executor),
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
    manager = RESOURCES or ResourceManager()
    if manager.isolated:
        budget = execution_budget(nominal_time_ms, bool(limits.get("threads")), manager.cpu_count)
        effective_limits["time_ms"] = budget.cpu_ms
    else:
        budget = execution_budget(calibrated_time_ms, True)
    if getattr(executor, "encode_case_with_limits", False):
        payload = executor.encode_case(invocation, case_input, limits)
    else:
        payload = executor.encode_case(invocation, case_input)

    with tempfile.TemporaryFile(mode="w+b", dir="/tmp") as output_file, \
            tempfile.TemporaryFile(mode="w+b", dir="/tmp") as protocol_file:
        channel = os.dup2(protocol_file.fileno(), PROTOCOL_FD)
        group = None
        process = None
        measurements = {}
        timeout_reason = None
        started = time.monotonic()
        try:
            if manager.isolated:
                group = manager.case(int(limits.get("memory_mb", 256)), effective_limits["processes"])
            environment = dict(program.environment)
            environment.pop("CODERPUZZLE_RUN_CGROUP", None)
            if group:
                environment["CODERPUZZLE_RUN_CGROUP"] = str(group.path)
            started = time.monotonic()
            process = subprocess.Popen(
                _sandboxed_runtime_command(program.command, effective_limits, output_limit),
                cwd=scratch, stdin=subprocess.PIPE, stdout=output_file,
                stderr=subprocess.STDOUT, env=environment,
                start_new_session=True, pass_fds=(channel,),
            )
            pending_input = payload
            while True:
                remaining = budget.wall_ms / 1000 - (time.monotonic() - started)
                if group and group.cpu_ms() >= budget.cpu_ms:
                    timeout_reason = "cpu"
                    break
                if remaining <= 0:
                    timeout_reason = "wall"
                    break
                try:
                    process.communicate(pending_input, timeout=min(remaining, 0.01) if group else remaining)
                    break
                except subprocess.TimeoutExpired:
                    pending_input = None
            wall_ms = int((time.monotonic() - started) * 1000)
        finally:
            try:
                if group:
                    measurements = group.finish()
            finally:
                try:
                    if process is not None:
                        # Also covers a launcher failing before cgroup attachment.
                        if process.poll() is None:
                            try:
                                os.killpg(process.pid, signal.SIGKILL)
                            except ProcessLookupError:
                                pass
                        process.wait()
                    if group:
                        group.close()
                    else:
                        _kill_lingering_children()
                finally:
                    os.close(channel)
        manager.validate()
        if group and measurements["cpu_time_ms"] >= budget.cpu_ms:
            timeout_reason = "cpu"
        output_file.seek(0)
        output = output_file.read(output_limit).decode("utf-8", errors="replace")
        protocol_file.seek(0)
        protocol = protocol_file.read(output_limit + 4096).decode("utf-8", errors="replace")
        parsed = _parse_protocol(protocol) if protocol.strip() else _parse_protocol(output)
        if measurements.pop("oom_kill", 0):
            parsed = {"status": "memory_limit_exceeded", "error": "Solution exceeded its physical memory budget"}
        elif timeout_reason:
            parsed = {"status": "time_limit_exceeded", "timeout_reason": timeout_reason}
        elif process.returncode == 126 and group:
            parsed = {"status": "system_error", "error": "Runtime launcher failed"}
        elif process.returncode != 0 and parsed["status"] == "completed":
            parsed = {"status": "runtime_error", "error": f"{executor.language} exited with status {process.returncode}"}
        # These values come only from the supervisor, never from harness output.
        for key in ("cpu_time_ms", "memory_peak_bytes", "cpu_throttled_ms", "timeout_reason"):
            if key != "timeout_reason" or not timeout_reason:
                parsed.pop(key, None)
        parsed.update(measurements)
        parsed.update({
            "runtime_ms": measurements["cpu_time_ms"] if group else wall_ms,
            "wall_time_ms": wall_ms,
            "timeout_ms": budget.wall_ms if limits.get("threads") or not group else budget.cpu_ms,
            "limit_mode": "wall" if limits.get("threads") or not group else "cpu",
            "cpu_limit_ms": budget.cpu_ms,
            "wall_limit_ms": budget.wall_ms,
            "timing_mode": "cpu" if group else "wall",
            "resource_profile": manager.profile,
        })
        # algorithm_us is the first harness-supplied timing field. fd 63 is
        # submission-writable, so accept it only inside physical bounds the
        # supervisor already measured. A forged small value stays undetectable
        # — same hygiene-not-protection class as the rest of this channel.
        claimed = parsed.pop("algorithm_us", None)
        ceiling_us = max(0, int(wall_ms) * 1000)
        if isinstance(measurements.get("cpu_time_ms"), (int, float)):
            ceiling_us = min(ceiling_us, max(0, int(measurements["cpu_time_ms"]) * 1000))
        if isinstance(claimed, int) and 0 <= claimed <= ceiling_us:
            parsed["algorithm_us"] = claimed
            parsed["scored_quantity"] = "algorithm"
        else:
            parsed.pop("scored_quantity", None)
        for optional in ("load_us", "clock_noise_ns"):
            value = parsed.get(optional)
            if not isinstance(value, int) or value < 0:
                parsed.pop(optional, None)
        if process.returncode != 0 and parsed["status"] == "runtime_error" and not parsed.get("error"):
            parsed["error"] = f"{executor.language} exited with status {process.returncode}"
        return parsed


def _write_response(job_dir: Path, response: dict[str, Any]) -> None:
    # The API tears a job directory down when it stops waiting (its poll
    # timeout, or an API restart); the answer for an abandoned job has no
    # reader, so skip quietly instead of crashing the worker.
    if not job_dir.is_dir():
        print(f"CoderPuzzle job {job_dir.name} abandoned before its result", file=sys.stderr, flush=True)
        return
    if RESOURCES:
        response["timing_mode"] = "cpu" if RESOURCES.isolated else "wall"
        response["resource_profile"] = RESOURCES.profile
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
    claimed_at = time.monotonic_ns()
    compile_ms = 0
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
        _audit("job_start", job_id=job_dir.name, language=executor.language,
               source_sha256=hashlib.sha256(code.encode()).hexdigest(),
               enqueued_at_ns=request.get("enqueued_at_ns"),
               execution_cpus=RESOURCES.cpus if RESOURCES else "")

        job_root = Path(
            tempfile.mkdtemp(prefix=f"coderpuzzle-{request['job_id'][:12]}-", dir=WORK_DIR)
        )
        try:
            compile_started = time.monotonic()
            try:
                program = executor.prepare(
                    job_root,
                    job_root / "scratch",
                    code,
                    request["invocation"],
                    request.get("limits", {}),
                    request.get("assembly"),
                )
            finally:
                compile_ms = int((time.monotonic() - compile_started) * 1000)
            job_root.chmod(0o755)
            results = []
            request_cases = request.get("cases", [])
            for case_index, case in enumerate(request_cases):
                if not job_dir.is_dir():
                    # The API tears a job directory down when it stops
                    # waiting (deadline or restart); a huge case list would
                    # otherwise keep pinning the runner long after the
                    # answer lost its reader.
                    print(f"CoderPuzzle job {job_dir.name} abandoned mid-run", file=sys.stderr, flush=True)
                    return
                _audit("case_start", job_id=job_dir.name, case=case_index)
                result = _run_case(
                    job_root,
                    case["input"],
                    request["invocation"],
                    request.get("limits", {}),
                    executor,
                    program,
                )
                results.append(result)
                _audit("case_end", job_id=job_dir.name, case=case_index,
                       status=result["status"], **{key: result[key] for key in
                           ("cpu_time_ms", "wall_time_ms", "cpu_throttled_ms",
                            "memory_peak_bytes", "algorithm_us", "load_us")
                           if key in result})
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

    response["queue_ms"] = max(0, (claimed_at - request.get("enqueued_at_ns", claimed_at)) // 1_000_000)
    response["compile_ms"] = compile_ms
    _audit("job_end", job_id=job_dir.name, queue_ms=response["queue_ms"],
           compile_ms=compile_ms,
           wall_time_ms=sum(r.get("wall_time_ms", 0) for r in response["results"]),
           cpu_time_ms=sum(r.get("cpu_time_ms", 0) for r in response["results"]))
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
PREWARM_DIR = Path(os.environ.get("CODERPUZZLE_PREWARM_DIR", "/tmp/coderpuzzle-prewarm"))
GO_CACHE = Path("/tmp/coderpuzzle-gocache")
_MANAGED_TMP = {GO_CACHE.name, PREWARM_DIR.name}

# The Go build cache is exempt from _sweep_tmp (the toolchain owns its own
# layout), so it is the one entry under /tmp that grows without bound: every
# distinct build adds entries and Go never evicts them. On a 384 MiB tmpfs a
# long sweep — a full calibration is ~17k Go builds over many hours — fills
# /tmp completely, after which EVERY language fails: compiled ones cannot
# write objects (compile_error) and interpreted ones cannot even stage their
# source (runtime_error with every case skipped). Bound it here and let the
# next build repopulate what it needs.
GO_CACHE_MAX_BYTES = int(os.environ.get("CODERPUZZLE_GOCACHE_MAX_BYTES", str(128 * 1024 * 1024)))
GO_CACHE_CHECK_INTERVAL = float(os.environ.get("CODERPUZZLE_GOCACHE_CHECK_INTERVAL", "60"))


def _tree_bytes(root: Path) -> int:
    total = 0
    stack = [root]
    while stack:
        try:
            entries = list(os.scandir(stack.pop()))
        except OSError:
            continue
        for entry in entries:
            try:
                if entry.is_dir(follow_symlinks=False):
                    stack.append(Path(entry.path))
                else:
                    total += entry.stat(follow_symlinks=False).st_size
            except OSError:
                continue
    return total


def _prepare_go_cache() -> None:
    """Create the shared Go build cache owned by the compiler uid.

    The Go toolchain refuses to reuse a cache written by another uid, so the
    directory must belong to the uid submissions compile under. That makes it
    un-chmod-able afterwards for a worker without CAP_FOWNER, so only touch
    the mode while we still own the directory — a blind chmod on every pass
    is what used to raise EPERM and abort the whole prewarm from its second
    pass onward, leaving every toolchain permanently cold."""
    fresh = not GO_CACHE.exists()
    GO_CACHE.mkdir(parents=True, exist_ok=True)
    if fresh:
        GO_CACHE.chmod(0o1777)
        os.chown(GO_CACHE, NOBODY_UID, NOBODY_GID)


def _trim_go_cache() -> None:
    """Drop the shared Go build cache once it outgrows its budget."""
    size = _tree_bytes(GO_CACHE)
    if size <= GO_CACHE_MAX_BYTES:
        return
    shutil.rmtree(GO_CACHE, ignore_errors=True)
    remaining = _tree_bytes(GO_CACHE) if GO_CACHE.exists() else 0
    if remaining > GO_CACHE_MAX_BYTES:
        # Nothing was reclaimed: the cache belongs to the compiler uid, so
        # removing it needs CAP_FOWNER (see the runner's cap_add). Say so
        # rather than filling /tmp silently.
        print(
            f"CoderPuzzle go cache at {remaining} bytes could not be trimmed "
            "(CAP_FOWNER missing?); /tmp will fill and every language will fail",
            file=sys.stderr, flush=True,
        )
        return
    try:
        _prepare_go_cache()
    except OSError as error:
        print(f"CoderPuzzle go cache could not be recreated: {error}", file=sys.stderr, flush=True)
    print(f"CoderPuzzle trimmed the go build cache at {size} bytes", file=sys.stderr, flush=True)


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
_last_go_cache_check = 0.0


def _hygiene() -> None:
    """Reap inherited zombies every pass; sweep /tmp at most once a second
    and size-check the shared Go build cache at most once a minute."""
    global _last_tmp_sweep, _last_go_cache_check
    _reap_orphans()
    now = time.monotonic()
    if now - _last_tmp_sweep >= 1.0:
        _last_tmp_sweep = now
        _sweep_tmp()
    if now - _last_go_cache_check >= GO_CACHE_CHECK_INTERVAL:
        _last_go_cache_check = now
        if not _prewarming and GO_CACHE.exists():
            _trim_go_cache()


def _run_prewarm_command(
    command: tuple[str, ...], environment: dict[str, str], cwd: Path
) -> None:
    """Run one warm-up command, aborting promptly when a job is queued."""
    process = subprocess.Popen(
        command,
        env=environment,
        cwd=cwd,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        start_new_session=True,
    )
    deadline = time.monotonic() + 240
    try:
        while process.poll() is None:
            if _prewarm_cancel.wait(0.05):
                os.killpg(process.pid, signal.SIGKILL)
                process.wait()
                return
            if time.monotonic() >= deadline:
                os.killpg(process.pid, signal.SIGKILL)
                process.wait()
                raise subprocess.TimeoutExpired(command, 240)
    finally:
        if process.poll() is None:
            os.killpg(process.pid, signal.SIGKILL)
            process.wait()


def _prewarm_toolchains_once() -> None:
    """Compile throwaway programs so a user's first submission never pays
    the cold toolchain cost (page-cache faults dominate rustc/g++/javac/tsc
    cold starts; the shared compile budget measures wall clock)."""
    global _prewarming
    warm_dir = PREWARM_DIR
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
        # One toolchain's setup failing must not cancel the other four warm
        # jobs, so the Go cache is prepared in its own guard.
        try:
            _prepare_go_cache()
        except OSError as error:
            print(f"CoderPuzzle go pre-warm skipped: {error}", file=sys.stderr, flush=True)
        else:
            jobs.append((
                (SUPERVISOR_PYTHON, "/runner/compiler_sandbox.py", "2048", "64", "240",
                 "/usr/bin/go", "build", "-trimpath", "-o", str(warm_dir / "warm-go-bin"), str(go_dir / "main.go")),
                {**environment, "GOCACHE": str(GO_CACHE), "GOENV": "off", "GOPROXY": "off", "CGO_ENABLED": "0", "GOMAXPROCS": "1"},
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
        for command, job_environment, _preexec in jobs:
            if _prewarm_cancel.is_set():
                break
            # A job that appears while this command runs sets the cancellation
            # event, kills the warm-up's whole process group, then acquires the
            # lock. It never competes with a warm-up for resources.
            with _execution_lock:
                if _prewarm_cancel.is_set():
                    break
                _prewarming = True
                try:
                    _run_prewarm_command(command, job_environment, warm_dir)
                except (OSError, subprocess.SubprocessError) as error:
                    print(
                        f"CoderPuzzle pre-warm skipped {' '.join(command[:2])}: {error}",
                        file=sys.stderr,
                        flush=True,
                    )
                finally:
                    _prewarming = False
    except OSError as error:
        print(f"CoderPuzzle pre-warm disabled: {error}", file=sys.stderr, flush=True)
    finally:
        _prewarming = False


def _prewarm_loop() -> None:
    interval = float(os.environ.get("CODERPUZZLE_PREWARM_INTERVAL", "600"))
    while True:
        _prewarm_toolchains_once()
        time.sleep(interval)


@contextmanager
def claim_ready(ready: Path):
    """Claim a local-filesystem queue inode until response publication."""
    with ready.open("rb") as claim:
        try:
            fcntl.flock(claim, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            yield False
            return
        if not ready.exists() or ready.stat().st_ino != os.fstat(claim.fileno()).st_ino:
            yield False
            return
        yield True


def queued_jobs():
    """Oldest ready jobs first; other workers may remove entries at any time."""
    entries = []
    for ready in QUEUE_DIR.glob("*/ready"):
        try:
            entries.append((ready.stat().st_mtime_ns, str(ready), ready))
        except FileNotFoundError:
            continue
    return [entry[2] for entry in sorted(entries)]


def main() -> None:
    global RESOURCES
    RESOURCES = ResourceManager()
    for language in supported_languages():
        elapsed_ms, factor = (0.0, 1.0) if RESOURCES.isolated else get_executor(language).calibrate()
        CALIBRATION_FACTORS[language] = factor
        print(
            f"CoderPuzzle {language} calibration: {elapsed_ms:.1f} ms, deadline factor {factor:.2f}x",
            file=sys.stderr,
            flush=True,
        )
    # Serve immediately. Warm-up work repeats in the background, but yields
    # and terminates its current process group as soon as a job is queued.
    threading.Thread(target=_prewarm_loop, name="coderpuzzle-prewarm", daemon=True).start()
    QUEUE_DIR.mkdir(parents=True, exist_ok=True)
    WORK_DIR.mkdir(parents=True, exist_ok=True)
    while True:
        found = False
        ready_jobs = queued_jobs()
        if ready_jobs:
            # Wake a cancellable warm-up before waiting for the execution lock.
            _prewarm_cancel.set()
        for ready in ready_jobs:
            found = True
            with _execution_lock:
                try:
                    # The ready inode is stable until publication; death
                    # releases the lock, so another slot can retry an
                    # abandoned claim.
                    with claim_ready(ready) as claimed:
                        if not claimed:
                            continue
                        _process_job(ready.parent)
                except FileNotFoundError:
                    continue
                except Exception:  # noqa: BLE001 — one bad job must never kill the worker
                    print(
                        f"Runner job {ready.parent.name} crashed:\n{traceback.format_exc()}",
                        file=sys.stderr,
                        flush=True,
                    )
            _hygiene()
        if not found:
            _prewarm_cancel.clear()
            _hygiene()
        time.sleep(POLL_INTERVAL)


if __name__ == "__main__":
    main()
