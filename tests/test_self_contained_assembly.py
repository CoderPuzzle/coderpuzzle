import re
import tempfile
import unittest
from pathlib import Path
from unittest.mock import Mock

from runner.executors.cpp import CppExecutor
from runner.executors.javascript import JavaScriptExecutor
from runner.executors.javascript import _struct_codecs as javascript_struct_codecs
from runner.executors.typescript import TypeScriptExecutor
from runner.executors.typescript import _struct_codecs as typescript_struct_codecs


ROOT = Path(__file__).resolve().parents[1]
I32 = {"kind": "integer", "bits": 32}
WELL_KNOWN_CLASSES = (
    "ListNode",
    "TreeNode",
    "Node",
    "QuadNode",
    "NestedInteger",
    "NodeWithNext",
    "MultiListNode",
)


def all_struct_invocation() -> dict:
    value_types = [
        {"kind": "linked_list", "items": I32},
        {"kind": "binary_tree", "items": I32},
        {"kind": "nary_tree", "items": I32},
        {"kind": "quad_tree"},
        {"kind": "nested"},
        {"kind": "next_tree", "items": I32},
        {"kind": "multi_list", "items": I32},
        {"kind": "graph", "items": I32, "class": "GraphNode"},
        {"kind": "random_list", "items": I32, "class": "RandomNode"},
        {"kind": "doubly_list", "items": I32, "class": "DoublyNode"},
        {"kind": "random_tree", "items": I32, "class": "RandomTreeNode"},
        {
            "kind": "struct",
            "class": "Employee",
            "fields": [
                {"name": "id", "value_type": I32},
                {"name": "importance", "value_type": I32},
            ],
        },
    ]
    return {
        "type": "function",
        "method": "solve",
        "parameters": [
            {"name": f"arg{index}", "value_type": value_type}
            for index, value_type in enumerate(value_types)
        ],
        "return_type": {
            "kind": "array",
            "items": {"kind": "linked_list", "items": I32},
        },
    }


def linked_list_invocation() -> dict:
    linked_list = {"kind": "linked_list", "items": I32}
    return {
        "type": "function",
        "method": "solve",
        "parameters": [{"name": "head", "value_type": linked_list}],
        "return_type": linked_list,
    }


class SelfContainedAssemblyTests(unittest.TestCase):
    def test_javascript_and_typescript_generate_codecs_not_classes(self) -> None:
        invocation = all_struct_invocation()
        expected_references = (
            "new ListNode(",
            "new TreeNode(",
            "new Node(",
            "new QuadNode(",
            "new NestedInteger(",
            "new NodeWithNext(",
            "new MultiListNode(",
            "new GraphNode(",
            "new RandomNode(",
            "new DoublyNode(",
            "new RandomTreeNode(",
            "new Employee(",
        )
        forbidden_classes = (
            *WELL_KNOWN_CLASSES,
            "GraphNode",
            "RandomNode",
            "DoublyNode",
            "RandomTreeNode",
            "Employee",
        )

        for language, render in (
            ("javascript", javascript_struct_codecs),
            ("typescript", typescript_struct_codecs),
        ):
            with self.subTest(language=language):
                helpers, codecs = render(invocation)
                generated = helpers + codecs
                for reference in expected_references:
                    self.assertIn(reference, generated)
                for class_name in forbidden_classes:
                    self.assertNotRegex(
                        generated,
                        rf"\bclass\s+{re.escape(class_name)}\b",
                    )

    def test_cpp_struct_fields_are_decoded_before_constructor_call(self) -> None:
        invocation = {
            "type": "function",
            "class_name": "Solution",
            "method": "readEmployee",
            "parameters": [
                {
                    "name": "employee",
                    "value_type": {
                        "kind": "struct",
                        "class": "Employee",
                        "fields": [
                            {"name": "id", "value_type": I32},
                            {
                                "name": "reports",
                                "value_type": {
                                    "kind": "array",
                                    "items": I32,
                                },
                            },
                        ],
                    },
                }
            ],
            "return_type": I32,
        }
        provided = {
            "provided": {
                "employee.hpp": (
                    "struct Employee { int id; std::vector<int> reports; "
                    "Employee(int i, std::vector<int> r) : id(i), "
                    "reports(std::move(r)) {} };\n"
                )
            }
        }
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            scratch = root / "scratch"
            scratch.mkdir()
            executor = CppExecutor()
            executor.compile = Mock()
            executor.prepare(
                root,
                scratch,
                "class Solution { public: int readEmployee(Employee e) { return e.id; } };",
                invocation,
                {},
                assembly=provided,
            )
            source = (root / "main.cpp").read_text(encoding="utf-8")
        first = source.index("auto coderpuzzle_field_0 =")
        second = source.index("auto coderpuzzle_field_1 =")
        constructor = source.index(
            "return Employee(std::move(coderpuzzle_field_0), "
            "std::move(coderpuzzle_field_1));"
        )
        self.assertLess(first, second)
        self.assertLess(second, constructor)

    def test_prepare_does_not_synthesize_a_missing_list_node(self) -> None:
        invocation = linked_list_invocation()
        sources = (
            (JavaScriptExecutor(), "function solve(head) { return head; }", "main.js"),
            (
                TypeScriptExecutor(),
                "function solve(head: ListNode | null): ListNode | null { return head; }",
                "main.ts",
            ),
        )
        for executor, submission, filename in sources:
            with self.subTest(language=executor.language), tempfile.TemporaryDirectory() as directory:
                root = Path(directory)
                scratch = root / "scratch"
                scratch.mkdir()
                if isinstance(executor, TypeScriptExecutor):
                    executor.compile = Mock()
                executor.prepare(root, scratch, submission, invocation, {}, assembly=None)
                source = (root / filename).read_text(encoding="utf-8")
                self.assertIn("new ListNode(", source)
                self.assertNotRegex(source, r"\bclass\s+ListNode\b")

    def test_runtime_owns_no_well_known_structure_declaration(self) -> None:
        declaration = re.compile(
            r'^\s*["\']?(?:public\s+)?(?:class|struct)\s+'
            rf"(?:{'|'.join(WELL_KNOWN_CLASSES)})\b",
            re.MULTILINE,
        )
        suffixes = {".py", ".java", ".cpp", ".hpp", ".go", ".rs", ".js", ".ts"}
        offenders = []
        for path in (ROOT / "runner").rglob("*"):
            if path.suffix not in suffixes:
                continue
            if declaration.search(path.read_text(encoding="utf-8")):
                offenders.append(str(path.relative_to(ROOT)))
        self.assertEqual([], offenders)


if __name__ == "__main__":
    unittest.main()
