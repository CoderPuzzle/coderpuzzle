import shutil
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from api.app import judge


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
