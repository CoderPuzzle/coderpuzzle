# Solutions — Minimum Number of Vertices to Reach All Nodes

## In-degree count

A node with no incoming edge can never be reached from any other node, so
every such node must appear in the answer. Conversely, a node that does
have an incoming edge is always reachable from wherever that edge starts
(and, transitively, from whatever in-degree-zero node ultimately feeds that
chain, since the graph is acyclic and finite). So the set of in-degree-zero
nodes is not just necessary — it is also sufficient, and therefore the
unique minimum answer the statement promises.

The implementation walks `edges` once, incrementing an in-degree counter
for each destination `toi`. A second pass over the `n` nodes collects every
index whose counter stayed at zero. No traversal, ordering, or cycle
detection is needed beyond that single counting pass.

**Complexity:** `O(n+e)` time, `O(n)` space.
