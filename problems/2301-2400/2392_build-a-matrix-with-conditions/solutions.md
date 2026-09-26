# Solutions — Build a Matrix With Conditions

## Two topological sorts

Row conditions and column conditions are independent partial orders over the numbers `1` to `k`: the row conditions dictate which numbers must sit in strictly higher rows, the column conditions which must sit in strictly left columns. Each orderability question is answered by Kahn's algorithm — build adjacency and indegree arrays from the condition list, seed a queue with the zero-indegree vertices, and repeatedly peel vertices, decrementing successors' indegrees. If fewer than `k` vertices come out, the conditions contain a cycle, no matrix exists, and the empty matrix is returned.

Both dimensions are handled by the same routine, and any valid topological order is good enough because distinct vertices of a topological order occupy distinct positions, which automatically makes every required pair strictly ordered. The position of each value is read off the two orders with dictionaries `row_pos` and `col_pos`, and value `v` is written at `matrix[row_pos[v]][col_pos[v]]`; all other cells stay 0.

![On Example 1 (k = 3), Kahn's queue peels rows in the order 1, 3, 2 and columns 3, 2, 1, and writing each value v at (row_pos[v], col_pos[v]) assembles the valid matrix [[0,0,1],[3,0,0],[0,2,0]] — any topological order qualifies, so it need not match the sample output.](figures/solution-row-col-topo-grid.svg)

Duplicate conditions are harmless (they add parallel edges and matching indegree counts), and the constraints exclude self-conditions, so no degenerate edges appear. With `E` conditions in total across both lists, the two sorts together do work linear in `k + E`, while the output matrix dominates the memory footprint at `k^2` cells.

**Complexity:** `O(k + E)` time, `O(k^2)` space.
