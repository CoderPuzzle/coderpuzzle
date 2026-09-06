"""Whole-corpus coverage + consistency verification (merged layout).

Chain: ~/code/lc-crawl (raw crawl) -> ~/code/bettercode (curated good
tier, 838) -> problems-originals/ (both originals archives: canonical
names for bettercode originals, `-crawl` slug suffix on the 13 extend
twins) + problems/ (the merged served tree: 838 bettercode-derived
bundles keyed by problems/MAPPING.json + every other crawl id adapted
1:1 by the extend corpus).

Checks:
  A. crawl index is complete and well-formed
  B. every good-tier bettercode problem is archived in problems-originals
     with the same id+slug (and slug == crawl slug); every archive bundle
     has its required files
  C. every extend original maps to a crawl id with the exact crawl slug
     (+ the `-crawl` suffix on the 13 shared twins), correct shard,
     parseable problem.json/cases.json, present statement/solutions/
     solution files; no extras
  D. crawl ids covered by neither original set == none (corpus complete)
  E. problems-adapt/ has exactly one adapt bundle per crawl id (coverage
     both directions), parses cleanly, and carries exactly one
     bettercode-derived bundle per MAPPING.json row (id == source id,
     dir == `<id>_<slug>`)
"""
import json
import os
import re
import sys
from pathlib import Path

# Bank defaults to the sibling checkout; the two upstream scrape sources
# are only needed for the crawl-side checks and stay env-overridable.
BANK = Path(os.environ.get(
    "OPENOJ_PROBLEMS_BANK",
    str(Path(__file__).resolve().parents[2] / "openoj-problems")))
CRAWL = Path(os.environ.get(
    "OPENOJ_CRAWL", str(Path.home() / "code/lc-crawl/problems")))
BETTERCODE = Path(os.environ.get(
    "OPENOJ_BETTERCODE", str(Path.home() / "code/bettercode/data/problems.jsonl")))
ORIGINALS = BANK / "problems-originals"
SERVED = BANK / "problems-adapt"

failures = []


def fail(message):
    failures.append(message)
    print(f"FAIL {message}")


def crawl_index():
    index = {}
    for shard_dir in sorted(CRAWL.iterdir()):
        if not shard_dir.is_dir():
            continue
        for file in shard_dir.glob("*.md"):
            match = re.match(r"^(\d+)-(.+)\.md$", file.name)
            if not match:
                print(f"note: crawl non-problem file skipped: {shard_dir.name}/{file.name}")
                continue
            crawl_id = int(match.group(1))
            if crawl_id in index:
                fail(f"crawl id appears twice: {crawl_id}")
            index[crawl_id] = match.group(2)
    return index


CRAWL_SUFFIX = "-crawl"  # slug suffix marking an extend-side twin original


def originals_index():
    """(canonical, crawl_twins) over problems-originals: canonical maps
    id -> (slug, dir) for non-suffixed bundles; crawl_twins holds the
    `-crawl`-suffixed extend twins with the suffix stripped."""
    canonical, crawl_twins = {}, {}
    for bundle_dir in sorted(ORIGINALS.glob("*/*")):
        if not bundle_dir.is_dir() or bundle_dir.name.startswith("."):
            continue
        match = re.match(r"^(\d+)_(.+)$", bundle_dir.name)
        if not match:
            fail(f"problems-originals dir not parseable: {bundle_dir}")
            continue
        bundle_id = int(match.group(1))
        slug = match.group(2)
        if slug.endswith(CRAWL_SUFFIX):
            slug = slug[: -len(CRAWL_SUFFIX)]
            if bundle_id in crawl_twins:
                fail(f"problems-originals twin id twice: {bundle_id}")
            crawl_twins[bundle_id] = (slug, bundle_dir)
        else:
            if bundle_id in canonical:
                fail(
                    f"problems-originals id appears twice: {bundle_id} at "
                    f"{canonical[bundle_id][1]} and {bundle_dir}"
                )
            canonical[bundle_id] = (slug, bundle_dir)
    return canonical, crawl_twins


SOLUTION_EXTENSIONS = ("py", "java", "cpp", "go", "rs", "ts", "js", "sql", "sh")


def check_files(tree_name, bundle_id, slug, bundle_dir):
    prefix = f"{tree_name} {bundle_id}"
    try:
        problem = json.loads((bundle_dir / "problem.json").read_text(encoding="utf-8"))
        if problem.get("id") != bundle_id or problem.get("slug") != slug:
            fail(f"{prefix} problem.json id/slug mismatch: {bundle_dir}")
        cases = json.loads((bundle_dir / "cases.json").read_text(encoding="utf-8"))
        if not isinstance(cases.get("public"), list) or not isinstance(
            cases.get("hidden"), list
        ):
            fail(f"{prefix} cases.json shape: {bundle_dir}")
    except (json.JSONDecodeError, OSError) as error:
        fail(f"{prefix} parse error {bundle_dir}: {error}")
        return
    for required in ("statement.md", "solutions.md"):
        if not (bundle_dir / required).is_file():
            fail(f"{prefix} missing {required}: {bundle_dir}")
    # Any solution file set at all (canonical solution.<ext>, any executor
    # language — js-family bundles ship js+ts only; bettercode originals
    # may be variant-only solution_<variant>.<ext> with no
    # reference_solution key). When reference_solution IS declared it must
    # name an existing variant.
    solution_files = [
        path
        for path in bundle_dir.glob("solution*.*")
        if path.suffix.lstrip(".") in SOLUTION_EXTENSIONS
        and not path.name.startswith("solutions.")
    ]
    if not solution_files:
        fail(f"{prefix} has no solution files: {bundle_dir}")
    reference = problem.get("reference_solution")
    if isinstance(reference, str) and reference:
        variants = {
            path.name.split("_", 1)[1].rsplit(".", 1)[0]
            for path in bundle_dir.glob("solution_*.*")
        }
        if reference not in variants:
            fail(f"{prefix} reference_solution names no variant: {bundle_dir}")


def expected_shard(bundle_id):
    return (
        f"{(bundle_id - 1) // 100 * 100 + 1:04d}-"
        f"{(bundle_id - 1) // 100 * 100 + 100:04d}"
    )


def main():
    crawl = crawl_index()
    if not crawl:
        fail(f"crawl index is empty — is {CRAWL} the right directory?")
        return 1
    print(f"A. crawl problems: {len(crawl)} (ids {min(crawl)}-{max(crawl)})")
    if len(crawl) != 4018:
        fail(f"crawl count {len(crawl)} != 4018")

    good = {}
    for line in BETTERCODE.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        row = json.loads(line)
        if row.get("value_tier") == "good":
            good[row["id"]] = row["slug"]
    print(f"B. bettercode good tier: {len(good)}")

    canonical, crawl_twins = originals_index()
    print(
        f"   problems-originals bundles: {len(canonical) + len(crawl_twins)} "
        f"({len(crawl_twins)} `-crawl` twins)"
    )
    for bundle_id, slug in good.items():
        if bundle_id not in canonical:
            fail(f"bettercode {bundle_id} {slug} missing from problems-originals")
        elif canonical[bundle_id][0] != slug:
            fail(
                f"archive slug drift {bundle_id}: {canonical[bundle_id][0]} "
                f"!= bettercode {slug}"
            )
    for bundle_id, (slug, bundle_dir) in canonical.items():
        if slug != crawl.get(bundle_id):
            fail(
                f"archive vs crawl slug drift {bundle_id}: "
                f"{slug} != {crawl.get(bundle_id)}"
            )
        if bundle_dir.parent.name != expected_shard(bundle_id):
            fail(f"originals {bundle_id} in wrong shard {bundle_dir.parent.name}")
        check_files("archive", bundle_id, slug, bundle_dir)

    extend_ids = (set(crawl) - set(good)) | set(crawl_twins)
    for bundle_id, (slug, bundle_dir) in crawl_twins.items():
        if bundle_id not in crawl:
            fail(f"twin {bundle_dir.name} not a crawl id")
            continue
        if bundle_id not in good:
            fail(f"unexpected twin on extend-only id {bundle_id} "
                 f"(extend-only originals keep the canonical name)")
            continue
        if slug != crawl[bundle_id]:
            fail(
                f"twin slug drift {bundle_id}: {slug} != crawl {crawl[bundle_id]}"
            )
        if bundle_dir.parent.name != expected_shard(bundle_id):
            fail(f"twin {bundle_id} in wrong shard {bundle_dir.parent.name}")
        check_files("extend twin", bundle_id, slug + CRAWL_SUFFIX, bundle_dir)
    # extend-only ids must appear exactly once, with the canonical name
    # (only the shared twins carry the suffix).
    for bundle_id in sorted(set(crawl) - set(good)):
        if bundle_id not in canonical:
            fail(f"extend original missing: {bundle_id}")
    print(f"C. extend originals: {len(extend_ids)} "
          f"({len(crawl_twins)} shared-id `-crawl` twins, "
          f"{len(set(crawl) - set(good))} extend-only)")

    covered = set(canonical) | set(crawl_twins)
    uncovered = set(crawl) - covered
    print(f"D. coverage: {len(covered & set(crawl))}/{len(crawl)} originals present")
    if uncovered:
        print(f"   missing ids ({len(uncovered)}): {sorted(uncovered)}")

    mapping = json.loads((SERVED / "MAPPING.json").read_text(encoding="utf-8"))
    adapted = {}
    for source, row in mapping.items():
        source_id = int(source.split("_", 1)[0])
        if row["id"] != source_id:
            fail(f"MAPPING {source}: row id {row['id']} != source id")
        name = row["adapted"]
        if not re.match(rf"^{source_id:04d}_[a-z0-9-]+$", name):
            fail(f"MAPPING {source}: adapted dir {name} not <source-id>_<slug>")
        bundle_dir = SERVED / expected_shard(source_id) / name
        if not bundle_dir.is_dir():
            fail(f"MAPPING {source}: adapted bundle missing: {bundle_dir}")
        if source_id in adapted:
            fail(f"MAPPING: source id {source_id} appears twice "
                 f"({adapted[source_id]} and {name})")
        adapted[source_id] = name
    served_ids = {}
    for bundle_dir in sorted(SERVED.glob("*/*")):
        if not bundle_dir.is_dir() or bundle_dir.name.startswith("."):
            continue
        match = re.match(r"^(\d+)_(.+)$", bundle_dir.name)
        if not match:
            fail(f"problems-adapt/ dir not parseable: {bundle_dir}")
            continue
        bundle_id, slug = int(match.group(1)), match.group(2)
        served_ids.setdefault(bundle_id, []).append(bundle_dir.name)
        check_files("adapt", bundle_id, slug, bundle_dir)
    # Coverage in the other direction too: the served tree must carry a
    # bundle for every crawl id — a deleted shard would otherwise pass
    # unnoticed, since all checks below run over the ids that ARE present.
    missing_served = set(crawl) - set(served_ids)
    if missing_served:
        fail(f"problems-adapt/ missing {len(missing_served)} crawl ids: "
             f"{sorted(missing_served)[:20]}")
    bettercode_served = sum(1 for i in adapted if i in served_ids)
    print(
        f"E. problems-adapt/ bundles: {sum(len(v) for v in served_ids.values())} "
        f"(bettercode-derived: {bettercode_served}/{len(adapted)})"
    )
    if bettercode_served != len(adapted):
        fail(f"served bettercode bundles {bettercode_served} != MAPPING rows {len(adapted)}")
    for bundle_id, names in sorted(served_ids.items()):
        if bundle_id not in crawl:
            fail(f"served id {bundle_id} is not a crawl id: {names}")
        if len(names) > 2:
            fail(f"served id {bundle_id} appears {len(names)} times: {names}")
        if len(names) == 2 and bundle_id not in adapted:
            fail(f"duplicate served id {bundle_id} outside the bettercode subset: {names}")
        if len(names) == 2:
            modern = {n.split('_', 1)[1] for n in names} & {
                row["adapted"].split("_", 1)[1] for row in mapping.values()
            }
            if len(modern) != 1:
                fail(f"twin id {bundle_id}: exactly one bundle must be "
                     f"bettercode-derived, got {names}")

    print()
    if failures:
        print(f"RESULT: {len(failures)} FAILURE(S)")
        return 1
    print("RESULT: CONSISTENT — no missing, no drift, no extras")
    return 0


if __name__ == "__main__":
    sys.exit(main())
