import os
from pathlib import Path
import sys
import tempfile
import threading
import time
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "runner"))
from resources import ResourceError, ResourceManager, cpu_set, execution_budget
from worker import (
    _effective_memory_mb,
    _prewarm_cancel,
    _run_prewarm_command,
    claim_ready,
)


class ResourceBudgetTests(unittest.TestCase):
    def test_algorithm_cpu_budget_has_independent_wall_backstop(self):
        budget = execution_budget(250, False)
        self.assertEqual((250, 1250), (budget.cpu_ms, budget.wall_ms))
        self.assertEqual(1000, execution_budget(20, False).wall_ms)

    def test_threaded_budget_retains_wall_contract(self):
        budget = execution_budget(300, True, 2)
        self.assertEqual((600, 300), (budget.cpu_ms, budget.wall_ms))

    def test_schedule_address_space_is_a_flat_managed_runtime_allowance(self):
        class Executor:
            address_space_overhead_mb = 1792
            schedule_address_space_mb = 1024

        self.assertEqual(
            256 + 1792,
            _effective_memory_mb({"memory_mb": 256}, Executor()),
        )
        self.assertEqual(
            256 + 1792 + 100 * 2 + 1024,
            _effective_memory_mb(
                {"memory_mb": 256, "threads": 100}, Executor()
            ),
        )

    def test_queued_job_cancels_a_running_prewarm(self):
        _prewarm_cancel.clear()
        timer = threading.Timer(0.05, _prewarm_cancel.set)
        started = time.monotonic()
        timer.start()
        try:
            with tempfile.TemporaryDirectory() as directory:
                _run_prewarm_command(
                    (
                        sys.executable,
                        "-c",
                        "import time; time.sleep(30)",
                    ),
                    dict(os.environ),
                    Path(directory),
                )
        finally:
            timer.cancel()
            _prewarm_cancel.clear()
        self.assertLess(time.monotonic() - started, 2)

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
