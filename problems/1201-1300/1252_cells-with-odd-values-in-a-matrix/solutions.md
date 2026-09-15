# Solutions — Cells with Odd Values in a Matrix

## Row and column parities, multiplied out

A cell's final value is `rowIncrements[r] + colIncrements[c]` — the order of
operations never matters, only how many times its row and its column were
touched. The cell is odd exactly when those two counts have opposite parity.

So count the parity of each row and each column (one pass over `indices`),
then combine: rows with odd counts contribute an odd cell in every column
with an even count, and vice versa. With `oddRows` rows at odd counts and
`evenRows = m - oddRows` (same for columns), the answer is
`oddRows * evenCols + evenRows * oddCols` — no matrix is ever materialized,
which is exactly the follow-up's `O(n + m + len)` time and `O(n + m)` space.

**Complexity:** `O(len + m + n)` time, `O(m + n)` space.
