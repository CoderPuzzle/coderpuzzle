# Solutions — Number of Ways to Paint N × 3 Grid

## Row-shape recurrence over two row classes

Counting grids row by row collapses the state dramatically: what a new
row may contain depends only on the previous row, and a 3-cell row with
adjacent cells differing is exactly one of twelve patterns — six that use
two colors in an `aba` arrangement (Red-Yellow-Red and its siblings) and
six that use all three colors in an `abc` arrangement.

Track just the two class counts: `a` = colorings whose last row is a
two-color `aba` row, `b` = colorings whose last row is a three-color
`abc` row. Appending a next row: a two-color row above a given row comes
in 3 ways if the row below is `aba` and 2 ways if it is `abc`, giving
`a' = 3a + 2b`; a three-color row comes in 2 ways above either class,
giving `b' = 2a + 2b`. Starting from `a = b = 6` (the twelve single-row
patterns) and iterating `n - 1` times, the answer is `(a + b) mod 10⁹+7`.

Every intermediate stays below `3 · 10⁹ + 21`, so 64-bit arithmetic holds
the sums exactly and only one modulo reduction per step is needed; `n` is
at most 5000, so the loop is a few thousand iterations.

**Complexity:** `O(n)` time, `O(1)` space.
