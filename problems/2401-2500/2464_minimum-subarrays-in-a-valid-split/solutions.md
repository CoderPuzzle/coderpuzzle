# Solutions — Minimum Subarrays in a Valid Split

## Dynamic programming over prefixes

A split is a chain of valid subarrays, so the minimum subarray count obeys
an optimal-substructure recurrence. Let `dp[i]` be the fewest subarrays
needed to validly split the prefix `nums[:i]`, with `dp[0] = 0`. The last
subarray of any split of `nums[:i]` ends at index `i - 1` and starts at
some `j`, and that subarray is valid exactly when `gcd(nums[j], nums[i-1])`
is greater than 1. Everything before it is a valid split of `nums[:j]`,
giving the transition `dp[i] = min(dp[j] + 1)` over all valid starts `j`.

The table is filled left to right, so every `dp[j]` the inner loop reads is
already final. A value that never becomes reachable stays at the `inf`
sentinel; when even a single element is `1`, that element can never serve as
an endpoint of a valid subarray (a gcd with `1` is always `1`), so such
prefixes remain unreachable unless the `1` is tucked into the interior of a
larger subarray whose endpoints both exceed `1`. The answer is `dp[n]`, or
`-1` if it never dropped below `inf`.

The inner loop computes a gcd per candidate pair. Euclid's algorithm is
logarithmic in the smaller argument, and with `nums[i] <= 10⁵` each call is
a handful of steps, so the `n²` pairs are cheap even at `n = 1000`.

**Complexity:** `O(n² log M)` time (M is the largest `nums[i]`), `O(n)` space.
