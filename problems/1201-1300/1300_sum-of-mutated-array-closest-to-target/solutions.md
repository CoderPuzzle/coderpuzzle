# Solutions — Sum of Mutated Array Closest to Target

## Binary Search with Tie Adjustment

For a cap `value`, the mutated sum `sum(x if x < value else value)` is non-decreasing in `value` — raising the cap can only lift terms that were clamped. So the function crosses any target from below at a single boundary, and a lower-bound binary search over `[0, max(arr)]` finds the smallest `lo` whose mutated sum is at least `target`. Caps above `max(arr)` are pointless because nothing is clamped there.

The optimal answer is always `lo` or `lo − 1`: `lo − 1` is the largest cap whose sum stays below the target, and the true sum as a function of the cap is piecewise linear and monotone, so the closest achievable sum to `target` occurs at one of the two caps straddling the crossing. Comparing the two absolute differences settles it, and using `<=` in the comparison prefers the smaller cap when the distances tie, which implements the problem's "return the minimum such integer" rule.

The range is safe: `mutated_sum(0)` is 0, strictly below any valid target (target ≥ 1), so the crossing exists and `lo` is at least 1; hence `lo − 1` never falls below 0.

**Complexity:** `O(n · log(max(arr)))` time, `O(1)` space.
