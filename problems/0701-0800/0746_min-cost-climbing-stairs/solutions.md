# Solutions — Min Cost Climbing Stairs

## Rolling Linear DP

Let the state for step `i` be the minimum total cost to be standing on step `i` having just paid its cost — equivalently, the cheapest way to start at or before `i` and hop onto it. Standing on `i` requires arriving from `i-1` or `i-2`, so the state is `cost[i] + min(state[i-1], state[i-2])`. The top of the floor is reached by one final paid hop from step `n-1` or `n-2`, so the answer is the minimum of the last two states.

The code runs this recurrence forward with two rolling variables holding the states of the two previous steps, updating them once per element of `cost`. Both start at 0, which encodes the free choice of starting step: the first step's state is `cost[0] + min(0, 0)`, and the second step may equally be a fresh start, since its `min(cost[0], 0)` term lets it ignore the hop from step 0. The final `min` of the two rolling variables is exactly `min(dp[n-1], dp[n-2])` in the equivalent backward formulation `dp[i] = cost[i] + min(dp[i+1], dp[i+2])` with `dp[n] = 0`.

The two-variable update never materializes the array and touches each cost once. The shortest allowed input, length 2, works directly — the answer is the cheaper of the two steps, taken as a single fresh start.

**Complexity:** `O(n)` time, `O(1)` space.
