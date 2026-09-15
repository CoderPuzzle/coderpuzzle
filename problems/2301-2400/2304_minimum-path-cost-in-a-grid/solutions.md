# Solutions — Minimum Path Cost in a Grid

## Dynamic programming over rows

A path visits exactly one cell in each row, so the cheapest way to stand on a
cell depends only on the best costs already reached in the row above. Carry a
rolling array of least costs, one entry per column: it starts as the first
row's own values (no move was made to enter them), and for each later cell it
takes the minimum of cost-above plus `moveCost[value above][this column]`,
then adds the cell's own value. The answer is the smallest reached cost in
the last row.

**Complexity:** `O(m * n^2)` time and `O(n)` space.
