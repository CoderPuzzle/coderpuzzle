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
        for key, value in (
            ("cpu_model", "Some Other CPU"),
            ("logical_cpus", (current["logical_cpus"] or 0) + 4),
            ("memory_total_kib", 123456),
        ):
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
        calibrate.PROGRESS_FILE.write_text(
            json.dumps(
                {
                    "schema_version": 1,
                    "hardware": hardware,
                    "scored_quantity": "algorithm",
                    # demo-1 already measured; demo-2 failed last time and must be retried.
                    "records": [
                        {
                            "slug": "demo-1",
                            "language": "python3",
                            "reference_walltime_ms": 7,
                            "timeout_ms": 70,
                            "case_count": 1,
                            "reference_algorithm_us": 900,
                        }
                    ],
                    "failures": [
                        {
                            "slug": "demo-2",
                            "language": "python3",
                            "kind": "reference_verdict",
                            "statuses": ["compile_error"],
                            "failed_cases": [0],
                        }
                    ],
                }
            ),
            encoding="utf-8",
        )

    def _run(self, argv):
        judged = []
        self.respect_flags = []

        def judge(problem, language, reference, cases, public_count, bundle, respect_calibration=True):
            judged.append(problem["slug"])
            self.respect_flags.append(respect_calibration)
            return [{"index": 0, "status": "accepted", "wall_time_ms": 5, "runtime_ms": 5}]

        with (
            mock.patch.object(calibrate, "_run_judge", side_effect=judge),
            mock.patch("sys.argv", ["app.calibrate", *argv]),
        ):
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
        self.assertEqual(published["failures"], [], "demo-2 passed on retry, so it must not remain a failure")
        self.assertEqual({row["slug"] for row in published["records"]}, {"demo-1", "demo-2", "demo-3"})

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

        def judge(problem, language, reference, cases, public_count, bundle, respect_calibration=True):
            seen.append(problem["limits"]["time_ms"])
            return [{"index": 0, "status": "accepted", "wall_time_ms": 5, "runtime_ms": 5}]

        self._write_checkpoint(hostname="a-previous-container")
        with (
            mock.patch.object(calibrate, "_run_judge", side_effect=judge),
            mock.patch("sys.argv", ["app.calibrate", "--force"]),
        ):
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

    def test_duration_covers_the_run_not_only_the_last_pair(self):
        """Whole-run and per-pair timers must not share a variable.

        Reusing ``started`` for both mixed ``time.time`` with the last pair's
        ``time.monotonic``, publishing roughly 1.8 billion seconds.
        """
        self._write_checkpoint(hostname="a-previous-container")
        clock = mock.Mock()
        # Run start; demo-2 pair start/end; demo-3 pair start/end; run end.
        clock.monotonic.side_effect = [100.0, 110.0, 111.0, 120.0, 121.0, 130.0]
        clock.time.return_value = 1_000.0
        # Rebind here rather than mutating the stdlib module that problems.py
        # also uses for its list cache.
        with mock.patch.object(calibrate, "time", clock):
            code, _ = self._run(["--force"])
        self.assertEqual(code, 0)
        published = json.loads(calibration.CALIBRATION_FILE.read_text(encoding="utf-8"))
        self.assertEqual(30.0, published["duration_seconds"])

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


class HardwareProvenanceTests(unittest.TestCase):
    """A timing is only meaningful beside the machine that produced it."""

    CPUINFO = (
        "processor\t: 0\nmodel name\t: AMD EPYC 9B45\nphysical id\t: 0\ncore id\t\t: 0\n\n"
        "processor\t: 1\nmodel name\t: AMD EPYC 9B45\nphysical id\t: 0\ncore id\t\t: 0\n\n"
        "processor\t: 2\nmodel name\t: AMD EPYC 9B45\nphysical id\t: 0\ncore id\t\t: 1\n\n"
        "processor\t: 3\nmodel name\t: AMD EPYC 9B45\nphysical id\t: 0\ncore id\t\t: 1\n"
    )

    def test_hyperthreads_collapse_into_physical_cores(self):
        """4 logical CPUs over 2 cores is a different machine from 4 cores."""
        self.assertEqual({"physical_cores": 2}, calibrate._cpu_topology(self.CPUINFO))

    def test_a_cpuinfo_without_topology_adds_nothing(self):
        self.assertEqual({}, calibrate._cpu_topology("processor\t: 0\nmodel name\t: Apple M2\n"))

    def test_the_instance_type_is_recorded(self):
        class Response:
            def __init__(self, body):
                self.body = body

            def read(self):
                return self.body

            def __enter__(self):
                return self

            def __exit__(self, *a):
                return False

        answers = {
            "machine-type": b"projects/1008374281469/machineTypes/c4d-highcpu-4",
            "zone": b"projects/1008374281469/zones/us-east4-a",
            "name": b"katze",
        }

        def fake_urlopen(request, timeout=None):
            return Response(answers[request.full_url.rsplit("/", 1)[-1]])

        with mock.patch.object(calibrate.urllib.request, "urlopen", fake_urlopen):
            self.assertEqual(
                {"machine_type": "c4d-highcpu-4", "zone": "us-east4-a", "instance_name": "katze"},
                calibrate._cloud_instance(),
            )

    def test_off_cloud_it_records_nothing_rather_than_guessing(self):
        with mock.patch.object(calibrate.urllib.request, "urlopen", side_effect=OSError("no metadata server")):
            self.assertEqual({}, calibrate._cloud_instance())

    def test_the_fingerprint_ignores_provenance(self):
        """Adding these must not invalidate a checkpoint: the fingerprint is
        what decides whether hours of measurement can be resumed."""
        for key in ("machine_type", "zone", "instance_name", "physical_cores"):
            self.assertNotIn(key, calibrate.IDENTITY_KEYS)


class RepeatEligibilityTests(unittest.TestCase):
    """A repeat call needs a pristine copy of every argument a solution
    might mutate; a pointer-linked wire type (a list, a tree, a graph)
    can't get one from a shallow copy, so those parameters stay ineligible
    regardless of kind."""

    def _problem(self, param_kind, items_kind=None):
        value_type = {"kind": param_kind}
        if items_kind:
            value_type = {"kind": param_kind, "items": {"kind": items_kind}}
        return {"invocation": {"type": "function",
                               "parameters": [{"name": "x", "value_type": value_type}]}}

    def test_plain_value_kinds_are_eligible(self):
        for kind in ("integer", "string", "array", "boolean"):
            with self.subTest(kind=kind):
                self.assertTrue(calibrate._repeat_eligible(self._problem(kind)))

    def test_pointer_linked_kinds_are_not_eligible(self):
        for kind in sorted(calibrate.ALGORITHM_REPEAT_UNSAFE_PARAMETER_KINDS):
            with self.subTest(kind=kind):
                self.assertFalse(calibrate._repeat_eligible(self._problem(kind)))

    def test_an_array_of_a_pointer_linked_kind_is_not_eligible(self):
        # e.g. a List[TreeNode] parameter -- the unsafe kind sits in items,
        # not at the top level.
        self.assertFalse(calibrate._repeat_eligible(self._problem("array", "binary_tree")))

    def test_non_function_kinds_are_never_eligible_regardless_of_parameters(self):
        problem = self._problem("integer")
        problem["invocation"]["type"] = "design"
        self.assertFalse(calibrate._repeat_eligible(problem))


class RepeatCountDiscoveryTests(unittest.TestCase):
    """A below-floor function-kind pair gets its reference re-measured at
    an increasing repeat count until the total clears the target (see
    docs/api-and-cli.md "Algorithm repeat count"), and the settled N is
    what gets published, not just the algorithm total."""

    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.addCleanup(setattr, calibrate.judge, "RUNNER_TIMEOUT", calibrate.judge.RUNNER_TIMEOUT)
        root = Path(self.temporary.name)
        self.problems_dir = (root / "problems").resolve()
        self.problems_dir.mkdir()
        _bundle(self.problems_dir, 1)
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

    def _run_with_fake(self, judge_fn):
        with (
            mock.patch.object(calibrate, "_run_judge", side_effect=judge_fn),
            mock.patch("sys.argv", ["app.calibrate", "--force"]),
        ):
            code = calibrate.main()
        published = json.loads(calibration.CALIBRATION_FILE.read_text(encoding="utf-8"))
        return code, {row["slug"]: row for row in published["records"]}

    def test_a_below_floor_pair_is_remeasured_at_a_larger_repeat_count(self):
        calls = []

        def judge(problem, language, reference, cases, public_count, bundle, respect_calibration=True):
            n = problem["limits"].get("algorithm_repeat_count", 1)
            calls.append(n)
            # 40us/call: exactly enough at n=50 to land right on the 2000us
            # target, so this settles in a single retry round.
            return [{"index": 0, "status": "accepted", "wall_time_ms": 5, "runtime_ms": 5, "algorithm_us": 40 * n}]

        code, published = self._run_with_fake(judge)
        self.assertEqual(0, code)
        self.assertEqual([1, 50], calls, "one N=1 probe, one retry at the estimated N")
        record = published["demo-1"]
        self.assertEqual(50, record["algorithm_repeat_count"])
        self.assertEqual(2000, record["reference_algorithm_us"])

    def test_a_pair_already_above_target_is_never_retried(self):
        calls = []

        def judge(problem, language, reference, cases, public_count, bundle, respect_calibration=True):
            calls.append(problem["limits"].get("algorithm_repeat_count", 1))
            return [{"index": 0, "status": "accepted", "wall_time_ms": 5, "runtime_ms": 5, "algorithm_us": 5000}]

        code, published = self._run_with_fake(judge)
        self.assertEqual([1], calls)
        self.assertNotIn("algorithm_repeat_count", published["demo-1"])

    def test_the_repeat_count_never_exceeds_the_cap(self):
        def judge(problem, language, reference, cases, public_count, bundle, respect_calibration=True):
            n = problem["limits"].get("algorithm_repeat_count", 1)
            # Pathologically sublinear: never remotely close to target no
            # matter how far N is pushed, so the search must still stop.
            return [
                {"index": 0, "status": "accepted", "wall_time_ms": 5, "runtime_ms": 5, "algorithm_us": max(1, n // 100)}
            ]

        code, published = self._run_with_fake(judge)
        record = published["demo-1"]
        self.assertLessEqual(record.get("algorithm_repeat_count", 1), calibrate.ALGORITHM_REPEAT_CAP)

    def test_non_function_kinds_are_never_retried(self):
        bundle = self.problems_dir / "0001_demo-1"
        problem_json = json.loads((bundle / "problem.json").read_text())
        problem_json["invocation"]["type"] = "design"
        (bundle / "problem.json").write_text(json.dumps(problem_json), encoding="utf-8")
        calls = []

        def judge(problem, language, reference, cases, public_count, bundle, respect_calibration=True):
            calls.append(problem["limits"].get("algorithm_repeat_count", 1))
            return [{"index": 0, "status": "accepted", "wall_time_ms": 5, "runtime_ms": 5, "algorithm_us": 1}]

        code, published = self._run_with_fake(judge)
        self.assertEqual([1], calls, "design kind must stay single-shot even when below floor")
        self.assertNotIn("algorithm_repeat_count", published["demo-1"])
