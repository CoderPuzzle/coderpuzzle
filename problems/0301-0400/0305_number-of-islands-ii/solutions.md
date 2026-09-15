# Solutions — Number of Islands II

## Union-Find with Path Compression and Union by Size

Recomputing the island count from scratch after each add-land would cost a full grid scan per operation. Instead the solution maintains the count incrementally over a union-find (disjoint set union) structure indexed by flattened cell id `r * n + c`: turning a cell to land starts a new island, and each _distinct_ neighboring island it connects to merges away one island.

For every position, the code first checks the `land` flags. A repeated position changes nothing, so the previous count is appended again — this also guards against double-counting when the same cell appears multiple times in `positions`. Otherwise the cell is marked, the count is incremented, and its four neighbors are examined. Each land neighbor's root is found; if it differs from the new cell's root, the two sets are unioned and the count is decremented. When several neighbors belong to the same island, the second `find` returns the root just merged, roots match, and no extra decrement happens — which is exactly why union-find, rather than a naive neighbor count, is needed for correctness.

Two classic optimizations keep `find` cheap. Path halving (`parent[x] = parent[parent[x]]` while walking up) flattens traversed chains, and union by size attaches the smaller tree under the larger, keeping trees shallow. Together they make each operation near-constant amortized (inverse Ackermann in the theoretical bound), meeting the follow-up target of `O(k log(mn))` with room to spare.

The structure allocates arrays for all `m · n` cells up front, trading `O(mn)` memory for speed regardless of how many positions arrive. Grid boundaries are checked before touching neighbors, so edge and corner cells are handled without special cases.

**Complexity:** `O(k · α(m·n))` time, `O(m·n)` space.
