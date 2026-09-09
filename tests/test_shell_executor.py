import json
import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

from runner.executors import get_executor
from runner.executors.base import ExecutorError
from runner.executors.shell import ShellExecutor

ROOT = Path(__file__).resolve().parent.parent
RUNNER = ROOT / "runner"
PROTOCOL_PREFIX = "__CODERPUZZLE_RESULT__"


def run_shell(script: str, case_input: str, *, output_kb: int = 64) -> dict:
    with tempfile.TemporaryDirectory() as job:
        script_path = Path(job) / "solution.sh"
        script_path.write_text(script, encoding="utf-8")
        environment = {
            **os.environ,
            "PATH": "/usr/local/bin:/usr/bin:/bin",
            "PYTHONPATH": str(RUNNER),
            "TMPDIR": job,
            "CODERPUZZLE_OUTPUT_KB": str(output_kb),
        }
        process = subprocess.run(
            [sys.executable, str(RUNNER / "shell_harness.py"), "--", str(script_path)],
            input=case_input.encode(),
            capture_output=True,
            env=environment,
            timeout=10,
            check=False,
        )
    for line in process.stdout.decode().splitlines():
        if line.startswith(PROTOCOL_PREFIX):
            return json.loads(line[len(PROTOCOL_PREFIX) :])
    raise AssertionError(f"no protocol line; stderr={process.stderr[:800]!r}")


class ShellHarnessTests(unittest.TestCase):
    def test_raw_stdin_becomes_the_judged_string(self) -> None:
        case_input = "\n".join(f"Line {index}" for index in range(1, 12)) + "\n"
        response = run_shell("awk 'NR==10 { print; exit }'\n", case_input)
        self.assertEqual("completed", response["status"])
        self.assertEqual("Line 10", response["actual"])

    def test_trailing_newlines_are_not_part_of_the_value(self) -> None:
        response = run_shell("printf '  padded  \\n\\n'\n", "")
        self.assertEqual("completed", response["status"])
        self.assertEqual("  padded  ", response["actual"])

    def test_nonzero_exit_reports_stderr(self) -> None:
        response = run_shell("printf 'boom\\n' >&2\nexit 3\n", "")
        self.assertEqual("runtime_error", response["status"])
        self.assertIn("boom", response["error"])

    def test_output_limit_is_enforced(self) -> None:
        response = run_shell("yes x | head -c 2048\n", "", output_kb=1)
        self.assertEqual("runtime_error", response["status"])
        self.assertIn("Output limit exceeded", response["error"])


class ShellExecutorTests(unittest.TestCase):
    def test_registry_contains_shell(self) -> None:
        self.assertIsInstance(get_executor("shell"), ShellExecutor)

    def test_case_input_is_raw_utf8(self) -> None:
        executor = ShellExecutor()
        self.assertEqual(b"alpha\nbeta\n", executor.encode_case({}, "alpha\nbeta\n"))
        with self.assertRaises(ExecutorError):
            executor.encode_case({}, ["alpha", "beta"])

    def test_prepare_accepts_empty_but_rejects_real_assembly(self) -> None:
        executor = ShellExecutor()
        with tempfile.TemporaryDirectory() as job:
            root = Path(job)
            scratch = root / "scratch"
            scratch.mkdir()
            program = executor.prepare(
                root,
                scratch,
                "printf 'ok\\n'\n",
                {"type": "shell", "comparison": "exact"},
                {"output_kb": 7},
                {"provided": {}},
            )
            self.assertEqual("7", program.environment["CODERPUZZLE_OUTPUT_KB"])
            self.assertEqual("solution.sh", Path(program.command[-1]).name)

        with tempfile.TemporaryDirectory() as job:
            root = Path(job)
            scratch = root / "scratch"
            scratch.mkdir()
            with self.assertRaises(ExecutorError):
                executor.prepare(
                    root,
                    scratch,
                    "true\n",
                    {"type": "shell"},
                    {},
                    {"provided": {"helper.sh": "true\n"}},
                )


if __name__ == "__main__":
    unittest.main()
