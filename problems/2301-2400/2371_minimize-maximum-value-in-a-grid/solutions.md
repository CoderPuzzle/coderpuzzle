# Solutions — Minimize Maximum Value in a Grid

## Sort Cells by Value and Assign Row/Column Maxima Plus One

The replacement must preserve relative order along every row and column, so if cell A precedes cell B in A's row or column with a larger original value, A's new value must exceed B's. The only ordering pressure on a cell comes from its own row and column — cells in different rows and columns never interact. That suggests assigning values in increasing order of the original values: when a cell's turn comes, every cell in its row or column with a smaller original value has already received a number, and every cell with a larger one has not.

For each cell, in ascending original-value order, the smallest legal replacement is `1 + max(best-so-far in its row, best-so-far in its column)` — the least positive integer exceeding everything already placed in its row and column. Tracking just the running maximum per row (`row_max`) and per column (`col_max`) suffices because the new value must exceed those and any larger demand would come only from cells not yet placed, which will be assigned strictly larger values later by construction. After assignment, both running maxima update to the new value.

This greedy is simultaneously optimal for the objective and canonical for the judge: processing in increasing original order means each value assigned is the minimum feasible given the commitments already made, so no cell's value can be lowered without violating an order constraint or shifting a still-unplaced cell's minimum higher; ties across equally good optima are resolved deterministically by the value order, which is unambiguous since all grid values are distinct. Edge cases: a 1x1 grid gets 1; a single row or column degenerates to assigning 1, 2, 3, ... in sorted order.

**Complexity:** `O(mn log(mn))` time, `O(mn)` space for the output (plus `O(m + n)` trackers).
