"""Fetch the configured problem set into the shared cache, then exit.

Run as the one-shot `problems-fetcher` compose service: it is the only
component with network access to git, and it populates the problems_cache
volume before the (networkless) API container starts. A no-op when
CODERPUZZLE_PROBLEMS is unset or points at a local path.
"""
import os
import sys
from pathlib import Path

from .problem_source import LocalSource, parse_spec, resolve_spec


def main() -> int:
    spec = os.environ.get("CODERPUZZLE_PROBLEMS", "").strip()
    if not spec:
        print("fetch_problems: no CODERPUZZLE_PROBLEMS configured; using the mounted problem set")
        return 0
    if isinstance(parse_spec(spec), LocalSource):
        print(f"fetch_problems: {spec!r} is a local path; nothing to fetch")
        return 0
    cache = Path(os.environ.get("CODERPUZZLE_PROBLEMS_CACHE", "/cache/problems"))
    resolved = resolve_spec(spec, cache, update=True)
    print(f"fetch_problems: {spec!r} ready at {resolved}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
