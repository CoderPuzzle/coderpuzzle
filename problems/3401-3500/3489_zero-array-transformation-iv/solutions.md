# Solutions — Zero Array Transformation IV

## Streaming subset-sum reachability per index

Each index `i` is zeroed exactly when some subset of the queries that
cover it (among those processed) decrements it by a total of exactly
`nums[i]` — the choices for different indices never conflict, because a
query may include or omit each index of its range independently. So
index `i` is satisfiable at prefix `k` iff `nums[i]` is a subset sum of
the `val`s of the first `k` covering queries, and since that set only
grows with `k`, satisfiability is monotone and the answer is the first
`k` at which every index is satisfiable (`k = 0` when `nums` is already
all zero).

Walk the queries once, keeping for each unfinished index a 0/1-knapsack
reachability table over sums `0..nums[i]`: query `k` offers one item of
size `val` to every index in `[l, r]`, applied as the usual descending
sweep so each query is used at most once. An index whose target sum
becomes reachable is marked done and never touched again — extra items
cannot un-reach a sum, which is also why monotonicity makes the first
all-done prefix the minimum. A `val` larger than `nums[i]` is skipped,
since positive items overshooting the target never help.

With `n <= 10` indices, at most `1000` queries, and targets at most
`1000`, the total update work is bounded by `q · n · max(nums)` table
writes.

**Complexity:** `O(q · n · V)` time with `V = max(nums) <= 1000`,
`O(n · V)` space.
