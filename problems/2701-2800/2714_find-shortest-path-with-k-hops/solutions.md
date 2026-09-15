# Solutions — Find Shortest Path with K Hops

## Layered Dijkstra over (node, hops used)

Zeroing at most `k` edges is equivalent to carrying a budget of free
traversals alongside the walk, so the right state space pairs every node
with how much of that budget has been spent: `(node, hops used)`. The graph
over these states is the classic layering of hints — a copy of the original
adjacency per hop count where a normal traversal of edge `w` stays inside
one layer, and traversing any edge for free moves into the next layer up.
The answer is the shortest distance from `(s, 0)` to node `d` in any layer.
The product graph never needs to be materialized: both transition kinds are
relaxed directly off the adjacency lists while the heap runs.

The mechanics are Dijkstra with stale-entry skipping over a 2D best table
of size `n x (k + 1)`. Popping a state exposes it only if its recorded
distance still matches; each neighbor is then relaxed twice — paying the
edge weight inside the current layer, and crossing for free into the next
layer when hops remain. Zero-weight hop edges are harmless because all
weights are non-negative, which is exactly the precondition Dijkstra needs.
Since states leave the heap in non-decreasing distance order, the first pop
whose node is `d` is the global minimum over every way of spending at most
`k` hops, and the search can stop there; connectivity guarantees that pop
always happens.

The layered table bounds the work: there are `n * (k + 1)` states and each
settled state scans its incident edges in both directions, so the run is
linear-ish in `E * k` with a logarithmic factor from the heap.

**Complexity:** `O((k + 1) · E · log(n · (k + 1)))` time, `O(n · (k + 1))`
space.
