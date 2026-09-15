# Solutions — Path with Maximum Probability

## Dijkstra with a max-heap over probabilities

This is Dijkstra's algorithm with the usual "shortest distance" relation
inverted: instead of minimizing a sum of non-negative edge weights, it
maximizes a product of edge probabilities, each in `[0, 1]`. Since
multiplying by a probability never increases a running value, the greedy
argument behind Dijkstra still holds — the node currently holding the
largest known probability can never be improved later, so once it is
popped its probability is final. The graph is built as an adjacency list
(each edge added both ways, since it is undirected), and a max-heap keyed
by probability (a min-heap over negated values, or a max-heap directly)
repeatedly extracts the unvisited node with the highest probability so
far, relaxing its neighbors by multiplying in the connecting edge's
`succProb`.

The search starts with `start_node` at probability `1.0` and every other
node at `0.0`, and stops as soon as `end_node` is popped — at that point
no unpopped node can still beat it, since probabilities only shrink along
an edge. If the heap empties before `end_node` is reached, no path
exists and the initial `0.0` is the correct answer. A `best` array
tracks the highest probability seen for each node so that stale, weaker
heap entries for an already-improved node are skipped in O(1) rather
than reprocessed.

**Complexity:** `O(E log V)` time, `O(V + E)` space, where `V = n` and
`E = edges.length`.
