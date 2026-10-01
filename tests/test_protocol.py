"""parse_protocol is the single verdict chokepoint — worker, the CLI's
judge/run, and verify_solution all route through it — so the semantics
its docstring states are pinned here: the LAST parseable protocol line
wins (submission stdout can carry earlier decoy marker lines), only
{completed, runtime_error} are accepted, malformed-JSON marker lines are
skipped rather than aborting the scan, and with no valid line the
runtime_error fallback reports. tests/test_shell_executor.py and
tests/test_sql_flags.py intentionally use first-match local loops; this
file is the only place the last-wins rule is asserted.

Do NOT add "launcher_failure" to _PROTOCOL_STATUSES: it is the sandbox
launcher's own infrastructure marker (see runtime_sandbox.py), not a
verdict a harness may report — adding it would leak that status into
the CLI judge and verify_solution as a parseable result. The worker
attributes launcher failures by scanning the raw protocol-fd capture
itself (worker._launcher_failure, keyed on the per-case nonce); tests
for that path live in tests/test_launcher_failure.py."""

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "runner"))

from protocol import PROTOCOL_PREFIX, parse_protocol

VALID = PROTOCOL_PREFIX + '{"status": "completed", "actual": [1, 2]}'
FALLBACK = {
    "status": "runtime_error",
    "error": "Solution did not produce a valid judge response",
}


class ParseProtocolTests(unittest.TestCase):
    def test_single_valid_line_parses(self):
        self.assertEqual({"status": "completed", "actual": [1, 2]}, parse_protocol(VALID + "\n"))

    def test_decoy_then_garbage_then_harness_line_last_wins(self):
        output = "\n".join(
            [
                PROTOCOL_PREFIX + '{"status": "runtime_error", "error": "decoy"}',
                "submission noise mentioning " + PROTOCOL_PREFIX,
                VALID,
            ]
        )
        self.assertEqual({"status": "completed", "actual": [1, 2]}, parse_protocol(output))

    def test_forged_status_alone_falls_back(self):
        self.assertEqual(FALLBACK, parse_protocol(PROTOCOL_PREFIX + '{"status": "accepted"}'))

    def test_empty_output_falls_back(self):
        self.assertEqual(FALLBACK, parse_protocol(""))

    def test_malformed_json_marker_is_skipped_not_fatal(self):
        output = "\n".join([PROTOCOL_PREFIX + "{not json", VALID])
        self.assertEqual({"status": "completed", "actual": [1, 2]}, parse_protocol(output))

    def test_forged_status_line_does_not_stop_the_reversed_scan(self):
        output = "\n".join([PROTOCOL_PREFIX + '{"status": "accepted"}', VALID])
        self.assertEqual({"status": "completed", "actual": [1, 2]}, parse_protocol(output))

    def test_fallback_payload_is_exact(self):
        # The string flows into worker result rows and verify_solution
        # failure messages, so pin it verbatim.
        for output in ("", "   \n", "no protocol line here\n"):
            self.assertEqual(FALLBACK, parse_protocol(output))


if __name__ == "__main__":
    unittest.main()
