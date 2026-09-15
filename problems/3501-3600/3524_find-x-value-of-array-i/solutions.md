# Solutions — Find X Value of Array I

## Subarray-product remainder DP

Choosing which prefix and which suffix to remove is the same as choosing the
non-empty contiguous middle `nums[l..r]` that survives — every `(l, r)` pair
with `l <= r` corresponds to exactly one operation, and nothing else about
the operation matters. So `result[x]` is simply the number of subarrays of
`nums` whose product leaves remainder `x` modulo `k`, and `k <= 5` keeps the
remainder state space tiny.

Scan left to right keeping `counts[r]` — how many subarrays ending at the
previous element have product `r` mod `k`. Extending each of those subarrays
by the current element maps `r` to `r * nums[i] mod k`, and the singleton
subarray `[nums[i]]` joins as a new count at `nums[i] mod k`; adding the
extended counts into `result` at every index accumulates the totals over all
positions. The product `r * nums[i]` reaches `4 * 10⁹`, past the 32-bit
range, so it is computed in 64-bit; the tallies themselves climb to
`n * (n + 1) / 2 = 5,000,050,000` for `n = 10⁵`, so the result array carries
64-bit counts too (a JS `Number` stays exact because `5 * 10⁹` is far below
`2⁵³`).

**Complexity:** `O(n * k)` time, `O(k)` space.
