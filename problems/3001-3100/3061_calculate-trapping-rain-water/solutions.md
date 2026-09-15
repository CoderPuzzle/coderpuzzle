# Solutions — Calculate Trapping Rain Water

## Two window sweeps and a summed deficit

The water resting on a bar is decided by two neighbors only: the tallest
bar to its left and the tallest bar to its right. The surface level at
that position is the lower of those two walls, and the bar traps
`level - height` units whenever the difference is positive — otherwise
nothing stands over it. Both walls are running maxima, so window
functions produce them in one ordered pass each:
`MAX(height) OVER (ORDER BY id)` walks ids ascending and carries the
maximum from the left edge through the current row, while
`MAX(height) OVER (ORDER BY id DESC)` walks descending and carries the
maximum from the right edge back to it. Because `id` is the unique
primary key, no two rows ever share an order position, so each row's
default frame reaches exactly up to itself, and ordering by `id`
reconstructs the landscape's left-to-right sweep regardless of the order
the dataset happened to insert the rows in.

Combining the walls leans on a SQLite quirk: there is no GREATEST-style
function under that name, but the scalar `MIN` and `MAX` accept multiple
arguments — `MAX(MIN(lft, rgt) - height, 0)` is one bar's trapped water,
the two-argument pairwise forms rather than the column aggregates (a
single argument would silently flip them into aggregations). A second
pass over the computed drops sums them into the answer, and
`COALESCE(SUM(water), 0)` keeps the contract's one-row shape when the
table is empty, where a bare SUM would surface NULL instead of the
required 0.

**Complexity:** `O(n log n)` time, `O(n)` space — each of the two window
passes sorts the `n` rows by `id`, and their outputs materialize as the
intermediate rows the final sum scans once.
