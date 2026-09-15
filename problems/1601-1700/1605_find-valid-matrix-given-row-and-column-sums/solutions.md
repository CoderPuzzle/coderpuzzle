# Solutions — Find Valid Matrix Given Row and Column Sums

## Greedy fill

Visit the cells in row-major order and be as generous as possible at each
one: put `min(remaining rowSum[i], remaining colSum[j])` into cell
`(i, j)`, then subtract that amount from both the row's and the column's
remaining sum. Whichever of the two was smaller reaches zero immediately,
so every step fully satisfies at least one remaining row or column total.

This greedy choice can never paint itself into a corner. By the time
processing reaches row `i`, all the sum already assigned to earlier rows
still balances against the columns exactly, so `rowSum[i]`'s leftover
still equals the leftover across `colSum` — there is always enough room
left in the remaining columns to place it. Filling row by row, left to
right, keeps that invariant true until the last cell, which necessarily
absorbs both sides' final remainder at once.

The code tracks `remainingRow` and `remainingCol` copies seeded from the
inputs and writes into a fresh `rows x cols` matrix as it goes; no
backtracking or lookahead is needed; each cell is visited exactly once.

**Complexity:** `O(rows * cols)` time, `O(rows * cols)` space.
