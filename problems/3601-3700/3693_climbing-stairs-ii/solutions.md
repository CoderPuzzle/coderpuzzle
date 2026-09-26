# Solutions — Climbing Stairs II

## Rolling three-state dynamic programming

Let `dp[j]` be the cheapest total cost of standing on step `j`. Step `0` is free, and every arrival at a later step comes from one of the three steps below it, so `dp[j] = min(dp[j - d] + costs[j] + d²)` for `d` in `1..3`. Greedy hopping cannot decide those moves locally — a long jump skips landing fees but pays a quadratic distance penalty, so whether it wins depends entirely on the neighboring prices. The recurrence only ever looks back three steps, though, so one left-to-right scan settles each step in constant time.

![For Example 1's n = 4 with costs = [1, 2, 3, 4], the staircase fills dp = 0, 2, 5, 9, 13 left to right, and the optimal path 0 → 1 → 2 → 4 takes jumps of length 1, 1, 2 whose landing costs 2 + 3 + 8 sum to 13.](figures/solution-dp-staircase-path.svg)

Only the last three `dp` values are ever read again, so the table rolls: `prev1`, `prev2`, `prev3` hold the cheapest ways to stand on the three steps below the current one. They start as `0, ∞, ∞` — step 0 is free, and the steps below it do not exist, so their infinite costs price step 1 out of jumps of length 2 or 3. Each iteration reads entry `j - 1` of the array (the fee for step `j`, visited in order), takes the minimum of the three candidate arrivals with penalties 1, 4, and 9, and shifts the window forward. When the scan reaches step `n`, `prev1` is the answer.

The running total never exceeds taking every step singly: at most `n · (10⁴ + 1) ≈ 10⁹` on the largest input, which fits a 64-bit accumulator with room to spare and stays far below 2⁵³, so JavaScript's plain numbers are exact too.

**Complexity:** `O(n)` time, `O(1)` space.
