"""--bundles / --report-json: the static tier's selection surface.

The fixtures are deliberately invalid bundles (no solution files), so the
assertions target selection mechanics — which bundles were checked, what
the report contains, what the exit code reflects — rather than corpus
validity, which the corpus gates themselves cover.
"""

import json
import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
CHECK = REPO / "scripts" / "check.py"

def problem_json(bundle_id: int, slug: str) -> str:
    return json.dumps(
        {
            "schema_version": 2,
            "reference_solution": "",
            "id": bundle_id,
            "slug": slug,
            "title": "Demo Problem",
            "difficulty": "Easy",
            "tags": ["Array"],
            "topics": ["Array"],
            "type": "Algorithms",
            "invocation": {"type": "function"},
            "limits": {"time_ms": 1500, "memory_mb": 256, "output_kb": 64},
        }
    )
CASES_JSON = json.dumps(
    {
        "public": [{"input": [1], "expected": 1}],
        "hidden": [{"input": [n], "expected": n} for n in range(2, 12)],
    }
)
STATEMENT_MD = (
    "# Demo Problem\n\n## Description\n\nSum the value.\n\n"
    "### Example 1\n\n```text\nInput: x = [1]\nOutput: 1\n```\n\n"
    "### Constraints\n\n- 1 <= x.length\n"
)


def write_bundle(root: Path, name: str) -> Path:
    bundle = root / name
    bundle.mkdir(parents=True)
    bundle_id, slug = name.split("_", 1)
    (bundle / "problem.json").write_text(problem_json(int(bundle_id), slug))
    (bundle / "cases.json").write_text(CASES_JSON)
    (bundle / "statement.md").write_text(STATEMENT_MD)
    (bundle / "starter.py").write_text("# starter\n")
    return bundle


def run_check(tree: Path, extra: list[str]) -> subprocess.CompletedProcess:
    environment = dict(os.environ)
    # The loader's explicit override beats the image's /runner copy, so the
    # fixture checks run against this checkout's formatting rules everywhere.
    environment["CODERPUZZLE_RUNNER_DIR"] = str(REPO / "runner")
    return subprocess.run(
        [sys.executable, str(CHECK), "--tree", str(tree), "--skip-runtime", *extra],
        capture_output=True,
        text=True,
        env=environment,
    )


class BundlesFlagTests(unittest.TestCase):
    def setUp(self):
        self._temporary = tempfile.TemporaryDirectory()
        self.tree = Path(self._temporary.name) / "problems"
        self.tree.mkdir(parents=True)
        write_bundle(self.tree, "0001_alpha")
        write_bundle(self.tree, "0002_beta")

    def tearDown(self):
        self._temporary.cleanup()

    def test_unrestricted_checks_every_bundle_and_reports_each(self):
        result = run_check(self.tree, ["--report-json", str(self.tree / "report.json")])
        self.assertEqual(result.returncode, 1, "fixtures lack solution files")
        report = json.loads((self.tree / "report.json").read_text())
        self.assertEqual(
            report,
            {
                "kind": "static",
                "results": {"0001_alpha": "fail", "0002_beta": "fail"},
            },
        )

    def test_bundles_restricts_per_bundle_checks_and_the_report(self):
        report_path = self.tree / "report.json"
        result = run_check(
            self.tree, ["--bundles=0001_alpha", "--report-json", str(report_path)]
        )
        self.assertEqual(result.returncode, 1, "the selected fixture is broken")
        self.assertIn("0001_alpha", result.stdout)
        self.assertNotIn("0002_beta", result.stdout)
        report = json.loads(report_path.read_text())
        self.assertEqual(
            report,
            {"kind": "static", "results": {"0001_alpha": "fail"}},
        )

    def test_corpus_wide_rules_still_scan_the_whole_tree(self):
        (self.tree / "not-a-bundle").mkdir()
        report_path = self.tree / "report.json"
        result = run_check(
            self.tree, ["--bundles=0001_alpha", "--report-json", str(report_path)]
        )
        self.assertEqual(result.returncode, 1)
        self.assertIn("neither a bundle nor a shard", result.stdout)
        report = json.loads(report_path.read_text())
        self.assertEqual(
            report,
            {"kind": "static", "results": {"0001_alpha": "fail"}},
            "the misnamed directory is a corpus-wide failure, not a per-bundle one",
        )

    def test_unknown_bundle_key_is_a_usage_error(self):
        result = run_check(self.tree, ["--bundles=0003_gamma"])
        self.assertEqual(result.returncode, 2)

    def test_empty_bundles_value_is_a_usage_error(self):
        result = run_check(self.tree, ["--bundles="])
        self.assertEqual(result.returncode, 2)

    def test_bundles_conflicts_with_runtime_only(self):
        result = run_check(self.tree, ["--runtime-only", "--bundles=0001_alpha"])
        self.assertEqual(result.returncode, 1)

    def test_report_json_conflicts_with_runtime_only(self):
        result = run_check(self.tree, ["--runtime-only", "--report-json=x.json"])
        self.assertEqual(result.returncode, 1)


if __name__ == "__main__":
    unittest.main()
