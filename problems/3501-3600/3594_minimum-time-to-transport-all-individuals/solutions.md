# Solutions — Minimum Time to Transport All Individuals

## Dijkstra over (people mask, stage, boat side)

The process is a shortest-path search in a small explicit graph. A state is
`(mask of people still at the base, current stage, boat side)` — at most
`2^12 × 5 × 2` states. From the base side, a leg picks any subgroup of at
most `k` people; its duration is the largest `time` in the group times the
stage multiplier, and the stage advances by `floor(duration) % m` when it
lands. From the destination side — which is forced whenever anyone remains
at the base, since the single boat must row back — the returning person can
be anyone who has already crossed, and the same floor-mod rule applies to
the return leg. Every edge weight is strictly positive, so Dijkstra settles
each state on its first pop; a leg that empties the base needs no return,
and the answer is the smallest total over all such finishing legs. If no
finish is reachable — exactly when `k = 1` and `n ≥ 2`, because a
cross-then-return pair then never shrinks the base — the search exhausts
and the answer is `-1`.

Two enumerations keep it fast: subgroups of each mask with at most `k` bits
are listed once per mask, and the crossing duration only depends on the
largest `time` in the subgroup, precomputed per bitmask with a low-bit
recurrence. The remaining work is `O(2^n · m · C(n, ≤k) · n)` edge
relaxations in the worst case, which is a few million at `n = 12`.

All arithmetic runs in IEEE-754 doubles in every language. Each leg's
duration is a single double multiply, a trip total is its leg durations
summed in trip order, and the answer is the minimum over candidate totals —
so every language performs the same operation sequence and reaches the same
bit pattern, independent of heap tie-breaking. Total times are bounded by
`n · max(time) · max(mul) = 12 · 100 · 2 = 2400`, well inside the exact
range, and the judge compares parsed doubles, so `-1` and `-1.0` are one
value.

**Complexity:** `O(2^n · m · C(n, ≤k) · n)` time, `O(2^n · m)` space.
