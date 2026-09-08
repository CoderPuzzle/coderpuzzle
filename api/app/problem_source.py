"""Resolve the problem-set source specification.

``OPENOJ_PROBLEMS`` selects where problem packages come from:

    owner/name[@ref]        a GitHub repository, e.g. CoderPuzzle/coderpuzzle-problems
    https://host/…[#ref]    a full https git URL (or http on a trusted network)
    git@host:owner/name     an SSH git URL
    /abs/path               a local directory (absolute)
    ./rel  ../rel           a local directory (explicitly relative)
    ~/rel                   a local directory (home-relative)
    file:///abs/path        a local directory (URL form)

Disambiguation follows the git convention: a bare two-segment ``owner/name``
ALWAYS means GitHub. A local directory that happens to have that shape must
be referenced explicitly (``./name/repo``, ``/srv/name/repo``, ``file://…``)
and never shadows the shorthand. ``@ref`` after the shorthand (or ``#ref``
after a URL) pins a branch or tag; without it the remote's default branch is
used.

Remote sources are cloned shallowly into a writable cache directory
(``OPENOJ_PROBLEMS_CACHE``, default ``/cache/problems``) at startup and
updated on every start: fetch the pinned ref (or default ``HEAD``), then
hard-reset the working tree, so the cache always converges to the remote.
Local sources are used in place. In both cases, if the resolved repository
contains a ``problems/`` subdirectory it is used as the package root,
otherwise the repository root itself is.
"""

import os
import re
import shutil
import subprocess
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import unquote, urlparse

OWNER_SEGMENT = re.compile(r"^[A-Za-z0-9][A-Za-z0-9_.-]*$")
REF = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._/-]*[A-Za-z0-9]$")
CACHE_KEY = re.compile(r"[^A-Za-z0-9_.-]")


class ProblemSourceError(ValueError):
    pass


@dataclass(frozen=True)
class RemoteSource:
    url: str
    ref: str | None
    cache_key: str


@dataclass(frozen=True)
class LocalSource:
    path: Path


def parse_spec(spec: str) -> RemoteSource | LocalSource:
    spec = spec.strip()
    if not spec:
        raise ProblemSourceError("Problem-set spec is empty")
    if spec.startswith("file://"):
        return LocalSource(Path(unquote(spec[len("file://") :])).expanduser())
    if spec.startswith("/") or spec.startswith(("./", "../")) or spec in ("~",) or spec.startswith("~/"):
        return LocalSource(Path(spec).expanduser())

    if spec.startswith("git@"):
        url, _, fragment_ref = spec.partition("#")
        host, _, tail = url[4:].partition(":")
        segments = [segment for segment in tail.split("/") if segment]
        if not host or len(segments) < 2:
            raise ProblemSourceError(f"Problem-set spec {spec!r} is not a valid SSH git URL")
        return RemoteSource(
            url=url,
            ref=fragment_ref or None,
            cache_key=_cache_key(host, segments[:2]),
        )
    if "://" in spec:
        url, _, fragment_ref = spec.partition("#")
        parsed = urlparse(url)
        if parsed.scheme not in ("http", "https") or not parsed.hostname or not parsed.path:
            raise ProblemSourceError(f"Problem-set spec {spec!r} is not a valid git URL")
        segments = [segment for segment in parsed.path.strip("/").split("/") if segment]
        return RemoteSource(
            url=url,
            ref=fragment_ref or None,
            cache_key=_cache_key(parsed.hostname, segments[:2]),
        )

    # GitHub shorthand: owner/name[@ref]; refs may contain "/" (release/v2),
    # so split at the first "@" — owner and name cannot contain "@".
    body, _, ref = spec.partition("@")
    segments = body.split("/")
    if len(segments) == 2 and OWNER_SEGMENT.fullmatch(segments[0]) and OWNER_SEGMENT.fullmatch(segments[1]):
        if ref and REF.fullmatch(ref) is None:
            raise ProblemSourceError(f"Invalid ref {ref!r} in problem-set spec {spec!r}")
        return RemoteSource(
            url=f"https://github.com/{segments[0]}/{segments[1]}.git",
            ref=ref or None,
            cache_key=_cache_key("github.com", segments),
        )
    raise ProblemSourceError(
        f"Problem-set spec {spec!r} must be a GitHub shorthand (owner/name[@ref]), "
        "a full https:// or git@ git URL, or an explicit local path "
        "(/abs, ./rel, ../rel, ~/rel, file://…)"
    )


def _cache_key(host: str, segments: list[str]) -> str:
    parts = [host.split(".")[0], *segments]
    if parts and parts[-1].endswith(".git"):
        parts[-1] = parts[-1][: -len(".git")]
    return "__".join(CACHE_KEY.sub("-", part) for part in parts if part)


def _git(arguments: list[str]) -> None:
    environment = {**os.environ, "GIT_TERMINAL_PROMPT": "0"}
    completed = subprocess.run(arguments, capture_output=True, text=True, env=environment, timeout=300)
    if completed.returncode != 0:
        detail = (completed.stderr or completed.stdout).strip().splitlines()[-1:] or ["unknown git error"]
        raise ProblemSourceError(f"git {' '.join(arguments[:2])} failed: {detail[0]}")


def problem_root(repository: Path) -> Path:
    nested = repository / "problems"
    return nested if nested.is_dir() else repository


def _recorded_commit(target: Path) -> str | None:
    marker = target / ".openoj-commit"
    if marker.is_file():
        return marker.read_text(encoding="utf-8").strip() or None
    return None


def _remote_commit(source: RemoteSource) -> str | None:
    """The remote's current hash for the pinned ref (or its default HEAD),
    without touching the local cache. One cheap ls-remote call."""
    try:
        completed = subprocess.run(
            ["git", "ls-remote", source.url, source.ref or "HEAD"],
            capture_output=True, text=True, timeout=60,
            env={**os.environ, "GIT_TERMINAL_PROMPT": "0"},
        )
    except subprocess.SubprocessError:
        return None
    if completed.returncode != 0:
        return None
    for line in completed.stdout.splitlines():
        hash_, _, _ = line.partition("\t")
        if re.fullmatch(r"[0-9a-f]{40}", hash_.strip()):
            return hash_.strip()
    return None


def _record_commit(target: Path, commit: str) -> None:
    (target / ".openoj-commit").write_text(commit + "\n", encoding="utf-8")


def resolve_spec(spec: str, cache_dir: Path | None = None, update: bool = True) -> Path:
    source = parse_spec(spec)
    if isinstance(source, LocalSource):
        # local paths are consumed in place: bind mounts update in realtime,
        # so there is nothing to cache or refresh
        if not source.path.is_dir():
            raise ProblemSourceError(f"Local problem set {str(source.path)!r} is not a directory")
        return problem_root(source.path)

    if cache_dir is None:
        raise ProblemSourceError("Remote problem sets require a writable cache directory (OPENOJ_PROBLEMS_CACHE)")
    target = cache_dir / source.cache_key
    if not update:
        # read-only resolution: the problems-fetcher service prepared the
        # cache; the API container has no network and never runs git itself
        if not (target / ".git").is_dir():
            raise ProblemSourceError(
                f"Problem set {spec!r} is not in the cache; the problems-fetcher service must run first"
            )
        return problem_root(target)
    try:
        cache_dir.mkdir(parents=True, exist_ok=True)
    except OSError as error:
        raise ProblemSourceError(f"Problem-set cache {str(cache_dir)!r} is not writable: {error}") from error
    if (target / ".git").is_dir():
        # refresh only when the remote actually moved: compare the recorded
        # commit with the remote's current hash for the pinned ref; an
        # unreachable remote (offline start) keeps the cached revision
        remote = _remote_commit(source)
        recorded = _recorded_commit(target)
        if remote is not None and recorded == remote:
            return problem_root(target)
        if remote is None and recorded is not None:
            return problem_root(target)
        _git(["git", "-C", str(target), "fetch", "--depth", "1", "--quiet", "origin", source.ref or "HEAD"])
        _git(["git", "-C", str(target), "reset", "--hard", "--quiet", "FETCH_HEAD"])
        _git(["git", "-C", str(target), "clean", "-fdq"])
        head = subprocess.run(
            ["git", "-C", str(target), "rev-parse", "HEAD"],
            capture_output=True, text=True, timeout=30,
            env={**os.environ, "GIT_TERMINAL_PROMPT": "0"},
        )
        if head.returncode == 0:
            _record_commit(target, head.stdout.strip())
    else:
        if target.exists():
            shutil.rmtree(target)
        clone = ["git", "clone", "--depth", "1", "--quiet"]
        if source.ref:
            clone += ["--branch", source.ref]
        _git(clone + [source.url, str(target)])
        head = subprocess.run(
            ["git", "-C", str(target), "rev-parse", "HEAD"],
            capture_output=True, text=True, timeout=30,
            env={**os.environ, "GIT_TERMINAL_PROMPT": "0"},
        )
        if head.returncode == 0:
            _record_commit(target, head.stdout.strip())
    return problem_root(target)
