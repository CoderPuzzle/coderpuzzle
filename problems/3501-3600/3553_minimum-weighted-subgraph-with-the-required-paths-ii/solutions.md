# Solutions — Minimum Weighted Subgraph With the Required Paths II

Both methods rest on the same pin: the cheapest edge set joining `a`, `b` and
`c` is the union of the three pairwise paths, each edge of that union lying on
exactly two of them, so the answer is `(d(a, b) + d(b, c) + d(c, a)) / 2` and
the entire task is the fast evaluation of tree distances. One rooted traversal
hands every distance over: root at node `0`, record each node's depth and
weighted root distance `f(x)`, and `d(x, y) = f(x) + f(y) - 2 * f(w)` with `w`
the lowest common ancestor — so the methods part ways only on how `w` is
found. Binary lifting stores ancestor jumps: a lookup raises the deeper node
by binary steps and hops both nodes upward in lockstep, `O(log n)` per query.
The Euler tour instead flattens the tree into a depth sequence where the
ancestor becomes a range minimum: between the first tour visits of two nodes
the shallowest entry is exactly their LCA, and a sparse table over that
sequence answers the range argmin in constant time.

## Binary Lifting LCA with Weighted Distances

The minimal subtree connecting three nodes a, b, c is the union of the three pairwise paths between them, and a useful counting identity holds: every edge of that union lies on exactly two of the three paths (edges on the Steiner-like core lie on all pairwise routes, counted twice by symmetry of the formula). Hence its total weight is (d(a, b) + d(b, c) + d(c, a)) / 2, and the whole problem reduces to answering pairwise tree distances quickly.

Distances come from the standard root-distance trick: root the tree at node 0, compute each node's depth and weighted distance f(x) from the root in one DFS, and then d(x, y) = f(x) + f(y) − 2·f(lca(x, y)). The LCA is answered in O(log n) with a binary lifting table up[k][v] = the 2^k-th ancestor of v, built once by repeated doubling of the parent array; a query first lifts the deeper node to a common depth using the binary representation of the depth difference, then jumps both nodes upward together while their lifted ancestors differ.

The DFS is iterative so a 10^5-node path cannot overflow the call stack, and the root's parent pointers point to the root itself so lifts never run off the table. Since the sum of the three distances is always even, integer division by 2 is exact; the three query nodes are pairwise distinct per the constraints, and up to 10^5 queries amortize the O(n log n) preprocessing comfortably.

**Complexity:** `O((n + q) log n)` time, `O(n log n)` space.

## Euler Tour RMQ LCA with Weighted Distances

Here the ancestor hunt becomes a range query. The traversal writes an Euler
tour: a node is appended when first visited and again each time one of its
child subtrees closes, flattening the tree into a sequence of `2n - 1` entries
that dips down into every subtree and climbs back out. Two recorded facts turn
that sequence into an LCA oracle — the first-visit slot `first[v]` of every
node, and the structural truth that the tour segment between the first visits
of two nodes never rises above their lowest common ancestor yet always
includes it, because the segment can only wander inside the ancestor's
subtree. The shallowest entry between `first[x]` and `first[y]` therefore is
the LCA itself, found without a single upward step.

Answering "shallowest entry in a range" in constant time is the sparse
table's job. `table[k][i]` holds the shallowest node over the `2^k` tour
entries starting at `i`; each level is built from the one below by comparing
the winners of its two half-windows, one `O(n)` pass per level for `O(n log n)`
in all. A query on `[l, r]` takes `k = floor(log2(r - l + 1))` and reads two
windows of length `2^k`, one starting at `l` and one ending at `r`, which
jointly cover the range and may overlap; overlap costs nothing because a
minimum may be taken twice without harm. The shallower of the two stored nodes
is the answer — two array reads and one comparison, whatever the range's
length.

The walk itself is the sibling's: iterative, so a `10⁵`-node bamboo cannot
blow the call stack, rooted at `0` with the root's parent entry set to a
sentinel no node can match, and the explicit `dist` array carrying the
positive edge weights so each distance is
`f(x) + f(y) - 2 * f(w)` without recursion. On Example 1's tree, taking
children in input-edge order, the tour reads `0 3 1 5 1 3 2 3 4 3 0`; for
query `[0, 1, 5]` the ancestor of `0` and `5` is the shallowest entry of
`0 3 1 5`, namely node `0`, and the three distances `10`, `5` and `15` again
total `(10 + 5 + 15) / 2 = 15`. The three distances always sum to an even
number — integer halving is exact — and constant-time lookups leave the query
loop linear in the query count alone.

The price sits in the build. The table towers over a `2n - 1` entry sequence
rather than over the node array, so it holds roughly twice the entries per
level of the lifting table plus one level more — the same `O(n log n)` class,
about `2n log n` stored node indices, each one depth indirection away from
comparison. In exchange every one of the `3q` ancestor lookups drops from
`O(log n)` pointer-chasing steps to `O(1)`, the better trade exactly when
queries rival nodes in number, as the `10⁵`-query ceiling allows.

**Complexity:** `O(n log n + q)` time, `O(n log n)` space.
