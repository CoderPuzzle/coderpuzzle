# Solutions — Maximum Number of Ways to Partition an Array

## Difference maps and an index sweep

For every pivot, store its original difference `left sum - right sum = 2 * prefix - total`. Initially every pivot is in a `right` frequency map and `left` is empty; `right[0]` is the unchanged baseline. If index `i` changes by `delta = k - nums[i]`, pivots at or before `i` keep the changed element on their right, so their new difference is `old difference - delta` and they require an old difference of `delta`. Pivots after `i` keep it on their left, so they require an old difference of `-delta`.

The candidate for changing index `i` is therefore `left[delta] + right[-delta]`. After evaluating that index, move pivot `i + 1` from `right` to `left`, when it exists, and continue. All totals, differences, and deltas use 64-bit arithmetic in fixed-width languages because the array sum can exceed 32 bits.

**Complexity:** `O(n)` time, `O(n)` space.
