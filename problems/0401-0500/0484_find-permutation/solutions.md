# Solutions — Find Permutation

## Reverse every descending run

Ascending order is the smallest arrangement of the values overall: `1, 2, …,
n+1` compares favorably against every other permutation at the first position
where they differ, and it already satisfies every `I` in `s`, since each
adjacent pair rises. So the lexicographically smallest legal permutation is
the identity disturbed as little as possible — only where the string forces a
descent.

A maximal run of `D`s from `s[start]` through `s[end]` forces the `end -
start + 2` positions `perm[start..end+1]` to strictly descend. Those
positions currently hold consecutive ascending values, and reversing that
exact block is the cheapest fix: the values in the block stay the smallest
set that can occupy those positions while the prefix before them keeps its
untouched minimum, and the reversal orders them descending — as it must —
with the smallest reachable arrangement overall. Every `I` position sits
outside all runs and never moves.

The code builds `1..n+1`, then walks `s` once: each time a maximal `D` run
ends, it reverses the block that run covers, in place. Runs are disjoint, so
every element moves at most once — the whole pass is linear, and apart from
the output array itself only a couple of indices survive.

**Complexity:** `O(n)` time, `O(1)` extra space beyond the output.
