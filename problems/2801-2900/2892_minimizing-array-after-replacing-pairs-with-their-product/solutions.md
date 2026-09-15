# Solutions — Minimizing Array After Replacing Pairs With Their Product

## Ones compression and a bounded backward-scan DP

Every final element is the product of some contiguous block, and a block can
always be merged into one element with every step legal: without zeros the
left-to-right products never decrease, so each merge stays at most the block
total, and a single zero merges with anything for free since `0 * y = 0 <=
k`. A block larger than one element, though, is only legal when its total
product is at most `k` — the last merge that formed it is its final value.
So minimizing the length is exactly partitioning the array into the fewest
blocks that each hold either one untouched element or a product within `k`,
and a zero anywhere in `nums` answers `1` outright.

Zeros removed, adjacent `1`s are merged first (`1 * 1 = 1 <= k` always), so
no two neighboring elements are both `1` and every pair multiplies to at
least `2`. Then `dp[i]` is the minimum block count for the first `i`
elements: either element `i` stands alone giving `dp[i - 1] + 1`, or some
block `j..i` merges, giving `dp[j - 1] + 1` for every `j` whose backward
product `nums[j] * ... * nums[i]` is at most `k`. The scan walks left from
`i` multiplying and stops the moment the product exceeds `k`; since the
product at least doubles every two steps, that walk is at most `2 * log2(k)`
elements, and the whole DP costs `n * 2 * log2(k)`. Products reach
`k * max(nums)` which is near `10^18`, past 32-bit range, so the running
product is held in 64 bits (safely exact doubles in JavaScript, where every
continued product is at most `k < 2^53` and anything rounded is already far
above `k`).

**Complexity:** `O(n log k)` time, `O(n)` space.
