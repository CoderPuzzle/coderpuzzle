#!/usr/bin/env python3
"""Judge a bundle's solution*.<ext> files (canonical and named variants)
against every case locally.

Mirrors the runner's execution loop (same executors, same wrappers, same
protocol) but without sandboxing — trusted authoring-time verification.

Usage: verify_solution.py <shard-qualified-bundle-key> [<ext> ...]
       (default exts: every solution.* present in the bundle)

The key is resolved against the sibling coderpuzzle-problems checkout (or
wherever OPENOJ_PROBLEMS_BANK points); local toolchain binaries are
expected on PATH (g++, go, rustc, node, javac/java) next to the repo's
npm-installed tsc.
"""
import json
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPO = Path(os.environ.get(
    "OPENOJ_PROBLEMS_BANK", str(ROOT.parent / "coderpuzzle-problems")))
sys.path.insert(0, str(ROOT))
os.environ.setdefault("OPENOJ_PROBLEMS_DIR", str(REPO / "problems-adapt"))

from api.app.judge import _compare  # noqa: E402
from api.app import problems as problems_module  # noqa: E402
from runner.protocol import parse_protocol  # noqa: E402
from runner.executors import cpp as cpp_exec  # noqa: E402
from runner.executors import go as go_exec  # noqa: E402
from runner.executors import rust as rust_exec  # noqa: E402
from runner.executors import javascript as js_exec  # noqa: E402
from runner.executors import typescript as ts_exec  # noqa: E402
from runner.executors import java as java_exec  # noqa: E402
from runner.executors import python3 as py_exec  # noqa: E402
from runner.executors import sql as sql_exec  # noqa: E402
from runner.executors import shell as shell_exec  # noqa: E402
from runner.executors.base import ExecutorError  # noqa: E402

PROTOCOL_PREFIX = "__CODERPUZZLE_RESULT__"
TSC = str(ROOT / "frontend/node_modules/.bin/tsc")
JAVA_CLASSES = ROOT / ".localonly" / "java-classes"
JAVA_HARNESS = ROOT / "runner" / "java" / "CoderPuzzleJavaHarness.java"
CPP_SHIM = ROOT / "scripts" / "verify_shim"
RUNNER_DIR = ROOT / "runner"
PYTHON = sys.executable


def _ensure_java_cache() -> None:
    """Compile the tracked harness into the local class cache when stale."""
    cached = JAVA_CLASSES / "CoderPuzzleJavaHarness.class"
    if cached.exists() and cached.stat().st_mtime >= JAVA_HARNESS.stat().st_mtime:
        return
    JAVA_CLASSES.mkdir(parents=True, exist_ok=True)
    completed = subprocess.run(
        [shutil.which("javac"), "-proc:none", "-encoding", "UTF-8",
         "-d", str(JAVA_CLASSES), str(JAVA_HARNESS)],
        capture_output=True, text=True, timeout=300,
    )
    if completed.returncode != 0:
        raise RuntimeError(
            f"harness compile failed:\n{completed.stderr[-4000:]}")


def _local_compile(executor, job_root, command, output_path, environment):
    command = list(command)
    if executor.language == "cpp":
        position = command.index("-o")
        command = command[:position] + ["-I", str(CPP_SHIM)] + command[position:]
    completed = subprocess.run(
        command, cwd=job_root,
        env={**environment, "PATH": f"/opt/homebrew/bin:{environment['PATH']}"},
        capture_output=True, text=True, timeout=300,
    )
    if completed.returncode != 0:
        # tsc prints its diagnostics to stdout, not stderr — surface both
        # or a TypeScript failure reports an empty message.
        raise RuntimeError(f"compile failed:\n{(completed.stdout + completed.stderr)[-4000:]}")


def _local_java_prepare(self, job_root, scratch, code, invocation, limits, assembly=None):
    """Plain local javac+java — the container prepare drops privileges."""
    from runner.executors.base import ExecutorError as _Error, PreparedProgram

    _ensure_java_cache()
    class_name = invocation.get("class_name", "Solution")
    source = job_root / f"{class_name}.java"
    source.write_text(code, encoding="utf-8")
    assembly_sources = []
    for name, content in sorted((assembly or {}).get("provided", {}).items()):
        if not name.endswith(".java"):
            continue
        part_dir = job_root / "assembly" / "provided"
        part_dir.mkdir(parents=True, exist_ok=True)
        part_path = part_dir / name
        part_path.write_text(content, encoding="utf-8")
        assembly_sources.append(str(part_path))
    completed = subprocess.run(
        [
            shutil.which("javac"), "-proc:none", "-encoding", "UTF-8",
            "-cp", str(JAVA_CLASSES), "-d", str(job_root), str(source), *assembly_sources,
        ],
        capture_output=True, text=True, timeout=120,
    )
    if completed.returncode != 0:
        raise _Error(f"Compilation failed\n{completed.stderr[-4000:]}")
    return PreparedProgram(
        command=(
            shutil.which("java"),
            "-cp", str(job_root) + os.pathsep + str(JAVA_CLASSES),
            "CoderPuzzleJavaHarness",
        ),
        environment={"PATH": "/usr/bin:/bin", "HOME": str(scratch), "TMPDIR": str(scratch), "LANG": "C.UTF-8"},
    )


def _install_local_paths() -> None:
    node = shutil.which("node")
    cpp_exec.CppExecutor.compiler_path = shutil.which("g++")
    go_exec.GoExecutor.compiler_path = shutil.which("go")
    rust_exec.RustExecutor.compiler_path = shutil.which("rustc")
    js_exec.JavaScriptExecutor.node_path = node
    ts_exec.TypeScriptExecutor.node_path = node
    ts_exec.TypeScriptExecutor.compiler_path = TSC
    java_exec.JavaExecutor.prepare = _local_java_prepare
    py_exec.Python3Executor.python_path = PYTHON
    py_exec.Python3Executor.harness_path = RUNNER_DIR / "python_harness.py"
    sql_exec.SqlExecutor.python_path = PYTHON
    sql_exec.SqlExecutor.harness_path = RUNNER_DIR / "sql_harness.py"
    shell_exec.ShellExecutor.python_path = PYTHON
    shell_exec.ShellExecutor.harness_path = RUNNER_DIR / "shell_harness.py"
    for module in (cpp_exec, go_exec, rust_exec, ts_exec):
        module.CompiledExecutor.compile = _local_compile
    # the python harness resolves /runner on its sys.path; running it from
    # the runner directory puts leetcode_types.py next to it
    for executor_class in (py_exec.Python3Executor, sql_exec.SqlExecutor, shell_exec.ShellExecutor):
        original = executor_class.prepare

        def patched(self, job_root, scratch, code, invocation, limits, assembly=None, _original=original):
            program = _original(self, job_root, scratch, code, invocation, limits, assembly)
            command = list(program.command)
            command[0] = PYTHON
            # -I omits the script directory from sys.path, which the local
            # harness relies on to import leetcode_types next to itself
            command = [argument for argument in command if argument not in ("-I", "-S")]
            return type(program)(command=tuple(command), environment=program.environment)

        executor_class.prepare = patched


EXECUTORS = {
    "cpp": cpp_exec.CppExecutor,
    "go": go_exec.GoExecutor,
    "rust": rust_exec.RustExecutor,
    "javascript": js_exec.JavaScriptExecutor,
    "typescript": ts_exec.TypeScriptExecutor,
    "java": java_exec.JavaExecutor,
    "python3": py_exec.Python3Executor,
    "sql": sql_exec.SqlExecutor,
    "shell": shell_exec.ShellExecutor,
}
EXTENSION_TO_LANGUAGE = {
    "py": "python3", "js": "javascript", "ts": "typescript",
    "java": "java", "cpp": "cpp", "go": "go", "rust": "rust", "rs": "rust", "sql": "sql",
    "sh": "shell",
}


COMMON_DIRECTORIES = {
    "python3": "python", "java": "java", "cpp": "cpp", "go": "go",
    "rust": "rust", "typescript": "typescript", "javascript": "javascript",
}


def _assembly_sources(bundle: Path, language: str) -> dict:
    """Judge-assembly sources for a bundle: the bundle's own provided/
    directory (same contract as the api's _assembly_sources) — the judge
    holds no predefined data structures of its own; every well-known type
    a bundle's wire needs is that bundle's own provided/ source."""
    directory = COMMON_DIRECTORIES.get(language)
    if directory is None:
        return {}
    assembly = {"provided": {}}
    provided_dir = bundle / "provided" / directory
    if provided_dir.is_dir():
        for path in sorted(provided_dir.iterdir()):
            if path.is_file():
                assembly["provided"][path.name] = path.read_text(encoding="utf-8")
    return assembly


def run_cases(bundle: Path, solution: Path) -> tuple[bool, str]:

    problems_module.PROBLEMS_DIR = bundle.parent.resolve()
    slug = bundle.name.split("_", 1)[1]
    problem = problems_module.load_problem(slug)
    cases, _ = problems_module.load_all_cases(slug)
    invocation = problem["invocation"]
    comparison = invocation.get("comparison", "exact")
    extension = solution.name.rsplit(".", 1)[1]
    language = EXTENSION_TO_LANGUAGE[extension]
    code = solution.read_text(encoding="utf-8")
    executor = EXECUTORS[language]()
    time_limit = max(problem["limits"].get("time_ms", 1500) * 3, 5000) / 1000

    passed = 0
    with tempfile.TemporaryDirectory(prefix="openoj-verify-") as directory:
        job_root = Path(directory)
        scratch = job_root / "scratch"
        scratch.mkdir()
        try:
            program = executor.prepare(job_root, scratch, code, invocation, problem["limits"], _assembly_sources(bundle, language))
        except (ExecutorError, RuntimeError) as error:
            return False, f"prepare/compile failed: {str(error)[:2000]}"
        for index, case in enumerate(cases):
            if getattr(executor, "encode_case_with_limits", False):
                payload = executor.encode_case(invocation, case["input"], problem["limits"])
            else:
                payload = executor.encode_case(invocation, case["input"])
            try:
                completed = subprocess.run(
                    program.command, cwd=scratch, input=payload,
                    capture_output=True, timeout=time_limit,
                    env={**program.environment, "PATH": f"/opt/homebrew/bin:{program.environment.get('PATH', '')}"},
                )
            except subprocess.TimeoutExpired:
                return False, f"case {index + 1}: time limit exceeded"
            output = completed.stdout.decode("utf-8", errors="replace")
            if PROTOCOL_PREFIX not in output:
                return False, f"case {index + 1}: no protocol output (exit {completed.returncode}): {output[-800:]}"
            # The judge's own parser (runner/protocol.py): last marker line
            # wins, malformed lines are skipped — a verdict here means the
            # same thing it does on the live judge.
            result = parse_protocol(output)
            if result.get("status") != "completed":
                return False, f"case {index + 1} ({case.get('name', '')}): {result.get('status')}: {str(result.get('error'))[:500]}"
            if not _compare(result.get("actual"), case["expected"], comparison, case.get("input")):
                return False, (
                    f"case {index + 1} ({case.get('name', '')}): expected "
                    f"{json.dumps(case['expected'])[:200]} got {json.dumps(result.get('actual'))[:200]}"
                )
            passed += 1
    return True, f"{passed}/{len(cases)} cases passed"


def main() -> None:
    _install_local_paths()
    if len(sys.argv) < 2:
        raise SystemExit("usage: verify_solution.py <shard-qualified-bundle-key> [<ext> ...] [--solution <file>]")
    key = sys.argv[1]
    # Shard-qualified key under the adapted tree: either
    # "problems-adapt/<shard>/<id>_<slug>" or "<shard>/<id>_<slug>".
    bundle = (REPO / key).resolve()
    if not bundle.is_dir():
        bundle = (REPO / "problems-adapt" / key).resolve()
    if not bundle.is_dir():
        raise SystemExit(f"no bundle directory for {key!r} under {REPO}")
    key = bundle.name
    arguments = sys.argv[2:]
    # --solution judges a file that lives outside the bundle against this
    # bundle's cases; the adaptation program's compatibility gate uses it
    # to run the *source* problem's reference solution here.
    external: list[Path] = []
    while "--solution" in arguments:
        index = arguments.index("--solution")
        if index + 1 >= len(arguments):
            raise SystemExit("--solution requires a file path")
        external.append(Path(arguments[index + 1]).resolve())
        del arguments[index : index + 2]
    if external and arguments:
        raise SystemExit("extension filters cannot be combined with --solution")
    solutions = external or sorted(
        path for path in bundle.iterdir()
        if path.name.startswith("solution")
        and path.name.rsplit(".", 1)[-1] in EXTENSION_TO_LANGUAGE
    )
    wanted = arguments
    if wanted and not external:
        suffixes = {f".{w}" for w in wanted}
        solutions = [p for p in solutions if ("." + p.name.rsplit(".", 1)[1]) in suffixes]
    if not solutions:
        # A filter that matches nothing must fail loudly: this script is a
        # gate, and silently judging zero solutions would exit 0.
        raise SystemExit(
            f"no solution files to judge in {bundle}"
            + (f" matching {sorted(wanted)}" if wanted and not external else "")
        )
    failures = 0
    for solution in solutions:
        label = solution.name[len("solution") : -len(solution.name.rsplit(".", 1)[1]) - 1]
        ok, message = run_cases(bundle, solution)
        print(f"{'OK  ' if ok else 'FAIL'} {key} [{solution.name.rsplit('.', 1)[1]}{label}] {message}")
        failures += 0 if ok else 1
    raise SystemExit(1 if failures else 0)


if __name__ == "__main__":
    main()
