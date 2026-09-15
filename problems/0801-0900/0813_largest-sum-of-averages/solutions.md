# Solutions — Largest Sum of Averages

## Partition DP with prefix sums

A prefix-sum array lets the average of any segment `nums[i:j]` be read in constant time as `(prefix[j] - prefix[i]) / (j - i)`. On top of that, the problem is a classic interval partition: define `dp[i]` as the best score achievable for the suffix `nums[i:]` using the current number of groups. For one group the only option is to take the whole suffix, so the initial `dp` is just the suffix averages.

The sweep then adds one group at a time. For `groups = 2..k`, the new value at `i` is the maximum over every first-group boundary `j > i` of the average of `nums[i:j]` plus the old `dp[j]`, which already holds the best way to split what remains into `groups - 1` parts. The loop bounds keep the partition feasible: `i` stops at `n - groups` so enough elements remain to form that many groups, and `j` stops before `n - groups + 2` so the suffix left for the remaining groups is long enough. After the `k`-th pass, `dp[0]` is the answer.

Because each pass only reads the previous pass, a single rolling array of length `n` carries all the state instead of a full `k x n` table. Since more groups can never lower the score (splitting off a one-element group is always available while groups remain), iterating exactly up to `k` naturally realizes the "at most `k`" allowance, and `k <= n` guarantees the base pass is well defined.

**Complexity:** `O(k · n^2)` time, `O(n)` space.
