"""Resuming a calibration checkpoint must survive a deploy.

Two defects found after the 2026-09-14 production run:

- the hardware fingerprint hashed platform.node(), which inside a container
  is the container id. Any deploy recreates the container, so the resume
  check failed and would have discarded 16,931 valid records (~20 h of
  measurement) to start from zero.
- the resume carried the previous run's failures into the new artifact even
  though every one of them is retried, so combinations that had since
  passed would still be published as failures.
"""
import json
import tempfile
import unittest
from pathlib import Path
from unittest import mock

from api.app import calibrate, calibration, problems

from test_calibration_breaker import _bundle


class HardwareIdentityTests(unittest.TestCase):
    def test_a_recreated_container_is_the_same_hardware(self):
        """A new container id must not invalidate a checkpoint."""
        current = calibrate.hardware_snapshot()
        stored = dict(current)
        stored["hostname"] = "0123456789ab"
        stored["fingerprint"] = "stale-value-from-the-old-hash"
        self.assertTrue(calibrate.same_hardware(stored, current))

    def test_hostname_is_outside_the_fingerprint(self):
        with mock.patch("platform.node", return_value="container-one"):
            first = calibrate.hardware_snapshot()
        with mock.patch("platform.node", return_value="container-two"):
            second = calibrate.hardware_snapshot()
        self.assertNotEqual(first["hostname"], second["hostname"])
        self.assertEqual(first["fingerprint"], second["fingerprint"])

    def test_different_hardware_is_rejected(self):
        current = calibrate.hardware_snapshot()
        for key, value in (("cpu_model", "Some Other CPU"),
                           ("logical_cpus", (current["logical_cpus"] or 0) + 4),
                           ("memory_total_kib", 123456)):
            with self.subTest(key=key):
                stored = dict(current)
                stored[key] = value
                stored["fingerprint"] = "does-not-match"
                self.assertFalse(calibrate.same_hardware(stored, current))

    def test_a_checkpoint_without_identity_fields_is_rejected(self):
        self.assertFalse(calibrate.same_hardware({"fingerprint": "x"}, calibrate.hardware_snapshot()))
        self.assertFalse(calibrate.same_hardware(None, calibrate.hardware_snapshot()))


class ResumeTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        root = Path(self.temporary.name)
        self.problems_dir = (root / "problems").resolve()
        self.problems_dir.mkdir()
        for index in range(1, 4):
            _bundle(self.problems_dir, index)
        self.calibration_dir = (root / "calibration").resolve()
        self.calibration_dir.mkdir()

        original = problems.PROBLEMS_DIR
        self.addCleanup(setattr, problems, "PROBLEMS_DIR", original)
        problems.PROBLEMS_DIR = self.problems_dir

        for module, name, value in (
            (calibration, "CALIBRATION_DIR", self.calibration_dir),
            (calibration, "CALIBRATION_FILE", self.calibration_dir / "calibration.json"),
            (calibrate, "PROGRESS_FILE", self.calibration_dir / "calibration-progress.json"),
        ):
            self.addCleanup(setattr, module, name, getattr(module, name))
            setattr(module, name, value)

    def _write_checkpoint(self, *, hostname: str) -> None:
        hardware = dict(calibrate.hardware_snapshot())
        hardware["hostname"] = hostname
        hardware["fingerprint"] = "written-by-an-older-build"
        calibrate.PROGRESS_FILE.write_text(json.dumps({
            "schema_version": 1,
            "hardware": hardware,
            # demo-1 already measured; demo-2 failed last time and must be retried.
            "records": [{"slug": "demo-1", "language": "python3",
                         "reference_walltime_ms": 7, "timeout_ms": 70, "case_count": 1}],
            "failures": [{"slug": "demo-2", "language": "python3",
                          "kind": "reference_verdict", "statuses": ["compile_error"],
                          "failed_cases": [0]}],
        }), encoding="utf-8")

    def _run(self, argv):
        judged = []
        self.respect_flags = []

        def judge(problem, language, reference, cases, public_count, bundle,
                  respect_calibration=True):
            judged.append(problem["slug"])
            self.respect_flags.append(respect_calibration)
            return [{"index": 0, "status": "accepted", "wall_time_ms": 5}]

        with mock.patch.object(calibrate, "_run_judge", side_effect=judge), \
                mock.patch("sys.argv", ["app.calibrate", *argv]):
            code = calibrate.main()
        return code, judged

    def test_the_sweep_measures_the_reference_on_its_own_terms(self):
        """The record it is producing must not govern the run that produces it:
        reading a previous record's deadline back to the reference fails it."""
        self._write_checkpoint(hostname="a-previous-container")
        self._run(["--force"])
        self.assertTrue(self.respect_flags)
        self.assertEqual([False] * len(self.respect_flags), self.respect_flags)

    def test_resume_skips_measured_records_after_a_container_recreate(self):
        self._write_checkpoint(hostname="a-previous-container")
        code, judged = self._run(["--force"])
        self.assertEqual(code, 0)
        self.assertNotIn("demo-1", judged, "an already-measured combination must not be re-run")
        self.assertIn("demo-2", judged, "a previously failed combination must be retried")

    def test_stale_failures_are_not_republished(self):
        self._write_checkpoint(hostname="a-previous-container")
        code, _ = self._run(["--force"])
        self.assertEqual(code, 0)
        published = json.loads(calibration.CALIBRATION_FILE.read_text(encoding="utf-8"))
        self.assertEqual(published["failures"], [],
                         "demo-2 passed on retry, so it must not remain a failure")
        self.assertEqual({row["slug"] for row in published["records"]},
                         {"demo-1", "demo-2", "demo-3"})

    def test_restart_discards_the_checkpoint(self):
        self._write_checkpoint(hostname="a-previous-container")
        code, judged = self._run(["--restart"])
        self.assertEqual(code, 0)
        self.assertIn("demo-1", judged, "--restart must measure everything again")


if __name__ == "__main__":
    unittest.main()
