# Solutions — Minimize Malware Spread II

## Union-find over the non-initial components

Removing a node now deletes the node together with all of its connections, so
unlike the variant where the removed node lingers in the network, no spread
can pass through the removed node afterwards. Look at the components of the
subgraph induced by the non-initial nodes: every edge leaving such a
component lands on an initial node — a non-initial neighbor would have been
merged in — so a component is reached by the malware exactly when at least
one initial node stands directly adjacent to it. Consequently removing an
initial node `u` spares precisely those components whose sole adjacent
initial node is `u`; a component touched by two or more initial nodes stays
infected through the others no matter which one goes.

An iterative union-find with path halving and union-by-size builds the
components, merging only pairs `i`, `j` with `graph[i][j] == 1` where both
endpoints are outside `initial`. A second pass walks each initial node's
matrix row and records, per component root, how many distinct initial nodes
adjoin it and which one that is when there is exactly one; each solely-touched
root then contributes its size to that node's spared total. Minimizing
`M(initial)` means maximizing the spared total, and the scan over `initial`
takes the largest, breaking ties toward the smallest node index — which also
settles the case where nothing can be spared by returning the smallest node
of `initial`.

Both passes read the adjacency matrix once, `n(n - 1) / 2` cell pairs plus
one row per initial node, and every array holds `n` entries.

**Complexity:** `O(n²)` time, `O(n)` space.
