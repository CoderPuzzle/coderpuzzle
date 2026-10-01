import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "scripts"))
import ci_state  # noqa: E402

def problem_json(slug: str) -> str:
    return json.dumps(
        {
            "schema_version": 2,
            "reference_solution": "",
            "id": int(slug.split("_", 1)[0]),
            "slug": slug.split("_", 1)[1],
            "title": "Demo Problem",
            "difficulty": "Easy",
            "tags": ["Array"],
            "topics": ["Array"],
            "type": "Algorithms",
            "invocation": {"type": "function"},
            "limits": {"time_ms": 1500, "memory_mb": 256, "output_kb": 64},
        }
    )


class StateTree:
    """A throwaway git repo holding a bundle tree and dummy toolchain
    files — ci_state hashes the toolchain through git ls-files, so the
    tree has to be tracked for the hashes to see it."""

    def __init__(self, root: Path):
        self.root = root
        self.tree = root / "problems"
        (self.tree / "0001-0100").mkdir(parents=True)
        (root / "runner").mkdir()
        (root / "scripts").mkdir()
        (root / "runner" / "cli.py").write_text("toolchain\n")
        (root / "scripts" / "check.py").write_text("gate\n")
        subprocess.run(["git", "init", "-q"], cwd=root, check=True)
        subprocess.run(
            ["git", "-c", "user.email=t@t", "-c", "user.name=t", "add", "-A"],
            cwd=root,
            check=True,
        )
        subprocess.run(
            ["git", "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qm", "x"],
            cwd=root,
            check=True,
        )

    def add_bundle(self, slug: str, solutions: list[str]) -> Path:
        bundle = self.tree / "0001-0100" / slug
        bundle.mkdir(parents=True, exist_ok=True)
        (bundle / "problem.json").write_text(problem_json(slug))
        (bundle / "cases.json").write_text("{}")
        (bundle / "solution.py").write_text("pass\n")
        for extra in solutions:
            (bundle / extra).write_text("pass\n")
        return bundle

    def rewrite_toolchain(self) -> None:
        (self.root / "runner" / "cli.py").write_text("toolchain v2\n")
        subprocess.run(["git", "-C", str(self.root), "add", "-A"], check=True)

    def select(self, state: dict) -> dict:
        state_path = self.root / "state.json"
        plan_path = self.root / "plan.json"
        state_path.write_text(json.dumps(state))
        ci_state.select_command(
            argparse_namespace(
                root=str(self.root), tree="problems", state=str(state_path), plan_out=str(plan_path)
            )
        )
        return json.loads(plan_path.read_text())

    def record(self, plan: dict, state: dict, verdicts: list[dict]) -> dict:
        plan_path = self.root / "given-plan.json"
        state_path = self.root / "given-state.json"
        verdicts_dir = self.root / "verdicts"
        verdicts_dir.mkdir(exist_ok=True)
        plan_path.write_text(json.dumps(plan))
        state_path.write_text(json.dumps(state))
        for index, verdict in enumerate(verdicts):
            (verdicts_dir / f"v{index}.json").write_text(json.dumps(verdict))
        ci_state.record_command(
            argparse_namespace(
                plan=str(plan_path), state=str(state_path), verdicts=str(verdicts_dir)
            )
        )
        return json.loads(state_path.read_text())


def argparse_namespace(**kwargs):
    import argparse

    return argparse.Namespace(**kwargs)


def fresh_state() -> dict:
    return {"version": ci_state.STATE_VERSION, "static": {}, "judge": {}}


class ComputeKeysTests(unittest.TestCase):
    def test_identical_bundles_get_equal_hashes_under_different_keys(self):
        with tempfile.TemporaryDirectory() as directory:
            tree = StateTree(Path(directory))
            first = tree.add_bundle("0001_alpha", [])
            second = tree.add_bundle("0002_beta", [])
            # Byte-identical content: only the directory key differs.
            (second / "problem.json").write_bytes((first / "problem.json").read_bytes())
            static_keys, judge_keys, _ = ci_state.compute_keys(tree.root, tree.tree)
            self.assertEqual(len(static_keys), 2)
            self.assertEqual(
                static_keys["0001-0100/0001_alpha"], static_keys["0001-0100/0002_beta"]
            )
            self.assertEqual(
                len(judge_keys),
                2,
                "one solution file per bundle",
            )

    def test_solution_content_moves_only_its_own_judge_key(self):
        with tempfile.TemporaryDirectory() as directory:
            tree = StateTree(Path(directory))
            tree.add_bundle("0001_alpha", ["solution_bfs.py"])
            static_keys, judge_keys, _ = ci_state.compute_keys(tree.root, tree.tree)
            before = dict(judge_keys)
            bundle = tree.tree / "0001-0100" / "0001_alpha"
            (bundle / "solution.py").write_text("changed\n")
            subprocess.run(["git", "-C", str(tree.root), "add", "-A"], check=True)
            static_after, judge_after, _ = ci_state.compute_keys(tree.root, tree.tree)
            self.assertNotEqual(
                static_keys,
                static_after,
                "the static key covers every bundle file, solution edits included",
            )
            moved = [key for key in judge_after if judge_after[key] != before[key]]
            self.assertEqual(moved, ["0001-0100/0001_alpha/solution.py"])
            self.assertEqual(len(judge_after), 2)

    def test_toolchain_change_moves_every_key(self):
        with tempfile.TemporaryDirectory() as directory:
            tree = StateTree(Path(directory))
            tree.add_bundle("0001_alpha", ["solution_bfs.py"])
            static_keys, judge_keys, _ = ci_state.compute_keys(tree.root, tree.tree)
            tree.rewrite_toolchain()
            static_after, judge_after, _ = ci_state.compute_keys(tree.root, tree.tree)
            self.assertNotEqual(static_keys, static_after)
            self.assertNotEqual(judge_keys, judge_after)


class SelectTests(unittest.TestCase):
    def test_empty_state_targets_everything(self):
        with tempfile.TemporaryDirectory() as directory:
            tree = StateTree(Path(directory))
            tree.add_bundle("0001_alpha", [])
            plan = tree.select({})
            self.assertFalse(plan["noop"])
            self.assertTrue(plan["static_full"])
            self.assertFalse(
                plan["judge_sharded"],
                "one solution file is far below the matrix cap",
            )
            self.assertEqual(
                plan["judge_target_keys"], ["0001-0100/0001_alpha/solution.py"]
            )

    def test_recorded_passes_skip_and_failures_re_run(self):
        with tempfile.TemporaryDirectory() as directory:
            tree = StateTree(Path(directory))
            tree.add_bundle("0001_alpha", ["solution_bfs.py"])
            static_keys, judge_keys, _ = ci_state.compute_keys(tree.root, tree.tree)
            state = fresh_state()
            for key, current in static_keys.items():
                state["static"][key] = {"hash": current, "result": "pass"}
            for key, current in judge_keys.items():
                state["judge"][key] = {"hash": current, "result": "pass"}
            state["judge"]["0001-0100/0001_alpha/solution_bfs.py"]["result"] = "fail"
            plan = tree.select(state)
            self.assertTrue(plan["noop"] is False)
            self.assertEqual(plan["static_targets"], [])
            self.assertEqual(
                plan["judge_target_keys"], ["0001-0100/0001_alpha/solution_bfs.py"]
            )
            self.assertEqual(
                plan["judge_targets"],
                [
                    {
                        "n": 0,
                        "path": "problems/0001-0100/0001_alpha/solution_bfs.py",
                        "key": "0001-0100/0001_alpha/solution_bfs.py",
                    }
                ],
            )

    def test_failing_bundle_always_re_runs(self):
        with tempfile.TemporaryDirectory() as directory:
            tree = StateTree(Path(directory))
            tree.add_bundle("0001_alpha", [])
            static_keys, _, _ = ci_state.compute_keys(tree.root, tree.tree)
            key = next(iter(static_keys))
            state = fresh_state()
            state["static"][key] = {"hash": static_keys[key], "result": "fail"}
            plan = tree.select(state)
            self.assertEqual(plan["static_targets"], ["0001-0100/0001_alpha"])

    def test_all_pass_is_noop(self):
        with tempfile.TemporaryDirectory() as directory:
            tree = StateTree(Path(directory))
            tree.add_bundle("0001_alpha", [])
            static_keys, judge_keys, _ = ci_state.compute_keys(tree.root, tree.tree)
            state = fresh_state()
            for key, current in static_keys.items():
                state["static"][key] = {"hash": current, "result": "pass"}
            for key, current in judge_keys.items():
                state["judge"][key] = {"hash": current, "result": "pass"}
            plan = tree.select(state)
            self.assertTrue(plan["noop"])
            self.assertEqual(plan["static_targets"], [])
            self.assertEqual(plan["judge_target_keys"], [])


class RecordTests(unittest.TestCase):
    def current_plan(self, tree: StateTree) -> dict:
        plan = tree.select(fresh_state())
        return plan

    def test_verdicts_are_recorded_and_missing_ones_fail(self):
        with tempfile.TemporaryDirectory() as directory:
            tree = StateTree(Path(directory))
            tree.add_bundle("0001_alpha", [])
            plan = self.current_plan(tree)
            static_key = plan["static_targets"][0]
            state = tree.record(
                plan,
                fresh_state(),
                [
                    {"kind": "static", "results": {static_key: "pass"}},
                ],
            )
            self.assertEqual(state["static"][static_key]["result"], "pass")
            self.assertEqual(
                state["judge"]["0001-0100/0001_alpha/solution.py"]["result"],
                "fail",
                "selected with no judge verdict — the gate never reported",
            )

    def test_selected_without_verdict_records_fail(self):
        with tempfile.TemporaryDirectory() as directory:
            tree = StateTree(Path(directory))
            tree.add_bundle("0001_alpha", [])
            plan = self.current_plan(tree)
            static_key = plan["static_targets"][0]
            state = tree.record(plan, fresh_state(), [])
            self.assertEqual(state["static"][static_key]["result"], "fail")

    def test_unselected_passes_survive_and_absent_bundles_are_pruned(self):
        with tempfile.TemporaryDirectory() as directory:
            tree = StateTree(Path(directory))
            tree.add_bundle("0001_alpha", [])
            static_keys, judge_keys, _ = ci_state.compute_keys(tree.root, tree.tree)
            state = fresh_state()
            state["static"]["0001-0100/0001_alpha"] = {
                "hash": static_keys["0001-0100/0001_alpha"],
                "result": "pass",
            }
            state["judge"]["0001-0100/0001_gone/solution.py"] = {"hash": "x", "result": "pass"}
            plan = {
                "version": 1,
                "static_keys": static_keys,
                "static_targets": [],
                "judge_keys": judge_keys,
                "judge_target_keys": [],
            }
            merged = tree.record(plan, state, [])
            self.assertIn("0001-0100/0001_alpha", merged["static"])
            self.assertNotIn("0001-0100/0001_gone/solution.py", merged["judge"])

    def test_sharded_bundle_verdicts_expand_to_their_files(self):
        with tempfile.TemporaryDirectory() as directory:
            tree = StateTree(Path(directory))
            tree.add_bundle("0001_alpha", ["solution_bfs.py"])
            plan = self.current_plan(tree)
            self.assertEqual(
                len(plan["judge_target_keys"]),
                2,
                "empty state selects every solution file",
            )
            state = tree.record(
                plan,
                fresh_state(),
                [
                    {
                        "kind": "judge-bundle",
                        "results": {"0001-0100/0001_alpha": "pass"},
                    }
                ],
            )
            self.assertEqual(
                {entry["result"] for entry in state["judge"].values()}, {"pass"}
            )

    def test_files_without_a_kind_field_are_ignored(self):
        with tempfile.TemporaryDirectory() as directory:
            tree = StateTree(Path(directory))
            tree.add_bundle("0001_alpha", [])
            plan = self.current_plan(tree)
            static_key = plan["static_targets"][0]
            state = tree.record(
                plan,
                fresh_state(),
                [
                    {"static": {"note": "this file is the plan shape, no kind"}},
                    {"kind": "static", "results": {static_key: "pass"}},
                ],
            )
            self.assertEqual(state["static"][static_key]["result"], "pass")


if __name__ == "__main__":
    unittest.main()
