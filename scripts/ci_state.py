#!/usr/bin/env python3
"""Content-hash selection for the incremental CI corpus gates.

Every gate result is keyed by a content hash, not by git history:

  static key = H("static-v1", toolchain_static, H(bundle files))
  judge key  = H("judge-v1", toolchain_judge, H(problem.json), H(cases.json),
                 H(provided/**), H(solution file))

toolchain_static hashes the static gate's inputs (check.py, gen_starters.py,
format.py, problems-tooling, ts-pin, runner/) and toolchain_judge the judge's
(runner/): a toolchain change invalidates every key at once, which replaces
the escalation rules a diff-based gate would need.

`select` compares the tree's keys against the recorded state (state.json on
the ci-state branch) and emits the run plan. A key is a target when it has
no entry, its hash moved, or its recorded result is not "pass" — previously
failed bundles re-run on every push until they pass, regardless of content.
`record` merges the run's verdict artifacts into the state, marking
selected-but-unreported keys failed so a crashed gate re-runs instead of
silently keeping a stale pass, and pruning keys whose bundle or solution
file no longer exists.

Subcommands:
  select   --tree problems --state state.json --plan-out plan.json
  record   --plan plan.json --state state.json --verdicts dir/
  verdicts --kind judge-bundle --tsv results.tsv --out verdict.json
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

STATE_VERSION = 1
# GitHub's matrix allows 256 jobs; past this the per-file judge switches to
# the sharded sweep shape (one job per shard, bundles judged sequentially).
JUDGE_MATRIX_CAP = 200
# Sweep jobs pack bundles by judged cost — case executions plus a compile
# equivalent per solution — so wall-clock balances across jobs instead of
# one id-range shard (e.g. 2301-2400's exhaustive-domain bundles, ~650k
# executions) bounding the whole sweep and hitting the 6-hour job cap. A
# bundle whose cost alone exceeds the budget splits into per-file jobs.
JUDGE_JOB_BUDGET = 50_000
COMPILE_EQUIVALENT_CASES = 60
BUNDLE_NAME = re.compile(r"^\d{4,}_[a-z0-9]+(?:-[a-z0-9]+)*$")
SHARD_NAME = re.compile(r"^\d{4,}-\d{4,}$")

# Static gate inputs: everything that can change a static-tier verdict.
# problems-tooling carries the pinned formatter package manifest and the
# adapt mapping (Python starter style); ts-pin pins the TypeScript tier.
STATIC_TOOLCHAIN = [
    "runner",
    "scripts/check.py",
    "scripts/format.py",
    "scripts/gen_starters.py",
    "scripts/problems-tooling",
    "scripts/ts-pin",
]
# Judge inputs: the CLI assembles bundles through runner/ only (executors,
# protocol, formatters for compile-time formatting). api/ is served-side and
# covered by the test suite, not by the CLI judge.
JUDGE_TOOLCHAIN = ["runner"]


def _hash(*parts: bytes) -> str:
    digest = hashlib.sha256()
    for part in parts:
        digest.update(len(part).to_bytes(8, "big"))
        digest.update(part)
    return digest.hexdigest()


def _file_hash(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1 << 20), b""):
            digest.update(block)
    return digest.hexdigest()


def git_file_list(root: Path, pathspecs: list[str]) -> list[str]:
    """Tracked files under pathspecs — node_modules and other gitignored
    trees never enter a toolchain hash."""
    result = subprocess.run(
        ["git", "-C", str(root), "ls-files", "--", *pathspecs],
        check=True,
        capture_output=True,
        text=True,
    )
    return [line for line in result.stdout.splitlines() if line]


def toolchain_hash(root: Path, pathspecs: list[str]) -> str:
    parts: list[bytes] = []
    for relative in git_file_list(root, pathspecs):
        parts.append(relative.encode("utf-8"))
        parts.append((root / relative).read_bytes())
    return _hash(*parts)


def bundle_dirs(tree: Path) -> list[Path]:
    """Every bundle directory under tree, flat or sharded by id ranges —
    flat, or sharded under <lo>-<hi>-named shards (a container check.py would flag as misnamed is skipped here)."""
    bundles = []
    for child in sorted(tree.iterdir()):
        if not child.is_dir():
            continue
        if BUNDLE_NAME.fullmatch(child.name):
            bundles.append(child)
        elif SHARD_NAME.fullmatch(child.name):
            bundles.extend(
                sub
                for sub in sorted(child.iterdir())
                if sub.is_dir() and BUNDLE_NAME.fullmatch(sub.name)
            )
    return bundles


def shard_names(tree: Path) -> list[str]:
    return sorted(
        child.name
        for child in tree.iterdir()
        if child.is_dir() and SHARD_NAME.fullmatch(child.name)
    )


def solution_files(bundle: Path) -> list[Path]:
    """The files `coderpuzzle judge` would run: solution*.* besides .md."""
    return sorted(
        path
        for path in bundle.iterdir()
        if path.is_file() and path.name.startswith("solution") and path.suffix != ".md"
    )


def _tree_hash(paths: list[tuple[str, bytes]]) -> str:
    return _hash(b"".join(f"{name}\0".encode("utf-8") + content for name, content in paths))


def compute_keys(
    root: Path, tree: Path
) -> tuple[dict[str, str], dict[str, str], list[str]]:
    """Current static keys (bundle path -> hash), judge keys (solution path
    relative to the tree -> hash), and shard names."""
    static_toolchain = toolchain_hash(root, STATIC_TOOLCHAIN)
    judge_toolchain = toolchain_hash(root, JUDGE_TOOLCHAIN)
    static_keys: dict[str, str] = {}
    judge_keys: dict[str, str] = {}
    for bundle in bundle_dirs(tree):
        relative = bundle.relative_to(tree).as_posix()
        contents = [
            (path.relative_to(bundle).as_posix(), path.read_bytes())
            for path in sorted(bundle.rglob("*"))
            if path.is_file()
        ]
        static_keys[relative] = _hash(
            b"static-v1", static_toolchain.encode(), _tree_hash(contents).encode()
        )
        problem_hash = _file_hash(bundle / "problem.json")
        cases_hash = _file_hash(bundle / "cases.json")
        provided_dir = bundle / "provided"
        provided = [
            (path.relative_to(bundle).as_posix(), path.read_bytes())
            for path in sorted(provided_dir.rglob("*"))
            if path.is_file()
        ]
        provided_hash = _tree_hash(provided) if provided else _hash()
        for solution in solution_files(bundle):
            solution_relative = f"{relative}/{solution.name}"
            judge_keys[solution_relative] = _hash(
                b"judge-v1",
                judge_toolchain.encode(),
                problem_hash.encode(),
                cases_hash.encode(),
                provided_hash.encode(),
                _file_hash(solution).encode(),
            )
    return static_keys, judge_keys, shard_names(tree)


def sweep_targets(
    tree: Path, judge_keys: dict[str, str]
) -> list[dict[str, object]]:
    """Pack the sweep's bundles into cost-balanced job targets.

    Every judge key must be covered exactly once. Targets are positional
    descriptors — shard, offset and count into that shard's LC_ALL=C-sorted
    bundle list — because the plan travels to the workflow as a job output
    and GitHub rejects large output objects: full bundle-key lists blew the
    cap at ~200KB. A "bundles" target judges each of its bundles whole
    (kind judge-bundle); a "files" target is a single over-budget bundle
    whose solutions judge one file per key (kind judge) — exhaustive-domain
    bundles like 2373 carry ~20k cases, more than a whole job's budget.
    Costs are case executions plus a compile equivalent per solution.
    """
    per_shard: dict[str, dict[str, list[str]]] = {}
    for key in judge_keys:
        shard, bundle, _ = key.split("/", 2)
        per_shard.setdefault(shard, {}).setdefault(bundle, []).append(key)
    targets: list[dict[str, object]] = []
    for shard in sorted(per_shard):
        names = sorted(per_shard[shard])
        costs = {}
        for name in names:
            cases = json.loads(
                (tree / shard / name / "cases.json").read_text(encoding="utf-8")
            )
            executions = len(cases.get("public", [])) + len(cases.get("hidden", []))
            files = len(per_shard[shard][name])
            costs[name] = executions * files + COMPILE_EQUIVALENT_CASES * files
        chunk_start: int | None = None
        chunk_cost = 0

        def flush(start: int, end: int) -> None:
            if end > start:
                targets.append(
                    {
                        "kind": "bundles",
                        "shard": shard,
                        "skip": start,
                        "take": end - start,
                    }
                )

        for index, name in enumerate(names):
            if costs[name] > JUDGE_JOB_BUDGET:
                if chunk_start is not None:
                    flush(chunk_start, index)
                chunk_start, chunk_cost = None, 0
                targets.append(
                    {"kind": "files", "shard": shard, "skip": index, "take": 1}
                )
            elif chunk_start is None:
                chunk_start, chunk_cost = index, costs[name]
            elif chunk_cost + costs[name] > JUDGE_JOB_BUDGET:
                flush(chunk_start, index)
                chunk_start, chunk_cost = index, costs[name]
            else:
                chunk_cost += costs[name]
        flush(chunk_start, len(names))
    for index, target in enumerate(targets):
        target["n"] = index
    return targets


def load_state(path: Path) -> dict:
    if not path.is_file():
        return {"version": STATE_VERSION, "static": {}, "judge": {}}
    state = json.loads(path.read_text(encoding="utf-8"))
    for kind in ("static", "judge"):
        state.setdefault(kind, {})
    return state


def select_command(arguments: argparse.Namespace) -> int:
    root = Path(arguments.root).resolve()
    tree = root / arguments.tree
    if not tree.is_dir():
        raise SystemExit(f"no bundle tree at {tree}")
    state = load_state(Path(arguments.state))
    static_keys, judge_keys, _ = compute_keys(root, tree)

    def targets(kind: str, keys: dict[str, str]) -> list[str]:
        recorded = state[kind]
        return sorted(
            key
            for key, current in keys.items()
            if recorded.get(key, {}).get("hash") != current
            or recorded.get(key, {}).get("result") != "pass"
        )

    static_targets = targets("static", static_keys)
    judge_target_keys = targets("judge", judge_keys)

    # The per-file judge matrix is capped; past the cap the sweep shape
    # takes over — cost-balanced job targets rather than id-range shards,
    # whose wall-clock is bounded by the heaviest shard.
    judge_sharded = len(judge_target_keys) > JUDGE_MATRIX_CAP
    judge_targets = [
        {"n": index, "path": f"{arguments.tree}/{key}", "key": key}
        for index, key in enumerate(judge_target_keys)
    ]
    if judge_sharded:
        # The per-file matrix stands down and the sweep takes over. The
        # full list MUST NOT ride into the job outputs — GitHub evaluates
        # outputs under a tight template-memory budget, and tens of
        # thousands of entries kill the select job there.
        judge_targets = []
    sweep = sweep_targets(tree, judge_keys) if judge_sharded else []
    if len(sweep) > JUDGE_MATRIX_CAP:
        raise SystemExit(
            f"sweep needs {len(sweep)} jobs, over the {JUDGE_MATRIX_CAP} matrix cap — "
            "raise JUDGE_JOB_BUDGET"
        )

    static_full = len(static_targets) == len(static_keys)
    noop = not static_targets and not judge_target_keys
    # The full key sets (not just the targets) ride along in the plan so
    # `record` can prune entries whose bundle or solution file is gone —
    # the plan travels as an artifact, so its size is not a concern.
    # static_bundles stays empty on full runs: it is redundant there, and
    # the workflow passes it to the static job as an environment variable,
    # which for a container job becomes docker argv — a corpus-sized list
    # would blow the argument limit and kill the container at startup.
    plan = {
        "version": STATE_VERSION,
        "noop": noop,
        "static_full": static_full,
        "static_bundles": [] if static_full else [
            key.rsplit("/", 1)[-1] for key in static_targets
        ],
        "static_targets": static_targets,
        "static_keys": static_keys,
        "judge_targets": judge_targets,
        "judge_target_keys": judge_target_keys,
        "judge_sharded": judge_sharded,
        "judge_keys": judge_keys,
        "sweep_targets": sweep,
    }
    Path(arguments.plan_out).write_text(
        json.dumps(plan, indent=2, sort_keys=True) + "\n", encoding="utf-8"
    )

    print(f"static: {len(static_targets)}/{len(static_keys)} bundles targeted")
    if judge_sharded:
        print(
            f"judge: {len(judge_target_keys)} files targeted "
            f"({len(sweep)} balanced sweep jobs)"
        )
    else:
        print(f"judge: {len(judge_target_keys)} solution files targeted")
    if noop:
        print("nothing to verify — every key matches a recorded pass")
    return 0


def record_command(arguments: argparse.Namespace) -> int:
    plan = json.loads(Path(arguments.plan).read_text(encoding="utf-8"))
    state = load_state(Path(arguments.state))

    verdicts: dict[str, dict[str, str]] = {"static": {}, "judge": {}, "judge-bundle": {}}
    for path in sorted(Path(arguments.verdicts).glob("*.json")):
        report = json.loads(path.read_text(encoding="utf-8"))
        if "kind" not in report:
            continue  # the plan rides in the same artifacts directory
        kind = report.get("kind")
        if kind not in verdicts:
            raise SystemExit(f"{path.name}: unknown verdict kind {kind!r}")
        verdicts[kind].update(report.get("results", {}))

    for kind, current_keys, selected in (
        ("static", plan["static_keys"], set(plan["static_targets"])),
        ("judge", plan["judge_keys"], set(plan["judge_target_keys"])),
    ):
        recorded = state[kind]
        for key, current in current_keys.items():
            if key not in selected:
                continue
            # check.py's static report keys are bare bundle names while
            # plan keys are shard-qualified ("<shard>/<bundle>"); bare
            # names are unique across the corpus, so join through the
            # last segment.
            verdict_key = key if kind != "static" else key.rsplit("/", 1)[-1]
            # A selected key with no reported verdict means its gate crashed
            # or was killed before finishing — record a fail so the next run
            # re-runs it instead of silently keeping a stale pass. The
            # sharded sweep reports per bundle (kind judge-bundle); its
            # result covers every solution file of that bundle.
            result = verdicts[kind].get(verdict_key)
            if result is None and kind == "judge":
                bundle_key = key.rsplit("/", 1)[0]
                result = verdicts["judge-bundle"].get(bundle_key)
            recorded[key] = {"hash": current, "result": result or "fail"}
        # Prune keys whose bundle or solution file no longer exists. Keys
        # present but not selected keep their recorded pass untouched.
        for key in [key for key in recorded if key not in current_keys]:
            del recorded[key]

    Path(arguments.state).write_text(
        json.dumps(state, indent=2, sort_keys=True) + "\n", encoding="utf-8"
    )
    for kind in ("static", "judge"):
        counts: dict[str, int] = {}
        for entry in state[kind].values():
            counts[entry["result"]] = counts.get(entry["result"], 0) + 1
        print(f"{kind}: {json.dumps(counts, sort_keys=True)}")
    return 0


def verdicts_command(arguments: argparse.Namespace) -> int:
    """Build a verdict artifact from a TSV of "<key>\\t<result>" lines.

    Lives here rather than in the workflow's inline shell because the gate
    jobs run in the runner image, which carries python3 but not jq — and
    a multi-line python -c cannot survive YAML block-scalar indentation.
    """
    results: dict[str, str] = {}
    with open(arguments.tsv, encoding="utf-8") as handle:
        for line in handle:
            line = line.rstrip("\n")
            if not line:
                continue
            key, result = line.split("\t", 1)
            results[key] = result
    Path(arguments.out).write_text(
        json.dumps({"kind": arguments.kind, "results": results}, indent=2, sort_keys=True)
        + "\n",
        encoding="utf-8",
    )
    print(f"{arguments.kind}: {len(results)} verdicts -> {arguments.out}")
    return 0


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)

    select = sub.add_parser("select", help="compute keys and emit the run plan")
    select.add_argument("--root", default=".", help="repo root (default: cwd)")
    select.add_argument("--tree", default="problems", help="bundle tree, relative to root")
    select.add_argument("--state", required=True, help="recorded state.json (may not exist yet)")
    select.add_argument("--plan-out", required=True, help="where to write the run plan")
    select.set_defaults(fn=select_command)

    record = sub.add_parser("record", help="merge verdict artifacts into the state")
    record.add_argument("--plan", required=True, help="the run plan from select")
    record.add_argument("--state", required=True, help="recorded state.json to update")
    record.add_argument("--verdicts", required=True, help="directory of verdict *.json artifacts")
    record.set_defaults(fn=record_command)

    verdicts = sub.add_parser("verdicts", help="build a verdict artifact from a TSV")
    verdicts.add_argument("--kind", required=True, help="verdict kind (e.g. judge-bundle)")
    verdicts.add_argument("--tsv", required=True, help='input file of "<key>\\t<result>" lines')
    verdicts.add_argument("--out", required=True, help="where to write the verdict JSON")
    verdicts.set_defaults(fn=verdicts_command)

    arguments = parser.parse_args()
    sys.exit(arguments.fn(arguments))


if __name__ == "__main__":
    main()
