# Solutions — Minimum Falling Path Sum

## Rolling-row dynamic programming

Where a falling path stands is all that matters for how it can continue:
from `(row, col)` the reachable futures are exactly those from any other
path ending in the same cell, however it got there. So define `dp[row][col]`
as the smallest sum of a falling path that ends exactly at
`matrix[row][col]`. The first row seeds it with the matrix's own values,
and each later cell extends the cheapest of its (at most) three parents
above: `matrix[row][col] + min(dp[row-1][col-1 .. col+1])`, clamped to the
columns that exist at the edges. Every falling path ends somewhere in the
last row, so the answer is the minimum entry of the last `dp` row.

Since filling one row reads only the row just above it, a single rolling
array is enough. Seed it with the first row, sweep downward computing each
new row from the previous one, and take the minimum of what remains — no
`row` index needs to be stored at all. Values stay within `n * 100 = 10^4`
in absolute value, so 32-bit integers carry every intermediate sum.

Correctness is the usual cut-and-paste argument: every path reaching
`(row, col)` arrives from one of the three cells above, and replacing its
prefix by a cheaper path to that same parent yields another valid falling
path with a smaller sum, so an optimal path's prefix must itself be optimal
for its endpoint — exactly what `dp` stores. Each of the `n²` cells does
constant work over its three parents.

**Complexity:** `O(n²)` time, `O(n)` space.
