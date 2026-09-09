"""The runner-image CLI gate carries its own copy of the comparison helpers
(the API's api.app does not ship in the runner image). Drift between the
two would make the CLI gate judge differently from the live judge, so the
shared tolerance helper is pinned to an identical AST here and the CLI's
mode handling is exercised functionally. Edit them together or this test
fails."""

import ast
import importlib.util
import inspect
import unittest
from pathlib import Path

from api.app import judge

RUNNER_CLI = Path(__file__).resolve().parents[1] / "runner" / "cli.py"


def _load_cli():
    spec = importlib.util.spec_from_file_location("coderpuzzle_cli", RUNNER_CLI)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def _function_source(path: Path, name: str) -> ast.FunctionDef:
    tree = ast.parse(path.read_text(encoding="utf-8"))
    for node in tree.body:
        if isinstance(node, ast.FunctionDef) and node.name == name:
            return node
    raise AssertionError(f"{name} not found in {path}")


class CliComparisonParityTests(unittest.TestCase):
    def setUp(self):
        self.cli = _load_cli()

    def test_close_enough_matches_the_api_definition(self):
        api_def = _function_source(Path(inspect.getfile(judge)), "_close_enough")
        cli_def = _function_source(RUNNER_CLI, "_close_enough")
        self.assertEqual(ast.dump(api_def), ast.dump(cli_def))

    def test_unjudged_modes_cover_every_expected_mode_the_api_dispatches(self):
        # judge._compare dispatches on exactly these expected["mode"] values;
        # anything it gains must be added to the CLI gate's note set (or
        # implemented there) on purpose.
        api_modes = {"distribution", "any_of", "opaque", "grouped", "validator"}
        self.assertEqual(api_modes, self.cli.UNJUDGED_EXPECTED_MODES)

    def test_exact_comparison_passes_and_fails(self):
        self.assertEqual(("pass", None), self.cli._compare_expected([0, 1], [0, 1], "exact"))
        outcome, _ = self.cli._compare_expected([0, 1], [1, 0], "exact")
        self.assertEqual("fail", outcome)

    def test_close_comparison_applies_tolerance(self):
        self.assertEqual(("pass", None), self.cli._compare_expected(0.1 + 0.2, 0.3, "close"))
        self.assertEqual(("pass", None), self.cli._compare_expected(1.0, 1.05, {"mode": "close", "tolerance": 0.1}))
        outcome, _ = self.cli._compare_expected(1.0, 2.0, "close")
        self.assertEqual("fail", outcome)

    def test_sorted_multiset_set_comparisons(self):
        self.assertEqual(("pass", None), self.cli._compare_expected([3, 1, 2], [1, 2, 3], "sorted"))
        self.assertEqual(("pass", None), self.cli._compare_expected([1, 1, 2], [2, 1, 1], "multiset"))
        self.assertEqual(("pass", None), self.cli._compare_expected([1, 2, 2], [1, 2], "set"))
        outcome, _ = self.cli._compare_expected([1, 1], [2], "multiset")
        self.assertEqual("fail", outcome)

    def test_mode_carrying_expecteds_are_notes_not_passes(self):
        for mode in ("distribution", "any_of", "opaque", "grouped", "validator"):
            outcome, detail = self.cli._compare_expected(None, {"mode": mode}, "exact")
            self.assertEqual("note", outcome, mode)
            self.assertEqual(mode, detail)
        outcome, detail = self.cli._compare_expected(None, [{"mode": "distribution"}], "exact")
        self.assertEqual("note", outcome)
        self.assertEqual("per-element modes", detail)

    def test_unsupported_comparison_fails_loudly(self):
        outcome, detail = self.cli._compare_expected([1], [1], "nonsense")
        self.assertEqual("fail", outcome)
        self.assertIn("unsupported comparison", detail)


if __name__ == "__main__":
    unittest.main()
