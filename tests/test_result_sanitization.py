import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "api"))

from app.main import _summarize  # noqa: E402
from app.problems import load_problem  # noqa: E402


class ResultSanitizationTests(unittest.TestCase):
    def test_hidden_timing_contributes_to_aggregate_but_is_not_returned(self) -> None:
        results = [
            {"index": 0, "name": "Example 1", "status": "accepted", "runtime_ms": 12},
            {"index": 1, "name": "Hidden case 1", "status": "accepted", "_runtime_ms": 34},
        ]

        summary = _summarize(results)

        self.assertEqual(46, summary["runtime_ms"])
        self.assertNotIn("runtime_ms", summary["results"][1])
        self.assertNotIn("_runtime_ms", summary["results"][1])

    def test_cpu_metrics_are_aggregated_without_hidden_case_leaks(self):
        results = [
            {"status": "accepted", "runtime_ms": 5, "cpu_time_ms": 5,
             "wall_time_ms": 10, "timing_mode": "cpu", "resource_profile": "test-v1",
             "_queue_ms": 20, "_compile_ms": 30},
            {"status": "accepted", "_runtime_ms": 7, "_cpu_time_ms": 7,
             "_wall_time_ms": 15, "timing_mode": "cpu", "resource_profile": "test-v1"},
        ]
        summary = _summarize(results)
        self.assertEqual(12, summary["cpu_time_ms"])
        self.assertEqual(25, summary["wall_time_ms"])
        self.assertEqual(20, summary["queue_ms"])
        self.assertEqual(30, summary["compile_ms"])
        self.assertEqual("cpu", summary["timing_mode"])
        self.assertFalse(any(key.startswith("_") for item in results for key in item))
        self.assertNotIn("cpu_time_ms", results[1])
        self.assertNotIn("wall_time_ms", results[1])

    def test_canonical_markdown_metadata_is_not_duplicated_in_the_ui_body(self) -> None:
        problem = load_problem("pair-sum")
        self.assertTrue(problem["description"].startswith("You are given an integer array"))
        self.assertNotIn("# 1. Two Sum", problem["description"])


if __name__ == "__main__":
    unittest.main()
