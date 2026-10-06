import json
import tempfile
import unittest
from pathlib import Path

from api.app import problems


def _bundle_files(reference: str = "", with_canonical: bool = True, with_variant: bool = True):
    files = {
        "problem.json": json.dumps(
            {
                "schema_version": 2,
                "reference_solution": reference,
                "id": 2,
                "slug": "demo-two",
                "title": "Demo Two",
                "difficulty": "Easy",
                "tags": ["Array"],
                "topics": ["Array"],
                "type": "Algorithms",
                "invocation": {
                    "type": "function",
                    "class_name": "Solution",
                    "method": "demoTwo",
                    "parameters": [
                        {
                            "name": "values",
                            "codec": "json",
                            "value_type": {"kind": "array", "items": {"kind": "integer", "bits": 32}},
                        }
                    ],
                    "return_codec": "json",
                    "return_type": {"kind": "integer", "bits": 32},
                    "comparison": "exact",
                },
                "limits": {"time_ms": 1500, "memory_mb": 256, "output_kb": 64},
            }
        ),
        "cases.json": json.dumps({"public": [{"input": [[1, 2]], "expected": 3}], "hidden": []}),
        "statement.md": (
            "# Demo Two\n\n## Description\n\nSum the values.\n\n"
            "### Example 1\n\n```text\nInput: values = [1, 2]\nOutput: 3\n```\n\n"
            "### Constraints\n\n- 1 <= values.length\n"
        ),
        "starter.py": "from typing import List\n\n\nclass Solution:\n    def demoTwo(self, values: List[int]) -> int:\n        raise NotImplementedError(\"TODO\")\n",
        "solutions.md": (
            "# Demo Two\n\nOne shared pin, stated once.\n\n"
            "## Slow Sweep\n\nThe direct reading.\n\n"
            "**Complexity:** `O(n)` time, `O(n)` space.\n\n"
            "## Hash Map\n\nThe refined reading.\n\n"
            "**Complexity:** `O(n)` time, `O(1)` space.\n"
        ),
    }
    if with_canonical:
        files["solution.py"] = "# canonical\n"
    if with_variant:
        files["solution_hash_map.py"] = "# variant\n"
        files["solution_slow_sweep.py"] = "# slow\n"
    return files


class _BundleDir:
    def __init__(self, **kwargs):
        self.temporary = tempfile.TemporaryDirectory()
        bundle = Path(self.temporary.name) / "0002_demo-two"
        bundle.mkdir()
        for name, content in _bundle_files(**kwargs).items():
            (bundle / name).write_text(content, encoding="utf-8")
        self.bundle = bundle


class DesignatedReferenceTests(unittest.TestCase):
    def setUp(self):
        self.holder = None

    def tearDown(self):
        if self.holder is not None:
            self.holder.temporary.cleanup()

    def _make(self, **kwargs):
        original = problems.PROBLEMS_DIR
        self.addCleanup(setattr, problems, "PROBLEMS_DIR", original)
        self.holder = _BundleDir(**kwargs)
        # The directory-cached loaders key on path + mtime, so a fresh
        # temporary path needs no cache clearing.
        # resolve() because safe_problem_path's _is_direct_child compares
        # resolved paths — macOS temporaries live behind the /var symlink.
        problems.PROBLEMS_DIR = Path(self.holder.temporary.name).resolve()
        return self.holder.bundle

    def test_parse_requires_reference_solution(self):
        self._make()
        data = json.loads((self.holder.bundle / "problem.json").read_text())
        del data["reference_solution"]
        (self.holder.bundle / "problem.json").write_text(json.dumps(data))
        with self.assertRaises(problems.ProblemError):
            problems.parse_problem_bundle(self.holder.bundle)

    def test_parse_rejects_unknown_variant(self):
        self._make(reference="does_not_exist")
        with self.assertRaises(problems.ProblemError):
            problems.parse_problem_bundle(self.holder.bundle)

    def test_parse_rejects_empty_designation_without_canonical(self):
        self._make(reference="", with_canonical=False)
        with self.assertRaises(problems.ProblemError):
            problems.parse_problem_bundle(self.holder.bundle)

    def test_designated_loader_returns_the_variant_file(self):
        self._make(reference="hash_map")
        self.assertEqual("# variant\n", problems.load_designated_reference("demo-two", "python3"))

    def test_designated_loader_returns_canonical_when_empty(self):
        self._make(reference="")
        self.assertEqual("# canonical\n", problems.load_designated_reference("demo-two", "python3"))

    def test_designated_loader_none_for_missing_language(self):
        self._make(reference="hash_map")
        self.assertIsNone(problems.load_designated_reference("demo-two", "rust"))

    def test_solutions_payload_carries_order_and_reference(self):
        self._make(reference="hash_map")
        loaded = problems.load_solutions("demo-two")
        self.assertEqual("hash_map", loaded["reference"])
        # Authored section order, worst-to-best: slow_sweep first, the
        # designated optimal last.
        self.assertEqual(["slow_sweep", "hash_map"], loaded["order"])


if __name__ == "__main__":
    unittest.main()
