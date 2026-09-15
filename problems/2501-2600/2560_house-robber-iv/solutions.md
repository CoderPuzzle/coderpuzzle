# Solutions — House Robber IV

## Binary Search on Capability with Greedy Check

The capability is the largest single house value robbed, and minimizing it is a monotone question: if the robber can steal from `k` pairwise non-adjacent houses all capped by `c`, the same selection works for any larger cap. So the answer is the smallest `c` for which "at least `k` non-adjacent houses have value `<= c`" holds, found by binary search over the value range `[min(nums), max(nums)]` with the lower-mid variant since the predicate is minimized.

Checking a cap is a single greedy pass: walk left to right, and whenever a house fits under the cap, take it and skip its immediate neighbor (`i += 2`); otherwise move on one step. Taking an eligible house is never worse than skipping it — skipping can only forfeit a pick without ever unlocking a better one, since both choices advance past the current index by the same or more — so this count is the maximum number of non-adjacent under-cap houses, and comparing it to `k` decides feasibility.

Because the search range is over raw values rather than indices, no sorting of `nums` is needed and the check reads the array in its original order; the endpoints `min(nums)` and `max(nums)` bracket the answer tightly (a cap of `min(nums)` may already suffice when many small houses are spread out). The constraints guarantee at least `k` houses are stealable, so the search always converges to a feasible `lo` rather than exhausting the range. Each feasibility check is one linear scan, giving roughly 30 scans for values up to 10^9.

**Complexity:** `O(n log(max(nums) - min(nums)))` time, `O(1)` space.
