# Solutions — Largest Magic Square

A square is magic when every row, column, and both diagonals share one
sum. Re-summing each candidate's lines cell by cell repeats the same
work across overlapping windows; prefix sums answer any line-sum
question in constant time.

## Prefix sums over rows, columns, and diagonals

Build four prefix tables — horizontal (per row), vertical (per column),
main-diagonal, and anti-diagonal. For each top-left corner and side
length `k` (largest first), the first row's sum fixes the target; every
other row, column, and the two diagonals are then two-subtractions.
Return the first `k` with a match; `k = 1` always succeeds.

Sums reach `50 * 50 * 10^6 = 2.5 * 10^9`, past 32 bits — use 64-bit
accumulators.

**Complexity:** `O(min(m,n)^3)` window checks at `O(k)` each, i.e.
`O(min(m,n)^2 * m * n)` time overall for an `m x n` grid, `O(mn)`
extra space.
