# Solutions — Distance to a Cycle in Undirected Graph

## Peel leaves, then multi-source BFS

The graph has `n` nodes, `n` edges, is connected, and contains exactly one cycle — so it is a single cycle with trees hanging off it. The cycle is precisely the 2-core of the graph: repeatedly deleting degree-1 nodes strips away every tree branch layer by layer, and since a cycle keeps every member at degree at least 2, whatever survives the peeling is exactly the cycle. The code seeds a queue with all initially degree-1 nodes, marks each popped node removed, and decrements the degree of its remaining neighbours, enqueuing any that drop to degree 1 — a topological-sort-style peel in which every node is processed at most once.

Once the cycle is identified, the distance question becomes trivial: every cycle node has distance 0, and each hanging tree node's closest cycle node is its own root on the hanging tree. A multi-source BFS seeded with all non-removed (cycle) nodes expands outward through the peeled trees, assigning `dist[v] = dist[u] + 1` on first visit, which is by definition the minimum hop count to any cycle node.

![The example graph: peeling degree-1 nodes removes 0, then 6, then 5, leaving the square cycle 1-2-4-3 in dark blue at distance 0, with the hanging branch reaching distances 1 and 2.](figures/solution-peel-and-bfs.svg)

Both phases are linear: the peel touches each node and edge a constant number of times, and the BFS visits each node once and scans each edge twice. No recursion or sorting is involved, which matters at `n = 10^5`. The degree array doubles as the peeling bookkeeping (a node entering the queue at most once, guarded by `removed`), and `dist` starts at 0 so cycle nodes need no separate initialization.

**Complexity:** `O(n)` time, `O(n)` space.
