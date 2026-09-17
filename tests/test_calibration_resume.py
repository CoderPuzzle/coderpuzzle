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
        # the sweep sizes judge.RUNNER_TIMEOUT per pair; do not leak it
        self.addCleanup(setattr, calibrate.judge, "RUNNER_TIMEOUT", calibrate.judge.RUNNER_TIMEOUT)
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
            return [{"index": 0, "status": "accepted", "wall_time_ms": 5, "runtime_ms": 5}]

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

    def test_hidden_cases_count_towards_the_measurement(self):
        """A record must describe every case the reference ran.

        _run_judge moves a hidden case's timings behind an underscore so they
        never reach a browser. Reading only the public keys made a record
        describe the statement's examples alone -- on two-sum, 3 cases of 18,
        so every ratio read about 6x and every derived deadline was that much
        too tight. The examples are also a bundle's smallest inputs, while a
        capped job judges its largest, which are hidden.
        """
        visible = {"index": 0, "status": "accepted", "wall_time_ms": 40, "runtime_ms": 40}
        hidden = {"index": 1, "status": "accepted", "_wall_time_ms": 200, "_runtime_ms": 200}
        for reader in (calibrate._case_runtime_ms, calibrate._case_wall_ms):
            self.assertEqual(40, reader(visible))
            self.assertEqual(200, reader(hidden))
            self.assertEqual(0, reader({"index": 2, "status": "skipped"}))

    def test_the_ratio_denominator_counts_what_the_numerator_counts(self):
        """reference_walltime_ms is divided into _summarize's runtime_ms, so
        it has to be the same quantity. The two agree in the shared profile
        and diverge in the isolated one, where runtime_ms is CPU time."""
        isolated = {"wall_time_ms": 500, "runtime_ms": 120}
        self.assertEqual(120, calibrate._case_runtime_ms(isolated))
        self.assertEqual(120, calibrate._case_runtime_ms({"_wall_time_ms": 500, "_runtime_ms": 120}))

    def test_the_deadline_basis_stays_on_the_wall_clock(self):
        """time_ms is a wall-clock limit, so the slowest case is wall time
        even where runtime_ms reports CPU."""
        isolated = {"wall_time_ms": 500, "runtime_ms": 120}
        self.assertEqual(500, calibrate._case_wall_ms(isolated))
        self.assertEqual(500, calibrate._case_wall_ms({"_wall_time_ms": 500, "_runtime_ms": 120}))
        # with no wall metric at all it falls back rather than reporting zero
        self.assertEqual(120, calibrate._case_wall_ms({"runtime_ms": 120}))

    def test_the_reference_is_measured_above_the_judging_deadline(self):
        """A reference that is merely slow must still be measurable.

        The bundle's time_ms is what a submission is held to. Holding the
        reference to it too made a correct-but-slow reference unmeasurable,
        and an unmeasured pair is a pair that cannot be judged at all."""
        seen = []

        def judge(problem, language, reference, cases, public_count, bundle,
                  respect_calibration=True):
            seen.append(problem["limits"]["time_ms"])
            return [{"index": 0, "status": "accepted", "wall_time_ms": 5, "runtime_ms": 5}]

        self._write_checkpoint(hostname="a-previous-container")
        with mock.patch.object(calibrate, "_run_judge", side_effect=judge), \
                mock.patch("sys.argv", ["app.calibrate", "--force"]):
            calibrate.main()
        self.assertTrue(seen)
        self.assertEqual([calibrate._measurement_time_ms(1500)] * len(seen), seen)

    def test_the_measurement_ceiling_respects_the_runner_contract(self):
        """The runner rejects a budget over 60 s and applies the language
        factor (up to 3.0x) on top, so the nominal must stay under a third of
        it. n-queens declares 4000 ms: ten times that became 114 s under
        java and every case came back system_error."""
        self.assertGreaterEqual(calibrate._measurement_time_ms(1500), 1500)
        self.assertLessEqual(calibrate._measurement_time_ms(6000) * 3.0, 60_000)
        self.assertLessEqual(calibrate._measurement_time_ms(4000) * 3.0, 60_000)
        # and it never shortens a bundle that already asks for more
        self.assertEqual(90_000, calibrate._measurement_time_ms(90_000))

    def test_a_record_carries_both_measured_figures(self):
        """The per-case figures exclude the fixed cost of starting a case, so
        the job budget needs its own end-to-end measurement, and the per-case
        deadline needs the slowest case rather than the average."""
        self._write_checkpoint(hostname="a-previous-container")
        self._run(["--force"])
        published = json.loads(calibration.CALIBRATION_FILE.read_text(encoding="utf-8"))
        measured = {row["slug"]: row for row in published["records"]}
        for slug in ("demo-2", "demo-3"):
            with self.subTest(slug=slug):
                self.assertEqual(5, measured[slug]["slowest_case_ms"])
                self.assertIn("observed_job_ms", measured[slug])
                self.assertGreaterEqual(measured[slug]["observed_job_ms"], 0)
        # a record inherited from an older build keeps the shape it was
        # written with; both derivations fall back to it rather than guess
        self.assertNotIn("slowest_case_ms", measured["demo-1"])
        self.assertEqual(7, measured["demo-1"]["reference_walltime_ms"])

    def test_restart_discards_the_checkpoint(self):
        self._write_checkpoint(hostname="a-previous-container")
        code, judged = self._run(["--restart"])
        self.assertEqual(code, 0)
        self.assertIn("demo-1", judged, "--restart must measure everything again")


if __name__ == "__main__":
    unittest.main()


class SweepWaitTests(unittest.TestCase):
    """The sweep's own wait must not be one figure for every language either:
    a judged case costs 215 ms to start in python3 and 44 ms in cpp on the
    deployment host, so a shared budget is wrong for one of them."""

    def test_the_wait_follows_the_language_cost_and_the_case_count(self):
        python3 = calibrate._pair_wait_seconds(200, 0.215)
        cpp = calibrate._pair_wait_seconds(200, 0.044)
        self.assertGreater(python3, cpp)
        self.assertGreater(calibrate._pair_wait_seconds(400, 0.215), python3)

    def test_allowances_are_seeded_per_language_from_the_published_calibration(self):
        rows = {
            ("a", "python3"): {"observed_job_ms": 43000, "case_count": 200},
            ("b", "python3"): {"observed_job_ms": 20000, "case_count": 200},
            ("c", "cpp"): {"observed_job_ms": 8800, "case_count": 200},
            ("d", "go"): {"reference_walltime_ms": 5, "case_count": 1},
        }
        with mock.patch.object(calibrate.calibration, "records", lambda: rows):
            seeded = calibrate._seeded_allowances()
        self.assertAlmostEqual(0.215, seeded["python3"], places=6)
        self.assertAlmostEqual(0.044, seeded["cpp"], places=6)
        self.assertNotIn("go", seeded, "a record without the measurement seeds nothing")

