# Solutions — Painting the Walls

## Knapsack-Style Coverage DP

Reframe the two painters as a covering problem. Whenever the paid painter takes wall `i`, it is busy for `time[i]` units during which the free painter can paint up to `time[i]` other walls at no cost, so paying for wall `i` effectively covers `time[i] + 1` walls — itself plus `time[i]` free ones — at price `cost[i]`. A set `P` of paid walls succeeds exactly when `|P| + sum(time[i] for i in P) >= n`, which is the same as saying the weights `time[i] + 1` of the chosen walls sum to at least `n`.

That is a 0/1 knapsack over coverage: `dp[j]` is the cheapest selection of walls covering at least `j` walls' worth of demand, with `dp[0] = 0`. Processing wall `i` updates `dp[j] = min(dp[j], dp[max(j - (time[i] + 1), 0)] + cost[i])` for `j` descending; the clamp folds surpluses back to the `dp[0]` origin, sound because coverage beyond `n` is worthless. The answer is `dp[n]`.

Iterating `j` downward ensures each wall contributes at most once, exactly like bounded knapsack. With `n <= 500` the double loop is a quarter-million steps, and one rolling row suffices.

**Complexity:** `O(n^2)` time, `O(n)` space.
