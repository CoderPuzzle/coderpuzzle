# Solutions — Find the Count of Monotonic Pairs I

## Dynamic Programming with Prefix Sums over Values

A pair is fixed the moment `arr1` is chosen, because `arr2[i] =
nums[i] - arr1[i]`, so everything collapses onto `arr1`. Its entries
satisfy `0 <= arr1[i] <= nums[i]` and `arr1[i - 1] <= arr1[i]`, and the
non-increase of `arr2` adds
`nums[i - 1] - arr1[i - 1] >= nums[i] - arr1[i]`, i.e.
`arr1[i] >= arr1[i - 1] + (nums[i] - nums[i - 1])`. Combining the two
lower bounds, moving from position `i - 1` to `i` forces
`arr1[i] >= arr1[i - 1] + d_i` with `d_i = max(0, nums[i] - nums[i -
1])`: rises in `nums` push `arr1` up at least as fast, falls leave it
free.

Now count completions position by position. Let `dp[i][v]` be the number
of valid prefixes ending with `arr1[i] = v`; the base row is
`dp[0][v] = 1` for every `v` in `[0, nums[0]]`. A prefix ending at
position `i` with value `v` extends any prefix of position `i - 1`
whose value `t` lies in `[0, v - d_i]`, so
`dp[i][v] = sum of dp[i - 1][t] over that range`. Every row is a sum of
prefixes of the previous row, so keeping an inclusive prefix-sum array
over the value dimension answers each range in constant time: build the
prefix sums of row `i - 1` once, read `dp[i][v] = pref[v - d_i]` (zero
when `v < d_i`) for each `v` in `[0, nums[i]]`, then rebuild the prefix
sums. The answer is the final inclusive prefix sum at `nums[n - 1]`,
taken modulo `10⁹ + 7`.

Two bounds keep the arithmetic small. The lookup index never escapes
the previous row: if `nums` rose by `d_i`, subtracting it from
`v <= nums[i]` lands back inside `[0, nums[i - 1]]`, and otherwise
`d_i = 0` with `nums[i] <= nums[i - 1]`. And every stored value is
reduced below `10⁹ + 7` immediately; a prefix entry is rebuilt from two
such values, so intermediates stay below `2 * (10⁹ + 6)`, within 32-bit
range.

**Complexity:** `O(n * max(nums))` time, `O(max(nums))` space.
