import json
import sys
import tempfile
import unittest
from pathlib import Path

from api.app.problems import (
    ProblemError,
    load_designated_reference,
    parse_problem_bundle,
)

BUNDLE = {
    "problem.json": json.dumps(
        {
            "schema_version": 2,
            "reference_solution": "",
            "id": 1,
            "slug": "demo-problem",
            "title": "Demo Problem",
            "difficulty": "Easy",
            "tags": ["Array"],
            "topics": ["Array"],
            "type": "Algorithms",
            "invocation": {
                "type": "function",
                "class_name": "Solution",
                "method": "demoProblem",
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
    "cases.json": json.dumps(
        {
            "public": [{"input": [[1, 2]], "expected": 3}],
            "hidden": [{"input": [[4, 5]], "expected": 9}] * 10,
        }
    ),
    "statement.md": (
        "# Demo Problem\n\n## Description\n\nSum the values.\n\n"
        "### Example 1\n\n```text\nInput: values = [1, 2]\nOutput: 3\n```\n\n"
        "### Constraints\n\n- 1 <= values.length\n\n"
        "## Hints\n\n### Hint 1\n\nIt is a sum.\n"
    ),
    "starter.py": "from typing import List, Optional\n\n\nclass Solution:\n    def demoProblem(self, values: List[int]) -> int:\n        raise NotImplementedError(\"TODO\")\n",
    "solution.py": "from typing import List\n\n\nclass Solution:\n    def demoProblem(self, values: List[int]) -> int:\n        return sum(values)\n",
}


def write_bundle(root: Path, **overrides) -> Path:
    bundle = root / "0001_demo-problem"
    bundle.mkdir(parents=True)
    files = dict(BUNDLE)
    files.update(overrides)
    for name, content in files.items():
        (bundle / name).write_text(content, encoding="utf-8")
    return bundle


class ProblemBundleTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temporary = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary.name)
        self.addCleanup(self.temporary.cleanup)

    def parse(self, **overrides):
        return parse_problem_bundle(write_bundle(self.root, **overrides))

    def test_bundle_rejects_unsupported_schema_version(self):
        problem = json.loads(BUNDLE["problem.json"])
        problem["schema_version"] = 1
        with self.assertRaises(ProblemError):
            self.parse(**{"problem.json": json.dumps(problem)})

    def test_bundle_parses_like_the_flat_format(self):
        problem, cases, public_count = self.parse()
        self.assertEqual(1, problem["id"])
        self.assertEqual("Demo Problem", problem["title"])
        self.assertEqual(["It is a sum."], problem["hints"])
        self.assertEqual(1, public_count)
        self.assertEqual(11, len(cases))
        self.assertEqual({"python3"}, set(problem["languages"]))
        self.assertTrue(problem["languages"]["python3"]["enabled"])
        self.assertIn("def demoProblem", problem["languages"]["python3"]["starter"])

    def test_directory_name_must_match_problem_json(self):
        bundle = write_bundle(self.root)
        problem = json.loads((bundle / "problem.json").read_text())
        problem["slug"] = "other-slug"
        (bundle / "problem.json").write_text(json.dumps(problem))
        with self.assertRaises(ProblemError):
            parse_problem_bundle(bundle)

    def test_statement_title_must_match(self):
        statement = BUNDLE["statement.md"].replace("# Demo Problem", "# Another Title")
        with self.assertRaises(ProblemError):
            self.parse(**{"statement.md": statement})

    def test_examples_must_number_consecutively(self):
        statement = BUNDLE["statement.md"].replace("### Example 1", "### Example 2")
        with self.assertRaises(ProblemError):
            self.parse(**{"statement.md": statement})

    def test_constraints_are_required_for_function_problems(self):
        statement = BUNDLE["statement.md"].replace("### Constraints\n\n- 1 <= values.length\n", "")
        with self.assertRaises(ProblemError):
            self.parse(**{"statement.md": statement})

    def test_public_cases_must_match_example_count(self):
        cases = json.loads(BUNDLE["cases.json"])
        cases["public"].append({"input": [[7]], "expected": 7})
        with self.assertRaises(ProblemError):
            self.parse(**{"cases.json": json.dumps(cases)})

    def test_unknown_starter_extension_is_rejected(self):
        bundle = write_bundle(self.root)
        (bundle / "starter.cobol").write_text("MOVE TODO", encoding="utf-8")
        with self.assertRaises(ProblemError):
            parse_problem_bundle(bundle)

    def test_missing_required_file_is_rejected(self):
        bundle = write_bundle(self.root)
        (bundle / "cases.json").unlink()
        with self.assertRaises(ProblemError):
            parse_problem_bundle(bundle)

    def test_reference_solution_loads_per_language(self):
        bundle = write_bundle(self.root)
        (bundle / "solution.py").write_text("class Solution:\n    pass\n", encoding="utf-8")
        problems = sys.modules["api.app.problems"]
        original = problems.PROBLEMS_DIR
        problems.PROBLEMS_DIR = self.root.resolve()  # macOS tempdirs symlink /var → /private/var
        try:
            self.assertEqual(
                "class Solution:\n    pass\n",
                load_designated_reference("demo-problem", "python3"),
            )
            self.assertIsNone(load_designated_reference("demo-problem", "rust"))
            self.assertIsNone(load_designated_reference("demo-problem", "nonsense"))
        finally:
            problems.PROBLEMS_DIR = original


if __name__ == "__main__":
    unittest.main()
