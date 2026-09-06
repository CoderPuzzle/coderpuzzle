import copy
import json
import os
import re
import time
from functools import lru_cache
from pathlib import Path
from typing import Any, Optional

from .problem_source import resolve_spec


def _problems_dir() -> Path:
    # OPENOJ_PROBLEMS selects the source (GitHub shorthand, git URL, or an
    # explicit local path — see problem_source); without it problems come
    # from OPENOJ_PROBLEMS_DIR as before.
    spec = os.environ.get("OPENOJ_PROBLEMS", "").strip()
    if spec:
        cache = os.environ.get("OPENOJ_PROBLEMS_CACHE", "").strip()
        # update=False: the API container has no network — the
        # problems-fetcher service populated the cache before startup
        return resolve_spec(spec, Path(cache) if cache else None, update=False).resolve()
    return Path(os.environ.get("OPENOJ_PROBLEMS_DIR", "problems")).resolve()


PROBLEMS_DIR = _problems_dir()
REQUIRED_SECTIONS = (
    "Metadata",
    "Description",
    "Hints",
    "Invocation",
    "Limits",
    "Languages",
    "Starters",
    "Test Cases",
)
HEADING = re.compile(r"^(?P<marks>#{1,6})[ \t]+(?P<title>.+?)[ \t]*$")
TITLE = re.compile(r"^(?P<id>[1-9][0-9]*)\.[ \t]+(?P<title>\S(?:.*\S)?)$")
SLUG = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
PROBLEM_FILE = re.compile(r"^(?P<number>[0-9]{4,})_(?P<slug>[a-z0-9]+(?:-[a-z0-9]+)*)\.md$")
FENCED_BLOCK = re.compile(
    r"```(?P<info>[^\n`]*)\n(?P<body>.*?)\n```[ \t]*",
    re.DOTALL,
)


class ProblemError(ValueError):
    pass


# Bundle format (one directory per problem: problem.json, cases.json,
# statement.md, starter.<ext>): language metadata comes from this registry
# and the set of starter.* files selects the languages. The flat single-file
# format above remains supported.
LANGUAGE_REGISTRY = {
    "python3": {"display_name": "Python 3", "monaco_language": "python", "version": "3.14.7"},
    "javascript": {"display_name": "JavaScript", "monaco_language": "javascript", "version": "Node 22.23.2"},
    "typescript": {
        "display_name": "TypeScript",
        "monaco_language": "typescript",
        "version": "TypeScript 5.7.3 / Node 22.23.2",
    },
    "java": {"display_name": "Java", "monaco_language": "java", "version": "JDK 21.0.12"},
    "cpp": {"display_name": "C++", "monaco_language": "cpp", "version": "G++ 14.2.0"},
    "go": {"display_name": "Go", "monaco_language": "go", "version": "Go 1.24.4"},
    "rust": {"display_name": "Rust", "monaco_language": "rust", "version": "Rust 1.85.0"},
    "sql": {"display_name": "SQL", "monaco_language": "sql", "version": "SQLite 3.45"},
    "shell": {"display_name": "Shell", "monaco_language": "shell", "version": "Bash 5.2"},
}
EXTENSION_LANGUAGE = {
    "py": "python3",
    "js": "javascript",
    "ts": "typescript",
    "java": "java",
    "cpp": "cpp",
    "go": "go",
    "rs": "rust",
    "sql": "sql",
    "sh": "shell",
}
PROBLEM_BUNDLE_DIR = re.compile(r"^(?P<number>[0-9]{4,})_(?P<slug>[a-z0-9]+(?:-[a-z0-9]+)*)$")
# Bundles live in id-range shards — problems/0001-0100/0001_two-sum/ —
# with the flat layout (problems/0001_two-sum/) still accepted.
SHARD_DIR = re.compile(r"^[0-9]{4,}-[0-9]{4,}$")
LANGUAGE_EXTENSION = {extension: language for language, extension in EXTENSION_LANGUAGE.items()}


def _iter_problem_paths(root: Path) -> list[Path]:
    """Every candidate bundle path under root: flat children first, then
    children of shard subdirectories (one level down, nothing deeper)."""
    candidates: list[Path] = []
    for child in sorted(root.iterdir()):
        if SHARD_DIR.fullmatch(child.name) is not None and child.is_dir():
            candidates.extend(sorted(child.iterdir()))
        else:
            candidates.append(child)
    return candidates


def _is_direct_child(path: Path) -> bool:
    """The resolved path sits in the tree root (flat layout) or exactly one
    shard below it — anything deeper is not a problem package."""
    parent = path.parent
    return parent == PROBLEMS_DIR or (parent.parent == PROBLEMS_DIR and SHARD_DIR.fullmatch(parent.name) is not None)


def _headings(markdown: str) -> list[tuple[int, str, int]]:
    headings = []
    in_fence = False
    for line_number, line in enumerate(markdown.splitlines(keepends=True)):
        stripped = line.lstrip()
        if stripped.startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        match = HEADING.match(line.rstrip("\r\n"))
        if match:
            headings.append((len(match.group("marks")), match.group("title"), line_number))
    if in_fence:
        raise ProblemError("Markdown contains an unclosed fenced block")
    return headings


def _schema_sections(markdown: str) -> tuple[int, str, dict[str, str]]:
    lines = markdown.splitlines(keepends=True)
    headings = _headings(markdown)
    first_content = next(
        (index for index, line in enumerate(lines) if line.strip()),
        None,
    )
    h1 = [heading for heading in headings if heading[0] == 1]
    if len(h1) != 1 or first_content is None or h1[0][2] != first_content:
        raise ProblemError("Problem Markdown must begin with exactly one level-one title")
    title_match = TITLE.fullmatch(h1[0][1])
    if title_match is None:
        raise ProblemError("The title must use '# <positive id>. <title>'")

    h2 = [heading for heading in headings if heading[0] == 2]
    section_names = tuple(heading[1] for heading in h2)
    if section_names != REQUIRED_SECTIONS:
        expected = ", ".join(f"## {name}" for name in REQUIRED_SECTIONS)
        raise ProblemError(f"Required level-two headings must be exactly: {expected}")

    sections = {}
    for index, (_, name, line_number) in enumerate(h2):
        end = h2[index + 1][2] if index + 1 < len(h2) else len(lines)
        sections[name] = "".join(lines[line_number + 1 : end]).strip("\n")
    return int(title_match.group("id")), title_match.group("title"), sections


def _fenced_payload(section: str, heading: str, info: Optional[str] = None) -> tuple[str, str]:
    match = FENCED_BLOCK.fullmatch(section.strip())
    if match is None:
        raise ProblemError(f"## {heading} must contain exactly one fenced block")
    block_info = match.group("info").strip()
    if info is not None and block_info != info:
        raise ProblemError(f"## {heading} must use a {info!r} fenced block")
    return block_info, match.group("body")


def _json_value(section: str, heading: str) -> Any:
    _, payload = _fenced_payload(section, heading, "json")
    try:
        return json.loads(payload)
    except json.JSONDecodeError as error:
        raise ProblemError(f"## {heading} contains invalid JSON: {error.msg}") from error


def _json_object(section: str, heading: str) -> dict[str, Any]:
    value = _json_value(section, heading)
    if not isinstance(value, dict):
        raise ProblemError(f"## {heading} must contain a JSON object")
    return value


def _json_array(section: str, heading: str) -> list[Any]:
    value = _json_value(section, heading)
    if not isinstance(value, list):
        raise ProblemError(f"## {heading} must contain a JSON array")
    return value


def _subsections(section: str, parent: str) -> list[tuple[str, str]]:
    lines = section.splitlines(keepends=True)
    headings = _headings(section)
    if any(level != 3 for level, _, _ in headings):
        raise ProblemError(f"## {parent} may contain only level-three child headings")
    if not headings:
        raise ProblemError(f"## {parent} must contain level-three child headings")
    if "".join(lines[: headings[0][2]]).strip():
        raise ProblemError(f"## {parent} cannot contain text before its first child heading")

    result = []
    for index, (_, title, line_number) in enumerate(headings):
        end = headings[index + 1][2] if index + 1 < len(headings) else len(lines)
        result.append((title, "".join(lines[line_number + 1 : end]).strip("\n")))
    titles = [title for title, _ in result]
    if len(titles) != len(set(titles)):
        raise ProblemError(f"## {parent} contains a duplicate child heading")
    return result


def _require_exact_keys(value: dict[str, Any], keys: set[str], heading: str) -> None:
    if set(value) != keys:
        raise ProblemError(f"## {heading} must contain exactly: {', '.join(sorted(keys))}")


def _validate_limits(limits: Any, heading: str) -> None:
    """Every problem carries the three resource limits; a concurrency
    problem additionally declares `threads`, the number of threads its
    schedule spawns (the runner raises the process cap by that much)."""
    if not isinstance(limits, dict):
        raise ProblemError(f"## {heading} must be an object")
    required = {"time_ms", "memory_mb", "output_kb"}
    if not required <= set(limits) or not set(limits) <= required | {"threads"}:
        raise ProblemError(f"## {heading} must contain exactly: {', '.join(sorted(required))} (plus optional threads)")
    if not all(isinstance(value, int) and value > 0 for value in limits.values()):
        raise ProblemError("Limits values must be positive integers")


def _validate_cases(value: list[Any], heading: str) -> list[dict[str, Any]]:
    cases = []
    for index, case in enumerate(value, start=1):
        if not isinstance(case, dict) or set(case) != {"input", "expected"}:
            raise ProblemError(f"{heading} testcase {index} must contain exactly 'input' and 'expected'")
        cases.append(case)
    return cases


def parse_problem_markdown(
    markdown: str,
    source_path: Optional[Path] = None,
) -> tuple[dict[str, Any], list[dict[str, Any]], int]:
    """Parse one complete problem document using the required heading schema."""
    problem_id, title, sections = _schema_sections(markdown)

    metadata = _json_object(sections["Metadata"], "Metadata")
    _require_exact_keys(
        metadata,
        {"schema_version", "slug", "difficulty", "tags"},
        "Metadata",
    )
    if metadata["schema_version"] != 1:
        raise ProblemError("Unsupported problem Markdown schema version")
    slug = metadata["slug"]
    if not isinstance(slug, str) or SLUG.fullmatch(slug) is None:
        raise ProblemError("Metadata slug must be lowercase kebab-case")
    if not isinstance(metadata["difficulty"], str) or not metadata["difficulty"]:
        raise ProblemError("Metadata difficulty must be a non-empty string")
    if not isinstance(metadata["tags"], list) or not all(isinstance(tag, str) and tag for tag in metadata["tags"]):
        raise ProblemError("Metadata tags must be an array of non-empty strings")

    if source_path is not None:
        filename = PROBLEM_FILE.fullmatch(source_path.name)
        if filename is None:
            raise ProblemError("Problem filename must use '<zero-padded id>_<slug>.md'")
        if filename.group("slug") != slug or int(filename.group("number")) != problem_id:
            raise ProblemError("Problem filename id and slug must match its document data")

    description = sections["Description"].strip()
    if not description:
        raise ProblemError("## Description cannot be empty")

    hints = _json_array(sections["Hints"], "Hints")
    if not all(isinstance(hint, str) and hint for hint in hints):
        raise ProblemError("## Hints must contain only non-empty strings")

    invocation = _json_object(sections["Invocation"], "Invocation")
    limits = _json_object(sections["Limits"], "Limits")
    _validate_limits(limits, "Limits")

    languages = _json_object(sections["Languages"], "Languages")
    if not languages:
        raise ProblemError("## Languages cannot be empty")
    language_keys = {"display_name", "monaco_language", "version", "enabled"}
    for language, config in languages.items():
        if not isinstance(language, str) or SLUG.fullmatch(language) is None:
            raise ProblemError("Language keys must be lowercase identifiers")
        if not isinstance(config, dict):
            raise ProblemError(f"Language {language!r} configuration must be an object")
        _require_exact_keys(config, language_keys, f"Languages/{language}")
        if not all(
            isinstance(config[key], str) and config[key] for key in ("display_name", "monaco_language", "version")
        ) or not isinstance(config["enabled"], bool):
            raise ProblemError(f"Language {language!r} has invalid configuration values")

    starter_sections = _subsections(sections["Starters"], "Starters")
    starter_names = [name for name, _ in starter_sections]
    if starter_names != list(languages):
        raise ProblemError("### starter headings must match ## Languages keys and order")
    for language, starter_section in starter_sections:
        _, starter = _fenced_payload(starter_section, f"Starters/{language}")
        if not starter.strip():
            raise ProblemError(f"Starter for {language!r} cannot be empty")
        languages[language]["starter"] = starter.rstrip("\n") + "\n"

    testcase_sections = _subsections(sections["Test Cases"], "Test Cases")
    if [name for name, _ in testcase_sections] != ["Public", "Hidden"]:
        raise ProblemError("## Test Cases requires ordered ### Public and ### Hidden headings")
    public = _validate_cases(
        _json_array(testcase_sections[0][1], "Test Cases/Public"),
        "Public",
    )
    hidden = _validate_cases(
        _json_array(testcase_sections[1][1], "Test Cases/Hidden"),
        "Hidden",
    )
    if not public:
        raise ProblemError("At least one public testcase is required")

    problem = {
        "schema_version": metadata["schema_version"],
        "id": problem_id,
        "slug": slug,
        "title": title,
        "difficulty": metadata["difficulty"],
        "tags": metadata["tags"],
        "description": description + "\n",
        "hints": hints,
        "invocation": invocation,
        "limits": limits,
        "languages": languages,
    }
    return problem, public + hidden, len(public)


def _level3_sections(text: str) -> list[tuple[str, str]]:
    """Split a statement section into its level-three child sections,
    tolerating prose before the first child."""
    lines = text.splitlines(keepends=True)
    headings = [(level, title, line) for level, title, line in _headings(text) if level == 3]
    sections = []
    for index, (_, title, line_number) in enumerate(headings):
        end = headings[index + 1][2] if index + 1 < len(headings) else len(lines)
        sections.append((title, "".join(lines[line_number + 1 : end]).strip("\n")))
    return sections


def _numbered_subheadings(text: str, heading: str, parent: str) -> tuple[list[str], list[str]]:
    """Return (all child names, bodies of the consecutively numbered
    '<heading> N' children)."""
    sections = _level3_sections(text)
    names = [name for name, _ in sections]
    expected = 1
    bodies = []
    for name, body in sections:
        if name == f"{heading} {expected}":
            if not body.strip():
                raise ProblemError(f"### {heading} {expected} under {parent} cannot be empty")
            bodies.append(body.strip())
            expected += 1
    if not bodies:
        raise ProblemError(f"{parent} requires at least one ### {heading} heading")
    return names, bodies


def parse_problem_bundle(path: Path) -> tuple[dict[str, Any], list[dict[str, Any]], int]:
    """Parse one problem bundle directory (problem.json, cases.json,
    statement.md, starter.*)."""
    matched = PROBLEM_BUNDLE_DIR.fullmatch(path.name)
    if matched is None:
        raise ProblemError("Problem bundle directory must use '<zero-padded id>_<slug>'")

    def _read_json(name: str) -> Any:
        file_path = path / name
        if not file_path.is_file():
            raise ProblemError(f"Problem bundle is missing {name}")
        return json.loads(file_path.read_text(encoding="utf-8"))

    problem_data = _read_json("problem.json")
    if not isinstance(problem_data, dict):
        raise ProblemError("problem.json must contain an object")
    _require_exact_keys(
        problem_data,
        {
            "schema_version",
            "reference_solution",
            "id",
            "slug",
            "title",
            "difficulty",
            "tags",
            "topics",
            "type",
            "invocation",
            "limits",
        },
        "problem.json",
    )
    if problem_data["schema_version"] != 2:
        raise ProblemError("Unsupported problem bundle schema version")
    # The designated time-cost reference: "" names the canonical solution.*,
    # a variant slug names solution_<variant>.* — always the optimal
    # approach, the one the worst-to-best guide ends with.
    designated = problem_data["reference_solution"]
    if not isinstance(designated, str):
        raise ProblemError("problem.json reference_solution must be a string")
    solution_names = [member.name for member in path.iterdir() if member.is_file()]
    if designated:
        if re.fullmatch(r"[a-z0-9]+(?:_[a-z0-9]+)*", designated) is None or not any(
            name.startswith(f"solution_{designated}.") for name in solution_names
        ):
            raise ProblemError("problem.json reference_solution names no solution_<variant>.* file in this bundle")
    elif not any(name.startswith("solution.") for name in solution_names):
        raise ProblemError(
            "problem.json reference_solution is empty but the bundle carries no canonical solution.* files"
        )
    if problem_data["id"] != int(matched.group("number")) or problem_data["slug"] != matched.group("slug"):
        raise ProblemError("Bundle directory name must match problem.json id and slug")
    if not isinstance(problem_data["title"], str) or not problem_data["title"].strip():
        raise ProblemError("problem.json title must be a non-empty string")
    if not isinstance(problem_data["difficulty"], str):
        raise ProblemError("problem.json difficulty must be a string")
    # The difficulty mirrors the original source difficulty (Easy/Medium/
    # Hard) — the API only requires a string; the bank's check.py enforces
    # the vocabulary.
    if not isinstance(problem_data["tags"], list) or not all(
        isinstance(tag, str) and tag for tag in problem_data["tags"]
    ):
        raise ProblemError("problem.json tags must be an array of non-empty strings")
    if not isinstance(problem_data["topics"], list) or not all(
        isinstance(topic, str) and topic for topic in problem_data["topics"]
    ):
        raise ProblemError("problem.json topics must be an array of non-empty strings")
    if problem_data["type"] not in {"Algorithms", "Database", "Shell"}:
        raise ProblemError("problem.json type must be one of Algorithms, Database, Shell")
    invocation = problem_data["invocation"]
    if not isinstance(invocation, dict) or not invocation:
        raise ProblemError("problem.json invocation must be an object")
    limits = problem_data["limits"]
    _validate_limits(limits, "Limits")

    # statement.md: '# Title', '## Description' (with ### Example N and
    # ### Constraints), optional '## Hints' with ### Hint N.
    statement_path = path / "statement.md"
    if not statement_path.is_file():
        raise ProblemError("Problem bundle is missing statement.md")
    statement = statement_path.read_text(encoding="utf-8")
    statement_headings = _headings(statement)
    top = [(level, title, line) for level, title, line in statement_headings if level <= 2]
    if not top or top[0][0] != 1:
        raise ProblemError("statement.md must start with a '# <Title>' heading")
    if top[0][1].strip() != problem_data["title"].strip():
        raise ProblemError("statement.md title must match problem.json")
    section_names = [title for level, title, _ in top[1:] if level == 2]
    if section_names != ["Description"]:
        if section_names == ["Description", "Hints"]:
            pass
        else:
            raise ProblemError("statement.md requires '## Description' followed by optional '## Hints'")
    description_lines = statement.splitlines(keepends=True)
    description_start = top[1][2] + 1
    description_end = top[2][2] if len(top) > 2 else len(description_lines)
    description = "".join(description_lines[description_start:description_end]).strip("\n")
    if not description.strip():
        raise ProblemError("## Description cannot be empty")
    names, examples = _numbered_subheadings(description, "Example", "Description")
    # SQL problems state their contract as the schema DDL, not prose limits
    if "Constraints" not in names and invocation.get("type", "function") != "sql":
        raise ProblemError("## Description requires ### Constraints")
    hints: list[str] = []
    if len(top) > 2:
        hints_lines = description_lines[top[2][2] + 1 :]
        _, hints = _numbered_subheadings("".join(hints_lines), "Hint", "Hints")

    # cases.json: public = statement examples, hidden = the rest (display
    # grouping only; all case data is public by design).
    cases_data = _read_json("cases.json")
    if not isinstance(cases_data, dict) or set(cases_data) != {"public", "hidden"}:
        raise ProblemError("cases.json must contain exactly 'public' and 'hidden'")
    public = _validate_cases(cases_data["public"], "Public")
    hidden = _validate_cases(cases_data["hidden"], "Hidden")
    if not public:
        raise ProblemError("At least one public testcase is required")
    if len(public) != len(examples):
        raise ProblemError("Public cases must correspond one-to-one with statement examples")

    # starter.* files select the languages
    languages: dict[str, Any] = {}
    for starter_path in sorted(path.glob("starter.*")):
        extension = starter_path.name[len("starter.") :]
        language = EXTENSION_LANGUAGE.get(extension)
        if language is None:
            raise ProblemError(f"Unknown starter extension {extension!r}")
        starter = starter_path.read_text(encoding="utf-8")
        if not starter.strip():
            raise ProblemError(f"Starter for {language!r} cannot be empty")
        languages[language] = {
            **LANGUAGE_REGISTRY[language],
            "enabled": True,
            "starter": starter.rstrip("\n") + "\n",
        }
    # One canonical language order everywhere (dropdowns, Solutions blocks):
    # Python 3, Java, C++, Go, TypeScript, JavaScript, Rust, Shell, then
    # anything else in first-seen order.
    priority = ["python3", "java", "cpp", "go", "typescript", "javascript", "rust", "shell"]
    ordered = [key for key in priority if key in languages]
    ordered += [key for key in languages if key not in priority]
    languages = {key: languages[key] for key in ordered}
    if not languages:
        raise ProblemError("Problem bundle needs at least one starter.* file")

    problem = {
        "schema_version": problem_data["schema_version"],
        "id": problem_data["id"],
        "slug": problem_data["slug"],
        "title": problem_data["title"],
        "difficulty": problem_data["difficulty"],
        "tags": problem_data["tags"],
        "topics": problem_data["topics"],
        "type": problem_data["type"],
        "description": description + "\n",
        "hints": hints,
        "invocation": invocation,
        "limits": limits,
        "languages": languages,
    }
    return problem, public + hidden, len(public)


@lru_cache(maxsize=256)
def _cached_problem(
    path_string: str,
    modified_ns: int,
    size: int,
) -> tuple[dict[str, Any], list[dict[str, Any]], int]:
    del modified_ns, size
    path = Path(path_string)
    if path.is_dir():
        return parse_problem_bundle(path)
    return parse_problem_markdown(path.read_text(encoding="utf-8"), path)


@lru_cache(maxsize=None)
def _cached_summary(path_string: str, modified_ns: int, size: int) -> Optional[dict[str, Any]]:
    """The home-page metadata for one problem, reading only problem.json.

    The full bundle (cases.json, statement.md, starter.*) is ~450 KB/problem
    on average, but the problem list needs just id/slug/title/difficulty/tags
    — reading all 735 bundles to serve that made /problems take ~10s. This
    reads the single small problem.json instead, keyed by its mtime/size so a
    refreshed problem set invalidates automatically."""
    del modified_ns, size
    path = Path(path_string)
    try:
        if path.is_dir():
            data = json.loads((path / "problem.json").read_text(encoding="utf-8"))
            return {
                key: data[key]
                for key in ("id", "slug", "title", "difficulty", "tags", "topics", "type")
            }
        problem, _, _ = parse_problem_markdown(path.read_text(encoding="utf-8"), path)
        summary = {key: problem[key] for key in ("id", "slug", "title", "difficulty", "tags")}
        summary["topics"] = problem.get("topics", [])
        summary["type"] = problem.get("type", "Algorithms")
        return summary
    except (ProblemError, OSError, ValueError, json.JSONDecodeError, KeyError, TypeError):
        return None


def _load_path(path: Path) -> tuple[dict[str, Any], list[dict[str, Any]], int]:
    if path.is_dir():
        signature_modified = 0
        signature_size = 0
        for member in sorted(path.iterdir()):
            stat = member.stat()
            signature_modified = max(signature_modified, stat.st_mtime_ns)
            signature_size += stat.st_size
        return copy.deepcopy(_cached_problem(str(path), signature_modified, signature_size))
    stat = path.stat()
    return copy.deepcopy(_cached_problem(str(path), stat.st_mtime_ns, stat.st_size))


def safe_problem_path(slug: str) -> Path:
    if SLUG.fullmatch(slug) is None:
        raise ProblemError("Invalid problem slug")
    matches = []
    candidates = sorted(
        [
            *(PROBLEMS_DIR.glob(f"*_{slug}.md")),
            *(PROBLEMS_DIR.glob(f"*_{slug}")),
            *(PROBLEMS_DIR.glob(f"*/*_{slug}.md")),
            *(PROBLEMS_DIR.glob(f"*/*_{slug}")),
        ],
        key=lambda path: (path.name, path.is_dir()),
    )
    for candidate in candidates:
        path = candidate.resolve()
        if not _is_direct_child(path):
            continue
        if path.is_dir():
            if PROBLEM_BUNDLE_DIR.fullmatch(path.name) is None:
                continue
        elif PROBLEM_FILE.fullmatch(path.name) is None:
            continue
        # A stray or half-written bundle shadowing the slug must not mask the
        # real one — list_problems tolerates broken bundles and so does the
        # resolver; only candidates that parse get compared.
        try:
            problem, _, _ = _load_path(path)
        except (ProblemError, ValueError):
            continue
        if problem["slug"] == slug:
            matches.append(path)
    if len(matches) != 1:
        raise ProblemError("Problem not found" if not matches else "Duplicate problem slug")
    return matches[0]


def load_problem(slug: str, path: Optional[Path] = None) -> dict[str, Any]:
    problem, cases, public_count = _load_path(path if path is not None else safe_problem_path(slug))
    problem["public_cases"] = [
        {**case, "name": case.get("name", f"Example {index + 1}")} for index, case in enumerate(cases[:public_count])
    ]
    return problem


def load_solutions(slug: str) -> Optional[dict[str, Any]]:
    """The bundle's Solutions-tab content: solutions.md (per-variant prose,
    one `## <variant>` section per approach, optional) plus the code of every
    solution_<variant>.<ext> file, keyed by variant then language.

    Returns None when the bundle has neither solutions.md nor any solution
    files (e.g. flat-format packages)."""
    path = safe_problem_path(slug)
    if not path.is_dir():
        return None
    implementations: dict[str, dict[str, str]] = {}
    canonical: dict[str, str] = {}
    for solution_path in sorted(path.glob("solution*.*")):
        name = solution_path.name
        # variant names may themselves contain underscores (solution_union_find.py)
        matched = re.fullmatch(r"solution(?:_[a-z0-9]+)*\.([a-z0-9]+)", name)
        if matched is None or solution_path.is_dir():
            continue
        # EXTENSION_LANGUAGE maps extension -> language registry key.
        extension = matched.group(1)
        language = EXTENSION_LANGUAGE.get(extension)
        if language is None:
            continue
        variant = name[len("solution") : -(len(extension) + 1)].lstrip("_")
        if variant:
            implementations.setdefault(variant, {})[language] = solution_path.read_text(encoding="utf-8")
        else:
            canonical[language] = solution_path.read_text(encoding="utf-8")
    guide_path = path / "solutions.md"
    guide: dict[str, str] = {}
    titles: dict[str, str] = {}
    order: list[str] = []
    if guide_path.is_file():
        text = guide_path.read_text(encoding="utf-8")
        headings = _headings(text)
        level2 = [(title, line) for level, title, line in headings if level == 2]
        if level2:
            lines = text.splitlines(keepends=True)
            sections = []
            for index, (title, line_number) in enumerate(level2):
                end = level2[index + 1][1] if index + 1 < len(level2) else len(lines)
                sections.append((title.strip(), "".join(lines[line_number + 1 : end]).strip("\n")))
            resolved = _match_sections(sections, sorted(implementations))
            for key, (title, body) in resolved.items():
                guide[key] = body
                titles[key] = title
            # The authored section order (worst-to-best), as variant keys —
            # "" for a section that belongs to the canonical solution.
            if implementations:
                title_to_variant = {title: key for key, (title, _) in resolved.items()}
                order = [title_to_variant.get(title, "") for title, _ in sections]
            else:
                order = [""] * len(sections)
    if not guide and not implementations and not canonical:
        return None
    try:
        reference = json.loads((path / "problem.json").read_text(encoding="utf-8")).get("reference_solution", "")
    except (OSError, ValueError):
        reference = ""
    return {
        "guide": guide,
        "titles": titles,
        "implementations": implementations,
        "canonical": canonical,
        "order": order,
        "reference": reference if isinstance(reference, str) else "",
    }


def _tokens(value: str) -> set[str]:
    return {token for token in re.split(r"[^a-z0-9]+", value.lower()) if token}


def _match_sections(
    sections: list[tuple[str, str]],
    variants: list[str],
) -> dict[str, tuple[str, str]]:
    """Pair each `## heading` with the variant it explains.

    Guides read better with prose headings ("Randomized quickselect")
    than with bare variant tokens ("quickselect"), so headings are
    resolved to variants by token containment rather than by exact
    equality, falling back to file order when the counts line up. A
    canonical-only problem keeps its headings verbatim.
    """
    if not variants:
        return {title.lower(): (title, body) for title, body in sections}
    candidates: list[tuple[int, str, int]] = []
    for position, (title, _) in enumerate(sections):
        heading_tokens = _tokens(title)
        for variant in variants:
            variant_tokens = _tokens(variant)
            if heading_tokens == variant_tokens:
                score = 3
            elif variant_tokens <= heading_tokens:
                score = 2
            elif heading_tokens <= variant_tokens:
                score = 1
            else:
                continue
            candidates.append((score, variant, position))
    # Strongest pairings first, and each section explains one variant, so
    # claiming is exclusive on both sides.
    resolved: dict[str, tuple[str, str]] = {}
    claimed: set[int] = set()
    for _, variant, position in sorted(candidates, key=lambda item: (-item[0], item[2])):
        if variant in resolved or position in claimed:
            continue
        resolved[variant] = sections[position]
        claimed.add(position)
    if len(resolved) < len(variants):
        # Some variant matched nothing: hand out the unclaimed sections in
        # file order, which is how guides are written.
        spare = [index for index in range(len(sections)) if index not in claimed]
        for variant in variants:
            if variant in resolved:
                continue
            if not spare:
                break
            resolved[variant] = sections[spare.pop(0)]
    return resolved


def load_all_cases(slug: str, path: Optional[Path] = None) -> tuple[list[dict[str, Any]], int]:
    _, cases, public_count = _load_path(path if path is not None else safe_problem_path(slug))
    named_cases = [
        {
            **case,
            "name": case.get(
                "name",
                f"Example {index + 1}" if index < public_count else f"Hidden case {index - public_count + 1}",
            ),
        }
        for index, case in enumerate(cases)
    ]
    return named_cases, public_count


def load_designated_reference(slug: str, language: str, path: Optional[Path] = None) -> Optional[str]:
    """The bundle's designated reference solution for a language, if present.

    problem.json's 'reference_solution' names the variant whose
    solution_<variant>.<ext> is the time-cost baseline ("" = the canonical
    solution.<ext>) — the optimal approach, the one the worst-to-best guide
    ends with, so exactly one reference program runs per accepted
    submission. Best-effort: a bundle without that file for the language
    returns None and the UI omits the comparison."""
    bundle = path if path is not None else safe_problem_path(slug)
    if not bundle.is_dir():
        return None
    extension = LANGUAGE_EXTENSION.get(language)
    if extension is None:
        return None
    try:
        designated = json.loads((bundle / "problem.json").read_text(encoding="utf-8")).get("reference_solution", "")
    except (OSError, ValueError):
        return None
    stem = "solution" if not designated else f"solution_{designated}"
    file_path = bundle / f"{stem}.{extension}"
    if not file_path.is_file():
        return None
    return file_path.read_text(encoding="utf-8")


def load_reference_solution(slug: str, language: str) -> Optional[str]:
    """The bundle's recommended solution for a language, if it provides one.

    Only bundle-format problems carry solutions; flat markdown packages have
    none, and a bundle may legitimately lack a given language."""
    return load_designated_reference(slug, language)


_LIST_TTL_SECONDS = 2.0
_list_cache: dict[str, tuple[float, list[dict[str, Any]]]] = {}


def list_problems() -> list[dict[str, Any]]:
    """Every problem summary, sorted by id.

    One call stats every bundle's problem.json (thousands on the served
    tree), and /problems plus /problems/topics call it per request — so the
    result is memoized briefly per tree root. The summaries themselves stay
    mtime-keyed in _cached_summary, so a refreshed problem set is picked up
    within the TTL either way."""
    key = str(PROBLEMS_DIR)
    now = time.monotonic()
    cached = _list_cache.get(key)
    if cached is not None and now - cached[0] < _LIST_TTL_SECONDS:
        return [dict(item) for item in cached[1]]
    problems = []
    if PROBLEMS_DIR.exists():
        for candidate in _iter_problem_paths(PROBLEMS_DIR):
            try:
                path = candidate.resolve()
                if not _is_direct_child(path):
                    continue
                if path.is_dir():
                    if PROBLEM_BUNDLE_DIR.fullmatch(path.name) is None:
                        continue
                    signature = path / "problem.json"
                elif PROBLEM_FILE.fullmatch(path.name) is None:
                    continue
                else:
                    signature = path
                stat = signature.stat()
                summary = _cached_summary(str(path), stat.st_mtime_ns, stat.st_size)
                if summary is not None:
                    problems.append(summary)
            except (ProblemError, OSError, ValueError, json.JSONDecodeError):
                continue
        problems.sort(key=lambda item: item["id"])
    _list_cache[key] = (now, problems)
    return [dict(item) for item in problems]


def public_problem(problem: dict[str, Any]) -> dict[str, Any]:
    allowed = {
        "id",
        "slug",
        "title",
        "difficulty",
        "tags",
        "topics",
        "type",
        "description",
        "hints",
        "invocation",
        "limits",
        "languages",
        "public_cases",
    }
    result = {key: value for key, value in problem.items() if key in allowed}
    # The loader already returns a private copy per call, so the languages
    # map can pass through without another deepcopy.
    invocation = result["invocation"]
    public_cases = []
    for index, case in enumerate(result["public_cases"]):
        raw_input = case["input"]
        if invocation.get("type", "function") == "function":
            names = [parameter["name"] for parameter in invocation.get("parameters", [])]
            display_input = dict(zip(names, raw_input))
        else:
            display_input = raw_input
        public_cases.append({"name": case.get("name", f"Case {index + 1}"), "input": display_input})
    result["public_cases"] = public_cases
    return result
