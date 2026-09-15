# Solutions — Check if an Array Is Consecutive

## Sort, then every step must be exactly one

Sorting puts any consecutive array into the exact shape `x, x+1, …, x+n-1`,
so after an in-place sort the array is consecutive precisely when each
adjacent pair differs by exactly 1 — a single linear scan. Any duplicate or
gap shows up as a step of 0 or ≥ 2 and fails fast.

The same verdict has a hash-flavored twin — "n distinct values with
max − min = n − 1" — but the sorted scan avoids the extra pass and matches
the statement's own hint. Sorting is `O(n log n)` time; the scan adds only
`O(n)`, all in place.

**Complexity:** `O(n log n)` time, `O(1)` extra space (in-place sort).
