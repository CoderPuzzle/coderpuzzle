# Solutions — Redundant Connection

Two ways to catch the edge that closes the tree's single cycle: a
union-find structure notices when an edge would reconnect one component,
while a plain DFS checks reachability directly before accepting each edge.

## union_find

The input is a tree plus one extra edge, so exactly one cycle exists and the edge to remove is the one that closes it. Processing edges in input order with a union-find structure detects that moment directly: an edge whose endpoints already share a root would reconnect connected components, i.e. close the cycle. Since all the original tree edges connect previously separate components, the extra edge is the first — and only — edge that ever fails the union test.

`find` locates a node's root and then walks the path a second time to repoint every visited node straight at it (path compression), so repeated queries flatten the structure and future finds shorten. `union` registers unseen nodes lazily on first touch, links one root under the other, and returns false precisely when both endpoints already have the same root — the signal to return the current edge. The scan stops there; if the input were a genuine tree the loop would finish and return an empty list, though the problem guarantees an answer exists.

**Complexity:** `O(n log n)` time, `O(n)` space.

## dfs

Same detection with no auxiliary structure: build the graph edge by edge and, before accepting each edge (a, b), run a reachability DFS over the adjacency collected so far. If b is already reachable from a, the endpoints were connected without this edge — adding it would close the cycle, so it is exactly the edge to return. Otherwise the edge joins two previously separate parts and is recorded in both directions.

The probe uses an explicit stack with mark-on-push discipline: nodes are marked seen when pushed, so each enters the stack at most once, and the search dives depth-first through the prefix graph until it either meets b or exhausts a's component. Because every prefix of the input is a forest, "reachable" and "already connected" agree here, so this variant returns the same edge as the union-find one.

**Complexity:** `O(E·(V+E))` time — each of the E edges may trigger a reachability DFS over the prefix graph — and `O(V+E)` space for the adjacency, stack, and seen set.
