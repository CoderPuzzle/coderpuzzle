# Solutions — Maximum Number of Operations With the Same Score II

## Interval DP over the three possible scores

The first operation already fixes the score every operation must share, and it removes elements only from the ends, so that score must be one of `nums[0] + nums[1]`, `nums[n-2] + nums[n-1]`, or `nums[0] + nums[n-1]`. Each candidate score is solved independently and the best of the three results is returned.

For a fixed score, interval DP computes `dp[l][r]` = the maximum number of deletions achievable inside `nums[l..r]`. Every operation consumes two boundary elements, so exactly three transitions exist: if the left pair sums to the score, take `1 + dp[l+2][r]`; if the right pair does, take `1 + dp[l][r-2]`; if the outer pair does, take `1 + dp[l+1][r-1]`. The table is filled by increasing interval length, with `dp` defaulting to 0 so that already-exhausted intervals simply contribute nothing; guards keep the recursive lookups in range when the interval has exactly two elements.

![The score-5 table for [3,2,1,2,3,4] filled by increasing length, with the winning chain dp[0][5] -> dp[2][5] -> dp[3][4] highlighted.](figures/solution-interval-dp.svg)

With `n <= 2000`, the O(n^2) table per candidate is cheap and the three passes together stay around 12 million cell updates. The table is rebuilt per candidate score, so only one n-by-n table is alive at a time.

**Complexity:** `O(n^2)` time, `O(n^2)` space.
