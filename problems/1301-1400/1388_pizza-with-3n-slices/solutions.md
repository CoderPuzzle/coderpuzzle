# Solutions — Pizza With 3n Slices

## Reduce to house robber on a broken circle

The picking ritual has a clean equivalent: whenever you take a slice, its two immediate neighbors go to Alice and Bob, so your chosen slices are pairwise non-adjacent on the circle; conversely any independent set of `n` slices (one third of `3n`) can be realized by some order of picks. The problem becomes: from a circular array of `3n` values, choose exactly `n` non-adjacent entries with maximum sum.

Break the circle with the standard trick — a non-adjacent selection on a circle cannot include both the first and last elements, so the optimum is the better of two linear runs: `rob(slices[:-1])` (last excluded) and `rob(slices[1:])` (first excluded). Each run is the classic house-robber DP restricted to exactly `k = n` picks.

That DP is two-dimensional: `dp[i][j]` = best sum using the first `i` entries of the linear array while picking exactly `j`, with no two chosen adjacent. Either entry `i` is skipped (`dp[i][j] = dp[i-1][j]`) or it is taken, which forces entry `i - 1` to be skipped and adds `arr[i-1]` to `dp[i-2][j-1]`; `-1` entries encode unreachable states so they never win a maximization. The answer of a run is `dp[len][k]`.

Edge cases: the code defensively special-cases a length-1 array, where both runs would otherwise be empty; requiring exactly `k` picks is essential — picking fewer would miscount the alternating turn order, and the `-1` sentinel guarantees no plan with the wrong pick count is ever scored. Each of the two runs fills an `O(len * k)` table.

**Complexity:** `O(n^2)` time, `O(n^2)` space.
