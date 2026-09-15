# Solutions — Disconnect Path in a Binary Matrix by at Most One Flip

## Erase One Path and Search Again

A flip can only help if it removes connectivity, and removing means
turning a `1` into a `0` — creating extra `1` cells only ever adds paths,
because movement follows live cells. So the whole game is about the
monotone DAG formed by the `1`-cells: one flip succeeds exactly when some
non-corner cell lies on every root-to-corner route, which Menger's
theorem restates as "fewer than two paths from `(0, 0)` to
`(m - 1, n - 1)` share no interior cell". Example 2's ring of ones hides
two disjoint staircases, so it is unbeatable; Example 1's gap already
funnels every route through a single bend.

The code decides that condition with unit vertex capacities: each live
cell splits into an in-node and an out-node joined by capacity 1 (the two
protected corners get infinite capacity), right/down moves become
infinite arcs, and standard augmenting-path BFS runs until either no
augmenting path remains or total flow reaches 2 — at which point two
disjoint paths demonstrably exist and the answer is false. Cells that lie
on no root-to-corner route are skipped while building, and reaching flow 2
aborts further searching, so at most two BFS passes ever execute.

Each pass visits every node and arc once for linear work; with at most two
passes plus one failed probe folded into them, the whole decision is
linear in the cell count, comfortably inside the `m · n ≤ 10⁵` cap. Every
loop is iterative, node ids stay below `2mn`, and all capacities fit a
32-bit integer.

**Complexity:** `O(mn)` time, `O(mn)` space.
