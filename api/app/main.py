import re
import time
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Annotated, Any

from fastapi import Cookie, Depends, FastAPI, HTTPException, Query, Request, Response

from .database import (
    SESSION_IDLE_SECONDS,
    bind_session_user,
    count_users,
    create_session,
    create_user,
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
    verify_user,
)
from .judge import RunnerUnavailable, execute, format_code_report, judge_slot
from .tamper_scan import scan as tamper_scan
from .models import FormatRequest, RunRequest, SubmitRequest
from .problems import (
    LANGUAGE_REGISTRY,
    safe_problem_path,
    ProblemError,
    list_problems,
    load_all_cases,
    load_designated_reference,
    load_problem,
    load_solutions,
    public_problem,
)

SESSION_COOKIE = "openoj_session"


@asynccontextmanager
async def lifespan(_: FastAPI):
    initialize_database()
    purge_expired_sessions()
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


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


def current_session(openoj_session: Annotated[str | None, Cookie()] = None) -> str:
    """Require an active guest session; 401 otherwise (the frontend then
    shows the Continue-as-guest entrance)."""
    if openoj_session and validate_session(openoj_session):
        return openoj_session
    raise HTTPException(status_code=401, detail="No active session")


def _set_session_cookie(response: Response, session_id: str, request: Request) -> None:
    # Secure only when the client actually reaches us over https (the edge
    # terminates TLS and forwards the scheme); localhost/CI stay usable.
    # Deliberately a browser-session cookie (no max_age): a wall-clock cap
    # here would log active users out mid-session; expiry is the server's
    # idle clock, enforced by validate_session on every request.
    scheme = request.headers.get("x-forwarded-proto") or request.url.scheme
    response.set_cookie(
        SESSION_COOKIE,
        session_id,
        httponly=True,
        secure=scheme == "https",
        samesite="lax",
    )


@app.post("/session")
def start_session(response: Response, request: Request) -> dict[str, Any]:
    session_id = create_session()
    purge_expired_sessions()
    _set_session_cookie(response, session_id, request)
    return {"status": "active", "idle_seconds": SESSION_IDLE_SECONDS}


@app.get("/session")
def session_status(
    touch: int = Query(default=1, ge=0, le=1),
    openoj_session: Annotated[str | None, Cookie()] = None,
) -> dict[str, Any]:
    # touch=0 validates without extending the idle clock: the frontend's
    # inactivity watcher probes with it, so watching cannot keep an
    # abandoned session alive.
    if not (openoj_session and validate_session(openoj_session, touch=bool(touch))):
        raise HTTPException(status_code=401, detail="No active session")
    user = session_user(openoj_session)
    return {
        "status": "active",
        "idle_seconds": SESSION_IDLE_SECONDS,
        "user": None if user is None else {"username": user["username"], "is_admin": user["is_admin"]},
    }


@app.get("/auth/status")
def auth_status() -> dict[str, Any]:
    """Public: whether the admin bootstrap has happened. Drives the gate's
    admin-setup vs login/signup choice. Tables may be missing if the data
    volume was wiped mid-run; treat that as a fresh install."""
    try:
        return {"needs_setup": count_users() == 0}
    except Exception:  # noqa: BLE001
        return {"needs_setup": True}


# --- user accounts (backend-only; the UI stays guest-only for now) -----------
# Fresh-start bootstrap: the very first account must be the fixed-name admin;
# afterwards registration is closed until the accounts UI ships.

# Minimal in-memory login throttle: per source, allow 10 failures per minute.
# The source is the real client IP: uvicorn runs with --proxy-headers and the
# frontend nginx forwards the edge-supplied X-Forwarded-For (see
# frontend/nginx.conf), and the API container is reachable only through that
# nginx, so request.client.host is never the proxy's own address in the
# compose deployment.
_LOGIN_WINDOW_SECONDS = 60.0
_LOGIN_MAX_FAILURES = 10
_login_failures: dict[str, list[float]] = {}


def _prune_login_failures(now: float) -> None:
    """Drop sources whose every failure stamp has left the window."""
    for source in [s for s, stamps in _login_failures.items() if not stamps or now - stamps[-1] >= _LOGIN_WINDOW_SECONDS]:
        del _login_failures[source]


def _login_throttled(source: str) -> bool:
    """True when the source already burned its failure budget (checked
    BEFORE the password verify, so throttled callers do no scrypt work)."""
    now = time.monotonic()
    _prune_login_failures(now)
    recent = [stamp for stamp in _login_failures.get(source, []) if now - stamp < _LOGIN_WINDOW_SECONDS]
    _login_failures[source] = recent
    return len(recent) >= _LOGIN_MAX_FAILURES


def _register_login_failure(source: str) -> None:
    now = time.monotonic()
    recent = [stamp for stamp in _login_failures.get(source, []) if now - stamp < _LOGIN_WINDOW_SECONDS]
    recent.append(now)
    _login_failures[source] = recent


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
    for stale in [key for key, stamps in _judge_requests.items() if not stamps or now - stamps[-1] >= _JUDGE_WINDOW_SECONDS]:
        del _judge_requests[stale]
    return False


@app.post("/auth/register")
def auth_register(
    body: dict[str, str],
    response: Response,
    request: Request,
) -> dict[str, Any]:
    username = body.get("username", "").strip()
    password = body.get("password", "")
    bootstrap = count_users() == 0
    if bootstrap:
        # Fresh start: the first account is the fixed-name admin with the
        # highest privilege.
        if username != "admin":
            raise HTTPException(status_code=400, detail="The first account must be the admin (username 'admin')")
    else:
        # After the bootstrap, registration stays closed (as documented in
        # docs/API.md) — accounts are managed directly in the database.
        raise HTTPException(status_code=403, detail="Registration is closed")
    if not username or len(password) < 8:
        raise HTTPException(status_code=400, detail="Username is required and the password must be at least 8 characters")
    try:
        user_id = create_user(username, password, is_admin=bootstrap or username == "admin")
    except Exception:  # noqa: BLE001 — username uniqueness races
        raise HTTPException(status_code=400, detail="That username is not available")
    session_id = create_session()
    bind_session_user(session_id, user_id)
    _set_session_cookie(response, session_id, request)
    return {"status": "registered", "username": username, "is_admin": bootstrap or username == "admin"}


@app.post("/auth/login")
def auth_login(
    body: dict[str, str],
    request: Request,
    session_id: Annotated[str, Depends(current_session)],
) -> dict[str, Any]:
    source = request.client.host if request.client else "unknown"
    if _login_throttled(source):
        raise HTTPException(status_code=429, detail="Too many failed attempts; wait a minute")
    user = verify_user(body.get("username", ""), body.get("password", ""))
    if user is None:
        _register_login_failure(source)
        raise HTTPException(status_code=401, detail="Invalid username or password")
    bind_session_user(session_id, user["id"])
    return {"status": "logged_in", "username": user["username"], "is_admin": user["is_admin"]}


@app.post("/auth/logout")
def auth_logout(session_id: Annotated[str, Depends(current_session)]) -> dict[str, Any]:
    bind_session_user(session_id, None)
    return {"status": "logged_out"}


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
    except ProblemError:
        raise HTTPException(status_code=404, detail="Problem not found") from None
    if not path.is_file():
        raise HTTPException(status_code=404, detail="Figure not found")
    return Response(content=path.read_bytes(), media_type="image/svg+xml")


@app.get("/problems/{slug}/solutions")
def problem_solutions(slug: str, session_id: Annotated[str, Depends(current_session)]) -> dict[str, Any]:
    """Solutions-tab content: per-variant explanations plus each variant's
    implementation in every offered language."""
    try:
        loaded = load_solutions(slug)
    except ProblemError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error
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
    page_size = min(page_size, 500)
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
        {"name": name, "count": count}
        for name, count in sorted(counts.items(), key=lambda item: (-item[1], item[0]))
    ]
    return {"topics": topics}


@app.get("/problems/{slug}")
def problem(slug: str, session_id: Annotated[str, Depends(current_session)]) -> dict[str, Any]:
    try:
        return public_problem(load_problem(slug))
    except ProblemError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error
    except (OSError, ValueError):
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
) -> list[dict[str, Any]]:
    _validate_language(problem_data, language)
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
def format_source(
    request: FormatRequest, session_id: Annotated[str, Depends(current_session)]
) -> dict[str, Any]:
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


def _attach_tamper_warnings(summary: dict[str, Any], slug: str, language: str, code: str) -> None:
    """Flag (never gate) submissions that inspect or patch provided code."""
    try:
        assembly = _assembly_sources(slug, language)
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
                    raise HTTPException(status_code=400, detail=f"Missing testcase argument: {error.args[0]}") from error
            elif invocation_type == "shell" and isinstance(custom_input, dict) and len(custom_input) == 1:
                wire_input = next(iter(custom_input.values()))
            else:
                wire_input = custom_input
            matched = next((case for case in canonical if case["input"] == wire_input), None)
            if matched is None:
                # Custom cases execute without an assertion; their actual value is returned.
                cases.append({"name": f"Custom case {index + 1}", "input": wire_input, "expected": None, "custom": True})
            else:
                cases.append(matched)

    results = _run_judge(problem_data, request.language, request.code, cases, len(cases), bundle)
    for case, result in zip(cases, results, strict=True):
        if case.get("custom") and result["status"] in {"wrong_answer", "accepted"}:
            result["status"] = "completed"
            result.pop("expected", None)
    summary = _summarize(results)
    _attach_tamper_warnings(summary, problem_data["slug"], request.language, request.code)
    return summary


def _reference_runtime_ms(
    request: SubmitRequest,
    problem_data: dict[str, Any],
    cases: list[dict[str, Any]],
    public_count: int,
    accepted: bool,
    bundle: Path,
) -> int | None:
    """Run the bundle's designated reference solution, return its runtime.

    A hardware-independent baseline: both runs share the same container,
    executor calibration, and cases, so the ratio of the user's total to this
    total is meaningful even though absolute times vary by host. Exactly one
    reference program runs — problem.json's 'reference_solution' designates
    the optimal approach (the one the worst-to-best guide ends with), so a
    three-solution problem judges two programs per accepted submission, not
    four. Best-effort — an absent reference, unavailable runner, or failing
    reference simply yields None and the UI omits the comparison."""
    if not accepted:
        return None
    try:
        reference = load_designated_reference(request.slug, request.language, path=bundle)
    except (ProblemError, OSError):
        return None
    if reference is None:
        return None
    try:
        results = _run_judge(problem_data, request.language, reference, cases, public_count, bundle)
    except HTTPException:
        return None
    if any(result["status"] not in {"accepted", "completed"} for result in results):
        return None
    return sum(result.get("runtime_ms", result.get("_runtime_ms", 0)) for result in results)


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

    # Capture the storage scope before judging: a session that idle-expires
    # mid-judge still keeps its submission under the scope it ran under.
    scope = scope_key(session_id)
    results = _run_judge(problem_data, request.language, request.code, cases, public_count, bundle)
    summary = _summarize(results)
    _attach_tamper_warnings(summary, problem_data["slug"], request.language, request.code)
    summary["reference_runtime_ms"] = _reference_runtime_ms(
        request, problem_data, cases, public_count, summary["status"] == "accepted", bundle
    )
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
    )
    summary["submission_id"] = submission_id
    return summary


def _summarize(results: list[dict[str, Any]]) -> dict[str, Any]:
    passed = sum(result["status"] in {"accepted", "completed"} for result in results)
    runtime_ms = sum(result.get("runtime_ms", result.get("_runtime_ms", 0)) for result in results)
    for result in results:
        result.pop("_runtime_ms", None)
    status = "accepted" if passed == len(results) else next(
        (result["status"] for result in results if result["status"] not in {"accepted", "completed"}),
        "wrong_answer",
    )
    return {
        "status": status,
        "passed": passed,
        "total": len(results),
        "runtime_ms": runtime_ms,
        "results": results,
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
