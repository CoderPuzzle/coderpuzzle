# Solutions — Median of a Binary Search Tree Level

One question of reach and one of selection: get to the queried level, then
pick its upper median.

## Frontier descent, sorted upper median

Reaching the queried level needs no bookkeeping beyond the level itself:
hold the current level's nodes as a frontier and repeatedly replace it
with the children of its nodes. After `level` such passes the frontier is
exactly the queried level; if it empties first, the level does not exist
and -1 is the answer. The descent only ever touches nodes at depths up to
`level`, so a missing level costs just the nodes above it, and the loop
structure is iterative by construction — a degenerate chain of 200,000
nodes never approaches any recursion limit.

The median itself is index `len / 2` of the sorted level values: odd
counts land on the exact middle, even counts take the larger of the two
middle elements — the upper median the statement demands. Following the
statement's own definition and sorting is cheap insurance: for a genuine
BST each level's left-to-right sequence happens to be non-decreasing
already (two nodes sharing a level split left/right at their first
divergent ancestor, which partitions their values), but the sort makes
the selection independent of that structural argument — and of how
duplicates might be placed.

The whole computation is one frontier at a time plus one sort of the L
values gathered at the target level.

**Complexity:** `O(n + L log L)` time, `O(n)` space, where `L` is the number of
values at the target level.
