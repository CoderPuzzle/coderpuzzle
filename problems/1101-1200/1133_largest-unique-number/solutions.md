# Solutions — Largest Unique Number

## Count into a value-indexed table, scan it downward

Values are bounded by 1000, so the counting structure is a plain 1001-slot
array rather than a hash map: one pass increments `counts[v]`, and a second
pass walks from 1000 down to 0 returning the first slot holding exactly 1.
Walking downward is what makes the result the _largest_ unique value with no
sorting step; if the scan falls through the whole table, no value occurs
once and the answer is -1.

The whole computation is two linear passes over bounded ranges, so nothing
depends on the input length beyond the first pass.

**Complexity:** `O(n + V)` time for `n` input values and `V = 1001` slots,
`O(V)` space — a fixed-size table.
