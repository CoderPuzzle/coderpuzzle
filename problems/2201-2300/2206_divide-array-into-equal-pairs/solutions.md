# Solutions — Divide Array Into Equal Pairs

Pairs must hold equal values and every element joins exactly one pair, so the
array divides cleanly exactly when no value occurs an odd number of times —
the pairing itself is never in question, only the parities.

## Count occurrences, reject any odd one

Because the statement bounds `nums[i]` to `[1, 500]`, a fixed 501-slot table
holds every possible value's occurrence count: one pass increments
`counts[value]`, then a scan over the table rejects the input the moment any
count is odd. A value occurring an even number of times always pairs off
within itself, so all counts even is both necessary and sufficient.

The table replaces a general hash map with direct indexing — no resizing, no
collisions — and its size is a constant set by the constraint, not by the
input. The check visits at most 501 slots regardless of `n`, and counts stay
at most 1000, far inside every integer width the languages offer.

**Complexity:** `O(n)` time, `O(1)` space.
