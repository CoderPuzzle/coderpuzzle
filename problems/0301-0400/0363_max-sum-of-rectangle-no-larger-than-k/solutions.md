# Solutions — Max Sum of Rectangle No Larger Than K

A block is fixed by four numbers: its first and last row, its first and
last column. The cap — "largest total not exceeding `k`", with negative
values in play — is what forbids any clever maximum-subarray shortcut, so
both solutions end up considering blocks by their coordinates. They part
ways on how much of that consideration they make explicit. The honest one
builds a two-dimensional prefix table and then visits _every_ block,
reading each total in constant time from four table corners — no insight
about rows or columns, just complete coverage. The clever one enumerates
only the row pairs, collapses each band to a one-dimensional array, and
lets a sorted structure find the best column pair per band without ever
listing them.

## Block Enumeration with a 2-D Prefix Table

The prefix table is the whole machinery. `prefix[r][c]` holds the sum of
the rectangle covering the first `r` rows and `c` columns, built row by
row with the standard inclusion-exclusion recurrence; once it stands, the
sum of the block with rows `[top, bottom]` and columns `[left, right]` is

```text
prefix[bottom+1][right+1] - prefix[top][right+1]
                       - prefix[bottom+1][left] + prefix[top][left]
```

four lookups, no loops over cells. Four nested walks — top row, bottom
row, left column, right column — then read off every block the grid
contains, keeping the largest total that clears the cap; the guarantee
that some block fits keeps the answer defined, and negatives need no
special casing because no total is ever derived from a partial or
positional assumption — every candidate is a complete, exact block sum.
On Example 2, where the cap `k = -2` forces a negative answer, the walk
simply keeps the right-hand column's `-2` and discards the positive
blocks as over cap.

Nothing is missed and nothing is assumed; that is the method's virtue and
its cost. There are under `m²n²/4` blocks, each O(1) after an `mn`-sized
table, so at the constraint ceiling (a 100 × 100 grid) this is some 25
million constant-time checks — immediate in the compiled languages and
still within reach of the interpreter here, while the row-band solver
below replaces the innermost quadratic factor with a logarithmic one when
grids grow.

**Complexity:** `O(m²n²)` time, `O(mn)` space.

## Row-pair compression with sorted prefix sums

Any rectangle is determined by its top and bottom rows and a contiguous column range. The solution enumerates the top row and then extends the bottom row downward, accumulating a `col_sum` array that holds the sum of each column between the two rows — so extending the bottom by one row is a single `O(n)` update rather than a recomputation from scratch. Within a fixed row pair, every rectangle corresponds to a contiguous subarray of `col_sum`, reducing the 2D problem to "max subarray sum not exceeding k".

That 1D problem with negatives has no Kadane-style linear solution, so prefix sums do the work: a subarray sum ending at the current position equals `prefix - earlier_prefix` for some earlier prefix already seen. To maximize the sum while staying `<= k`, the code keeps all earlier prefixes in a sorted list and uses `bisect_left` to find the smallest earlier prefix `>= prefix - k`; subtracting it yields the largest candidate that does not exceed k, and `0` is seeded into the list so the subarray starting at the first column is considered too. Each new prefix is then inserted with `insort` to keep the list sorted for the next query.

The search itself is logarithmic, but inserting into a Python list shifts elements, which dominates the cost of maintaining the structure. The problem guarantees at least one rectangle with sum `<= k`, so `best` is always set before the loops end. With `m, n <= 100` the total work is comfortably small even at the worst case.

**Complexity:** `O(m²·n²)` time worst case (`m²` row pairs, each doing `n` binary searches and up to `n` linear-time insertions), `O(n)` space.
