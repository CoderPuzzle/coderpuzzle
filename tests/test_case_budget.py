import shutil
import sys
import tempfile
import unittest
from contextlib import nullcontext
from pathlib import Path
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from api.app import judge, main


def case(size):
    return {"input": [list(range(size))], "expected": None}


class CaseSelectionTests(unittest.TestCase):
    def test_a_corpus_within_the_limit_is_judged_whole(self):
        cases = [case(3) for _ in range(10)]
        self.assertEqual(list(range(10)), judge.select_cases(cases, public_count=2, limit=10))
        self.assertEqual(list(range(10)), judge.select_cases(cases, public_count=2, limit=50))

    def test_public_examples_always_run(self):
        cases = [case(3) for _ in range(500)]
        chosen = judge.select_cases(cases, public_count=2, limit=20)
        self.assertEqual([0, 1], chosen[:2])
        self.assertEqual(20, len(chosen))

    def test_a_public_heavy_problem_keeps_only_what_fits(self):
        cases = [case(3) for _ in range(500)]
        chosen = judge.select_cases(cases, public_count=30, limit=20)
        self.assertEqual(list(range(20)), chosen)

    def test_the_largest_inputs_are_kept(self):
        cases = [case(3) for _ in range(1_000)]
        cases[7] = case(100_000)
        cases[900] = case(50_000)
        chosen = judge.select_cases(cases, public_count=1, limit=50)
        self.assertIn(7, chosen)
        self.assertIn(900, chosen)
        self.assertIn(0, chosen)

    def test_the_rest_of_the_budget_spans_the_corpus(self):
        cases = [case(3) for _ in range(10_000)]
        chosen = judge.select_cases(cases, public_count=2, limit=100)
        spread = chosen[-1] - chosen[2]
        self.assertGreater(spread, 4_000, "the sample should reach the far end of the corpus")
        self.assertEqual(chosen, sorted(chosen), "cases keep their original order")

    def test_selection_is_a_pure_function_of_the_case_list(self):
        cases = [case(3 + index % 11) for index in range(5_000)]
        first = judge.select_cases(cases, public_count=2, limit=200)
        self.assertEqual(first, judge.select_cases(cases, public_count=2, limit=200))

    def test_the_same_selection_serves_a_resubmission(self):
        # A calibration record and every later re-judge must agree on the
        # cases, so the choice may not depend on anything but the list.
        cases = [case(3 + index % 7) for index in range(5_000)]
        self.assertEqual(
            judge.select_cases(list(cases), public_count=2, limit=200),
            judge.select_cases(list(cases), public_count=2, limit=200),
        )


if __name__ == "__main__":
    unittest.main()


class JobTimeoutTests(unittest.TestCase):
    """RUNNER_TIMEOUT is a module global that the calibration driver raises to
    900 s for its own sweep, so pin it rather than inherit a sibling test's
    import order."""

    def setUp(self):
        patcher = patch.object(judge, "RUNNER_TIMEOUT", 20.0)
        patcher.start()
        self.addCleanup(patcher.stop)

    def test_small_jobs_keep_the_configured_floor(self):
        self.assertEqual(20.0, judge.job_timeout_seconds(0))
        self.assertEqual(20.0, judge.job_timeout_seconds(10))

    def test_a_full_selection_is_allowed_its_per_case_budget(self):
        expected = judge.MAX_JUDGED_CASES * judge.PER_CASE_RUNNER_SECONDS + 10
        self.assertAlmostEqual(expected, judge.job_timeout_seconds(judge.MAX_JUDGED_CASES))

    def test_the_wait_grows_with_the_case_count(self):
        self.assertLess(judge.job_timeout_seconds(50), judge.job_timeout_seconds(500))

    # A capped job mostly spends the fixed cost of starting a case, and that
    # cost is a property of the language: measured on the deployment host, 200
    # cases take 43 s in python3 and 8.8 s in cpp. One shared constant cannot
    # hold both, and at 0.25 s a case the python3 wait left 17 s for the
    # submission's own work before it returned a 503 instead of a verdict.
    PYTHON3 = {"case_count": 200, "observed_job_ms": 43000}
    CPP = {"case_count": 200, "observed_job_ms": 8800}

    def test_a_pair_is_waited_for_according_to_its_own_measured_job(self):
        self.assertAlmostEqual(43.0 * judge.JOB_HEADROOM,
                               judge.job_timeout_seconds(200, self.PYTHON3))

    def test_a_language_the_shared_budget_already_covers_keeps_it(self):
        shared = 200 * judge.PER_CASE_RUNNER_SECONDS + 10
        self.assertAlmostEqual(shared, judge.job_timeout_seconds(200, self.CPP))

    def test_a_record_without_the_measurement_keeps_the_shared_budget(self):
        for record in (None, {}, {"case_count": 200, "slowest_case_ms": 264}):
            self.assertAlmostEqual(200 * judge.PER_CASE_RUNNER_SECONDS + 10,
                                   judge.job_timeout_seconds(200, record))

    def test_a_smaller_job_is_waited_for_proportionally(self):
        self.assertAlmostEqual(0.5 * judge.job_timeout_seconds(200, self.PYTHON3),
                               judge.job_timeout_seconds(100, self.PYTHON3))


class StaleJobPruningTests(unittest.TestCase):
    """A queue entry outlives its client when the API dies mid-wait, and the
    runner serves the oldest one first — so a single orphan starves every
    live job behind it."""

    def setUp(self):
        self.root = Path(tempfile.mkdtemp())
        self.addCleanup(shutil.rmtree, self.root, ignore_errors=True)
        patcher = patch.object(judge, "QUEUE_DIR", self.root)
        patcher.start()
        self.addCleanup(patcher.stop)

    def test_an_orphaned_job_is_discarded(self):
        job = self.root / "abc123"
        job.mkdir()
        (job / "ready").touch()
        (job / "request.json").write_text("{}")
        self.assertEqual(1, judge.prune_stale_jobs())
        self.assertEqual([], list(self.root.iterdir()))

    def test_a_missing_or_empty_queue_is_a_no_op(self):
        self.assertEqual(0, judge.prune_stale_jobs())
        self.assertEqual(0, judge.prune_stale_jobs())


class PerCaseBudgetTests(unittest.TestCase):
    """The per-case deadline has to cover the reference's *slowest* case.

    Generated corpora are a long tail: a capped job judges the heaviest cases,
    so ten times the average lands below what the reference itself needs and
    it fails its own calibration. Measured on the deployment host,
    armstrong-number/python3 averages 2.4 ms a case but its slowest takes
    264 ms, against the 23 ms an average-derived budget allowed.
    """

    SLOW_TAIL = {"reference_walltime_ms": 478, "timeout_ms": 4780, "case_count": 200}

    def test_the_slowest_case_sets_the_budget(self):
        record = {**self.SLOW_TAIL, "slowest_case_ms": 264}
        self.assertEqual(264 * judge.PER_CASE_REFERENCE_MULTIPLE, judge.per_case_timeout_ms(record))

    def test_that_budget_clears_the_case_it_was_measured_from(self):
        record = {**self.SLOW_TAIL, "slowest_case_ms": 264}
        self.assertGreater(judge.per_case_timeout_ms(record), record["slowest_case_ms"])

    def test_a_hand_written_corpus_keeps_the_budget_it_has_today(self):
        # dozens of similar cases: the average already predicts the slowest
        record = {"reference_walltime_ms": 476, "timeout_ms": 4760, "case_count": 18}
        self.assertEqual(4760 // 18, judge.per_case_timeout_ms(record))

    def test_records_written_before_the_field_are_unchanged(self):
        for case_count in (18, 200, 2172):
            record = {"reference_walltime_ms": 426, "timeout_ms": 4260, "case_count": case_count}
            self.assertEqual(4260 // case_count, judge.per_case_timeout_ms(record))

    def test_a_measured_tail_raises_the_budget_above_the_average(self):
        flat = judge.per_case_timeout_ms(self.SLOW_TAIL)
        tailed = judge.per_case_timeout_ms({**self.SLOW_TAIL, "slowest_case_ms": 264})
        self.assertGreater(tailed, flat)


class CalibrationMeasurementTests(unittest.TestCase):
    """The sweep measures the reference to *produce* the record, so it must not
    be governed by the record it is producing."""

    PROBLEM = {"slug": "sample", "languages": {"python3": {}}, "invocation": {},
               "limits": {"time_ms": 1500}}

    def _run(self, **kwargs):
        seen = []

        def lookup(slug, language):
            seen.append((slug, language))
            return {"reference_walltime_ms": 426, "timeout_ms": 4260,
                    "case_count": 203, "slowest_case_ms": 264}

        with patch.object(main.calibration, "enforce", lambda: None), \
             patch.object(main.calibration, "REQUIRED", False), \
             patch.object(main.calibration, "lookup", lookup), \
             patch.object(main, "_validate_language", lambda *a: None), \
             patch.object(main, "_assembly_sources", lambda *a: {}), \
             patch.object(main, "judge_slot", nullcontext), \
             patch.object(main, "execute", lambda *a, **k: []):
            main._run_judge(self.PROBLEM, "python3", "", [], 0, Path("."), **kwargs)
        return seen

    def test_the_sweep_ignores_the_record_it_is_measuring(self):
        self.assertEqual([], self._run(respect_calibration=False))

    def test_a_live_judge_still_consults_it(self):
        self.assertEqual([("sample", "python3")], self._run())


class JobBudgetPlumbingTests(unittest.TestCase):
    """The record has to reach the queue wait, or the budget silently stays
    shared and the pair that needs its own still gets the language-blind one."""

    def test_execute_hands_the_record_to_the_queue_wait(self):
        seen = {}
        record = {"case_count": 200, "observed_job_ms": 43000}

        def fake_submit(body, calibrated=None):
            seen["calibrated"] = calibrated
            return {"results": []}

        with patch.object(judge, "_submit", fake_submit):
            judge.execute("", "python3", {"parameters": []}, {"time_ms": 1000}, [], 0, calibrated=record)
        self.assertEqual(record, seen["calibrated"])
