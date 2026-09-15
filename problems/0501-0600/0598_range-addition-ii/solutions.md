# Solutions — Range Addition II

## Minimum prefix rectangle

An operation `[a, b]` never touches a scattered set of cells: it increments
exactly the prefix rectangle `0 <= x < a` and `0 <= y < b`, the block anchored
at the top-left corner. A cell's final value is therefore the number of
operations whose rectangle covers it, and the maximum can only sit where
coverage is thickest — under every rectangle at once. The intersection of
prefix rectangles is itself a prefix rectangle, the one sized by the smallest
`a` and the smallest `b`, so the cells holding the maximum value `len(ops)`
are exactly the `min(a) · min(b)` cells of that top-left block.

When `ops` is empty no rectangle exists, every cell stays at `0`, and every
cell is a maximum: the count is the whole `m · n`. Starting both running
minima at `m` and `n` folds that case into the same expression — each
operation `[a, b]` tightens the two minima, and whatever they end at, the
answer is their product. No matrix is ever materialized.

The two minima stay at or below `4 · 10⁴`, but their product can reach
`1.6 · 10⁹`, close to the ceiling of a 32-bit integer, so the final count
is computed and returned as a 64-bit value. One pass over `ops` and two
integers of state are all the method needs.

**Complexity:** `O(len(ops))` time, `O(1)` space.
