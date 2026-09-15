# Solutions — K-th Symbol in Grammar

Every row doubles the one above, so row 30 holds over half a billion symbols
and no run of expansions can be written out in full. Yet each symbol has
exactly one parent in the previous row — the symbol whose expansion produced
its pair — and the expansion rule pins that parent-child relation down with a
single parity fact, so one short walk up the ancestry answers any query.

## Walk the ancestry, counting flips

Expansions emit symbols in adjacent pairs, so position `k` of row `n`
descends from position `(k + 1) / 2` of row `n - 1`: the first child of a
pair (`k` odd) and its second sibling (`k` even) share one parent. The rule
`0 -> 01`, `1 -> 10` says the first child copies the parent and the second
inverts it, so the value at `(n, k)` is the root's `0` flipped once for every
even index met while walking `k -> (k + 1) / 2 -> ... -> 1`, where the walk
arrives at the lone symbol of row 1.

The code keeps exactly two numbers alive — the position and a running flip
parity — and climbs until the position reaches 1, taking at most `n - 1 <= 29`
steps while nothing about the half-billion-symbol rows is ever materialized.
The edges follow straight from the rule: `k = 1` anywhere copies the root's
`0` through every generation, while the last position `k = 2ⁿ⁻¹` halves
cleanly at each step (every index on its walk is even), flips all `n - 1`
times, and answers `(n - 1) mod 2`.

The flip count also has a closed form worth noticing: rewriting the walk in
terms of `k - 1` makes each step shift one bit off — `ceil(k/2) - 1` equals
`floor((k - 1) / 2)`, and the step flips exactly when the bit shifted off is
set. The total is therefore the number of set bits of `k - 1`, so the answer
is `popcount(k - 1) mod 2`, which the loop computes with no popcount builtin;
every quantity along the way stays far below `2³¹`.

**Complexity:** `O(n)` time, `O(1)` space.
