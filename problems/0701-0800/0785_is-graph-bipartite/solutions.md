# Solutions — Is Graph Bipartite?

Two equivalent tests: try to 2-color each component with a DFS, or group
nodes with a union-find structure and verify nobody shares a set with
their own enemy.

## dfs_color

A graph is bipartite exactly when it admits a proper 2-coloring: assign each node one of two colors so every edge joins opposite colors. Coloring greedily along a traversal works because each node's color is forced the moment it is first reached: color the start `1`, and every neighbor gets `-color[u]`. The only way this fails is an edge whose endpoints receive the same color — which happens precisely when the graph contains an odd cycle, the sole obstruction to bipartiteness.

The graph may be disconnected, so iterate over all start nodes and launch a fresh DFS from each still-uncolored one. The traversal runs on an explicit stack with mark-on-push discipline: pop a node, and each neighbor is either colored with the opposite color and pushed, or already colored — same color means an odd cycle and returns false, while opposite color is consistent and skipped.

If every component colors without conflict, the two color classes are exactly the required independent-set partition, so the graph is bipartite. Isolated nodes (empty adjacency lists) color trivially and never cause conflicts.

**Complexity:** `O(V + E)` time (each node and edge touched a constant number of times), `O(V)` space for the color array and stack.

## union_find

Bipartite means the nodes split into two groups with every edge crossing between them. Turn that around: for each node u, all of u's neighbors must be able to share the one opposite group, so union them into a single set — `union(graph[u][0], graph[u][i])` for every i. After all adjacency lists are processed, each set is exactly one side of the putative partition.

Then verify the other half of the definition: scan every edge (u, v) and check that u and v landed in different sets. A node that shares a set with one of its own enemies sits inside an odd cycle, the sole obstruction to bipartiteness, so any `find(u) == find(v)` returns false; if no edge fails, the sets of each component are the required two groups.

`find` locates a node's root and then walks the path a second time to repoint every visited node straight at it (path compression), so repeated queries flatten the structure and future finds shorten.

**Complexity:** `O((V + E)·log V)` time — each of the `O(V + E)` find/union calls is logarithmic amortized, effectively near-linear — and `O(V)` space for the parent array.
