# Solutions — Minimum Value to Get Positive Step by Step Sum

## Minimum prefix sum

After the first `k` elements the running total is `startValue` plus the
prefix sum `nums[0] + ... + nums[k-1]`, so the constraint "never less
than 1" binds at exactly one place: where that prefix sum is smallest.
Let `minPrefix` be the minimum over all prefixes. The requirement is
`startValue + minPrefix >= 1`, i.e. `startValue >= 1 - minPrefix`.

The remaining detail is positivity: `startValue` must be at least 1
regardless. When every prefix sum is positive (`minPrefix >= 1`), the
inequality allows anything down to `1 - minPrefix <= 0`, and clamping to
1 gives the true minimum. Both branches reduce to
`max(1, 1 - minPrefix)`.

One pass computes the running prefix sum while tracking its minimum —
for `[-3, 2, -3, 4, 2]` the prefix sums are `-3, -1, -4, 0, 2`, the
minimum is `-4`, and the answer is `1 - (-4) = 5`. The values are tiny
(at most 100 elements of magnitude at most 100), so no overflow concerns
arise in any language.

**Complexity:** `O(n)` time, `O(1)` space.
