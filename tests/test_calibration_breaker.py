"""The calibration sweep must not publish a matrix built on a broken host.

The 2026-09-14 production sweep filled the runner's /tmp partway through and
then recorded 8,551 "reference failures" across every remaining problem and
language. The artifact looked complete, so every combination it touched would
have been blocked on host noise rather than a corpus defect. A run of
consecutive failures now aborts the sweep and leaves calibration.json
unwritten; the checkpoint keeps the good records for a resume.
"""
import json
import tempfile
import unittest
from pathlib import Path
from unittest import mock

from api.app import calibrate, calibration, problems


def _bundle(directory: Path, index: int) -> None:
    slug = f"demo-{index}"
    bundle = directory / f"{index:04d}_{slug}"
    bundle.mkdir()
    (bundle / "problem.json").write_text(json.dumps({
        "schema_version": 2,
        "reference_solution": "",
        "id": index,
        "slug": slug,
        "title": f"Demo {index}",
        "difficulty": "Easy",
        "tags": ["Array"],
        "topics": ["Array"],
        "type": "Algorithms",
        "invocation": {
            "type": "function",
            "class_name": "Solution",
            "method": "demo",
            "parameters": [{
                "name": "values",
                "codec": "json",
                "value_type": {"kind": "array", "items": {"kind": "integer", "bits": 32}},
            }],
            "return_codec": "json",
            "return_type": {"kind": "integer", "bits": 32},
            "comparison": "exact",
        },
        "limits": {"time_ms": 1500, "memory_mb": 256, "output_kb": 64},
    }), encoding="utf-8")
    (bundle / "cases.json").write_text(
        json.dumps({"public": [{"input": [[1, 2]], "expected": 3}], "hidden": []}), encoding="utf-8")
    (bundle / "statement.md").write_text(
        f"# Demo {index}\n\n## Description\n\nSum the values.\n\n"
        "### Example 1\n\n```text\nInput: values = [1, 2]\nOutput: 3\n```\n\n"
        "### Constraints\n\n- 1 <= values.length\n", encoding="utf-8")
    (bundle / "solutions.md").write_text(
        f"# Demo {index}\n\nOne shared pin, stated once.\n\n"
        "## Direct Sweep\n\nThe direct reading.\n\n"
        "**Complexity:** `O(n)` time, `O(1)` space.\n", encoding="utf-8")
    (bundle / "starter.py").write_text(
        "from typing import List\n\n\nclass Solution:\n"
        "    def demo(self, values: List[int]) -> int:\n"
        "        raise NotImplementedError(\"TODO\")\n", encoding="utf-8")
    (bundle / "solution.py").write_text("# canonical\n", encoding="utf-8")


class CalibrationBreakerTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        root = Path(self.temporary.name)
        self.problems_dir = (root / "problems").resolve()
        self.problems_dir.mkdir()
        # Comfortably more bundles than the breaker's limit so the abort
        # happens well before the sweep would end on its own.
        for index in range(1, calibrate.CONSECUTIVE_FAILURE_LIMIT + 10):
            _bundle(self.problems_dir, index)
        self.calibration_dir = (root / "calibration").resolve()
        self.calibration_dir.mkdir()

        original_problems = problems.PROBLEMS_DIR
        self.addCleanup(setattr, problems, "PROBLEMS_DIR", original_problems)
        problems.PROBLEMS_DIR = self.problems_dir

        for module, name, value in (
            (calibration, "CALIBRATION_DIR", self.calibration_dir),
            (calibration, "CALIBRATION_FILE", self.calibration_dir / "calibration.json"),
            (calibrate, "PROGRESS_FILE", self.calibration_dir / "calibration-progress.json"),
        ):
            self.addCleanup(setattr, module, name, getattr(module, name))
            setattr(module, name, value)

    def _run(self, judge_result):
        # main() parses sys.argv itself.
        with mock.patch.object(calibrate, "_run_judge", side_effect=judge_result) as judged, \
                mock.patch("sys.argv", ["app.calibrate"]):
            code = calibrate.main()
        return code, judged

    def test_a_broken_host_aborts_without_publishing(self):
        """Every reference "failing" is a host verdict, not 40 corpus bugs."""
        code, judged = self._run(lambda *args, **kwargs: [
            {"index": 0, "status": "compile_error"}])
        self.assertEqual(code, 2)
        self.assertFalse(calibration.CALIBRATION_FILE.exists(),
                         "a matrix whose tail is host noise must never be published")
        self.assertEqual(judged.call_count, calibrate.CONSECUTIVE_FAILURE_LIMIT,
                         "the sweep must stop at the limit, not run the whole corpus")

    def test_the_checkpoint_survives_the_abort(self):
        progress = calibrate.PROGRESS_FILE
        self._run(lambda *args, **kwargs: [{"index": 0, "status": "compile_error"}])
        self.assertTrue(progress.exists(), "the resume checkpoint must outlive the abort")
        recorded = json.loads(progress.read_text(encoding="utf-8"))
        self.assertEqual(len(recorded["failures"]), calibrate.CONSECUTIVE_FAILURE_LIMIT)

    def test_scattered_failures_do_not_trip_the_breaker(self):
        """A genuinely bad bundle among healthy ones still records and continues."""
        calls = {"n": 0}

        def judge(*args, **kwargs):
            calls["n"] += 1
            if calls["n"] % 3 == 0:
                return [{"index": 0, "status": "wrong_answer"}]
            return [{"index": 0, "status": "accepted", "wall_time_ms": 5}]

        code, judged = self._run(judge)
        self.assertEqual(code, 0)
        self.assertTrue(calibration.CALIBRATION_FILE.exists())
        published = json.loads(calibration.CALIBRATION_FILE.read_text(encoding="utf-8"))
        self.assertEqual(len(published["records"]) + len(published["failures"]), judged.call_count)
        self.assertTrue(published["failures"], "the real per-bundle failures still belong in the matrix")


if __name__ == "__main__":
    unittest.main()
