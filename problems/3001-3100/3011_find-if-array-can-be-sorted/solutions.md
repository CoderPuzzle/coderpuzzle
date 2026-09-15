# Solutions — Find if Array Can Be Sorted

## Bound each segment's range

A swap is only legal between adjacent elements with the same number of set
bits, so the array splits into maximal segments of consecutive equal-bit
elements; within a segment any permutation is reachable by adjacent swaps,
and no element can ever leave its segment. Whether the whole array can end
up sorted therefore depends only on the segment boundaries: every value in
an earlier segment must be able to stand before every value in a later one.

Scan once, tracking the maximum seen in the current segment and the maximum
of all finished segments. When the bit count changes, the current segment
closes and folds its maximum into the running one. If any element is smaller
than a finished segment's maximum, some earlier value can never be moved
past it, so the array cannot be sorted; otherwise it can.

**Complexity:** `O(n)` time and `O(1)` space.
