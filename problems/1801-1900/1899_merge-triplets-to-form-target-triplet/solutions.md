# Solutions — Merge Triplets to Form Target Triplet

The max-merge operation only ever increases coordinates, so any triplet
that already exceeds `target` in some coordinate is poison — merging it
in can never be undone. What remains is a pure coverage question.

## Keep in-bounds donors and take the componentwise max

Discard every triplet with a coordinate greater than the target's
coordinate at that position. Among survivors, take the componentwise
maximum: each coordinate's target value must be supplied by some donor,
and since no survivor overshoots, their max is exactly reachable by
merging all of them. Return whether that max equals `target`.

**Complexity:** `O(n)` time for `n` triplets, `O(1)` extra space.
