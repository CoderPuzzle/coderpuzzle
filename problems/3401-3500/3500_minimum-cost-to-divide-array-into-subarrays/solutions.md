# Solutions — Minimum Cost to Divide Array Into Subarrays

## Suffix DP with an Indexed Split Penalty

The `k * i` factor in each subarray's cost depends on how many subarrays precede it, which makes a naive forward DP quadratic in bookkeeping. The fix is algebraic: expand the total cost as the sum over subarrays `t` of `(pref_nums[end_t] + k*t) * c_t` where `c_t` is the subarray's cost sum. The index part telescopes — `k * sum_t t * c_t` equals `k * sum_t (totalCost - pref_cost[start_t])`, because each subarray's cost is counted once for every subarray from its own index onward, i.e. once per split point at or after its start. So each subarray `[l, r]` can be charged a self-contained penalty `k * (pref_cost[n] - pref_cost[l])`, and the global index interaction disappears.

With that rewrite the problem is an ordinary partition DP over suffixes: `dp[i]` is the minimum cost to divide `nums[i..n-1]`, with `dp[n] = 0` and the transition choosing the first block `[i, j]`, costing `pref_nums[j+1] * (pref_cost[j+1] - pref_cost[i]) + k * (totalCost - pref_cost[i])`, plus `dp[j + 1]`. Both prefix arrays make the block cost `O(1)`, and processing `i` from `n - 1` down to 0 ensures every needed suffix value is ready.

Note the prefix in the block cost is `pref_nums[j+1]` — the sum of all nums from the array's start through the block's end, exactly the `nums[0] + ... + nums[r]` term in the formula, not the block's own sum. The index charge uses the whole array's remaining cost mass from the split point, which is what makes charging independent of later choices valid.

Edge cases: a single subarray covering everything (one transition with `j = n - 1`), positive `k` making early splits expensive in proportion to how much cost mass remains to the right, and `n = 1` where the loop runs once and returns the trivial block cost. The `INF` sentinel only guards un-reached states, which never occur since every suffix has at least one split.

**Complexity:** `O(n^2)` time, `O(n)` space.
