"""The starter generator's hidden-type definition comments and exact typing
imports, plus the CODERPUZZLE_PYTHON_STYLE tree pin.

Covers: a hidden-type invocation opens its python starter with the
LeetCode-style ListNode definition and imports only Optional; a json-only
invocation carries no definition comment; solutions are expected to open
with the same block (the parity check.py enforces); and
resolve_python_style's precedence — explicit flag over CODERPUZZLE_PYTHON_STYLE
over provenance."""

import importlib.util
import os
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def _load_gen_starters():
    spec = importlib.util.spec_from_file_location(
        "gen_starters_under_test", ROOT / "scripts" / "gen_starters.py"
    )
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


TREE_INVOCATION = {
    "type": "function",
    "class_name": "Solution",
    "method": "maxDepth",
    "parameters": [
        {"name": "root", "codec": "tree_node", "value_type": {"kind": "binary_tree"}}
    ],
    "return_codec": "json",
    "return_type": {"kind": "integer", "bits": 32},
}

JSON_INVOCATION = {
    "type": "function",
    "class_name": "Solution",
    "method": "probe",
    "parameters": [
        {
            "name": "nums",
            "value_type": {"kind": "array", "items": {"kind": "integer", "bits": 32}},
        }
    ],
    "return_codec": "json",
    "return_type": {"kind": "array", "items": {"kind": "integer", "bits": 32}},
}


class DefinitionCommentTests(unittest.TestCase):
    def setUp(self):
        self.gen = _load_gen_starters()

    def test_tree_invocation_opens_with_listnode_free_treenode_block(self):
        starter = self.gen.generate(TREE_INVOCATION, "python3")
        self.assertTrue(starter.startswith("# Definition for a binary tree node.\n# class TreeNode:"))
        self.assertNotIn("ListNode", starter.split("class Solution:")[0])
        self.assertIn("#     def __init__(self, val=0, left=None, right=None):", starter)

    def test_java_block_leads_the_class(self):
        starter = self.gen.generate(TREE_INVOCATION, "java")
        self.assertTrue(starter.startswith("/*\n * Definition for a binary tree node.\n * public class TreeNode {"))

    def test_json_invocation_has_no_definition_comment(self):
        for language in ("python3", "java", "cpp", "go", "typescript", "javascript", "rust"):
            starter = self.gen.generate(JSON_INVOCATION, language)
            self.assertNotIn("Definition for", starter, language)

    def test_exact_typing_imports(self):
        starter = self.gen.generate(TREE_INVOCATION, "python3")
        self.assertIn("from typing import Optional\n", starter)
        self.assertNotIn("List", starter.split("\n\nclass Solution:")[0])

    def test_solution_parity_block_matches(self):
        # check.py's rule: every solution opens with exactly the starter's
        # definition comment; this pins the block both sides must agree on.
        starter = self.gen.generate(TREE_INVOCATION, "python3")
        comment = self.gen.definition_comment(TREE_INVOCATION, "python")
        self.assertTrue(comment.startswith("# Definition for a binary tree node.\n# class TreeNode:"))
        self.assertTrue(starter.startswith(comment))


class StyleResolutionTests(unittest.TestCase):
    def setUp(self):
        self.gen = _load_gen_starters()
        self._saved = os.environ.pop("CODERPUZZLE_PYTHON_STYLE", None)

    def tearDown(self):
        if self._saved is not None:
            os.environ["CODERPUZZLE_PYTHON_STYLE"] = self._saved
        else:
            os.environ.pop("CODERPUZZLE_PYTHON_STYLE", None)

    def test_explicit_flag_beats_env(self):
        os.environ["CODERPUZZLE_PYTHON_STYLE"] = "modern"
        self.assertEqual(self.gen.resolve_python_style("legacy", "anything"), "legacy")

    def test_env_pin_beats_provenance(self):
        os.environ["CODERPUZZLE_PYTHON_STYLE"] = "modern"
        self.assertEqual(self.gen.resolve_python_style(None, "zzz-provenance-parity-probe"), "modern")
        os.environ["CODERPUZZLE_PYTHON_STYLE"] = "legacy"
        self.assertEqual(self.gen.resolve_python_style(None, "two-sum"), "legacy")

    def test_provenance_without_pin(self):
        self.assertEqual(self.gen.resolve_python_style(None, "zzz-provenance-parity-probe"), "legacy")
        self.assertEqual(self.gen.resolve_python_style(None, "pair-sum"), "modern")


if __name__ == "__main__":
    unittest.main()
