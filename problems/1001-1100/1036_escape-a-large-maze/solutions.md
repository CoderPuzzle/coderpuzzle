# Solutions — Escape a Large Maze

## Bounded bidirectional flood-fill

The grid is far too large to materialize, but the blocked set is tiny (at
most 200 cells), so the only way a flood-fill from `source` can fail to
reach `target` is if `source` is walled into a fully enclosed pocket, or
`target` is. A wall built entirely out of `n` blocked cells can enclose at
most `n * (n - 1) / 2` open cells — the largest such pocket is the
triangular staircase a diagonal line of `n` blocked cells cuts off in a
corner of the grid, and any other arrangement of the same `n` cells
encloses no more area than that. So run an iterative BFS/DFS from
`source`, but cap it: stop as soon as the visited count exceeds
`n * (n - 1) / 2`, because at that point the fill has already proven
`source` cannot be trapped, however the search continues. Do the same
capped fill from `target`. Each fill also short-circuits to `true`
immediately if it ever steps onto the other endpoint.

Both fills return `true` (either by reaching the other endpoint directly
or by blowing past the enclosure cap) exactly when neither `source` nor
`target` sits in a sealed pocket — which, given the tiny blocked budget,
is exactly when a path between them exists. Return `true` only if both
directions succeed.

**Complexity:** `O(n^2)` time (each capped fill visits at most
`O(n^2)` cells), `O(n^2)` space.
