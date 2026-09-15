# Solutions — K-th Smallest Remaining Even Integer in Subarray Queries

Dividing every positive even integer by two turns the infinite sequence into
the positive integers. Only even values in the queried subarray remove entries
from that sequence.

## Adjusted removed values

Collect each even value as its half-value `value` together with its original
array position. For a query, binary search the positions to isolate the
removed values belonging to `[l, r]`. If this slice starts at global removed
index `first`, its local item `j - first` is crossed by the answer exactly when
`value[j] <= k + j - first`, or equivalently
`value[j] - j <= k - first`. The precomputed sequence `value[j] - j` is
non-decreasing, so one more binary search counts all crossed removals. Adding
that count to `k` gives the missing half-value, which is doubled for the
answer.

At most `10⁵` values can be removed, so the largest result is
`2 * (10⁹ + 10⁵) = 2,000,200,000`, within signed 32-bit range and far below
JavaScript's `2⁵³` exact-integer limit.

**Complexity:** `O(n + q log n)` time, `O(n + q)` space including the output.
