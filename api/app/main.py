import logging
import re
import time
import os
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Annotated, Any

from fastapi import Cookie, Depends, FastAPI, HTTPException, Query, Request, Response

from .auth import load_defaults
from . import calibration
from .auth.http import router as auth_router
from .database import (
    SESSION_IDLE_SECONDS,
    create_session,
    get_submission,
    initialize_database,
    list_drafts,
    list_progress,
    list_submissions,
    purge_expired_sessions,
    save_draft,
    save_submission,
    scope_key,
    session_user,
    validate_session,
)
from .web_session import SESSION_COOKIE, current_session, set_session_cookie
from .judge import (
    RunnerUnavailable,
    execute,
    format_code_report,
    judge_slot,
    per_case_timeout_ms,
    prune_stale_jobs,
    select_cases,
)
from . import tamper_scan
from .models import FormatRequest, RunRequest, SubmitRequest
from .problems import (
    LANGUAGE_REGISTRY,
    safe_problem_path,
    ProblemError,
    list_problems,
    load_all_cases,
    load_problem,
    load_solutions,
    public_problem,
)


@asynccontextmanager
async def lifespan(_: FastAPI):
    initialize_database()
    load_defaults()
    purge_expired_sessions()
    # A process that died mid-wait leaves its job queued; the runner would
    # otherwise spend its oldest-first attention on that orphan and starve
    # every live request behind it.
    stale = prune_stale_jobs()
    if stale:
        logging.getLogger("uvicorn.error").warning("discarded %d queue job(s) left by a previous process", stale)
    yield


# The API surface is small and fully documented in docs/api-and-cli.md;
# FastAPI's generated /docs and /openapi.json would only enumerate the
# surface for strangers on a public deployment.
app = FastAPI(
    title="CoderPuzzle API",
    version="0.1.0",
    lifespan=lifespan,
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)
app.include_router(auth_router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/session")
def start_session(response: Response, request: Request) -> dict[str, Any]:
    session_id = create_session()
    purge_expired_sessions()
    set_session_cookie(response, session_id, request)
    return {"status": "active", "idle_seconds": SESSION_IDLE_SECONDS}


@app.get("/session")
def session_status(
    touch: int = Query(default=1, ge=0, le=1),
    session_cookie: Annotated[str | None, Cookie(alias=SESSION_COOKIE)] = None,
) -> dict[str, Any]:
    # touch=0 validates without extending the idle clock: the frontend's
    # inactivity watcher probes with it, so watching cannot keep an
    # abandoned session alive.
    if not (session_cookie and validate_session(session_cookie, touch=bool(touch))):
        raise HTTPException(status_code=401, detail="No active session")
    user = session_user(session_cookie)
    return {
        "status": "active",
        "idle_seconds": SESSION_IDLE_SECONDS,
        "user": None if user is None else {"username": user["username"], "is_admin": user["is_admin"]},
    }


# Judge-call shaping. The runner executes one job at a time and every judge
# request blocks a worker thread for its full queue wait; the per-session
# rate limit below stops one viewer from queueing a burst, and the global
# in-flight slot count (judge.judge_slot) bounds how many requests wait on
# the single runner at once — excess gets an immediate 503 instead of
# pinning a thread for the full RUNNER_TIMEOUT.
_JUDGE_WINDOW_SECONDS = 60.0
_JUDGE_MAX_REQUESTS = 20
_judge_requests: dict[str, list[float]] = {}


def _judge_throttled(session_id: str) -> bool:
    """True when this session already sent its share of judge calls in the
    current window. The attempt is counted before it runs."""
    now = time.monotonic()
    recent = [stamp for stamp in _judge_requests.get(session_id, []) if now - stamp < _JUDGE_WINDOW_SECONDS]
    if len(recent) >= _JUDGE_MAX_REQUESTS:
        _judge_requests[session_id] = recent
        return True
    recent.append(now)
    _judge_requests[session_id] = recent
    for stale in [
        key for key, stamps in _judge_requests.items() if not stamps or now - stamps[-1] >= _JUDGE_WINDOW_SECONDS
    ]:
        del _judge_requests[stale]
    return False


SLUG_PATTERN = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def _validate_draft_keys(slug: str, language: str) -> None:
    if not SLUG_PATTERN.fullmatch(slug):
        raise HTTPException(status_code=400, detail="Unknown problem")
    if language not in LANGUAGE_REGISTRY:
        raise HTTPException(status_code=400, detail="Unknown language")


FIGURE_NAME = re.compile(r"^[a-z0-9-]+\.svg$")


@app.get("/problems/{slug}/figures/{figure}")
def problem_figure(slug: str, figure: str, session_id: Annotated[str, Depends(current_session)]) -> Response:
    """Serve a bundle's redrawn statement figures (figures/<name>.svg)."""
    if FIGURE_NAME.fullmatch(figure) is None:
        raise HTTPException(status_code=404, detail="Figure not found")
    try:
        path = safe_problem_path(slug) / "figures" / figure
        if not path.is_file():
            raise HTTPException(status_code=404, detail="Figure not found")
        content = path.read_bytes()
    except ProblemError:
        raise HTTPException(status_code=404, detail="Problem not found") from None
    except OSError:
        # raw OSError text can leak server paths (see the problem route)
        raise HTTPException(status_code=404, detail="Figure not found") from None
    return Response(content=content, media_type="image/svg+xml")


@app.get("/problems/{slug}/solutions")
def problem_solutions(slug: str, session_id: Annotated[str, Depends(current_session)]) -> dict[str, Any]:
    """Solutions-tab content: per-variant explanations plus each variant's
    implementation in every offered language."""
    try:
        loaded = load_solutions(slug)
    except ProblemError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error
    except (OSError, ValueError) as error:
        # raw OSError text can leak server paths (see the problem route)
        raise HTTPException(status_code=404, detail="Solutions could not be loaded") from error
    if loaded is None:
        raise HTTPException(status_code=404, detail="No solutions published for this problem")
    return loaded


@app.get("/drafts/{slug}")
def drafts(slug: str, session_id: Annotated[str, Depends(current_session)]) -> list[dict[str, Any]]:
    if not SLUG_PATTERN.fullmatch(slug):
        raise HTTPException(status_code=400, detail="Unknown problem")
    return list_drafts(scope_key(session_id), slug)


@app.put("/drafts/{slug}/{language}")
def put_draft(
    slug: str,
    language: str,
    body: dict[str, str],
    session_id: Annotated[str, Depends(current_session)],
) -> dict[str, str]:
    _validate_draft_keys(slug, language)
    code = body.get("code", "")
    if len(code) > 256_000:
        raise HTTPException(status_code=400, detail="Draft too large")
    save_draft(scope_key(session_id), slug, language, code)
    return {"status": "saved"}


@app.get("/problems")
def problems(
    session_id: Annotated[str, Depends(current_session)],
    page: Annotated[int, Query(ge=1)] = 1,
    page_size: Annotated[int, Query(ge=0, le=500)] = 0,
) -> dict[str, Any]:
    """List problems, optionally paginated.

    Without query params the full list is returned in a single page (the
    editor needs the whole ordering for prev/next and the drawer). With
    page_size set, only that page's items come back so the landing page's
    load stays small."""
    items = list_problems()
    total = len(items)
    if page_size <= 0:
        return {
            "items": items,
            "total": total,
            "page": 1,
            "page_size": total,
            "pages": 1 if total else 0,
        }
    pages = max(1, (total + page_size - 1) // page_size)
    page = max(1, min(page, pages))
    start = (page - 1) * page_size
    return {
        "items": items[start : start + page_size],
        "total": total,
        "page": page,
        "page_size": page_size,
        "pages": pages,
    }


@app.get("/problems/topics")
def problem_topics(session_id: Annotated[str, Depends(current_session)]) -> dict[str, Any]:
    """Index of the topic taxonomy: each topic with how many problems carry
    it, busiest first — the option list for the topic filter."""
    counts: dict[str, int] = {}
    for summary in list_problems():
        for topic in summary.get("topics", []):
            counts[topic] = counts.get(topic, 0) + 1
    topics = [
        {"name": name, "count": count} for name, count in sorted(counts.items(), key=lambda item: (-item[1], item[0]))
    ]
    return {"topics": topics}


@app.get("/problems/{slug}")
def problem(slug: str, session_id: Annotated[str, Depends(current_session)]) -> dict[str, Any]:
    try:
        return public_problem(load_problem(slug))
    except ProblemError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error
    except (OSError, ValueError) as error:
        # ProblemError carries the user-facing reason; raw OSError text can
        # leak server paths, so keep it generic.
        raise HTTPException(status_code=404, detail="Problem could not be loaded") from error


def _validate_language(problem_data: dict[str, Any], language: str) -> None:
    config = problem_data.get("languages", {}).get(language)
    if config is None:
        raise HTTPException(status_code=400, detail="Language is not available for this problem")
    if not config.get("enabled", False):
        raise HTTPException(status_code=400, detail="Language runner is not enabled yet")


# Where each language's assembled sources live under a problem's own
# provided/ directory (the judge's only well-known assembly path — see
# docs/TRUST-BOUNDARIES.md).
PROVIDED_DIRECTORIES = {
    "python3": "python",
    "java": "java",
    "cpp": "cpp",
    "go": "go",
    "rust": "rust",
    "typescript": "typescript",
    "javascript": "javascript",
}


def _assembly_sources(bundle: Path, language: str) -> dict[str, dict[str, str]]:
    """The bundle-provided sources assembled with one submission.

    Reads the problem's own provided/<language>/ files, so the runner
    compiles or runs one complete program: provided + submission. Every
    well-known data structure a bundle's wire needs (ListNode, TreeNode,
    ...) is the bundle's OWN provided/ source — the judge holds no
    predefined definitions of its own (docs/CODECS.md documents the
    required name and shape per wire kind).
    """
    directory = PROVIDED_DIRECTORIES.get(language)
    if directory is None:
        return {}
    assembly: dict[str, dict[str, str]] = {"provided": {}}
    try:
        # directory candidates ARE the bundle; flat-file candidates are a
        # bundle-format single file whose parent carries no provided/ anyway
        if not bundle.is_dir():
            bundle = bundle.parent
        provided_dir = bundle / "provided" / directory
        if provided_dir.is_dir():
            for path in sorted(provided_dir.iterdir()):
                if path.is_file():
                    assembly["provided"][path.name] = path.read_text(encoding="utf-8")
    except OSError:
        return {}
    return assembly


def _run_judge(
    problem_data: dict[str, Any],
    language: str,
    code: str,
    cases: list[dict[str, Any]],
    public_count: int,
    bundle: Path,
    respect_calibration: bool = True,
) -> list[dict[str, Any]]:
    calibration.enforce()
    _validate_language(problem_data, language)
    # The sweep judges a bundle's own reference to *produce* the record, so it
    # must not be governed by the record it is measuring — on a re-run that
    # reads the previous record's deadline back to the reference and fails it.
    calibrated = calibration.lookup(problem_data["slug"], language) if respect_calibration else None
    if calibration.REQUIRED and calibrated is None:
        raise HTTPException(status_code=503, detail="Calibration is missing for this problem and language")
    if calibrated:
        per_case_timeout = per_case_timeout_ms(calibrated)
        problem_data = {**problem_data, "limits": {**problem_data["limits"], "time_ms": per_case_timeout}}
    # A generated corpus can hold tens of thousands of cases, and every case
    # costs a sandboxed process; judge a bounded, deterministic subset that
    # keeps the statement's examples and the corpus's extremes.
    selected = select_cases(cases, public_count)
    if len(selected) < len(cases):
        cases = [cases[index] for index in selected]
        public_count = min(public_count, len(cases))
    try:
        with judge_slot():
            return execute(
                code,
                language,
                problem_data["invocation"],
                problem_data["limits"],
                cases,
                public_count,
                assembly=_assembly_sources(bundle, language),
                calibrated=calibrated,
            )
    except RunnerUnavailable as error:
        raise HTTPException(status_code=503, detail=str(error)) from error
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
    except OSError as error:
        # raw OSError text can leak server paths (see the problem route);
        # queue errors are transient, so 503 rather than a client mistake
        raise HTTPException(status_code=503, detail="The judge queue is not available") from error


@app.post("/format")
def format_source(request: FormatRequest, session_id: Annotated[str, Depends(current_session)]) -> dict[str, Any]:
    """Tri-state format of an editor draft, judged by the bundles' toolchain.

    Always 200 when the runner is reachable — the payload carries the state:
    {"status": "formatted"} when the draft already conforms;
    {"status": "unformatted", "code": ...} with the formatted text;
    {"status": "error", "diagnostics": ...} when the draft does not parse
    (the author's to fix, so a payload state rather than a judge verdict).
    503 remains reserved for the runner being unreachable.
    """
    if _judge_throttled(session_id):
        raise HTTPException(status_code=429, detail="Too many judge requests; wait a moment")
    try:
        with judge_slot():
            return format_code_report(request.code, request.language)
    except RunnerUnavailable as error:
        raise HTTPException(status_code=503, detail=str(error)) from error


def _attach_tamper_warnings(summary: dict[str, Any], bundle: Path, language: str, code: str) -> None:
    """Flag (never gate) submissions that inspect or patch provided code."""
    try:
        assembly = _assembly_sources(bundle, language)
        protected = tamper_scan.protected_names(assembly.get("provided", {}))
        warnings = tamper_scan.scan(code, language, protected)
    except Exception:  # noqa: BLE001 — the scan is advisory and must never fail a judge
        return
    if warnings:
        summary["warnings"] = warnings


@app.post("/run")
def run(request: RunRequest, session_id: Annotated[str, Depends(current_session)]) -> dict[str, Any]:
    if _judge_throttled(session_id):
        raise HTTPException(status_code=429, detail="Too many judge requests; wait a moment")
    try:
        bundle = safe_problem_path(request.slug)
        problem_data = load_problem(request.slug, path=bundle)
    except ProblemError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error
    except (OSError, ValueError) as error:
        # raw OSError text can leak server paths (see the problem route)
        raise HTTPException(status_code=404, detail="Problem could not be loaded") from error

    canonical = problem_data["public_cases"]
    if request.cases is None:
        cases = canonical
    else:
        cases = []
        invocation = problem_data["invocation"]
        invocation_type = invocation.get("type", "function")
        for index, custom_input in enumerate(request.cases):
            # Function- and SQL-style cases arrive as named arguments and
            # travel to the runner positionally; shell's single raw value
            # arrives wrapped in one field and is unwrapped here.
            if isinstance(custom_input, dict) and invocation.get("parameters"):
                try:
                    wire_input = [custom_input[parameter["name"]] for parameter in invocation["parameters"]]
                except KeyError as error:
                    raise HTTPException(
                        status_code=400, detail=f"Missing testcase argument: {error.args[0]}"
                    ) from error
            elif invocation_type == "shell" and isinstance(custom_input, dict) and len(custom_input) == 1:
                wire_input = next(iter(custom_input.values()))
            else:
                wire_input = custom_input
            matched = next((case for case in canonical if case["input"] == wire_input), None)
            # Named positionally, matching the editor's own "Case N" tabs --
            # never the matched example's own name. Two different tabs can
            # hold the same value (a case copied from another, then left
            # untouched) and would otherwise both display that one matched
            # example's name, reading as duplicates of each other instead of
            # the distinct tabs they are.
            name = f"Case {index + 1}"
            if matched is None:
                # Custom cases execute without an assertion; their actual value is returned.
                cases.append({"name": name, "input": wire_input, "expected": None, "custom": True})
            else:
                cases.append({**matched, "name": name})

    results = _run_judge(problem_data, request.language, request.code, cases, len(cases), bundle)
    # The judge may have bounded the case list (see select_cases); its
    # results are what it actually ran.
    cases = cases[: len(results)]
    for case, result in zip(cases, results, strict=True):
        if case.get("custom") and result["status"] in {"wrong_answer", "accepted"}:
            result["status"] = "completed"
            result.pop("expected", None)
    summary = _summarize(results)
    _attach_tamper_warnings(summary, bundle, request.language, request.code)
    return summary


@app.post("/submit")
def submit(request: SubmitRequest, session_id: Annotated[str, Depends(current_session)]) -> dict[str, Any]:
    if _judge_throttled(session_id):
        raise HTTPException(status_code=429, detail="Too many judge requests; wait a moment")
    # Resolve the bundle once; every loader below takes the resolved path so
    # one submission doesn't re-glob and re-statwalk the tree three times.
    try:
        bundle = safe_problem_path(request.slug)
        problem_data = load_problem(request.slug, path=bundle)
        cases, public_count = load_all_cases(request.slug, path=bundle)
    except ProblemError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error
    except (OSError, ValueError) as error:
        # raw OSError text can leak server paths (see the problem route)
        raise HTTPException(status_code=404, detail="Problem could not be loaded") from error

    # Capture the storage scope before judging: a session that idle-expires
    # mid-judge still keeps its submission under the scope it ran under.
    scope = scope_key(session_id)
    results = _run_judge(problem_data, request.language, request.code, cases, public_count, bundle)
    summary = _summarize(results)
    _attach_tamper_warnings(summary, bundle, request.language, request.code)
    # The baseline is this deployment's calibration record for the pair --
    # the reference measured once by the sweep, never re-run per submission.
    # Deadlines stay on wall time; the scored ratio uses algorithm_us only.
    baseline = calibration.lookup(request.slug, request.language)
    summary["reference_runtime_ms"] = baseline["reference_walltime_ms"] if baseline else None
    summary["timeout_ms"] = baseline["timeout_ms"] if baseline else None
    floor_us = int(os.environ.get("CODERPUZZLE_ALGORITHM_FLOOR_US", "200"))
    reference_algorithm_us = baseline.get("reference_algorithm_us") if baseline else None
    if not isinstance(reference_algorithm_us, (int, float)) or reference_algorithm_us <= 0:
        reference_algorithm_us = None
    summary["reference_algorithm_us"] = int(reference_algorithm_us) if reference_algorithm_us is not None else None
    algorithm_us = summary.get("algorithm_us")
    scored_cases = int(summary.get("scored_cases") or 0)
    executed = summary["status"] in {"accepted", "wrong_answer"} or (
        summary["status"] not in {"compile_error", "system_error"} and summary["passed"] == summary["total"]
    )
    comparable = calibration.comparable(
        summary["timing_mode"], summary["resource_profile"], scored_quantity="algorithm"
    )
    state = "unmeasured"
    ratio = None
    if (
        baseline
        and reference_algorithm_us is not None
        and isinstance(algorithm_us, (int, float))
        and scored_cases == summary["total"]
        and summary["total"] > 0
        and executed
        and summary["status"] == "accepted"
    ):
        if not comparable:
            state = "incomparable"
        elif reference_algorithm_us < floor_us:
            state = "below_floor"
        else:
            state = "scored"
            ratio = round(float(algorithm_us) * 100.0 / float(reference_algorithm_us), 2)
    summary["performance_state"] = state
    summary["performance_ratio_percent"] = ratio
    submission_id = save_submission(
        request.slug,
        request.language,
        request.code,
        summary["status"],
        summary["passed"],
        summary["total"],
        summary["runtime_ms"],
        results,
        scope,
        summary["reference_runtime_ms"],
        summary["timing_mode"],
        summary["resource_profile"],
    )
    summary["submission_id"] = submission_id
    return summary


def _summarize(results: list[dict[str, Any]]) -> dict[str, Any]:
    passed = sum(result["status"] in {"accepted", "completed"} for result in results)
    runtime_ms = sum(result.get("runtime_ms", result.get("_runtime_ms", 0)) for result in results)
    modes = {result.get("timing_mode", "wall") for result in results}
    profiles = {result.get("resource_profile", "shared-wall-v1") for result in results}
    timing = {
        "judge_job_id": next((result["_judge_job_id"] for result in results if "_judge_job_id" in result), None),
        "timing_mode": next(iter(modes)) if len(modes) == 1 else "mixed",
        "resource_profile": next(iter(profiles)) if len(profiles) == 1 else "mixed",
        "queue_ms": sum(result.get("_queue_ms", 0) for result in results),
        "compile_ms": sum(result.get("_compile_ms", 0) for result in results),
    }
    for metric in ("cpu_time_ms", "wall_time_ms", "algorithm_us"):
        if any(metric in result or "_" + metric in result for result in results):
            timing[metric] = sum(result.get(metric, result.get("_" + metric, 0)) for result in results)
    scored_cases = sum(
        1 for result in results if isinstance(result.get("algorithm_us", result.get("_algorithm_us")), (int, float))
    )
    timing["scored_cases"] = scored_cases
    for result in results:
        for key in (
            "_runtime_ms",
            "_cpu_time_ms",
            "_wall_time_ms",
            "_algorithm_us",
            "_queue_ms",
            "_compile_ms",
            "_judge_job_id",
        ):
            result.pop(key, None)
    status = (
        "accepted"
        if passed == len(results)
        else next(
            (result["status"] for result in results if result["status"] not in {"accepted", "completed"}),
            "wrong_answer",
        )
    )
    return {
        "status": status,
        "passed": passed,
        "total": len(results),
        "runtime_ms": runtime_ms,
        "results": results,
        **timing,
    }


@app.get("/submissions")
def submissions(
    session_id: Annotated[str, Depends(current_session)],
    slug: str = Query(min_length=1),
    limit: int = Query(default=30, ge=1, le=100),
):
    return list_submissions(slug, limit, scope_key(session_id))


@app.get("/submissions/{submission_id}")
def submission(submission_id: int, session_id: Annotated[str, Depends(current_session)]):
    result = get_submission(submission_id, scope_key(session_id))
    if result is None:
        raise HTTPException(status_code=404, detail="Submission not found")
    return result


@app.get("/progress")
def progress(session_id: Annotated[str, Depends(current_session)]) -> dict[str, str]:
    """Per-problem status marks for the current viewer (signed-in user or
    guest): 'solved' when any submission in any language was accepted,
    'attempted' otherwise; absent slugs are never-tried."""
    return list_progress(scope_key(session_id))
