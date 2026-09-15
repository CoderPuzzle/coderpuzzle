# Solutions — Minimum Edge Weight Equilibrium Queries in a Tree

## Root frequencies and binary lifting LCA

One operation rewrites any chosen edge to any value, so on a query path the
optimal plan keeps whichever weight is already most frequent untouched and
rewrites every other edge on that path once: the answer is exactly the
path's edge count minus its most frequent weight. The weights are bounded
(`1 <= wi <= 26`), which makes "most frequent" cheap to track everywhere:
rooting the tree anywhere and maintaining `freq[v][w]` — how many weight-`w`
edges lie between the root and `v` — turns the count of weight-`w` edges on
the `a..b` path into `freq[a][w] + freq[b][w] - 2 * freq[lca][w]`. The two
root prefixes agree above the lowest common ancestor, so those edges cancel,
and subtracting the LCA twice drops its own incoming edge from both sides.
Minimizing operations then means maximizing that value over the 26 possible
weights; a self-query has an empty path, every count is zero, and the answer
is zero without special handling.

A breadth-first search from node 0 produces parent pointers, depths, and a
parent-before-child node order in one queue pass; sweeping that order fills
the whole `26 x n` table, because each node copies its parent's 26 buckets
and bumps one. A binary-lifting table over the parent pointers (`up[k][v]` =
the `2^k`-th ancestor, root mapped onto itself) resolves each LCA by first
lifting the deeper endpoint by the depth difference, then descending both
endpoints together through decreasing powers of two — one final step up the
raw parent pointer lands on the LCA. Both structures are static after the
search, so each of the `m` independent queries costs two `O(log n)` climbs
plus a fixed 26-bucket combine. All integers involved stay far below signed
32-bit range (`n <= 10^4`, weights at most 26).

The traversal is iterative on purpose: the constraints admit a tree that is
one straight `10^4`-node chain, and a recursive depth-first search over such
an input would overflow the fixed call stacks of the JVM (512 KiB), Node,
and CPython before finishing. Building the lifting table dominates the setup
at `O(n log n)` time and space; the search and the frequency table are
linear (a constant factor of 26), and the per-query work is `O(log n + 26)`.

**Complexity:** `O((n + m) (log n + 26))` time, `O(n log n)` space.
