#!/usr/bin/env python3
"""Completeness checker for an on-disk CoderPuzzle problem set.

Two tiers:

Static (always runs over the whole set, regardless of --problems):
  - bundle structure: required files, directory-name/id/slug consistency
  - no duplicate ids or slugs
  - statement grammar: '# Title' matching problem.json, '## Description'
    with consecutively numbered ### Example N and ### Constraints (optional
    for SQL), optional '## Hints' with ### Hint N
  - cases.json: {public, hidden}, cases are {input, expected}, public cases
    correspond one-to-one with statement examples
  - solution.* exists for every starter.* (and no stray files)
  - starters regenerate exactly from problem.json (gen_starters --check)

Runtime (--problems selection; needs a running CoderPuzzle serving this repo,
passed as --api, default http://localhost:8081):
  - every solution is submitted through the judge and must be ACCEPTED
    against every case in cases.json

Usage:
  check.py --problems=all [--skip-runtime] [--api http://localhost:8081]
  check.py --problems=0001_two-sum,0002_add-two-numbers   # bare bundle keys
  check.py --tree problems --skip-runtime             # static tier over a tree
  check.py --runtime-only --problems=…            # judge sweep, static tier
                                                  # already run separately

The static tier checks bundle structure and metadata; the runtime tier
additionally submits the canonical solution through the judge against
every case in cases.json (solution_<variant> files are judged by
coderpuzzle's verify_solution.py, not here).
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import gen_starters  # noqa: E402
from format import format_content  # noqa: E402 — starters are generator output + pinned formatting

ROOT = Path(__file__).resolve().parent.parent
PROBLEMS = ROOT / "problems"
BUNDLE_NAME = re.compile(r"^([0-9]{4,})_([a-z0-9]+(?:-[a-z0-9]+)*)$")


class Failure:
    def __init__(self, key: str, message: str) -> None:
        self.key = key
        self.message = message

    def __str__(self) -> str:
        return f"{self.key}: {self.message}"


def _headings(markdown: str) -> list[tuple[int, str, int]]:
    headings = []
    fence = False
    for number, line in enumerate(markdown.splitlines(keepends=True)):
        stripped = line.strip()
        if stripped.startswith("```"):
            fence = not fence
            continue
        if fence:
            continue
        match = re.match(r"^(#{1,6})[ \t]+(.+?)[ \t]*$", line)
        if match:
            headings.append((len(match.group(1)), match.group(2).strip(), number))
    return headings


def _unclosed_fence(markdown: str) -> bool:
    """Mirror the judge's load-time rejection: an unclosed fenced block
    would otherwise hide every later heading from the grammar checks and
    404 at serve time."""
    fence = False
    for line in markdown.splitlines():
        if line.strip().startswith("```"):
            fence = not fence
    return fence


def _level3(text: str) -> list[tuple[str, str]]:
    lines = text.splitlines(keepends=True)
    headings = [
        (level, title, number) for level, title, number in _headings(text) if level == 3
    ]
    sections = []
    for index, (_, title, number) in enumerate(headings):
        end = headings[index + 1][2] if index + 1 < len(headings) else len(lines)
        sections.append((title, "".join(lines[number + 1 : end]).strip("\n")))
    return sections


def _numbered(text: str, heading: str) -> list[str]:
    bodies = []
    expected = 1
    for name, body in _level3(text):
        if name == f"{heading} {expected}":
            bodies.append(body)
            expected += 1
    return bodies


def check_bundle(bundle: Path) -> list[Failure]:
    key = bundle.name
    failures = []
    matched = BUNDLE_NAME.fullmatch(key)
    if matched is None:
        return [Failure(key, "directory must be named '<zero-padded id>_<slug>'")]

    def fail(message: str) -> None:
        failures.append(Failure(key, message))

    for required in ("problem.json", "cases.json", "statement.md"):
        if not (bundle / required).is_file():
            fail(f"missing {required}")
    if failures:
        return failures
    try:
        problem = json.loads((bundle / "problem.json").read_text(encoding="utf-8"))
        cases = json.loads((bundle / "cases.json").read_text(encoding="utf-8"))
        statement = (bundle / "statement.md").read_text(encoding="utf-8")
    except (json.JSONDecodeError, OSError, UnicodeDecodeError) as error:
        return [Failure(key, f"unreadable bundle content: {error}")]

    expected_keys = {
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
    }
    if set(problem) != expected_keys:
        fail(f"problem.json keys must be exactly {sorted(expected_keys)}")
        return failures
    if not isinstance(problem["invocation"], dict):
        fail("invocation must be an object")
        return failures
    if not isinstance(problem["difficulty"], str) or problem["difficulty"] not in {
        "Easy",
        "Medium",
        "Hard",
    }:
        fail("difficulty must be one of Easy, Medium, Hard")
    if (
        not isinstance(problem["tags"], list)
        or not problem["tags"]
        or not all(isinstance(tag, str) and tag for tag in problem["tags"])
    ):
        fail("tags must be a non-empty array of non-empty strings")
    if (
        not isinstance(problem["topics"], list)
        or not problem["topics"]
        or not all(isinstance(topic, str) and topic for topic in problem["topics"])
    ):
        fail("topics must be a non-empty array of non-empty strings")
    if problem["type"] not in {"Algorithms", "Database", "Shell"}:
        fail("type must be one of Algorithms, Database, Shell")
    if problem["schema_version"] != 2:
        fail("unsupported schema_version")
    designated = problem["reference_solution"]
    if not isinstance(designated, str):
        fail("reference_solution must be a string")
    elif designated:
        import re as _re

        if _re.fullmatch(r"[a-z0-9]+(?:_[a-z0-9]+)*", designated) is None:
            fail("reference_solution must be a lowercase snake_case variant slug")
        elif not any(
            f.name.startswith(f"solution_{designated}.") and f.is_file()
            for f in bundle.iterdir()
        ):
            fail(f"reference_solution names no solution_{designated}.* file")
    elif not any(
        f.name.startswith("solution.") and f.is_file() for f in bundle.iterdir()
    ):
        fail(
            "reference_solution is empty but the bundle has no canonical solution.* files"
        )
    if problem["id"] != int(matched.group(1)) or problem["slug"] != matched.group(2):
        fail("directory name must match problem.json id and slug")

    # Interactive bundles must own their oracle: invocation.provided.oracle
    # names the bundle-local class the judge assembles from provided/
    # (docs/CODECS.md) — the judge holds no oracle definitions of its own,
    # so there is no fallback to fall back to.
    invocation = problem.get("invocation") or {}
    if isinstance(invocation, dict) and invocation.get("type") == "interactive":
        provided_oracle = (invocation.get("provided") or {}).get("oracle")
        if not isinstance(provided_oracle, dict):
            fail("interactive invocation needs invocation.provided.oracle")
        else:
            oracle_class = provided_oracle.get("class")
            if not isinstance(oracle_class, str) or not oracle_class:
                fail("invocation.provided.oracle.class must be a non-empty string")
            if not isinstance(provided_oracle.get("construct"), list):
                fail("invocation.provided.oracle.construct must be a list")

    # limits: the judge requires exactly time_ms/memory_mb/output_kb plus
    # optional threads, all positive ints — a bundle that fails this 404s at
    # serve time, so reject it here instead
    limits = problem.get("limits")
    if not isinstance(limits, dict):
        fail("limits must be an object")
    else:
        required_limits = {"time_ms", "memory_mb", "output_kb"}
        if not required_limits <= set(limits) or not set(limits) <= required_limits | {"threads"}:
            fail(
                "limits must contain exactly: "
                + ", ".join(sorted(required_limits))
                + " (plus optional threads)"
            )
        elif not all(isinstance(value, int) and value > 0 for value in limits.values()):
            fail("Limits values must be positive integers")

    if _unclosed_fence(statement):
        fail("statement.md contains an unclosed fenced block")
        return failures

    # statement grammar
    headings = _headings(statement)
    top = [entry for entry in headings if entry[0] <= 2]
    if not top or top[0][0] != 1:
        fail("statement.md must start with '# <Title>'")
        return failures
    if top[0][1] != problem["title"]:
        fail("statement title must match problem.json title")
    section_names = [entry[1] for entry in top[1:] if entry[0] == 2]
    if section_names not in (["Description"], ["Description", "Hints"]):
        fail("statement.md requires '## Description' then optional '## Hints'")
        return failures
    lines = statement.splitlines(keepends=True)
    description = "".join(
        lines[top[1][2] + 1 : top[2][2] if len(top) > 2 else len(lines)]
    )
    if not description.strip():
        fail("## Description cannot be empty")
    examples = _numbered(description, "Example")
    if not examples:
        fail("## Description needs at least one ### Example heading")
    section3 = [name for name, _ in _level3(description)]
    if (
        "Constraints" not in section3
        and problem["invocation"].get("type", "function") != "sql"
    ):
        fail("## Description needs ### Constraints")
    if len(top) > 2:
        hints = "".join(lines[top[2][2] + 1 :])
        if not _numbered(hints, "Hint"):
            fail("## Hints needs at least one ### Hint heading")

    # cases
    if not isinstance(cases, dict) or set(cases) != {"public", "hidden"}:
        fail("cases.json must contain exactly 'public' and 'hidden'")
    else:
        for group in ("public", "hidden"):
            if not isinstance(cases[group], list):
                fail(f"cases.json {group} must be an array")
                break
            for index, case in enumerate(cases[group]):
                if not isinstance(case, dict) or set(case) != {"input", "expected"}:
                    fail(
                        f"{group} case {index + 1} must contain exactly 'input' and 'expected'"
                    )
        if isinstance(cases["public"], list) and not cases["public"]:
            fail("at least one public case is required")
        if isinstance(cases["public"], list) and len(cases["public"]) != len(examples):
            fail(
                f"{len(cases['public'])} public cases but {len(examples)} statement examples"
            )
        if isinstance(cases["public"], list) and isinstance(cases["hidden"], list):
            all_cases = cases["public"] + cases["hidden"]
            exhaustive_integer_domain = False
            parameters = problem["invocation"].get("parameters", [])
            if (
                len(parameters) == 1
                and parameters[0].get("value_type", {}).get("kind") == "integer"
            ):
                name = re.escape(parameters[0]["name"])
                match = re.search(rf"`(-?\d+)\s*<=\s*{name}\s*<=\s*(-?\d+)`", statement)
                if match:
                    lower, upper = map(int, match.groups())
                    inputs = {
                        case["input"][0]
                        for case in all_cases
                        if isinstance(case.get("input"), list)
                        and len(case["input"]) == 1
                        and isinstance(case["input"][0], int)
                    }
                    # a huge declared domain would iterate for minutes
                    # only to conclude "not exhaustive" — wide domains can
                    # never be exhaustive, so decide without iterating
                    exhaustive_integer_domain = (
                        upper - lower <= 10_000
                        and inputs.issuperset(range(lower, upper + 1))
                    )
            if len(all_cases) < 10 and not exhaustive_integer_domain:
                fail(
                    f"only {len(all_cases)} total cases (need >= 10 or exhaustive finite integer domain)"
                )

    # starters: regenerate from problem.json and compare byte-for-byte.
    # Python style follows provenance: the bettercode-derived slugs (the
    # adapter set in scripts/problems-tooling/adapt-mapping.json) is modern;
    # extend-derived keeps the legacy annotations.
    gen_starters.set_python_style(
        "modern" if gen_starters.is_modern_python_slug(problem["slug"]) else "legacy"
    )
    try:
        generated = gen_starters.starter_files(problem["invocation"])
    except Exception as error:  # noqa: BLE001
        fail(f"starter generation failed: {error}")
        return failures
    starter_extensions = {
        path.name[len("starter.") :] for path in bundle.glob("starter.*")
    }
    generated_by_extension = {
        gen_starters.EXTENSIONS[language]: content
        for language, content in generated.items()
    }
    if not starter_extensions:
        fail("missing starter files")
    for extension in sorted(starter_extensions):
        if extension not in generated_by_extension:
            fail(f"stray starter.{extension} (not generated for this problem)")
            continue
        content = format_content(
            extension, generated_by_extension[extension], tolerant=True
        )
        path = bundle / f"starter.{extension}"
        if path.read_text(encoding="utf-8") != content:
            fail(f"starter.{extension} is not generator output — run gen_starters.py")

    # solutions: solution.<ext> or solution_<variant>.<ext>. Every starter
    # language needs at least one solution, and the variant set must be the
    # same in every language (a named variant is equivalent across ports).
    solution_names = sorted(
        path.name
        for path in bundle.iterdir()
        if path.name.startswith("solution") and path.name != "solutions.md"
    )
    # variant names may themselves contain underscores (solution_bellman_ford.py)
    solution_pattern = re.compile(r"^solution(?:_[a-z0-9]+)*\.([a-z0-9]+)$")
    solutions: dict[str, set[str]] = {}
    for name in solution_names:
        matched = solution_pattern.match(name)
        if matched is None:
            fail(
                f"unexpected file {name} (solutions are solution.<ext> or solution_<variant>.<ext>)"
            )
            continue
        extension = matched.group(1)
        if extension not in starter_extensions:
            fail(f"stray {name} (no matching starter.{extension})")
            continue
        variant = name[len("solution") : -(len(extension) + 1)]
        solutions.setdefault(extension, set()).add(variant)
    for extension in starter_extensions:
        if extension not in solutions:
            fail(f"missing solution.{extension} for starter.{extension}")
    if solutions:
        variant_sets = {tuple(sorted(variants)) for variants in solutions.values()}
        if len(variant_sets) > 1:
            fail("solution variants must match across languages")
    allowed = (
        {"problem.json", "cases.json", "statement.md"}
        | {f"starter.{extension}" for extension in starter_extensions}
        | set(solution_names)
    )
    # provided/: the problem-carried oracle/library sources the judge
    # assembles with every submission (see docs/CODECS.md); one flat
    # directory per language, e.g. provided/python/oracle.py.
    provided_dir = bundle / "provided"
    if provided_dir.is_symlink():
        fail("provided must be a real directory, not a symlink")
    elif provided_dir.is_dir():
        for language_dir in provided_dir.iterdir():
            if language_dir.is_symlink():
                fail(
                    f"provided/{language_dir.name} must be a real directory, not a symlink"
                )
            elif not language_dir.is_dir():
                fail(
                    f"unexpected file provided/{language_dir.name} (one flat directory per language)"
                )
            else:
                for source in language_dir.iterdir():
                    if source.is_symlink():
                        fail(
                            f"provided/{language_dir.name}/{source.name} must be a real file, not a symlink"
                        )
                    elif not source.is_file():
                        fail(
                            f"unexpected directory provided/{language_dir.name}/{source.name}"
                        )
        allowed.add("provided")
    # solutions.md: optional per-variant Solutions-tab guide (## sections)
    solutions_guide = bundle / "solutions.md"
    if solutions_guide.is_file():
        guide_text = solutions_guide.read_text(encoding="utf-8")
        if _unclosed_fence(guide_text):
            fail("solutions.md contains an unclosed fenced block")
            return failures
        guide_headings = _headings(guide_text)
        levels = [level for level, _, _ in guide_headings]
        if levels and levels[0] != 1:
            fail("solutions.md must start with a level-one title")
        if any(level not in (1, 2) for level in levels) or levels.count(1) > 1:
            fail(
                "solutions.md allows one title plus level-two (## <variant>) sections only"
            )
        titles = [title.lower() for level, title, _ in guide_headings if level == 2]
        if not titles:
            fail("solutions.md needs at least one ## <variant> section")
        if len(titles) != len(set(titles)):
            fail("solutions.md contains a duplicate variant section")
        allowed.add("solutions.md")
    # statement figures: a flat figures/ directory of <name>.svg files
    figures_dir = bundle / "figures"
    figures_valid = True
    if figures_dir.is_dir():
        for figure in figures_dir.iterdir():
            if (
                not figure.is_file()
                or re.fullmatch(r"[a-z0-9-]+\.svg", figure.name) is None
            ):
                fail(
                    f"unexpected figure entry {figure.name} (figures are flat <name>.svg files)"
                )
                figures_valid = False
        allowed.add("figures")
    for stray in sorted(
        path.name for path in bundle.iterdir() if path.name not in allowed
    ):
        fail(f"unexpected file {stray}")

    return failures


def misnamed_dir_failures(root: Path) -> list[Failure]:
    """Top-level directories that are neither valid bundles nor shards
    holding valid bundles are invisible to every check and to the judge —
    an authoring typo would ship as a problem nobody can serve."""
    failures: list[Failure] = []
    for child in sorted(root.iterdir()):
        if not child.is_dir() or BUNDLE_NAME.fullmatch(child.name):
            continue
        if not any(
            sub.is_dir() and BUNDLE_NAME.fullmatch(sub.name) for sub in child.iterdir()
        ):
            failures.append(
                Failure(
                    child.name,
                    "neither a bundle nor a shard of bundles (expected '<id>_<slug>' naming)",
                )
            )
    return failures


def bundle_dirs(root: Path) -> list[Path]:
    """Every bundle directory under root, flat or sharded by id ranges.

    The trees are sharded `<lo>-<hi>/<id>_<slug>/` (100 ids per shard);
    flat `root/<id>_<slug>/` keeps working so old checkouts and test
    fixtures do not break.
    """
    bundles = []
    for child in sorted(root.iterdir()):
        if not child.is_dir():
            continue
        if BUNDLE_NAME.fullmatch(child.name):
            bundles.append(child)
        else:
            bundles.extend(
                sub
                for sub in sorted(child.iterdir())
                if sub.is_dir() and BUNDLE_NAME.fullmatch(sub.name)
            )
    return bundles


def repo_root_failures() -> list[Failure]:
    """Reject a reintroduced bank-root shared library.

    Every well-known data structure and oracle is bundle-owned under
    `provided/<language>/` (FORMAT.md, docs/CODECS.md in the coderpuzzle repo);
    there is deliberately no repo-root `common/` or `shared/` source tree
    for a future change to accidentally resurrect.
    """
    failures = []
    for name in ("common", "shared"):
        candidate = ROOT / name
        if candidate.exists():
            failures.append(
                Failure(
                    "<repo root>",
                    f"'{name}/' must not exist at the repo root — every well-known "
                    "structure and oracle is bundle-owned under provided/<language>/",
                )
            )
    return failures


def static_tier() -> tuple[list[Failure], dict[str, dict], dict[str, Path]]:
    failures: list[Failure] = list(repo_root_failures())
    failures.extend(misnamed_dir_failures(PROBLEMS))
    catalog: dict[str, dict] = {}
    paths: dict[str, Path] = {}
    bundles = bundle_dirs(PROBLEMS)
    seen_ids: dict[int, tuple[str, dict]] = {}
    seen_slugs: dict[str, str] = {}
    for bundle in bundles:
        for failure in check_bundle(bundle):
            failures.append(failure)
        try:
            problem = json.loads((bundle / "problem.json").read_text(encoding="utf-8"))
            if problem.get("id") in seen_ids:
                first_name, first = seen_ids[problem["id"]]
                # Thirteen source problems exist in both corpora and were
                # adapted twice; a shared id is legitimate exactly when the
                # two bundles come from different provenances (one modern,
                # one legacy) or, in the originals tree, when exactly one of
                # the twins carries the `-crawl` suffix.
                one_crawl = problem["slug"].endswith("-crawl") != first["slug"].endswith("-crawl")
                if gen_starters.is_modern_python_slug(
                    problem["slug"]
                ) == gen_starters.is_modern_python_slug(first["slug"]) and not one_crawl:
                    failures.append(
                        Failure(
                            bundle.name,
                            f"duplicate id {problem['id']} (also {first_name})",
                        )
                    )
                else:
                    print(
                        f"note: id {problem['id']} is shared across subsets "
                        f"({first_name}, {bundle.name})"
                    )
            else:
                seen_ids[problem["id"]] = (bundle.name, problem)
            if problem.get("slug") in seen_slugs:
                failures.append(
                    Failure(
                        bundle.name,
                        f"duplicate slug {problem['slug']} (also {seen_slugs[problem['slug']]})",
                    )
                )
            else:
                seen_slugs[problem["slug"]] = bundle.name
            catalog[bundle.name] = problem
            paths[bundle.name] = bundle
        except (json.JSONDecodeError, OSError, KeyError):
            pass
    return failures, catalog, paths


def _open_session(api: str) -> str:
    """The API requires a guest-session cookie for every judging endpoint;
    CI creates one ephemeral session for the whole run."""
    request = urllib.request.Request(f"{api}/api/session", data=b"", method="POST")
    with urllib.request.urlopen(request, timeout=30) as response:
        cookie = response.headers.get("Set-Cookie", "")
    match = re.search(r"coderpuzzle_session=([0-9a-f]+)", cookie)
    if not match:
        raise RuntimeError("session endpoint returned no session cookie")
    return match.group(1)


def submit(api: str, slug: str, language: str, code: str, session: str) -> dict:
    request = urllib.request.Request(
        f"{api}/api/submit",
        data=json.dumps({"slug": slug, "language": language, "code": code}).encode(
            "utf-8"
        ),
        headers={
            "Content-Type": "application/json",
            "Cookie": f"coderpuzzle_session={session}",
        },
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=120) as response:
        return json.loads(response.read().decode("utf-8"))


class SweepAbort(RuntimeError):
    """The judge is gone; continuing would only record noise."""


def submit_with_backoff(
    api: str, slug: str, language: str, code: str, session: str, attempts: int = 4
) -> dict:
    """submit() that backs off on the judge's per-session throttle instead of
    misreporting it (a 429 is rate limiting, not an unreachable judge — and
    a fast sweep over small problems trips it routinely)."""
    for attempt in range(attempts):
        try:
            return submit(api, slug, language, code, session)
        except urllib.error.HTTPError as error:
            if error.code == 429 and attempt < attempts - 1:
                delay = 25.0 * (attempt + 1)
                print(f"    throttled by the judge; waiting {delay:.0f}s before retrying")
                time.sleep(delay)
                continue
            raise
    raise AssertionError("unreachable")  # pragma: no cover


def runtime_tier(
    selected: list[str], catalog: dict[str, dict], api: str, paths: dict[str, Path]
) -> list[Failure]:
    failures: list[Failure] = []
    language_for = {
        extension: key for key, extension in gen_starters.EXTENSIONS.items()
    }
    try:
        session = _open_session(api)
    except Exception as error:  # noqa: BLE001
        return [Failure("session", f"could not open a judge session: {error}")]
    consecutive_unreachable = 0
    for position, key in enumerate(selected, start=1):
        # the tree is sharded: the catalog carries each bundle's resolved
        # directory (a bare PROBLEMS/key join would miss every shard)
        bundle = paths.get(key)
        problem = catalog.get(key)
        if bundle is None or problem is None:
            print(f"  [{position}/{len(selected)}] {key} skipped (not in catalog)")
            continue
        for starter in sorted(bundle.glob("starter.*")):
            language = language_for.get(starter.name[len("starter.") :])
            if language is None:
                continue  # not a generated starter extension; nothing to judge
            solution = bundle / f"solution.{starter.name[len('starter.') :]}"
            try:
                code = solution.read_text(encoding="utf-8")
            except OSError:
                continue  # reported by the static tier
            try:
                result = submit_with_backoff(api, problem["slug"], language, code, session)
                consecutive_unreachable = 0
            except urllib.error.URLError as error:
                failures.append(Failure(key, f"{language}: judge unreachable: {error}"))
                consecutive_unreachable += 1
                if consecutive_unreachable >= 3:
                    failures.append(
                        Failure("sweep", "judge unreachable three requests in a row; aborting the sweep")
                    )
                    return failures
                continue
            except Exception as error:  # noqa: BLE001
                consecutive_unreachable = 0
                failures.append(Failure(key, f"{language}: submission failed: {error}"))
                continue
            if result.get("status") != "accepted":
                detail = next(
                    (
                        entry
                        for entry in result.get("results", [])
                        if entry.get("status") not in {"accepted", "completed"}
                    ),
                    {},
                )
                failures.append(
                    Failure(
                        key,
                        f"{language}: {result.get('status')} ({result.get('passed')}/{result.get('total')} cases"
                        f"{'; ' + str(detail.get('status')) if detail else ''})",
                    )
                )
        print(f"  [{position}/{len(selected)}] {key} judged")
    return failures


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--problems", default="all", help="'all' or comma-separated bundle keys"
    )
    parser.add_argument(
        "--tree",
        default="problems",
        help="which bundle tree to check, relative to the repo root (e.g. problems)",
    )
    parser.add_argument(
        "--skip-runtime", action="store_true", help="run the static tier only"
    )
    parser.add_argument(
        "--runtime-only",
        action="store_true",
        help="skip the static tier (CI runs it separately in the formatter container)",
    )
    parser.add_argument(
        "--api",
        default="http://localhost:8081",
        help="CoderPuzzle base URL for the runtime tier (compose publishes 8081)",
    )
    arguments = parser.parse_args()

    global PROBLEMS
    PROBLEMS = ROOT / arguments.tree
    if not PROBLEMS.is_dir():
        raise SystemExit(f"no bundle tree at {PROBLEMS}")

    failures: list[Failure] = []
    if arguments.runtime_only and arguments.skip_runtime:
        raise SystemExit("--runtime-only and --skip-runtime together check nothing")
    if arguments.runtime_only:
        catalog = {}
        paths = {}
        for bundle in bundle_dirs(PROBLEMS):
            try:
                catalog[bundle.name] = json.loads(
                    (bundle / "problem.json").read_text(encoding="utf-8")
                )
                paths[bundle.name] = bundle
            except (json.JSONDecodeError, OSError):
                print(
                    f"  FAIL {bundle.name}: unreadable problem.json (the static tier reports details)"
                )
                failures.append(Failure(bundle.name, "unreadable problem.json"))
    else:
        print(f"static tier: checking {len(bundle_dirs(PROBLEMS))} bundles")
        failures, catalog, paths = static_tier()
        for failure in failures:
            print(f"  FAIL {failure}")
        print(f"static tier: {len(failures)} failures")

    if not arguments.skip_runtime:
        if arguments.problems == "all":
            selected = sorted(catalog)
        else:
            selected = [
                entry.strip()
                for entry in arguments.problems.split(",")
                if entry.strip()
            ]
            unknown = [entry for entry in selected if entry not in catalog]
            if unknown:
                print(f"unknown problem keys: {', '.join(unknown)}")
                raise SystemExit(2)
        print(
            f"runtime tier: judging {len(selected)} selected problems against {arguments.api}"
        )
        runtime_failures = runtime_tier(selected, catalog, arguments.api, paths)
        for failure in runtime_failures:
            print(f"  FAIL {failure}")
        failures += runtime_failures

    if failures:
        print(f"CHECK FAILED: {len(failures)} failures")
        raise SystemExit(1)
    print("CHECK PASSED")


if __name__ == "__main__":
    main()
