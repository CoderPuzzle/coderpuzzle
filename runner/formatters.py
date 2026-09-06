"""Source formatting for the editor's Format button, the authoring CLI,
and CI — the single owner of every formatter pin.

The runner already carries every language toolchain, so it is also the only
place the real formatters can live. The problems repo formats its files
through this module too (a thin loader shim in its scripts/), which is
what keeps editor, generator, CLI, and CI byte-identical. All widths and
styles are passed on the command line from this module — the problems
bank deliberately carries no formatter configs of its own.

Formatting is pure text in, text out: no user code is executed, so this runs
directly rather than through the sandboxes the judge uses.
"""

from __future__ import annotations

import json
import re
import shutil
import subprocess
from pathlib import Path

FORMAT_TIMEOUT_SECONDS = 20
WIDTH = "120"


# Prettier v3 resolves plugins as ESM relative to the working directory, which
# the runner has none of, so the java plugin is named by absolute path rather
# than left to NODE_PATH (which ESM import ignores). The ESM entry point
# itself, not the package directory: directory imports are not resolvable
# under ESM. The image installs globally; a host checkout may instead have
# prettier in a node_modules beside this module, so both are probed.
def _prettier_java_plugin() -> str:
    image_path = "/usr/local/lib/node_modules/prettier-plugin-java/dist/index.mjs"
    if Path(image_path).is_file():
        return image_path
    executable = shutil.which("prettier")
    if executable:
        # a node_modules install: .bin/prettier -> ../prettier/bin/prettier.cjs,
        # so the package root is three parents up from the resolved entry point
        node_modules = Path(executable).resolve().parent.parent.parent
        sibling = node_modules / "prettier-plugin-java" / "dist" / "index.mjs"
        if sibling.is_file():
            return str(sibling)
    return image_path


_PRETTIER = ["prettier", "--print-width", WIDTH, "--tab-width", "4", "--parser"]

_CLANG_STYLE = "{BasedOnStyle: LLVM, IndentWidth: 4, ColumnLimit: " + WIDTH + "}"

_COMMANDS: dict[str, list[str]] = {
    "python3": ["ruff", "format", "--line-length", WIDTH, "-"],
    "go": ["gofmt"],
    "rust": ["rustfmt", "--edition", "2021", "--config", f"max_width={WIDTH}", "--emit", "stdout"],
    "cpp": ["clang-format", f"--style={_CLANG_STYLE}", "--assume-filename=solution.cpp"],
    "java": [*_PRETTIER, "java"],  # --plugin appended lazily in format_source
    "typescript": [*_PRETTIER, "typescript"],
    "javascript": [*_PRETTIER, "babel"],
    "markdown": [*_PRETTIER, "markdown", "--prose-wrap", "preserve"],
    # sql-formatter rather than prettier, matching how the problems repo
    # formats bundle SQL (`openoj-problems/scripts/format.py`).
    "sql": [
        "node",
        "-e",
        "const { format } = require('sql-formatter');"
        "process.stdout.write(format(require('fs').readFileSync(0, 'utf8'), { language: 'sqlite' }))",
    ],
    "shell": ["shfmt", "-ln", "bash", "-i", "4"],
}


class FormatError(RuntimeError):
    """A formatter refused the source, or is not installed."""


_GO_PACKAGE = re.compile(r"^\s*package\s+\w", re.MULTILINE)
_GO_PREAMBLE = "package openoj\n"


def _wrap_go(code: str) -> tuple[str, bool]:
    """Give Go source a package clause if it has none.

    Solutions and starters are fragments -- a bare `import` and `func`, with
    the package supplied by the executor's wrapper -- and gofmt parses whole
    files only, so without this every Go source fails to format.
    """
    if _GO_PACKAGE.search(code):
        return code, False
    return _GO_PREAMBLE + code, True


def _unwrap_go(formatted: str) -> str:
    body = formatted[len(_GO_PREAMBLE) :] if formatted.startswith(_GO_PREAMBLE) else formatted
    # gofmt puts a blank line after the package clause that the fragment,
    # having never had a package clause, should not inherit.
    return body[1:] if body.startswith("\n") else body


def _format_json(code: str) -> str:
    # Canonical JSON: 2-space indent, ensure_ascii=False, trailing newline —
    # the form the problems repo has always committed its JSON in. Sorting
    # keys would churn every committed file; key order is authorial.
    return json.dumps(json.loads(code), indent=2, ensure_ascii=False) + "\n"


def formattable_languages() -> tuple[str, ...]:
    return tuple(sorted(_COMMANDS))


def format_source(language: str, code: str) -> str:
    """Return `code` formatted for `language`.

    Raises FormatError when the language has no formatter, the tool is
    missing from the image, or the source does not parse — the caller turns
    that into a 4xx, because an unformattable draft is the user's to fix and
    not a judge failure.
    """
    if language == "json":
        try:
            return _format_json(code)
        except json.JSONDecodeError as error:
            raise FormatError(f"Invalid JSON: {error.msg}") from error
    command = _COMMANDS.get(language)
    if command is None:
        raise FormatError(f"No formatter is installed for {language!r}")
    if language == "java":
        command = [*command, "--plugin", _prettier_java_plugin()]
    if shutil.which(command[0]) is None:
        raise FormatError(f"The {command[0]} formatter is unavailable")
    source, wrapped = _wrap_go(code) if language == "go" else (code, False)
    try:
        completed = subprocess.run(
            command,
            input=source,
            capture_output=True,
            text=True,
            timeout=FORMAT_TIMEOUT_SECONDS,
            check=False,
        )
    except subprocess.TimeoutExpired as error:
        raise FormatError("Formatting timed out") from error
    if completed.returncode != 0:
        # Formatters report a parse error on stderr; the first line of it is
        # what the user needs and the rest is tool noise.
        detail = (completed.stderr or "").strip().splitlines()
        raise FormatError(detail[0] if detail else "The source could not be formatted")
    if not completed.stdout:
        raise FormatError("The formatter returned nothing")
    return _unwrap_go(completed.stdout) if wrapped else completed.stdout


def format_source_report(language: str, code: str) -> dict:
    """Non-raising tri-state around format_source.

    Returns one of:
      {"status": "formatted"}                     — already conforming
      {"status": "unformatted", "formatted": str} — parses; formatted text
      {"status": "error", "diagnostics": str}     — refused (parse error,
                                                    missing tool, timeout)
    """
    try:
        formatted = format_source(language, code)
    except FormatError as error:
        return {"status": "error", "diagnostics": str(error)}
    if formatted == code:
        return {"status": "formatted"}
    return {"status": "unformatted", "formatted": formatted}
