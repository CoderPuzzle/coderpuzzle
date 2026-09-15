# Solutions — Maximum Sum of M Non-Overlapping Subarrays I

## Exact-count DP with a monotonic deque

Let `previous[i]` be the maximum sum of exactly `count - 1` valid
subarrays contained in the first `i` elements. For a final subarray ending at
`end` and starting at `start`, its score combines with the earlier layer as

`prefix[end] + (previous[start] - prefix[start])`.

The valid starts lie in the sliding range `[end - r, end - l]`. Maintain
their parenthesized values in decreasing order in a deque, removing expired
starts from the front and dominated values from the back. Then the best
transition is always at the front. The current layer also carries
`current[end - 1]` forward to allow the last array element to remain unused.

The zero-subarray base layer is zero for every prefix. All later layers use
an impossible sentinel until a subarray is selected. Taking the best final
value over counts from 1 through `m` enforces selecting at least one
subarray, including when every possible sum is negative. Prefix sums and DP
scores use 64-bit integers because the result can have magnitude `10^12`.

**Complexity:** `O(mn)` time and `O(n)` space.
