import json
import struct
import unittest
from pathlib import Path

from runner.executors.base import ExecutorError
from runner.executors.typed import encode_case, function_signature


ROOT = Path(__file__).resolve().parents[1]


class TypedExecutorTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        path = ROOT / "problems" / "0001-0100" / "0001_two-sum" / "problem.json"
        cls.invocation = json.loads(path.read_text(encoding="utf-8"))["invocation"]

    def test_two_sum_case_has_a_language_neutral_binary_encoding(self) -> None:
        expected = (
            struct.pack(">I", 4)
            + struct.pack(">iiii", 2, 7, 11, 15)
            + struct.pack(">i", 9)
        )
        for language in ("cpp", "javascript", "typescript", "go", "rust"):
            with self.subTest(language=language):
                self.assertEqual(
                    expected,
                    encode_case(self.invocation, [[2, 7, 11, 15], 9], language),
                )

    def test_language_entrypoints_share_one_value_signature(self) -> None:
        methods = {}
        for language in ("cpp", "javascript", "typescript", "go", "rust"):
            parameters, result, methods[language] = function_signature(
                self.invocation, language
            )
            self.assertEqual(["array", "integer"], [item["kind"] for item in parameters])
            self.assertEqual("array", result["kind"])

    def test_linked_list_cases_encode_as_nullable_value_arrays(self) -> None:
        invocation = {
            "type": "function",
            "method": "mergeTwoLists",
            "parameters": [
                {
                    "name": "head",
                    "value_type": {
                        "kind": "linked_list",
                        "items": {"kind": "integer", "bits": 32},
                    },
                }
            ],
            "return_type": {"kind": "linked_list", "items": {"kind": "integer", "bits": 32}},
        }
        present = (
            b"\x01"
            + struct.pack(">I", 3)
            + struct.pack(">iii", 1, 2, 4)
        )
        self.assertEqual(present, encode_case(invocation, [[1, 2, 4]], "cpp"))
        self.assertEqual(b"\x00", encode_case(invocation, [None], "cpp"))

    def test_binary_tree_cases_encode_as_level_order_slots(self) -> None:
        invocation = {
            "type": "function",
            "method": "invertTree",
            "parameters": [
                {
                    "name": "root",
                    "value_type": {
                        "kind": "binary_tree",
                        "items": {"kind": "integer", "bits": 32},
                    },
                }
            ],
            "return_type": {"kind": "binary_tree", "items": {"kind": "integer", "bits": 32}},
        }
        expected = (
            struct.pack(">I", 4)
            + b"\x01" + struct.pack(">i", 1)
            + b"\x00"
            + b"\x01" + struct.pack(">i", 2)
            + b"\x00"
        )
        self.assertEqual(expected, encode_case(invocation, [[1, None, 2, None]], "go"))
        self.assertEqual(struct.pack(">I", 0), encode_case(invocation, [[]], "go"))

    def test_struct_kinds_report_which_structures_are_needed(self) -> None:
        from runner.executors.typed import uses_struct_kinds

        tree_only = {
            "parameters": [
                {"value_type": {"kind": "binary_tree", "items": {"kind": "integer", "bits": 32}}}
            ],
            "return_type": {"kind": "integer", "bits": 32},
        }
        self.assertEqual({"tree"}, uses_struct_kinds(tree_only))
        nested = {
            "parameters": [
                {
                    "value_type": {
                        "kind": "array",
                        "items": {
                            "kind": "linked_list",
                            "items": {"kind": "integer", "bits": 32},
                        },
                    }
                }
            ],
            "return_type": {"kind": "linked_list", "items": {"kind": "integer", "bits": 32}},
        }
        self.assertEqual({"list"}, uses_struct_kinds(nested))
        self.assertEqual(set(), uses_struct_kinds(self.invocation))

    def test_struct_items_must_be_integers(self) -> None:
        from runner.executors.base import ExecutorError
        from runner.executors.typed import type_spec

        with self.assertRaises(ExecutorError):
            type_spec({"kind": "linked_list", "items": {"kind": "string"}}, "Parameter 1")

    def test_entrypoints_fall_back_to_the_language_neutral_method_name(self) -> None:
        methods = {}
        for language in ("cpp", "javascript", "typescript", "go", "rust"):
            _, _, methods[language] = function_signature(self.invocation, language)
        self.assertEqual(
            {
                "cpp": "twoSum",
                "javascript": "twoSum",
                "typescript": "twoSum",
                "go": "twoSum",
                "rust": "two_sum",
            },
            methods,
        )

    def test_out_of_range_integer_is_rejected_before_runner_dispatch(self) -> None:
        with self.assertRaisesRegex(ExecutorError, "signed 32-bit range"):
            encode_case(self.invocation, [[2, 7], 2**40], "cpp")


if __name__ == "__main__":
    unittest.main()
