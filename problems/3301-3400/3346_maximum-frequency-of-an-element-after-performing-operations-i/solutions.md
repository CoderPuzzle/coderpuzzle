# Solutions — Maximum Frequency of an Element After Performing Operations I

## Sweep Target Intervals

Pick a target value `v`: every element inside `[v - k, v + k]` can be
brought to `v`, the ones already equal to `v` for free and every other one
for a single operation. Because `numOperations <= n`, operations left over
after the conversions are simply spent as `+0` on unused indices, so the
best achievable frequency at `v` is exactly
`min(window(v), count(v) + numOperations)` — the window size capped by the
free elements plus the operation budget.

![On nums = [1,4,5] with k = 1 (Example 1), the reach intervals [0,2], [3,5], [4,6] put both 4 and 5 inside target v = 4's window [3,5], so frequency = min(window 2, count 1 + 2) = 2.](figures/solution-window-reach-intervals.svg)

Values are bounded by `10⁵`, so instead of hunting for which `v` matters,
the solution sorts the array and sweeps **every** integer target in
`[1, max(nums) + k]` (targets below `1` never beat `v = 1` since all
elements are `>= 1`, and targets above `max + k` see an empty window). A
pair of moving pointers maintains `window(v)` — the count of elements in
`[v - k, v + k]` — advancing monotonically as `v` grows, while a hash map
answers `count(v)`; each pointer crosses the array once and each candidate
is judged in constant time.

**Complexity:** `O(n log n + V)` time, `O(n)` space, with `V = max(nums) + k`
the swept target range.
