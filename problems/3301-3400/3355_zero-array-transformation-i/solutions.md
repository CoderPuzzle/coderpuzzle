# Solutions — Zero Array Transformation I

## Difference Array with a Coverage Prefix Sweep

Each query lets you decrement any subset of indices in `[l, r]` by exactly 1, so the only thing that matters per index is how many queries cover it: index `i` can lose at most one unit per covering query. Conversely, any schedule of decrements can be throttled per query, so `nums` is reducible to all zeros exactly when every index is covered by at least `nums[i]` queries — over-decrements below zero are permitted but never required.

Computing the coverage counts without touching every index per query is the job of a difference array: for each query add `+1` at `l` and `-1` at `r + 1` in a buffer of length `n + 1`. One prefix-sum sweep then produces the running coverage, and the answer is `true` iff `coverage[i] >= nums[i]` holds at every index, short-circuiting to `false` on the first violation.

This turns an ostensibly sequential process — queries applied in order, subsets chosen adaptively — into a static feasibility condition, because decrements at different indices never interact and the order of queries is irrelevant to the totals available.

Edge cases: an index needing zero decrements needs no coverage; a fully covering set of queries with excess supply still succeeds (extra decrements are simply skipped); `r + 1 = n` writes into the spare slot so no bounds check is needed.

**Complexity:** `O(n + q)` time, `O(n)` space.
