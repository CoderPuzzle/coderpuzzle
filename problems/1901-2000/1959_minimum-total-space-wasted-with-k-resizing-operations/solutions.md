# Solutions — Minimum Total Space Wasted With K Resizing Operations

## Partition DP with Precomputed Segment Waste

At most `k` resizings split the timeline into at most `k + 1` blocks, each served by one array size. Within a block the optimal size is the maximum of `nums` over that block — anything smaller is invalid at the peak time, anything larger wastes more at every time — so the waste of a single allocation covering `nums[i..j]` is `g[i][j] = max(nums[i..j]) · (j-i+1) - sum(nums[i..j])`. The problem becomes: partition the array into at most `k + 1` contiguous blocks minimizing the sum of block wastes, which is a classic interval partition DP.

The `g` table is computed for all `O(n^2)` intervals in `O(n^2)` total: fixing the start `i`, extend `j` rightward while carrying a running maximum, with prefix sums supplying the interval sum instantly. The DP is then `dp[j][i]` = minimum waste covering the suffix starting at `i` using exactly `j` allocations, with the sentinel `dp[0][n] = 0` (nothing left to cover) and the recurrence `dp[j][i] = min over t >= i of g[i][t] + dp[j-1][t+1]`. Iterating `j` upward and `i` downward means every referenced state (a shorter suffix, one fewer block) is already final, and the answer is `dp[k+1][0]` — using all `k + 1` blocks is never worse than using fewer, because splitting a block in two replaces one allocation sized to the block maximum by two allocations sized to smaller or equal maxima, which can only reduce the waste.

With `n <= 200` and `k <= n - 1`, the triple loop is at most a few million iterations. The dominant memory is the `n × n` waste table; the DP layers add `O(k·n)` on top.

**Complexity:** `O(k·n^2)` time, `O(n^2)` space.
