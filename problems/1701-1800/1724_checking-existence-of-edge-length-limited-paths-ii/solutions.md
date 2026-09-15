# Solutions — Checking Existence of Edge Length Limited Paths II

Every query is a threshold question in disguise: "is there a `p`-to-`q`
path whose every edge is below `limit`" asks whether `p` and `q` come
connected in the subgraph of edges cheaper than `limit`. Rebuilding that
subgraph per query works, but the graph is fixed at construction, so all
the queries can be answered from one static structure.

## Minimum Spanning Forest with Max-Weight Binary Lifting

The structure is a minimum spanning forest, because a spanning tree
already contains every connectivity fact the queries need: the minimum
over all `p`-to-`q` paths of the maximum edge on the path — the path
minimax — is attained inside any MST. Cheapest-first Kruskal acceptance
guarantees this: when the algorithm first joins `p` and `q` into one
component, it does so across the cheapest edge crossing that cut, so the
tree path between them never carries an edge heavier than the best
alternative path's heaviest edge. A query is then exactly "is the tree
path's maximum edge `< limit`" — and since the forest is built per
component, nodes in different trees answer `false` outright, covering the
disconnected case.

To read that maximum quickly, root each tree (any node), record every
node's depth and parent edge, and build the binary-lifting tables where
entry `j` holds the `2^j`-th ancestor together with the largest edge
weight along that hop — each level gluing two half-hops of the level
below, roots lifting to themselves with weight `0` so hops never leave a
tree. Construction is fully iterative: Kruskal scans the sorted edges,
and one BFS per component fills depths and parent edges before the
levels are rolled up.

A query lifts the deeper of `p` and `q` to equal depth, then lifts both
while their `2^j`-th ancestors differ (stopping just below the LCA) and
finally over the two parent edges, taking the maximum weight every hop
touches. At most `2 log n` table entries decide the answer, against
`10⁴` queries over a graph of up to `10⁴` edges.

**Complexity:** `O((E + Q) log n)` time, `O(n log n)` space.
