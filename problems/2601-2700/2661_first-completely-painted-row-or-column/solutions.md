# Solutions — First Completely Painted Row or Column

## Position lookup with per-line counters

Painting proceeds in arrival order, so the only question per step is how
close each touched line is to full. Preprocessing every value to its cell
turns each painted number into an `(r, c)` lookup, and just two counter
arrays track progress: `row_fill[r]` counts painted cells in row r,
`column_fill[c]` the same for column c. The moment one reaches the line's
width or height, that line is complete and the current index is the
answer — later arrivals cannot retroactively finish anything earlier.

The work is a fixed three sweeps: build positions from `mat`, replay
`arr`, and everything else is constant per step. Both input and answers
stay far inside 32-bit range since values never exceed m * n ≤ 10⁵. A
single hash map plus two small arrays keeps auxiliary memory linear even
for the thin (1 × 10⁵) grids where per-cell bookkeeping would dominate.

**Complexity:** `O(m * n)` time, `O(m * n)` space.
