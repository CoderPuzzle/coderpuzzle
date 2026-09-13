import os
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "runner"))
from resources import ResourceError, ResourceManager, cpu_set, execution_budget
from worker import claim_ready


class ResourceBudgetTests(unittest.TestCase):
    def test_algorithm_cpu_budget_has_independent_wall_backstop(self):
        budget = execution_budget(250, False)
        self.assertEqual((250, 1250), (budget.cpu_ms, budget.wall_ms))
        self.assertEqual(1000, execution_budget(20, False).wall_ms)

    def test_threaded_budget_retains_wall_contract(self):
        budget = execution_budget(300, True, 2)
        self.assertEqual((600, 300), (budget.cpu_ms, budget.wall_ms))

    def test_invalid_budgets_are_rejected(self):
        for limit in (0, -1, 60001):
            with self.subTest(limit=limit), self.assertRaises(ResourceError):
                execution_budget(limit, False)

    def test_cpu_ranges_and_invalid_ranges(self):
        self.assertEqual({0, 2, 3, 4, 8}, cpu_set("0,2-4,8"))
        for value in ("4-2", "-1", "0-2-4", "abc"):
            with self.subTest(value=value), self.assertRaises(ValueError):
                cpu_set(value)

    def test_isolated_mode_does_not_fall_back(self):
        with patch.dict(
            os.environ,
            {"CODERPUZZLE_RESOURCE_MODE": "isolated", "CODERPUZZLE_EXECUTION_CPUS": ""},
        ):
            with self.assertRaises(ResourceError):
                ResourceManager()

    def test_invalid_partition_is_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "cpuset.cpus.partition").write_text("root invalid (no cpu)")
            manager = ResourceManager.__new__(ResourceManager)
            manager.isolated, manager.root = True, root
            manager.shared_control = False
            with self.assertRaisesRegex(ResourceError, "not exclusive"):
                manager.validate()

    def test_ready_claim_is_exclusive_and_released_on_failure(self):
        with tempfile.TemporaryDirectory() as directory:
            ready = Path(directory) / "ready"
            ready.touch()
            with self.assertRaisesRegex(RuntimeError, "worker crashed"):
                with claim_ready(ready) as first:
                    self.assertTrue(first)
                    with claim_ready(ready) as second:
                        self.assertFalse(second)
                    raise RuntimeError("worker crashed")
            with claim_ready(ready) as retry:
                self.assertTrue(retry)
