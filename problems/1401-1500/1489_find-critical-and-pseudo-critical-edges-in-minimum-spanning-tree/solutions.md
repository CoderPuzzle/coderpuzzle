# Solutions — Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree

## Kruskal With Deletion and Forcing Tests

Everything is measured against the graph's MST weight, which the solution first computes with Kruskal's algorithm: the edge indices are sorted by weight once, and edges are accepted in that order whenever a union-find — with path halving and union by size — joins two previously separate components.

An edge is critical exactly when removing it either raises the MST weight or disconnects the graph entirely. This is tested by re-running Kruskal over the precomputed order with that single edge skipped and comparing the total, where a spanning tree that fails to use n - 1 edges is treated as infinitely heavy. An edge is pseudo-critical when it is not critical yet can still appear in some MST; that is tested by forcing the edge first — unioning its endpoints and counting its weight before running the rest of the sort — and checking that the resulting total equals the base MST weight. The critical test runs first precisely because a critical edge would also pass the forcing test; only edges that survive deletion unchanged can be labeled pseudo-critical.

Each test uses a fresh union-find over the shared sorted order, so the sort cost is paid once and every test is linear in the number of edges. With at most 200 edges, running two tests per edge is comfortably fast. The two answer lists are sorted before returning, and edges that fail both tests — those belonging to no MST — appear in neither.

**Complexity:** `O(E² · α(V) + E log E)` time, `O(V + E)` space.
