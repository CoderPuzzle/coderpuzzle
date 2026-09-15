# Solutions — Minimum Operations to Remove Adjacent Ones in Matrix

## Checkerboard graph and Hopcroft–Karp

Treat each `1` as a vertex and every adjacent pair as an edge. Grid parity splits all vertices into a checkerboard bipartition. Removing the fewest vertices that touch every edge is a minimum vertex cover, whose size equals the maximum matching size in a bipartite graph by König's theorem.

Build edges from even-parity cells to adjacent odd-parity cells, then run Hopcroft–Karp. Breadth-first search layers all shortest augmenting paths, and an explicit stack augments along those layers without recursion, remaining safe on the largest grid.

**Complexity:** `O(E√V)` time and `O(V + E)` space for the graph's `V` one-cells and `E` adjacent pairs.
