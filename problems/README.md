# Checked-in original problem set

This directory is CoderPuzzle's default on-disk problem set: 4,031 bundles
from the curated original-source corpus. Bettercode originals keep their
canonical names; the thirteen extend-side twins use a `-crawl` slug suffix.
The source subset is listed in [`docs/BETTERCODE-SUBSET.md`](../docs/BETTERCODE-SUBSET.md),
and adaptation provenance is recorded in
[`docs/ADAPTATION-MAPPING.md`](../docs/ADAPTATION-MAPPING.md).

Bundles live in inclusive hundred-id shards (`0001-0100`, `0101-0200`, …)
and use `<zero-padded id>_<slug>` directory names. The authoritative bundle
schema is [`docs/FORMAT.md`](../docs/FORMAT.md), and the wire-to-class map is
[`docs/CODECS.md`](../docs/CODECS.md).

The tree is format- and schema-checked on every relevant push; the full judge
sweep runs in sharded manual and weekly CI jobs. Whole-corpus provenance and
coverage can be checked with `scripts/verify_corpus.py`. Suspected testcase
contradictions must be surfaced with evidence rather than silently changing
`cases.json`.
