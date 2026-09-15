# Solutions — Minimum Operations to Make Columns Strictly Increasing

Every operation raises one cell by one, and a column is strict exactly
when each cell tops the cell directly beneath it in the row above — no
constraint ever reaches across columns. So the matrix decomposes into `n`
independent one-dimensional problems, and the only question per column is
how little each cell can end up costing.

## Greedy per-column raise, one sweep

Within a column, the final values must dominate the input pointwise and
grow strictly, and the cheapest such column is built greedily from the
top: leave the first row alone, and set every later cell to the smallest
value the previous final cell permits, `max(value, previous + 1)`. An
induction shows this column is the pointwise minimum of all valid final
columns — any valid column must clear row `i-1` plus one, so it clears
the greedy value at every row — hence its increment total, the sum of
per-cell raises, is the global minimum; raising any cell higher can only
add operations.

The sweep keeps a single `previous` row: start from a copy of row 0, and
for each later row lift cells that fail `previous[j] + 1`, counting the
lift as it happens, otherwise just refresh `previous[j]`. That is one
pass over the `m * n` cells with `O(n)` working memory, and the answer's
magnitude is benign — a cell can never need more than `2499 + 49` total,
so the sum stays far inside 32 bits.

**Complexity:** `O(mn)` time, `O(n)` space.
