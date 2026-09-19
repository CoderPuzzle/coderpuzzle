"""The completeness gate runs in front of every judged request.

`prerequisite()` used to resolve each slug back to its bundle and glob it,
which costs four tree-wide globs per bundle: 144 s on the served corpus, past
the web proxy's 120 s read timeout, so judging returned 504 no matter how
complete the calibration was. It also re-parsed the whole published file on
every record lookup. Both are single-walk/cached now, and both must stay
correct across a republish.
"""
import json
import tempfile
import unittest
from pathlib import Path
from unittest import mock

from api.app import calibration, problems

from test_calibration_breaker import _bundle


class StarterLanguageScanTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.problems_dir = (Path(self.temporary.name) / "problems").resolve()
        self.problems_dir.mkdir()
        for index in range(1, 4):
            _bundle(self.problems_dir, index)
        patcher = mock.patch.object(problems, "PROBLEMS_DIR", self.problems_dir)
        patcher.start()
        self.addCleanup(patcher.stop)

    def test_every_bundle_starter_pair_is_found(self):
        self.assertEqual(
            {("demo-1", "python3"), ("demo-2", "python3"), ("demo-3", "python3")},
            problems.starter_languages(),
        )

    def test_it_agrees_with_resolving_each_slug_separately(self):
        """The slow path this replaced, kept as the oracle."""
        expected = {
            (item["slug"], problems.EXTENSION_LANGUAGE[starter.suffix[1:]])
            for item in problems.list_problems()
            for starter in problems.safe_problem_path(item["slug"]).glob("starter.*")
            if starter.suffix[1:] in problems.EXTENSION_LANGUAGE
        }
        self.assertEqual(expected, problems.starter_languages())

    def test_a_language_added_to_a_bundle_is_picked_up(self):
        self.assertNotIn(("demo-1", "go"), problems.starter_languages())
        (self.problems_dir / "0001_demo-1" / "starter.go").write_text("package main\n")
        self.assertIn(("demo-1", "go"), problems.starter_languages())

    def test_files_that_are_not_starters_are_ignored(self):
        (self.problems_dir / "0001_demo-1" / "starter.txt").write_text("not a language\n")
        self.assertEqual(3, len(problems.starter_languages()))


class CalibrationCacheTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        root = Path(self.temporary.name)
        self.calibration_file = root / "calibration.json"
        patcher = mock.patch.object(calibration, "CALIBRATION_FILE", self.calibration_file)
        patcher.start()
        self.addCleanup(patcher.stop)
        self._write([{"slug": "demo-1", "language": "python3",
                      "reference_walltime_ms": 7, "timeout_ms": 70, "case_count": 1}])

    def _write(self, rows):
        self.calibration_file.write_text(
            json.dumps({"schema_version": 1, "records": rows}), encoding="utf-8")

    def test_a_lookup_does_not_reparse_the_file(self):
        calibration.load()
        with mock.patch.object(calibration.json, "loads", side_effect=AssertionError("reparsed")):
            self.assertIsNotNone(calibration.lookup("demo-1", "python3"))

    def test_a_republished_file_is_picked_up(self):
        # The key is (mtime, size), so change the size too rather than rely on
        # the filesystem's mtime resolution to separate two quick writes.
        self.assertIsNone(calibration.lookup("demo-2", "python3"))
        self._write([{"slug": "demo-2", "language": "python3",
                      "reference_walltime_ms": 9, "timeout_ms": 90, "case_count": 1,
                      "slowest_case_ms": 4, "observed_job_ms": 900}])
        self.assertIsNotNone(calibration.lookup("demo-2", "python3"))
        self.assertIsNone(calibration.lookup("demo-1", "python3"))

    def test_a_missing_file_reads_as_no_calibration(self):
        self.calibration_file.unlink()
        self.assertIsNone(calibration.load())
        self.assertEqual({}, calibration.records())


if __name__ == "__main__":
    unittest.main()


class PerPairGateTests(unittest.TestCase):
    """An unmeasurable bundle must cost exactly its own pair.

    The sweep left 3 of 25,505 pairs unmeasured -- one C++ bundle with
    undefined behaviour, one Java reference above the JVM heap cap, one
    Python case past its deadline. Because the gate demanded full coverage,
    those three returned 503 for *every* problem, and for registration and
    login besides. The judge path already refuses an unmeasured pair by
    itself, so coverage is reported, not enforced.
    """

    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        root = Path(self.temporary.name)
        self.problems_dir = (root / "problems").resolve()
        self.problems_dir.mkdir()
        for index in range(1, 4):
            _bundle(self.problems_dir, index)
        self.calibration_file = root / "calibration.json"
        for module, name, value in (
            (problems, "PROBLEMS_DIR", self.problems_dir),
            (calibration, "CALIBRATION_FILE", self.calibration_file),
            (calibration, "REQUIRED", True),
        ):
            patcher = mock.patch.object(module, name, value)
            patcher.start()
            self.addCleanup(patcher.stop)
        # demo-3 is the bundle nothing could measure
        self._write(["demo-1", "demo-2"])

    def _write(self, slugs):
        self.calibration_file.write_text(json.dumps({
            "schema_version": 1,
            "records": [{"slug": s, "language": "python3", "reference_walltime_ms": 7,
                         "timeout_ms": 70, "case_count": 1} for s in slugs],
        }), encoding="utf-8")

    def test_a_partial_calibration_still_serves(self):
        ok, detail = calibration.usable()
        self.assertTrue(ok, detail)
        calibration.enforce()  # must not raise

    def test_the_measured_pairs_keep_their_records(self):
        self.assertIsNotNone(calibration.lookup("demo-1", "python3"))
        self.assertIsNotNone(calibration.lookup("demo-2", "python3"))

    def test_only_the_unmeasured_pair_has_no_record(self):
        self.assertIsNone(calibration.lookup("demo-3", "python3"))
        self.assertEqual({("demo-3", "python3")}, calibration.missing())

    def test_coverage_is_still_reported(self):
        ok, detail = calibration.prerequisite()
        self.assertFalse(ok)
        self.assertIn("missing 1", detail)

    def test_no_calibration_at_all_still_refuses_service(self):
        self.calibration_file.unlink()
        ok, _ = calibration.usable()
        self.assertFalse(ok)
        with self.assertRaises(Exception):
            calibration.enforce()

    def test_a_corrupt_timing_still_refuses_service(self):
        self.calibration_file.write_text(json.dumps({
            "schema_version": 1,
            "records": [{"slug": "demo-1", "language": "python3",
                         "reference_walltime_ms": 0, "timeout_ms": 0, "case_count": 1}],
        }), encoding="utf-8")
        ok, detail = calibration.usable()
        self.assertFalse(ok)
        self.assertIn("invalid timing", detail)


class RatioComparabilityTests(unittest.TestCase):
    """A ratio is only a ratio when both halves were timed the same way."""

    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.calibration_file = Path(self.temporary.name) / "calibration.json"
        patcher = mock.patch.object(calibration, "CALIBRATION_FILE", self.calibration_file)
        patcher.start()
        self.addCleanup(patcher.stop)

    def _write(self, **extra):
        payload = {
            "schema_version": 1,
            "scored_quantity": "algorithm",
            "records": [{"slug": "demo-1", "language": "python3",
                         "reference_walltime_ms": 7, "timeout_ms": 70, "case_count": 1,
                         "reference_algorithm_us": 900}],
        }
        payload.update(extra)
        self.calibration_file.write_text(json.dumps(payload), encoding="utf-8")

    def test_the_same_mode_and_profile_compare(self):
        self._write(timing_mode="wall", resource_profile="shared-wall-v1")
        self.assertTrue(calibration.comparable("wall", "shared-wall-v1"))

    def test_a_different_timing_mode_does_not(self):
        self._write(timing_mode="wall", resource_profile="shared-wall-v1")
        self.assertFalse(calibration.comparable("cpu", "shared-wall-v1"))

    def test_a_different_resource_profile_does_not(self):
        self._write(timing_mode="wall", resource_profile="shared-wall-v1")
        self.assertFalse(calibration.comparable("wall", "isolated-cpu-v1"))

    def test_an_artifact_without_timing_fields_is_still_trusted_when_scored_quantity_matches(self):
        """Written before the sweep recorded timing_mode/resource_profile: those
        two keys still say nothing either way. scored_quantity must match."""
        self._write()
        self.assertTrue(calibration.comparable("cpu", "isolated-cpu-v1"))

    def test_a_legacy_wall_artifact_is_not_trusted_for_algorithm_ratios(self):
        """Every artifact before algorithm timing measured wall-process time.
        Missing scored_quantity must not silently divide µs by ms."""
        self._write(scored_quantity=None)
        # json.dumps drops None if we pass it as value — force omit instead.
        payload = json.loads(self.calibration_file.read_text())
        payload.pop("scored_quantity", None)
        self.calibration_file.write_text(json.dumps(payload), encoding="utf-8")
        self.assertFalse(calibration.comparable("wall", "shared-wall-v1"))

