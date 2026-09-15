# Solutions — Find Missing Observations

## Compute and distribute the missing sum

The total of all rolls must be `mean * (m + n)`, so subtract the sum of the
observed rolls to obtain the sum required from the missing rolls. A valid
length-`n` dice sequence can have a sum only from `n` through `6n`; return an
empty array when the required sum lies outside that interval.

For a feasible sum, divide it by `n`. Put `base + 1` in the first `remainder`
positions and `base` in every remaining position. This preserves the required
sum, keeps every value between 1 and 6, and directly produces the prescribed
balanced order with larger values first.

**Complexity:** `O(m + n)` time, `O(n)` space for the returned array.
