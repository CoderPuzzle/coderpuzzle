# Solutions — Coin Change II

## Unbounded Knapsack Combinations DP

Let `dp[a]` count the combinations of coins summing exactly to `a`, seeded with `dp[0] = 1` for the empty combination. Each denomination is processed in its own outer pass, and the inner pass walks amounts upward from `c`, accumulating `dp[a] += dp[a - c]`. Reading `dp[a - c]` after it has already absorbed uses of the same coin is exactly what allows a denomination to repeat any number of times — the unbounded (complete) knapsack behavior.

The loop order is what makes the table count combinations rather than ordered sequences. Because one denomination is fully finished before the next begins, every combination is assembled with its coins in one fixed order (the input order of denominations), so each multiset is counted exactly once. Reversing the loops — amounts outside, coins inside — would let the same multiset be reached through different coin orders and would count permutations instead, the classic distinction this problem turns on.

Since all coin values are positive, no amount below the smallest coin is reachable and the loop bounds naturally skip them; an unreachable target simply keeps its initial 0. One DP array of `amount + 1` cells suffices because each outer pass updates in place, and counts are guaranteed to fit a 32-bit integer. With `n = len(coins)` and `a = amount`, the work is one pass per coin over the amount axis.

**Complexity:** `O(n·a)` time, `O(a)` space.
