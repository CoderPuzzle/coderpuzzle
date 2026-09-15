# Solutions — Count Submatrices With Equal Frequency of X and Y

## Prefix balances from the top-left corner

Because every counted submatrix must contain `grid[0][0]`, each candidate is
fully determined by its bottom-right corner: it is exactly the rectangle
spanning rows `0..r` and columns `0..c`. That collapses the search from all
`O(rows^2 * cols^2)` rectangles to just `rows * cols` anchored ones, and it
reduces each candidate to two quantities: its signed balance — score `'X'`
as `+1`, `'Y'` as `-1`, and `'.'` as `0`, so equal frequencies mean a
balance of zero — and its count of `'X'` cells, which must be positive.

Both quantities are prefix sums over the same rectangles, so one sweep in
row-major order suffices. Keep two arrays rolled from the previous row and,
after reading cell `(r, c)`, extend them along the row and fold in the
column history by inclusion-exclusion:
`rect(r, c) = cell(r, c) + rect(r, c - 1) + rect(r - 1, c) - rect(r - 1, c - 1)`
— out-of-range terms drop, so the first row and column need no special
casing beyond zero defaults. Whenever the folded balance is `0` and the
folded X-count is positive at some cell, that cell's top-left rectangle is
counted.

The magnitudes stay small: with at most `1000 x 1000` cells, every balance
is within `-10^6..10^6` and the answer itself cannot exceed the number of
cells, `10^6` — comfortably inside a 32-bit integer (and far below the
`2^53` exactness limit of JavaScript numbers).

**Complexity:** `O(rows * cols)` time — each cell is folded into both arrays
once — and `O(cols)` space for the rolling rows.
