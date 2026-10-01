"""The image CLI's gen-starters must derive the Python starter style the
way scripts/check.py's starter gate does: provenance per problem["slug"]
via gen_starters.is_modern_python_slug, with an explicit --style
overriding in both directions. Before this was pinned, the CLI defaulted
--style to modern unconditionally, so regenerating a legacy bundle's
starter.py emitted list[int] starters that then failed check.py's
byte-for-byte "starter.py is not generator output" gate."""

import argparse
import importlib.util
import json
import os
import shutil
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RUNNER_CLI = ROOT / "runner" / "cli.py"
GEN_STARTERS = ROOT / "scripts" / "gen_starters.py"
ADAPT_MAPPING = ROOT / "scripts" / "problems-tooling" / "adapt-mapping.json"

# An invented slug, guaranteed absent from the adapter ledger's modern
# set — a legacy bundle by provenance.
LEGACY_SLUG = "zzz-provenance-parity-probe"

INVOCATION = {
    "type": "function",
    "class_name": "Solution",
    "method": "probe",
    "parameters": [
        {
            "name": "nums",
            "codec": "json",
            "value_type": {"kind": "array", "items": {"kind": "integer", "bits": 32}},
        }
    ],
    "return_codec": "json",
    "return_type": {"kind": "array", "items": {"kind": "integer", "bits": 32}},
}


def _load_module(name: str, path: Path):
    # Fresh copies, the way the CLI itself loads gen_starters: its
    # PYTHON_STYLE is a module global a prior test could have mutated.
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class CliGenStartersParityTests(unittest.TestCase):
    def setUp(self):
        self.cli = _load_module("coderpuzzle_cli_gen_starters_test", RUNNER_CLI)
        self.gen = _load_module("gen_starters_gen_starters_test", GEN_STARTERS)
        # Pin the ledger to this repo's tracked copy so the provenance
        # lookup is deterministic even with CODERPUZZLE_ADAPT_MAPPING set.
        saved = os.environ.get("CODERPUZZLE_ADAPT_MAPPING")
        os.environ["CODERPUZZLE_ADAPT_MAPPING"] = str(ADAPT_MAPPING)

        def _restore_mapping():
            os.environ.pop("CODERPUZZLE_ADAPT_MAPPING", None)
            if saved is not None:
                os.environ["CODERPUZZLE_ADAPT_MAPPING"] = saved

        self.addCleanup(_restore_mapping)
        self.assertFalse(self.gen.is_modern_python_slug(LEGACY_SLUG))

    def _run_gen_starters(self, style) -> Path:
        tmp = tempfile.mkdtemp(prefix="coderpuzzle-gen-starters-test-")
        self.addCleanup(shutil.rmtree, tmp, True)
        bundle = Path(tmp)
        (bundle / "problem.json").write_text(
            json.dumps({"slug": LEGACY_SLUG, "invocation": INVOCATION}), encoding="utf-8"
        )
        # An existing starter.py defines the offered language set; the CLI
        # never widens it.
        (bundle / "starter.py").write_text("# placeholder\n", encoding="utf-8")
        exit_code = self.cli.cmd_gen_starters(
            argparse.Namespace(problem=str(bundle / "problem.json"), style=style)
        )
        self.assertEqual(0, exit_code)
        return bundle

    def _expected_starter(self, style: str) -> str:
        self.gen.set_python_style(style)
        return self.gen.format_content(
            "py", self.gen.starter_files(INVOCATION)["python3"], tolerant=True
        )

    def test_default_follows_provenance_and_matches_the_check_gate(self):
        bundle = self._run_gen_starters(None)
        written = (bundle / "starter.py").read_text(encoding="utf-8")
        # Byte-for-byte the comparison scripts/check.py performs.
        self.assertEqual(self._expected_starter("legacy"), written)
        # ... and it is genuinely the legacy style: LeetCode-era
        # annotations plus the typing import, not PEP 585/604.
        self.assertIn("from typing import", written)
        self.assertIn("List[int]", written)
        self.assertNotIn("list[int]", written)

    def test_explicit_style_modern_overrides_provenance(self):
        bundle = self._run_gen_starters("modern")
        written = (bundle / "starter.py").read_text(encoding="utf-8")
        self.assertEqual(self._expected_starter("modern"), written)
        self.assertIn("list[int]", written)
        self.assertNotIn("from typing import", written)


if __name__ == "__main__":
    unittest.main()
