# Solutions — Triangle

One recurrence, read in two directions: descend from the apex extending
partial paths into the next row, or climb from the base folding each pair
of children into their parent. Both collapse the pyramid into a single
rolling row of totals, and they differ only in which end of the recursion
does the work and where the answer finally sits.

## top_down

Ask the opposite question at each cell: `best[i]` is the cheapest descent from
the apex to column `i` of the current row. The apex seeds `best` with its lone
value, and each row below reads the row above — an interior cell at `i`
arrives from `i - 1` or `i` and takes its own value plus the smaller of those
two arrivals. Where the climbing sweep merged two children per cell, this one
must write the two edge cells explicitly: the first cell of a row has only the
parent directly above, the last only the parent to its upper-left, and neither
has two parents to choose between.

Since a row grows rather than shrinks in this direction, the code builds a
fresh row per level instead of overwriting in place — current and previous row
together still never exceed one pyramid row. The direction also moves where
the answer is read: nothing collapses into the apex. Instead the finished
sweep leaves the cheapest arrival at every cell of the last row, and the
answer is the minimum over that row. On the worked example the last row of
`best` works out to `14, 2, -1, 28`, and the smallest of them, `-1` at column
2, is the answer — the same total the bottom-up sweep found at the apex.

A one-row input returns the apex directly, and negative entries behave as in
the other direction — sums are compared, never assumed positive.

**Complexity:** `O(n²)` time, `O(n)` space — one pass per cell, the two triangle
are the only state.

## Bottom-up dynamic programming, one rolling row

Call `best(i, j)` the cheapest sum from cell `(i, j)` down to the bottom row. The statement allows exactly two moves from `(i, j)` — index `j` or index `j + 1` of the row below — so `best(i, j)` is the cell's own value plus the smaller of `best(i + 1, j)` and `best(i + 1, j + 1)`, the bottom row's cells are their own sums, and the answer is `best(0, 0)`. Running the recurrence upward rather than downward is what keeps the state small: a row only ever consults the row directly beneath it, never the whole triangle below.

The code carries that beneath-row as a single array, seeded with a copy of the bottom row. Each pass folds row `i` into it in place: `row[j] = triangle[i][j] + min(row[j], row[j + 1])`. Both reads are final before the write retires `row[j]`, and a row of `i + 1` cells touches only columns `0..i`, so one array is reused all the way up without ever growing — exactly the `O(n)` extra space the follow-up asks for, with `n` the number of rows. The triangle itself is never mutated.

A path takes one cell per row, so it crosses at most 200 values of magnitude at most 10⁴: no sum anywhere exceeds 2 × 10⁶, three orders of magnitude inside a 32-bit integer. The fixed-width ports therefore keep the triangle's own 32-bit cells for both the rolling array and the answer, with no widening.

**Complexity:** `O(n²)` time, `O(n)` extra space.
