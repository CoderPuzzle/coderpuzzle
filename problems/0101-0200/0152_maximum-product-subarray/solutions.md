# Solutions — Maximum Product Subarray

## Max/Min Product Tracking

For sums, one running maximum suffices; for products it does not, because multiplying by a negative number reverses the order — the largest product ending at the next position may be an extension of the smallest product so far. The sweep therefore carries both `cur_max` and `cur_min`, the extreme products of subarrays ending exactly at the current index.

When the incoming value is negative, the two extremes are swapped before extending, so the usual candidate rules apply unchanged: `cur_max = max(value, cur_max · value)` — either start a fresh subarray at this value or extend the previous best — and `cur_min` symmetrically for the worst. `best`, seeded with the first element so a single-element array returns itself, is updated from `cur_max` at every step.

Zeros need no special casing: a zero pins both extremes to zero, and the next value immediately restarts the chain through the `max(value, ·)` candidate — the zero itself remains available as an answer via `best`, but nothing forces the subarray to extend across it. Because every step's candidates include the fresh start, `best` is always the product of some non-empty subarray.

**Complexity:** `O(n)` time, `O(1)` space.
