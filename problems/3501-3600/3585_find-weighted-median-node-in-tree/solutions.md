# Solutions — Find Weighted Median Node in Tree

## Binary lifting over root distances

Root the tree at node `0` and record, for every node, its parent, depth,
and weighted distance `dist` from the root. The lowest common ancestor
`l` of a query `(u, v)` then gives the total path weight
`tot = dist[u] + dist[v] - 2*dist[l]` and the cumulative sum
`acc = dist[u] - dist[l]` from `u` to `l`. Because `tot` can be odd, the
criterion "sum of edge weights from `u` to `x` is at least half of the
total" is evaluated entirely in integers as `2 * sum >= tot`. If
`2 * acc >= tot`, the median lies on the stretch from `u` up to `l`;
otherwise it lies on the stretch from `l` down to `v`. Both stretches
are searched by climbing, which is why the tree is traversed with an
explicit stack — a 10⁵-node chain would overflow the recursion stack of
every runtime.

Binary lifting turns each climb into `O(log n)`. On the `u`-side the
criterion fails at `u` itself and holds at `l`, so we repeatedly jump
`x` to its `2^k`-th ancestor whenever that ancestor still fails the
criterion and stays at or below `l` in depth; the parent of the deepest
failing node is the first satisfying node. On the `v`-side the criterion
holds at `v` and fails at `l`, so we jump `x` upward whenever the
jump target still satisfies the criterion and remains strictly deeper
than `l`; the highest such node is the answer — `l` itself can never be
reached because it already failed. A query with `u == v` is degenerate:
the path is the single node, the total is `0`, and `u` is its own
median.

All weights are positive, so `tot > 0` whenever `u != v`. Distances are
bounded by `n * w_max = 10⁵ * 10⁹ = 10¹⁴`, and doubled sums by
`2 * 10¹⁴`; both fit comfortably in 64-bit integers (and in JavaScript's
`Number`, exact below `2⁵³`).

**Complexity:** `O((n + q) log n)` time, `O(n log n)` space.
