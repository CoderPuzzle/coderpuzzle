# Solutions — Closest Node to Path in Tree

## Deepest of the three pairwise LCAs

Root the tree at node 0 and record a parent and a depth for every node with
one breadth-first pass, then build a binary-lifting table so the lowest
common ancestor of any two nodes can be found iteratively in `O(log n)` —
the deep chains these bounds allow never touch a call stack.

For a query `[start, end, node]` form the three pairwise LCAs of `start`,
`end`, and `node`. A standard three-node lemma says two of them coincide
and the third is the deepest, and that deepest one always lands on the
`start`–`end` path: it is either the path's own meeting point
`LCA(start, end)`, or an ancestor of one endpoint lying strictly below that
point, i.e. a vertex on one half of the path. It is also exactly where the
route from `node` merges onto the path, so walking away from it along the
path strictly increases the distance — for any path edge, its two endpoints
lie in the two components the edge cuts the tree into, and `node` sits in
just one of them. The closest node is therefore unique, and the deepest of
the three LCAs is it. This also covers the degenerate `start == end`
queries, where the path is a single vertex and only `LCA(start, end)`
survives as the deepest — picking between just the two endpoint LCAs would
miss it.

**Complexity:** `O((n + m) log n)` time, `O(n log n)` space.
