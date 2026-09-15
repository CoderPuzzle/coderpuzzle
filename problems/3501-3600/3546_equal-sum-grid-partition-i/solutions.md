# Solutions — Equal Sum Grid Partition I

## Prefix-scan rows, then columns

A single straight cut always separates the grid into a run of whole rows or
a run of whole columns — never anything ragged. So the candidate partitions
are exactly: rows `0..r` vs `r+1..m-1` for each interior `r`, and columns
`0..c` vs `c+1..n-1` for each interior `c`. Two sections can only split the
total evenly, which collapses the test to "does some run-prefix sum equal
`total / 2`" — and an odd total answers false immediately.

One pass accumulates row sums into a running prefix and compares against
the half-total at every interior boundary; a second pass does the same down
the columns. Because all values are positive, prefix sums strictly
increase, so an early exit on the first match loses nothing and the scans
never need to revisit a boundary. With up to `10⁵` cells of value up to
`10⁵`, the total reaches `10¹⁰` — larger than a signed 32-bit integer — so
every accumulator is 64-bit (Python and JavaScript integers are arbitrary
precision / exact below `2⁵³` and comfortably cover `10¹⁰`).

**Complexity:** `O(m · n)` time, `O(1)` extra space.
