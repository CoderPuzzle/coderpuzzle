# Solutions — Construct Product Matrix

## Prefix and suffix products over the flattened grid

Division is off the table, and not just as a style choice: the modulus
12345 factors as 3 · 5 · 823, and grid values up to 10⁹ routinely share
those factors, so an arbitrary cell has no modular inverse to divide by —
the "total product divided by the excluded cell" trick silently returns
garbage exactly when a value is a multiple of 3, 5, or 823. The fix is to
multiply companions only, never divide. Read the matrix in row-major order
as one flat sequence of `n·m` values; excluding `grid[i][j]` from the
product is then simply excluding one position `k` of that sequence, so
`p[i][j]` is (product of everything before `k`) times (product of
everything after `k`), all modulo 12345.

Two linear passes build the helpers: a prefix array where
`prefix[k] = flat[0]·…·flat[k-1]` and a suffix array where
`suffix[k] = flat[k]·…·flat[total-1]`, both seeded with the empty product 1
so the first and last positions need no special cases. The answer at
position `k` is then a single lookup-and-multiply,
`prefix[k] · suffix[k+1] mod 12345`. Reduction happens after every
multiplication: raw partial products of up to 10⁵ values near 10⁹ would be
astronomically large, but once every factor is reduced below 12345 each
intermediate product is below `12345²` — comfortably inside signed 32-bit
range (and trivially exact in JavaScript doubles), so no 64-bit
arithmetic is needed anywhere.

Every cell is touched a constant number of times — once when flattening,
once in each of the two product passes, once when writing the answer — and
the prefix, suffix, and output arrays are each one pass long, so the cost
is linear in the cell count with the output grid dominating the space. The
degenerate shapes need no special handling: a `1 x m` row and an `n x 1`
column are just the shortest and tallest flattening orders, and the
`n·m >= 2` floor guarantees at least one companion value for every cell.

**Complexity:** `O(n·m)` time, `O(n·m)` space.
