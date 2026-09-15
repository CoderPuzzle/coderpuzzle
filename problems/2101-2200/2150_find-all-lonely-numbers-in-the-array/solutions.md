# Solutions — Find All Lonely Numbers in the Array

Loneliness is a purely local property of a value `x`: it must occur exactly
once, and neither `x - 1` nor `x + 1` may occur at all. Hash lookups answer
both questions in constant time, which removes the quadratic rescan the naive
check would need.

## Frequency map, in-order scan

One pass builds a hash map from value to frequency; a second pass walks `nums`
in its original order and keeps every `x` whose count is 1 and whose two
neighbour keys are absent. Because a lonely value occurs exactly once, the
filter can admit it only at its single position — no deduplication is needed —
and the result comes out in first-occurrence order, matching the examples
(`[10,8]` from `[10,6,5,8]`). The map holds at most `n <= 10⁵` entries with
values in `0..10⁶`, comfortably inside 32-bit integers in every language, and
neither pass recurses, so stack depth is never a concern.

An input like `[1,3,5,3]` filters out both 3s (count 2) and keeps 1 and 5; an
adjacent chain such as `[0,1,2]` keeps nothing, since every value sees a
neighbour. At the size bound the answer can hold all `10⁵` elements, which the
judge's output allowance covers.

**Complexity:** `O(n)` time, `O(n)` extra space.
