"""The error_line verdict field: the python harness resolves the innermost
solution.py frame (runtime raises, NoneType chains, syntax errors) into a
structured line, harness-frame failures carry none, and the API forwards the
field for visible cases while hidden cases stay redacted."""

import importlib.util
import json
import os
import subprocess
import sys
import tempfile
import unittest
import unittest.mock
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RUNNER = ROOT / "runner"
PROTOCOL_PREFIX = "__CODERPUZZLE_RESULT__"

BASE_INVOCATION = {
    "type": "function",
    "class_name": "Solution",
    "method": "maxDepth",
    "parameters": [{"name": "root", "value_type": {"kind": "integer32"}}],
    "return_type": {"kind": "integer32"},
}


def _run_harness(code: str) -> dict:
    with tempfile.TemporaryDirectory() as scratch:
        solution = Path(scratch) / "solution.py"
        solution.write_text(code, encoding="utf-8")
        read_fd, write_fd = os.pipe()
        try:
            process = subprocess.run(
                [sys.executable, "-S", "python_harness.py", "--", str(solution)],
                input=json.dumps({"invocation": BASE_INVOCATION, "input": [1]}),
                capture_output=True,
                text=True,
                pass_fds=(write_fd,),
                cwd=str(RUNNER),
            )
        finally:
            os.close(write_fd)
        data = os.read(read_fd, 262_144).decode()
        os.close(read_fd)
        lines = [
            line[len(PROTOCOL_PREFIX):]
            for line in (data + "\n" + process.stdout).split("\n")
            if line.startswith(PROTOCOL_PREFIX)
        ]
        if not lines:
            raise AssertionError(f"harness produced no protocol line: {process.stderr[-400:]}")
        return json.loads(lines[-1])


class HarnessErrorLineTests(unittest.TestCase):
    def test_raise_reports_its_line(self):
        verdict = _run_harness(
            'class Solution:\n'
            '    def maxDepth(self, root):\n'
            '        raise NotImplementedError("TODO")\n'
        )
        self.assertEqual(verdict["status"], "runtime_error")
        self.assertEqual(verdict["error_line"], 3)

    def test_none_chain_reports_the_offending_line(self):
        verdict = _run_harness(
            'class Solution:\n'
            '    def maxDepth(self, root):\n'
            '        x = None\n'
            '        return int(x) + 1\n'
        )
        self.assertEqual(verdict["status"], "runtime_error")
        self.assertEqual(verdict["error_line"], 4)

    def test_syntax_error_reports_its_line(self):
        verdict = _run_harness(
            'class Solution:\n'
            '    def maxDepth(self, root)\n'
            '        return 1\n'
        )
        self.assertEqual(verdict["status"], "runtime_error")
        self.assertIn("SyntaxError", verdict["error"])
        self.assertEqual(verdict["error_line"], 2)

    def test_harness_frame_failures_carry_no_line(self):
        # A malformed invocation fails inside the harness itself — no
        # solution frame exists, so no line may be attributed.
        verdict = _run_harness('class Solution:\n    pass\n')
        self.assertEqual(verdict["status"], "runtime_error")
        self.assertIsNone(verdict["error_line"])


class ApiForwardingTests(unittest.TestCase):
    """execute() forwards error_line for visible cases; hidden cases stay
    redacted (test_result_sanitization's _) — stub _submit like
    test_api_surface does and drive judge.execute directly."""

    def _execute(self, raw_results):
        from api.app import judge

        invocation = {"type": "function", "comparison": "exact"}
        cases = [
            {"name": "case-1", "input": {}, "expected": True},
            {"name": "hidden-1", "input": {}, "expected": True},
        ]
        raw = {"status": "runtime_error", "results": raw_results}
        with unittest.mock.patch.object(judge, "_submit", return_value=raw):
            return judge.execute(
                code="class Solution:\n    pass\n",
                language="python3",
                invocation=invocation,
                limits={},
                cases=cases,
                public_count=1,
            )

    def test_visible_case_forwards_error_line(self):
        results = self._execute(
            [
                {"status": "runtime_error", "error": "NotImplementedError: TODO", "error_line": 3},
                {"status": "runtime_error", "error": "hidden"},
            ]
        )
        self.assertEqual(results[0]["error_line"], 3)
        self.assertEqual(results[0]["error"], "NotImplementedError: TODO")

    def test_hidden_case_stays_redacted_without_a_line(self):
        results = self._execute(
            [
                {"status": "completed", "actual": True},
                {"status": "runtime_error", "error": "Secret leak", "error_line": 9},
            ]
        )
        self.assertNotIn("error_line", results[1])
        self.assertEqual(results[1]["error"], "Solution raised an error on a hidden testcase")


if __name__ == "__main__":
    unittest.main()
