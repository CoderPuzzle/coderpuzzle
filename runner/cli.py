"""Authoring-side CLI services on the runner image.

Run the image as root when compiling (the executors' privilege dance
chowns work directories to the compiler uid): `docker run --user 0:0 ...`.

The image carries the pinned toolchain for every offered language, the
executors, and the judge's own harness code — these entry points expose
that machinery to problem creators, so authoring needs no local
toolchain beyond Docker:

  cli.py format <files...>            format to the OpenOJ standard
  cli.py gen-starters <problem.json>  emit every starter.<ext> for a
                                      bundle's language-agnostic schema
  cli.py judge <bundle-dir>           run every solution.* in the
                                      bundle through the real judging
                                      path; all must pass every case

In the image these run as `openoj format ...` / `openoj gen-starters
...` / `openoj judge ...` (see the ojcli entrypoint installed by the
Dockerfile). They operate on a bundle directory bind-mounted at any
path; nothing here writes outside the paths it is given.
"""

from __future__ import annotations

import argparse
import json
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

RUNNER = Path(__file__).resolve().parent

# The executors and harness live beside this file; the gen_starters and
# format implementations are imported from a mounted problems repo (the
# schema is the contract, the tools are the standard) or, when the image
# carries its own copy, from there.
TOOLS_CANDIDATES = [
    Path("/tools"),  # image convention
    RUNNER.parent / "problems-tools",  # beside a checkout
]


def _tools() -> Path:
    for candidate in TOOLS_CANDIDATES:
        if (candidate / "scripts" / "gen_starters.py").exists():
            return candidate
    raise SystemExit("gen_starters.py not found; bind-mount the problems repo at /tools")


def _executors_ready() -> None:
    sys.path.insert(0, str(RUNNER))
    from executors import get_executor  # noqa: F401  (probe)


LANGUAGE_BY_EXTENSION = {
    "py": "python3",
    "js": "javascript",
    "ts": "typescript",
    "java": "java",
    "cpp": "cpp",
    "go": "go",
    "rs": "rust",
    "sql": "sql",
    "sh": "shell",
    "json": "json",
    "md": "markdown",
}


def _expand_formattable(names: list[str]) -> tuple[list[Path], list[Path]]:
    """Expand files/directories into (formattable files, skipped paths)."""
    files: list[Path] = []
    skipped: list[Path] = []
    for name in names:
        path = Path(name)
        if path.is_dir():
            files += sorted(
                child
                for child in path.rglob("*")
                if child.is_file() and child.suffix.lstrip(".") in LANGUAGE_BY_EXTENSION
            )
        elif path.is_file():
            files.append(path)
        else:
            skipped.append(path)
    return files, skipped


def cmd_format(arguments: argparse.Namespace) -> int:
    """Format files (in place), --check, or --report json."""
    from formatters import format_source, format_source_report

    files, skipped = _expand_formattable(arguments.files)
    for path in skipped:
        print(f"not a file: {path}", file=sys.stderr)
        if arguments.report:
            results = [{"file": str(path), "status": "error", "diagnostics": "not a file"}]
            print(json.dumps(results, indent=2))
            return 1
        return 2

    if arguments.report:
        results = []
        errored = False
        for path in files:
            language = LANGUAGE_BY_EXTENSION.get(path.suffix.lstrip("."))
            if language is None:
                continue
            report = format_source_report(language, path.read_text(encoding="utf-8"))
            results.append({"file": str(path), **report})
            if report["status"] == "error":
                errored = True
        print(json.dumps(results, indent=2, ensure_ascii=False))
        return 1 if errored else 0

    changed = unformatted = 0
    for path in files:
        extension = path.suffix.lstrip(".")
        language = LANGUAGE_BY_EXTENSION.get(extension)
        if language is None:
            if not arguments.check:
                print(f"no formatter for .{extension}", file=sys.stderr)
                return 2
            continue
        original = path.read_text(encoding="utf-8")
        formatted = format_source(language, original)
        if formatted != original:
            if arguments.check:
                unformatted += 1
                print(f"UNFORMATTED {path}")
            else:
                path.write_text(formatted, encoding="utf-8")
                changed += 1
                print(f"formatted {path}")
    if arguments.check:
        print(f"format check: {unformatted} unformatted files")
        return 1 if unformatted else 0
    print(f"{changed} file(s) changed")
    return 0


def cmd_gen_starters(arguments: argparse.Namespace) -> int:
    """Emit starter.<ext> for every offered language beside problem.json."""
    import importlib.util

    tools = _tools()
    spec = importlib.util.spec_from_file_location("gen_starters", tools / "scripts" / "gen_starters.py")
    gen = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(gen)

    problem_path = Path(arguments.problem)
    invocation = json.loads(problem_path.read_text(encoding="utf-8"))["invocation"]
    bundle = problem_path.parent
    gen.set_python_style(arguments.style)
    expected = gen.starter_files(invocation)
    for language, content in expected.items():
        target = bundle / f"starter.{gen.EXTENSIONS[language]}"
        target.write_text(content, encoding="utf-8")
        print(f"wrote {target}")
    return 0


def _authoring_env() -> None:
    """Environment for authoring-side compiles: a plain writable HOME so
    toolchains that insist on caching there (go, tsc) behave."""
    os.environ.setdefault("HOME", "/tmp")
    for variable, value in (
        ("GOCACHE", "/tmp/openoj-gocache"),
        ("GOPATH", "/tmp/openoj-gopath"),
        ("GOMODCACHE", "/tmp/openoj-gomodcache"),
        ("GO111MODULE", "off"),
        ("PATH", "/usr/local/bin:" + os.environ.get("PATH", "/usr/bin:/bin")),
    ):
        os.environ[variable] = value


def _authoring_compile_patches() -> None:
    """Neutralize the untrusted-submission sandbox for authoring runs.

    The compiler sandbox exists for untrusted solver submissions; an
    author judging their own reference solutions on their own machine
    doesn't need it, and its per-uid process cap breaks `docker run`
    (where root's pids are shared with the dropped compiler uid).
    Compile plainly instead — same command, same pinned tools.
    """
    _executors_ready()
    from executors.compiled import CompiledExecutor

    def _plain_compile(self, job_root, command, output_path, environment):
        import subprocess as sp

        merged = {**environment, "PATH": "/usr/local/bin:" + environment.get("PATH", "/usr/bin:/bin")}
        completed = sp.run(
            list(command),
            cwd=job_root,
            env=merged,
            stdout=sp.PIPE,
            stderr=sp.STDOUT,
            timeout=300,
        )
        if completed.returncode != 0:
            raw = completed.stdout or completed.stderr or b""
            raise ExecutorError("Compilation failed:\n" + raw.decode("utf-8", "replace")[-4000:])

    CompiledExecutor.compile = _plain_compile

    # JavaExecutor never calls compile(): javac runs under its own sandboxed
    # Popen inside prepare(). Neutralize its command wrapper the same way —
    # the same javac invocation, without the rlimits and uid drop.
    from executors.java import JavaExecutor

    JavaExecutor.compiler_command = lambda self, command, job_root: list(command)


def _bundle_assembly(bundle: Path) -> dict[str, dict[str, str]]:
    """Judge-assembly: the bundle's own provided/ sources compile/run with
    the submission, exactly as a live judge job would assemble them.
    Every well-known data structure a bundle's wire needs is the
    bundle's OWN provided/ source — the judge holds no predefined
    definitions of its own (docs/CODECS.md)."""
    LANGUAGE_DIRECTORIES = {
        "python3": "python",
        "java": "java",
        "cpp": "cpp",
        "go": "go",
        "rust": "rust",
        "typescript": "typescript",
        "javascript": "javascript",
    }
    assembly: dict[str, dict[str, str]] = {"provided": {}}
    for language, directory in LANGUAGE_DIRECTORIES.items():
        provided_dir = bundle / "provided" / directory
        if provided_dir.is_dir():
            for path in sorted(provided_dir.iterdir()):
                if path.is_file():
                    assembly["provided"][path.name] = path.read_text(encoding="utf-8")
    return assembly


def _judge_one(
    solution: Path,
    invocation: dict,
    limits: dict,
    assembly: dict[str, dict[str, str]],
    all_cases: list,
) -> int:
    """Prepare and judge one solution file against all_cases; returns the
    number of case-level failures (compile failures count as one)."""
    _authoring_env()
    from executors import get_executor
    from executors.base import ExecutorError

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
    LANGUAGE_EXTENSIONS = {
        "python3": {"py"},
        "java": {"java"},
        "cpp": {"hpp", "cpp", "h", "cc"},
        "go": {"go"},
        "rust": {"rs"},
        "typescript": {"ts"},
        "javascript": {"js"},
        "sql": {"sql"},
        "shell": {"sh"},
    }
    language = EXTENSION_LANGUAGE.get(solution.suffix.lstrip("."))
    if language is None:
        print(f"SKIP  {solution.name}: no executor for {solution.suffix}")
        return 0
    executor = get_executor(language)
    code = solution.read_text(encoding="utf-8")
    work = Path(tempfile.mkdtemp(prefix="openoj-cli-"))
    try:
        work.chmod(0o777)
    except OSError:
        pass
    scratch = work / "scratch"
    scratch.mkdir()
    failures = 0
    passed = 0
    try:
        try:
            extensions = LANGUAGE_EXTENSIONS.get(language, set())
            per_language = {
                part: {name: content for name, content in files.items() if name.rsplit(".", 1)[-1] in extensions}
                for part, files in assembly.items()
            }
            program = executor.prepare(work, scratch, code, invocation, limits, per_language)
        except ExecutorError as error:
            print(f"FAIL  {solution.name}: prepare/compile: {str(error)[-400:]}")
            return 1
        except Exception as error:  # noqa: BLE001 — report, don't crash the sweep
            print(f"FAIL  {solution.name}: prepare error: {error!r} ({type(error).__name__})")
            return 1
        for index, case in enumerate(all_cases):
            process = None
            try:
                if getattr(executor, "encode_case_with_limits", False):
                    payload = executor.encode_case(invocation, case["input"], limits)
                else:
                    payload = executor.encode_case(invocation, case["input"])
                process = subprocess.Popen(
                    list(program.command),
                    stdin=subprocess.PIPE,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.DEVNULL,
                    env=program.environment,
                )
                output, _ = process.communicate(payload, timeout=limits.get("time_ms", 1500) / 1000 * 3 + 5)
            except Exception as error:  # noqa: BLE001
                # communicate(timeout=...) raises without killing the
                # child; reap it or it keeps running while the finally
                # below deletes the working directory it sits in.
                if process is not None:
                    try:
                        process.kill()
                        process.wait()
                    except ProcessLookupError:
                        pass
                print(f"FAIL  {solution.name}: case {index + 1}: {error}")
                failures += 1
                continue
            text = output.decode("utf-8", "replace")
            marker = "__OPENOJ_RESULT__"
            line = next((l for l in text.splitlines() if marker in l), "")
            verdict = json.loads(line[len(marker) :]) if line else {"status": "no_output"}
            if verdict.get("status") == "completed":
                passed += 1
            else:
                print(
                    f"FAIL  {solution.name}: case {index + 1}: "
                    f"{verdict.get('status')}: {verdict.get('error', '')[:120]}"
                )
                failures += 1
    finally:
        shutil.rmtree(work, ignore_errors=True)
    print(f"{'OK  ' if failures == 0 else 'FAIL'} {solution.name}: {passed}/{len(all_cases)} cases")
    return failures


def cmd_judge(arguments: argparse.Namespace) -> int:
    """Judge every solution.* in the bundle through the real executors."""
    _authoring_compile_patches()

    bundle = Path(arguments.bundle)
    problem = json.loads((bundle / "problem.json").read_text(encoding="utf-8"))
    invocation = problem["invocation"]
    limits = problem.get("limits", {})
    cases = json.loads((bundle / "cases.json").read_text(encoding="utf-8"))
    all_cases = cases.get("public", []) + cases.get("hidden", [])
    assembly = _bundle_assembly(bundle)

    solutions = sorted(path for path in bundle.iterdir() if path.name.startswith("solution") and path.suffix != ".md")
    if not solutions:
        print("no solution files found", file=sys.stderr)
        return 2

    failures = 0
    for solution in solutions:
        failures += _judge_one(solution, invocation, limits, assembly, all_cases)
    print(f"{len(all_cases) and 'judged' or 'no cases'}; {failures} case-level failure(s)")
    return 1 if failures else 0


def _find_bundle(path: Path) -> Path:
    """Walk up from `path` to the directory holding problem.json."""
    for candidate in [path, *path.parents]:
        if (candidate / "problem.json").is_file():
            return candidate
    raise SystemExit(f"no problem.json found above {path}; is this file inside a bundle?")


def cmd_run(arguments: argparse.Namespace) -> int:
    """Run one solution file against its bundle's real cases.

    Discovers the bundle by walking up from the file to problem.json,
    picks the language from the extension (or --lang), assembles the
    bundle's provided/ sources exactly as a live judge job would, and
    judges the file through the real executors. The compile sandbox is
    neutralized as in `judge` — this is an authoring tool for the
    author's own machine.
    """
    _authoring_compile_patches()

    solution = Path(arguments.file)
    if not solution.is_file():
        print(f"not a file: {solution}", file=sys.stderr)
        return 2
    bundle = _find_bundle(solution.resolve().parent)
    problem = json.loads((bundle / "problem.json").read_text(encoding="utf-8"))
    invocation = problem["invocation"]
    limits = problem.get("limits", {})
    cases = json.loads((bundle / "cases.json").read_text(encoding="utf-8"))
    all_cases = cases.get("public", []) + cases.get("hidden", [])
    if arguments.public:
        all_cases = cases.get("public", [])
    if not all_cases:
        print("no cases to judge", file=sys.stderr)
        return 2
    assembly = _bundle_assembly(bundle)

    language = arguments.lang
    if language is None:
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
        language = EXTENSION_LANGUAGE.get(solution.suffix.lstrip("."))
        if language is None:
            print(f"cannot infer language from {solution.suffix}; pass --lang", file=sys.stderr)
            return 2
    _executors_ready()

    failures = _judge_one(solution, invocation, limits, assembly, all_cases)
    return 1 if failures else 0


def main() -> int:
    parser = argparse.ArgumentParser(prog="openoj", description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)

    fmt = sub.add_parser("format", help="format files (or --check / --report json) with the pinned toolchain")
    fmt.add_argument("files", nargs="+", help="files or directories (dirs walk for formattable files)")
    fmt.add_argument("--check", action="store_true", help="report unformatted files, change nothing, exit 1")
    fmt.add_argument(
        "--report",
        choices=["json"],
        help="non-mutating tri-state JSON report per file: formatted | unformatted (+formatted text) | error (+diagnostics); exits 1 only on errors",
    )
    fmt.set_defaults(fn=cmd_format)

    gen = sub.add_parser("gen-starters", help="emit starter.* from problem.json")
    gen.add_argument("problem")
    gen.add_argument("--style", default="modern", choices=["modern", "legacy"])
    gen.set_defaults(fn=cmd_gen_starters)

    judge = sub.add_parser("judge", help="judge every solution in a bundle")
    judge.add_argument("bundle")
    judge.set_defaults(fn=cmd_judge)

    run = sub.add_parser("run", help="run one solution file against its bundle's cases")
    run.add_argument("file", help="solution file (the bundle is discovered by walking up to problem.json)")
    run.add_argument("--public", action="store_true", help="judge only the public cases")
    run.add_argument("--lang", help="override the language inferred from the file extension")
    run.set_defaults(fn=cmd_run)

    arguments = parser.parse_args()
    return arguments.fn(arguments)


if __name__ == "__main__":
    raise SystemExit(main())
