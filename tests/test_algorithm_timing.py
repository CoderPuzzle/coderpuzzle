"""Every call site that runs submission code must be bracketed by the clock.

The scored quantity is the submission's own algorithm, not the process that
runs it (see runner/timing.py). A call site the harness forgets to bracket
does not fail loudly — it silently contributes nothing, so a whole invocation
kind can report ~0 while still passing every verdict test. These call each
kind's entry point directly and assert the accumulator actually moved.
"""

import importlib.util
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "runner"))

import timing  # noqa: E402
from runner import python_harness  # noqa: E402

# Long enough that the measured span is unmistakably the work rather than the
# clock: ~200k interpreted iterations is milliseconds, against a ~0.1 us
# noise floor.
LOOP = 200_000
WORK = "total = 0\n        for value in range(n):\n            total += value\n"
INTEGER = {"codec": "json", "value_type": {"kind": "integer", "bits": 32}}


def _module(source: str) -> object:
    with tempfile.NamedTemporaryFile("w", suffix=".py", delete=False) as handle:
        handle.write(source)
        path = Path(handle.name)
    spec = importlib.util.spec_from_file_location(path.stem, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    path.unlink()
    return module


class AlgorithmTimingTests(unittest.TestCase):
    def setUp(self):
        timing._spans_ns.clear()

    def algorithm_us(self) -> int:
        return timing.report()["algorithm_us"]

    def test_a_function_call_is_measured(self):
        module = _module(f"class Solution:\n    def work(self, n):\n        {WORK}        return total\n")
        invocation = {
            "type": "function",
            "class_name": "Solution",
            "method": "work",
            "parameters": [{"name": "n", **INTEGER}],
            "return_codec": "json",
        }
        self.assertEqual(LOOP * (LOOP - 1) // 2, python_harness._invoke(module, invocation, [LOOP]))
        self.assertGreater(self.algorithm_us(), 1000)

    def _counter(self) -> object:
        return _module(
            "class Counter:\n"
            "    def __init__(self, start):\n"
            f"        n = start\n        {WORK}"
            "        self.value = total\n"
            "\n"
            "    def bump(self, amount):\n"
            f"        n = amount\n        {WORK}"
            "        self.value += total\n"
            "        return self.value\n"
        )

    def _counter_invocation(self) -> dict:
        return {
            "type": "design",
            "class_name": "Counter",
            "constructor": {"parameters": [{"name": "start", **INTEGER}]},
            "methods": [
                {
                    "name": "bump",
                    "parameters": [{"name": "amount", **INTEGER}],
                    "return_type": {"kind": "integer", "bits": 32},
                },
            ],
        }

    def test_a_design_constructor_is_measured(self):
        """A design that builds its index in __init__ (a cache, a trie, a
        logger) would otherwise report nothing for the work it exists to do."""
        module = self._counter()
        python_harness._invoke_design(
            module,
            self._counter_invocation(),
            {"actions": [{"new": "a"}], "params": [[LOOP]]},
        )
        self.assertGreater(self.algorithm_us(), 1000)

    def test_every_replayed_call_is_measured(self):
        """Each call in the replay adds its own span, so the total grows with
        the number of calls: bracketing only the first would not."""
        module = self._counter()
        one = {"actions": [{"new": "a"}, {"call": "bump"}], "params": [[1], [LOOP]]}
        python_harness._invoke_design(module, self._counter_invocation(), one)
        single = self.algorithm_us()
        self.assertGreater(single, 1000)
        timing._spans_ns.clear()
        module = self._counter()
        three = {
            "actions": [{"new": "a"}, {"call": "bump"}, {"call": "bump"}, {"call": "bump"}],
            "params": [[1], [LOOP], [LOOP], [LOOP]],
        }
        python_harness._invoke_design(module, self._counter_invocation(), three)
        self.assertGreater(self.algorithm_us(), single * 1.5)

    def test_a_whole_threaded_schedule_is_measured(self):
        """Threads overlap, so the schedule is one outer span. Summing per
        thread would count the same wall clock several times."""
        module = _module(
            "class Runner:\n"
            "    def __init__(self):\n"
            "        self.calls = []\n"
            "\n"
            "    def work(self, n):\n"
            f"        {WORK}"
            "        self.calls.append(total)\n"
        )
        invocation = {
            "type": "concurrent",
            "class_name": "Runner",
            "methods": [{"name": "work", "parameters": [{"name": "n", **INTEGER}]}],
        }
        raw_input = {"constructor": [], "threads": [{"call": "work", "args": [LOOP]}] * 3}
        python_harness._invoke_concurrent(module, invocation, raw_input)
        self.assertGreater(self.algorithm_us(), 1000)

    def test_an_interactive_call_is_measured(self):
        module = _module(
            "class Reader:\n"
            "    def __init__(self, arr, budget):\n"
            "        self.arr = arr\n"
            "\n"
            "    def get(self, index):\n"
            "        return self.arr[index]\n"
            "\n"
            "class Solution:\n"
            "    def search(self, reader, target):\n"
            f"        n = 200000\n        {WORK}"
            "        reader.get(0)\n"
            "        return target\n"
        )
        invocation = {
            "type": "interactive",
            "class_name": "Solution",
            "method": "search",
            "parameters": [{"name": "target", **INTEGER}],
            "return_type": {"kind": "integer", "bits": 32},
            "provided": {"oracle": {"class": "Reader", "construct": ["arr"]}},
        }
        self.assertEqual(7, python_harness._invoke(module, invocation, {"arr": [7], "target": 7}))
        self.assertGreater(self.algorithm_us(), 1000)

    def test_load_time_is_reported_but_not_scored(self):
        """Hoisting work into import time must stay visible to an audit, and
        must never be folded into the score — that would re-import startup."""
        timing.add(timing.mark(), "load_us")
        timing.add(timing.mark(), "algorithm_us")
        reported = timing.report()
        self.assertIn("algorithm_us", reported)
        self.assertIn("load_us", reported)
        self.assertIn("clock_noise_ns", reported)
        timing._spans_ns.clear()
        timing.add(timing.mark() - 1000, "load_us")
        self.assertEqual(0, timing.report().get("algorithm_us", 0))

    def test_the_noise_floor_is_reported(self):
        """A single sub-microsecond case is dominated by the clock itself, so
        the artifact has to carry what an empty span costs."""
        self.assertGreaterEqual(timing.report()["clock_noise_ns"], 0)
        self.assertLess(timing.report()["clock_noise_ns"], 100_000)


if __name__ == "__main__":
    unittest.main()
