# Solutions — Search a 2D Matrix

## One binary search over the flattened matrix

The two guarantees — every row sorted, and each row starting strictly after the previous one ends — mean the matrix read in row-major order is a single non-decreasing sequence of `m * n` values. Searching it therefore does not need two phases of row-then-column bisection: one binary search over the flattened index space `[0, m * n)` is enough, and it is exactly the `O(log(m * n))` the statement demands.

The code runs that one lower-bound bisection. A virtual index `mid` maps back into the grid by dividing and taking the remainder by `n` — `matrix[mid / n][mid % n]` — so no flattened copy is ever built. The loop keeps whichever half must contain the first value `>= target`, and when the window collapses to a single index, that index holds either the target or the smallest value past it. One final comparison, guarded by the window not having run off the end, decides presence and absence at the same cost.

![With target 3 in [[1,3,5,7],[10,11,16,20],[23,30,34,60]] the bisection runs mids 6, 3, 1, 0 and collapses onto flattened index 1, whose cell (0, 1) holds the 3.](figures/solution-flattened-bisection-trace.svg)

Every shape falls out of the same index arithmetic. A single row or a single column is merely a shorter flattened sequence, the 1 x 1 matrix a one-element one, and a target below all values, above all values, or inside a gap between rows lands on a neighbouring cell that fails the equality check.

**Complexity:** `O(log(m * n))` time, `O(1)` space.
