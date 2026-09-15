# Solutions — Maximize Active Section with Trade I

## Run-length encode and sum flanking zero runs

A trade's net effect is easy to read off. Step 1 flips an internal `'1'`-run
(one with a `'0'`-run immediately on each side) to `'0'`, merging it with
those two `'0'`-runs into one larger `'0'`-run; step 2 flips that merged
`'0'`-run back to `'1'`. The chosen `'1'`-run is restored, so the only
lasting change is that both flanking `'0'`-runs become `'1'`s — a gain equal
to their combined length. Flipping a far-away `'0'`-run in step 2 instead of
the merged one can never do better: every such run is itself flanking some
internal `'1'`-run, and trading that run gains at least that far run's length.

The implementation augments `s` with `'1'` on both ends, so every `'0'`-run
is genuinely surrounded, then run-length encodes `t`. Runs alternate starting
with `'1'`, so the internal `'1'`-runs are exactly the even run indices that
are neither first nor last; each carries a `'0'`-run on both sides. The code
keeps the maximum of `left + right` over those runs and adds it to the count
of `'1'`s already present. If no internal `'1'`-run exists, the maximum stays
zero and the answer is just the original count.

The augmented `'1'`s never pollute the result because the one-count is taken
from the original `s`, and the boundary `'1'`-runs are excluded by the index
bounds.

**Complexity:** `O(n)` time, `O(n)` space.
