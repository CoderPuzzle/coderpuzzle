"""The sandbox launcher's failure marker must attribute to system_error,
and nothing else may.

runtime_sandbox.py writes a ``__CODERPUZZLE_RESULT__`` launcher_failure
line carrying the per-case nonce on every exit-126 path before execvpe
(the nonce is popped from the environment first, so the submission never
sees it and cannot forge the marker). parse_protocol deliberately
rejects that status — it is infrastructure, not a harness verdict, and
must never leak into verify_solution or the CLI judge as a parseable
result — so worker.py scans the raw protocol-fd capture itself via
``_launcher_failure`` and only rewrites the verdict when the exit code
is 126 AND the capture carries a marker with the matching nonce. A
submission's own exit 126 (with no marker, a wrong-nonce marker, or a
genuine completed line) stays the submission's own verdict. These tests
pin both directions, end to end through _run_case with a stubbed sandbox
command."""

import json
import os
import shutil
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "runner"))

from protocol import PROTOCOL_PREFIX, parse_protocol
from worker import _launcher_failure

NONCE = "3f2a9c1e7b4d5f6e8a9b0c1d2e3f4a5b"
RUNTIME_ERROR_FALLBACK = {
    "status": "runtime_error",
    "error": "Solution did not produce a valid judge response",
}


def marker(nonce: str) -> str:
    return PROTOCOL_PREFIX + json.dumps({"status": "launcher_failure", "nonce": nonce})


class HelperTests(unittest.TestCase):
    def test_matching_nonce_marker_is_recognized(self):
        self.assertTrue(_launcher_failure(marker(NONCE) + "\n", NONCE))

    def test_earlier_lines_do_not_block_a_matching_last_line(self):
        output = "\n".join(["noise mentioning " + PROTOCOL_PREFIX, marker("earlier"), marker(NONCE)])
        self.assertTrue(_launcher_failure(output, NONCE))

    def test_stale_or_malformed_markers_never_match(self):
        self.assertFalse(_launcher_failure(marker("stale") + "\n", NONCE))
        self.assertFalse(_launcher_failure(PROTOCOL_PREFIX + "{not json\n", NONCE))
        self.assertFalse(_launcher_failure("", NONCE))

    def test_wrong_or_missing_nonce_is_rejected(self):
        self.assertFalse(_launcher_failure(marker("forged") + "\n", NONCE))
        no_nonce = PROTOCOL_PREFIX + json.dumps({"status": "launcher_failure"})
        self.assertFalse(_launcher_failure(no_nonce + "\n", NONCE))

    def test_other_statuses_are_not_launcher_failures(self):
        completed = PROTOCOL_PREFIX + '{"status": "completed", "actual": [1]}'
        self.assertFalse(_launcher_failure(completed + "\n", NONCE))

    def test_parse_protocol_never_returns_the_launcher_status(self):
        # The chokepoint must keep rejecting the marker so the status can
        # never surface outside the worker as a parseable verdict.
        self.assertEqual(RUNTIME_ERROR_FALLBACK, parse_protocol(marker(NONCE) + "\n"))


class RunCaseAttributionTests(unittest.TestCase):
    """Drive the real _run_case with a stubbed sandbox command that exits
    126 after (optionally) writing lines to the protocol fd."""

    @classmethod
    def setUpClass(cls):
        import worker

        cls.worker = worker

    def stub_body(self, statements: list[str], exit_code: int) -> str:
        # The stub stands in for runtime_sandbox.py: the worker spawns it
        # as (SUPERVISOR_PYTHON, RUNTIME_SANDBOX, ...) with the nonce in
        # the environment and the protocol fd inherited, so it can write
        # exactly the lines the real launcher (or a misbehaving
        # submission) would.
        return "import json, os, sys\n" + "\n".join(statements) + f"\nsys.exit({exit_code})\n"

    def write_protocol_line(self, payload: str) -> str:
        """One os.write(63, ...) statement emitting a single protocol
        line; ``payload`` is a stub-side Python expression for the line's
        content after the marker prefix."""
        return "os.write(63, (" + repr(PROTOCOL_PREFIX) + " + " + payload + " + '\\n').encode())"

    def launcher_marker(self, nonce_expression: str) -> str:
        return self.write_protocol_line(
            "json.dumps({'status': 'launcher_failure', 'nonce': " + nonce_expression + "})"
        )

    def run_case(self, stub_body: str) -> dict:
        from executors.base import PreparedProgram

        stub = Path(tempfile.mkstemp(prefix="stub-sandbox-", suffix=".py")[1])
        stub.write_text(stub_body, encoding="utf-8")

        class Executor:
            language = "python3"
            address_space_overhead_mb = 256
            max_processes = 16

            def encode_case(self, invocation, case):
                return b""

        class SharedManager:
            isolated = False
            profile = "test-shared"

            def validate(self):
                return None

        saved = (
            self.worker.RESOURCES,
            self.worker.CALIBRATION_FACTORS.get("python3"),
            self.worker.SUPERVISOR_PYTHON,
            self.worker.RUNTIME_SANDBOX,
            self.worker.NOBODY_UID,
            self.worker.NOBODY_GID,
        )
        self.worker.RESOURCES = SharedManager()
        self.worker.CALIBRATION_FACTORS["python3"] = 1
        self.worker.SUPERVISOR_PYTHON = sys.executable
        self.worker.RUNTIME_SANDBOX = str(stub)
        self.worker.NOBODY_UID = os.getuid()
        self.worker.NOBODY_GID = os.getgid()
        root = Path(tempfile.mkdtemp(prefix="launcher-failure-"))
        root.chmod(0o755)
        try:
            return self.worker._run_case(
                root,
                [],
                {},
                {"time_ms": 2000, "memory_mb": 256, "threads": 0},
                Executor(),
                PreparedProgram((sys.executable, "-c", "pass"), {}),
            )
        finally:
            scratch = root / "scratch"
            if scratch.exists():
                os.chown(scratch, os.getuid(), os.getgid())
                scratch.chmod(0o700)
            shutil.rmtree(root, ignore_errors=True)
            stub.unlink(missing_ok=True)
            (
                self.worker.RESOURCES,
                factor,
                self.worker.SUPERVISOR_PYTHON,
                self.worker.RUNTIME_SANDBOX,
                self.worker.NOBODY_UID,
                self.worker.NOBODY_GID,
            ) = saved
            if factor is None:
                self.worker.CALIBRATION_FACTORS.pop("python3", None)
            else:
                self.worker.CALIBRATION_FACTORS["python3"] = factor
            self.worker._reap_orphans()

    def test_matching_marker_exit_126_is_system_error(self):
        result = self.run_case(
            self.stub_body([self.launcher_marker("os.environ.get('CODERPUZZLE_RUN_NONCE', '')")], 126)
        )
        self.assertEqual("system_error", result["status"], result)
        self.assertEqual("Runtime launcher failed", result["error"])

    def test_wrong_nonce_marker_is_the_submissions_own_runtime_error(self):
        result = self.run_case(self.stub_body([self.launcher_marker("'forged'")], 126))
        self.assertEqual("runtime_error", result["status"], result)
        self.assertEqual("Solution did not produce a valid judge response", result["error"])

    def test_silent_exit_126_is_the_submissions_own_runtime_error(self):
        result = self.run_case(self.stub_body([], 126))
        self.assertEqual("runtime_error", result["status"], result)
        self.assertEqual("Solution did not produce a valid judge response", result["error"])

    def test_own_completed_marker_with_exit_126_is_runtime_error(self):
        # A submission that reports a result but exits non-zero is judged
        # by its own exit code — the launcher-marker rule must not rescue
        # it, and its nonce-blind marker must not frame the launcher.
        result = self.run_case(
            self.stub_body([self.write_protocol_line("json.dumps({'status': 'completed', 'actual': [1]})")], 126)
        )
        self.assertEqual("runtime_error", result["status"], result)
        self.assertEqual("python3 exited with status 126", result["error"])

    def test_zero_exit_with_harness_verdict_judges_normally(self):
        # Control: the same plumbing with a 0-exiting stub reports the
        # harness verdict unchanged.
        result = self.run_case(
            self.stub_body([self.write_protocol_line("json.dumps({'status': 'completed', 'actual': [1]})")], 0)
        )
        self.assertEqual("completed", result["status"], result)
        self.assertEqual([1], result["actual"])


if __name__ == "__main__":
    unittest.main()
