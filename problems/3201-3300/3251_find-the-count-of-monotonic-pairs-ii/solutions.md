# Solutions — Find the Count of Monotonic Pairs II

## Dynamic Programming over Values with Rolling Prefix Sums

Choosing `arr1` determines everything: `arr2[i] = nums[i] - arr1[i]`, and
the two monotonicity laws translate into `0 <= arr1[i] <= nums[i]`,
`arr1[i - 1] <= arr1[i]`, and
`arr1[i] >= arr1[i - 1] + (nums[i] - nums[i - 1])` whenever `nums`
rises. So between neighboring positions the only forced motion is
`arr1[i] >= arr1[i - 1] + d_i` with `d_i = max(0, nums[i] - nums[i -
1])`: climbs in `nums` drag `arr1` up with them, descents leave it free.

Count completions row by row. Let `dp[i][v]` be the number of valid
prefixes with `arr1[i] = v`; row 0 is all ones on `[0, nums[0]]`. A
state `(i, v)` extends any state `(i - 1, t)` with `t <= v - d_i`, so
each entry is a range sum over the previous row. Summing that range by a
fresh loop per entry would cost `O(n * max(nums)^2)` — about `2 * 10^9`
steps at these constraints. Instead keep an inclusive prefix-sum array of
the previous row: after one linear pass builds it, every entry of the new
row is a single lookup `pref[v - d_i]` (zero when `v < d_i`), and a
second linear pass re-accumulates the new row into prefix form. Each
position therefore costs `O(max(nums))`, about `2 * 10^6` steps across
the whole array.

The bookkeeping stays small. The lookup index cannot escape the previous
row: when `nums` rose by `d_i`, subtracting it from `v <= nums[i]` lands
back inside `[0, nums[i - 1]]`; otherwise `d_i = 0` and
`nums[i] <= nums[i - 1]`. Every stored value is reduced below `10⁹ + 7`
as soon as it is formed, and a prefix entry is rebuilt from two such
values, so intermediates stay below `2 * (10⁹ + 6)`. Only the current
row is kept. The answer is the final inclusive sum over
`[0, nums[n - 1]]`.

**Complexity:** `O(n * max(nums))` time, `O(max(nums))` space.
