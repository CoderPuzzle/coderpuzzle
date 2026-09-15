#!/usr/bin/env python3
"""Format (or --check) problem-repo files.

The formatter implementation and every tool pin live in ONE place: the
coderpuzzle runner image's `formatters.py` (see coderpuzzle/runner/formatters.py —
the editor's Format button and the `coderpuzzle format` CLI use the same
module). This file is only a loader: it imports that implementation from
wherever it is available so that generation (gen_starters), checking
(check.py), CI (inside the image), and the editor all format
byte-identically. There is deliberately no local toolchain here anymore.

Loader order:
  1. `$CODERPUZZLE_RUNNER_DIR/formatters.py` (an explicit coderpuzzle checkout);
  2. this script's own directory (when it runs from the image's
     own /runner checkout);
  3. the image's `/runner/formatters.py` (a problem checkout mounted
     into the coderpuzzle image — CI and local docker runs);
  4. this checkout's `runner/formatters.py`.

Usage:
  format.py [--check] [--tolerant] [<bundle-or-file> ...]   # default: all
--check  lists files that are not formatted and exits 1 (CI mode).
--tolerant skips a language when its tool is missing instead of failing.
"""

from __future__ import annotations

import argparse
import importlib.util
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def _load_formatters():
    candidates = []
    runner_dir = os.environ.get("CODERPUZZLE_RUNNER_DIR")
    if runner_dir:
        candidates.append(Path(runner_dir))
    here = Path(__file__).resolve().parent  # this checkout's loader dir
    candidates.append(here)
    # Inside the image a checkout is usually mounted somewhere else (CI,
    # docker runs); the image carries its own formatters at /runner.
    candidates.append(Path("/runner"))
    candidates.append(ROOT / "runner")
    for directory in candidates:
        module_path = directory / "formatters.py"
        if not module_path.is_file():
            continue
        spec = importlib.util.spec_from_file_location("coderpuzzle_formatters", module_path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        return module
    raise SystemExit(
        "formatters.py not found. Formatting is owned by the coderpuzzle runner image:\n"
        "  - run inside the image (docker run ghcr.io/coderpuzzle/coderpuzzle ...), or\n"
        "  - set CODERPUZZLE_RUNNER_DIR to a checkout of the coderpuzzle repo's runner/, or\n"
        "  - keep a sibling checkout of the coderpuzzle repo next to this one."
    )


_formatters = _load_formatters()

# The implementation resolves tools on PATH. Inside the image they are
# global; from a sibling checkout the tools live in this repo's
# node_modules/.bin (same pins the image was built from), so expose that
# before any formatting happens.
_extra_bin = ROOT / "scripts" / "problems-tooling" / "node_modules" / ".bin"
if _extra_bin.is_dir():
    os.environ["PATH"] = f"{_extra_bin}{os.pathsep}{os.environ.get('PATH', '')}"

EXTENSION_LANGUAGE = {
    "py": "python3",
    "go": "go",
    "rust": "rust",
    "rs": "rust",
    "cpp": "cpp",
    "js": "javascript",
    "ts": "typescript",
    "java": "java",
    "sql": "sql",
    "sh": "shell",
    "json": "json",
    "md": "markdown",
}

_missing: set[str] = set()


def format_content(extension: str, content: str, tolerant: bool = True) -> str:
    """Format one file's content; returns it unchanged when the tool for its
    language is unavailable and tolerant is set (generation-time behavior)."""
    language = EXTENSION_LANGUAGE.get(extension)
    if language is None:
        return content
    try:
        return _formatters.format_source(language, content)
    except _formatters.FormatError as error:
        if not tolerant:
            raise
        if extension not in _missing:
            _missing.add(extension)
            print(
                f"warning: {error} — leaving .{extension} files unformatted",
                file=sys.stderr,
            )
        return content


def _targets(arguments: list[str]) -> list[Path]:
    if arguments:
        return [Path(argument).resolve() for argument in arguments]
    # default: every formattable file under docs/FORMAT.md + the served
    # problem tree (the CI-gated set).
    files: list[Path] = [ROOT / "docs" / "FORMAT.md"]
    files += sorted((ROOT / "problems").rglob("*"))
    return [path for path in files if path.is_file()]


FORMATTABLE = set(EXTENSION_LANGUAGE)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="report unformatted files, change nothing")
    parser.add_argument("--tolerant", action="store_true", help="skip missing tools instead of failing")
    parser.add_argument("targets", nargs="*", help="bundles or files (default: everything)")
    arguments = parser.parse_args()

    unformatted = []
    formatted_count = 0
    for target in _targets(arguments.targets):
        files = sorted(target.rglob("*")) if target.is_dir() else [target]
        for path in files:
            if not path.is_file():
                continue
            extension = path.suffix.lstrip(".")
            if extension not in FORMATTABLE:
                continue
            content = path.read_text(encoding="utf-8")
            new_content = format_content(extension, content, tolerant=arguments.tolerant)
            if new_content != content:
                if arguments.check:
                    try:
                        unformatted.append(path.relative_to(ROOT))
                    except ValueError:
                        # a target outside the repo still gets reported
                        unformatted.append(path)
                else:
                    path.write_text(new_content, encoding="utf-8")
                    formatted_count += 1

    if arguments.check:
        for path in unformatted:
            print(f"UNFORMATTED {path}")
        print(f"format check: {len(unformatted)} unformatted files")
        raise SystemExit(1 if unformatted else 0)
    print(f"formatted {formatted_count} files" + (f" (skipped: {sorted(_missing)})" if _missing else ""))


if __name__ == "__main__":
    main()
