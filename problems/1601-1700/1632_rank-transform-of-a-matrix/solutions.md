# Solutions — Rank Transform of a Matrix

## Union-Find over Equal Values

Process the cells in increasing order of value. All strictly smaller values must already have smaller ranks in their rows and columns, so the only freedom left concerns ties: cells holding the same value that share a row or a column are forced to have equal rank. Group the sorted cells by value and, inside each group, union every pair of cells that sits in the same row or the same column — chains through shared rows/columns propagate, so each connected component gets a single rank.

Within a group, each cell's rank must exceed the largest rank already used in its row and in its column, tracked in `row_max` and `col_max` from all previously processed (strictly smaller) values. The component's rank is one plus the maximum of those requirements over all cells in the component, which is simultaneously the smallest legal value for every cell in it. After assigning, `row_max` and `col_max` are updated with the new rank so later, larger values see it.

![Example 3's matrix [[20,-21,14],[-19,4,19],[22,-47,24],[-19,4,19]] processed in increasing value order: each equal pair sharing a column (-19, 4, 19) unions into one component stamped with max(row_max, col_max) + 1, producing the ranks [[4,2,3],[1,3,4],[5,1,6],[1,3,4]] — the 4-pair, for instance, sees row_max 1 and col_max 2 and takes rank 3.](figures/solution-union-rank-components.svg)

Assigning the smallest feasible rank at every step, in increasing value order, is exactly the condition that the final matrix is minimal component-wise; ties are forced by the union step, so no cell could be lowered without violating a strict inequality against an already-fixed smaller value. Edge cases: a matrix of all-equal values collapses into one component ranked 1, and fresh union-find parents are created per group so components never leak across different values.

**Complexity:** `O(mn log(mn))` time, `O(mn)` space, for an `m × n` matrix.
