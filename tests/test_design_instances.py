import tempfile
import unittest
from pathlib import Path

import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "runner"))

from runner import python_harness  # noqa: E402


def _write_module(source: str) -> object:
    with tempfile.NamedTemporaryFile("w", suffix=".py", delete=False) as handle:
        handle.write(source)
        path = Path(handle.name)
    import importlib.util

    spec = importlib.util.spec_from_file_location(path.stem, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    path.unlink()
    return module


SPARSE_VECTOR_SOURCE = '''
class SparseVector:
    def __init__(self, nums):
        self.nums = list(nums)
        self.entries = [(i, v) for i, v in enumerate(nums) if v != 0]

    def dotProduct(self, vec):
        total = 0
        for value, other in zip(self.nums, vec.nums):
            total += value * other
        return total
'''

COUNTER_SOURCE = '''
class Counter:
    def __init__(self, start):
        self.value = start

    def bump(self, amount):
        self.value += amount
        return self.value
'''


def sparse_invocation() -> dict:
    return {
        "type": "design",
        "class_name": "SparseVector",
        "constructor": {
            "parameters": [
                {
                    "name": "nums",
                    "codec": "json",
                    "value_type": {
                        "kind": "array",
                        "items": {"kind": "integer", "bits": 32},
                    },
                }
            ]
        },
        "methods": [
            {
                "name": "dotProduct",
                "parameters": [
                    {
                        "name": "vec",
                        "codec": "json",
                        "value_type": {"kind": "instance"},
                    }
                ],
                "return_type": {"kind": "integer", "bits": 32},
            }
        ],
    }


class DesignInstanceTests(unittest.TestCase):
    """Contract fixtures for the multi-instance design replay (LC 1570):
    named constructions, cross-instance calls, bad references, and the
    untouched single-instance legacy wire."""

    def test_two_named_instances_call_one_with_the_other(self) -> None:
        module = _write_module(SPARSE_VECTOR_SOURCE)
        raw_input = {
            "actions": [{"new": "v1"}, {"new": "v2"}, {"call": "dotProduct", "on": "v1"}],
            "params": [[[1, 0, 0, 2, 3]], [[0, 3, 0, 4, 0]], [{"$ref": "v2"}]],
        }
        self.assertEqual(
            [None, None, 8],
            python_harness._invoke_design(module, sparse_invocation(), raw_input),
        )

    def test_reverse_direction_gives_the_same_product(self) -> None:
        module = _write_module(SPARSE_VECTOR_SOURCE)
        raw_input = {
            "actions": [{"new": "v1"}, {"new": "v2"}, {"call": "dotProduct", "on": "v2"}],
            "params": [[[1, 0, 0, 2, 3]], [[0, 3, 0, 4, 0]], [{"$ref": "v1"}]],
        }
        self.assertEqual(
            [None, None, 8],
            python_harness._invoke_design(module, sparse_invocation(), raw_input),
        )

    def test_legacy_single_instance_wire_is_unchanged(self) -> None:
        module = _write_module(COUNTER_SOURCE)
        invocation = {
            "type": "design",
            "class_name": "Counter",
            "constructor": {
                "parameters": [
                    {"name": "start", "codec": "json", "value_type": {"kind": "integer", "bits": 32}}
                ]
            },
            "methods": [
                {
                    "name": "bump",
                    "parameters": [
                        {"name": "amount", "codec": "json", "value_type": {"kind": "integer", "bits": 32}}
                    ],
                    "return_type": {"kind": "integer", "bits": 32},
                }
            ],
        }
        raw_input = {"actions": ["Counter", "bump", "bump"], "params": [[5], [2], [3]]}
        self.assertEqual(
            [None, 7, 10],
            python_harness._invoke_design(module, invocation, raw_input),
        )

    def test_method_without_on_targets_the_primary(self) -> None:
        module = _write_module(COUNTER_SOURCE)
        invocation = {
            "type": "design",
            "class_name": "Counter",
            "constructor": {
                "parameters": [
                    {"name": "start", "codec": "json", "value_type": {"kind": "integer", "bits": 32}}
                ]
            },
            "methods": [
                {
                    "name": "bump",
                    "parameters": [
                        {"name": "amount", "codec": "json", "value_type": {"kind": "integer", "bits": 32}}
                    ],
                    "return_type": {"kind": "integer", "bits": 32},
                }
            ],
        }
        raw_input = {
            "actions": [{"new": "main"}, "bump", {"new": "spare"}, "bump"],
            "params": [[5], [2], [100], [3]],
        }
        # The spare construction records null and the unnamed calls keep
        # hitting the primary (5 -> 7 -> 10), never the spare.
        self.assertEqual(
            [None, 7, None, 10],
            python_harness._invoke_design(module, invocation, raw_input),
        )

    def test_duplicate_handle_is_rejected(self) -> None:
        module = _write_module(SPARSE_VECTOR_SOURCE)
        raw_input = {
            "actions": [{"new": "v1"}, {"new": "v1"}],
            "params": [[[1]], [[2]]],
        }
        with self.assertRaises(ValueError):
            python_harness._invoke_design(module, sparse_invocation(), raw_input)

    def test_unknown_reference_handle_is_rejected(self) -> None:
        module = _write_module(SPARSE_VECTOR_SOURCE)
        raw_input = {
            "actions": [{"new": "v1"}, {"call": "dotProduct", "on": "v1"}],
            "params": [[[1]], [{"$ref": "ghost"}]],
        }
        with self.assertRaises(ValueError):
            python_harness._invoke_design(module, sparse_invocation(), raw_input)

    def test_unknown_on_handle_is_rejected(self) -> None:
        module = _write_module(SPARSE_VECTOR_SOURCE)
        raw_input = {
            "actions": [{"new": "v1"}, {"call": "dotProduct", "on": "ghost"}],
            "params": [[[1]], [{"$ref": "v1"}]],
        }
        with self.assertRaises(ValueError):
            python_harness._invoke_design(module, sparse_invocation(), raw_input)

    def test_ref_marker_on_a_plain_parameter_is_rejected(self) -> None:
        module = _write_module(SPARSE_VECTOR_SOURCE)
        invocation = sparse_invocation()
        invocation["methods"][0]["parameters"][0]["value_type"] = {"kind": "integer", "bits": 32}
        raw_input = {
            "actions": [{"new": "v1"}, {"call": "dotProduct", "on": "v1"}],
            "params": [[[1]], [{"$ref": "v1"}]],
        }
        with self.assertRaises(ValueError):
            python_harness._invoke_design(module, invocation, raw_input)

    def test_plain_value_on_an_instance_parameter_is_rejected(self) -> None:
        module = _write_module(SPARSE_VECTOR_SOURCE)
        raw_input = {
            "actions": [{"new": "v1"}, {"new": "v2"}, {"call": "dotProduct", "on": "v1"}],
            "params": [[[1]], [[2]], [[3, 4]]],
        }
        with self.assertRaises(ValueError):
            python_harness._invoke_design(module, sparse_invocation(), raw_input)

    def test_case_payload_round_trips_through_the_tagged_stream(self) -> None:
        # The wire objects ({"new"}, {"$ref"}) must survive the tagged
        # stream encoding unchanged — only the wrapper resolves them.
        from runner.executors.design_interactive import encode_design_case
        from runner.executors.typed import encode_tagged

        case_input = {
            "actions": [{"new": "v1"}, {"call": "dotProduct", "on": "v1"}],
            "params": [[[1, 2]], [{"$ref": "v2"}]],
        }
        self.assertEqual(
            encode_tagged(case_input["actions"], "actions")
            + encode_tagged(case_input["params"], "params"),
            encode_design_case({"type": "design"}, case_input),
        )
        self.assertIn(b"$ref", encode_design_case({"type": "design"}, case_input))


if __name__ == "__main__":
    unittest.main()
