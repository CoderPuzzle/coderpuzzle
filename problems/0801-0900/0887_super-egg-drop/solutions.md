# Solutions — Super Egg Drop

## Inverted DP on Floors Resolved per Move

The classic formulation — best floor to drop from, given eggs and floors remaining — leads to an `O(k n^2)` DP. The canonical solution inverts the question: let `dp[m][e]` be the maximum number of floors that can be fully resolved with `m` moves and `e` eggs. One drop from the right floor splits the problem cleanly: if the egg breaks, the floors below must be settled with `e - 1` eggs and `m - 1` moves; if it survives, the floors above must be settled with `e` eggs and `m - 1` moves. Hence `dp[m][e] = dp[m - 1][e - 1] + dp[m - 1][e] + 1`, counting the dropped floor itself.

The answer is the smallest `m` with `dp[m][k] >= n`, found by growing `m` one step at a time. The code rolls the DP into a single 1-D array indexed by eggs, updating `e` from `k` down to `1` so that each write reads the previous move count's values before overwriting them — the same in-place trick as 0-1 knapsack. Since `dp[e]` grows by at least one per move, the loop terminates within `n` iterations even for `k = 1`, where it degenerates into a linear floor scan.

This moves-first view is what makes the problem tractable: the state space is moves-by-eggs rather than floors-by-eggs, and because `dp[m][e]` grows like a sum of binomial coefficients, the required `m` is small in practice — two eggs resolve over 10,000 floors in just 141 moves. The worst case `O(k n)` bound is therefore very pessimistic; the true cost is `k` times the answer.

Example 2 (`k = 2`, `n = 6`) grows the resolved-floor table:

1. The rolling array starts at `dp[1] = dp[2] = 0`.
2. Move 1: `dp[2] = dp[1] + dp[2] + 1 = 1` and `dp[1] = 1` — one drop resolves one floor either way.
3. Move 2: `dp[2] = 1 + 1 + 1 = 3`, `dp[1] = 2` — a lone egg scans linearly while two eggs already cover three floors.
4. Move 3: `dp[2] = 2 + 3 + 1 = 6 >= 6`, so three moves determine `f` on six floors.

**Complexity:** `O(k·n)` time, `O(k)` space.
