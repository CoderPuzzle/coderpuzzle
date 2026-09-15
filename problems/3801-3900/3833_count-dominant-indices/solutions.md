# Solutions — Count Dominant Indices

## Suffix sums, one backward pass

Index i is dominant exactly when `nums[i]` beats the average of the strict
suffix after it, and the division inside that average can be moved across
the inequality: `nums[i] > sum / (n - 1 - i)` holds exactly when
`nums[i] * (n - 1 - i) > sum`. The comparison never leaves integer
arithmetic, so no fractional average is ever formed and rounding cannot
flip a verdict — including at ties, where an element exactly equal to its
suffix average is not dominant, because the inequality is strict.

A single backward sweep supplies each suffix sum from the previous one.
Walking `i` from `n - 2` down to `0`, one accumulator holds the sum of
`nums[i + 1..n - 1]`: every step adds the single element `nums[i + 1]`,
so each index's test reuses all the work of the index after it instead of
rescanning the suffix. The rightmost index never enters the loop — its
suffix is empty and the statement's note declares it not dominant — so an
array of length 1 naturally yields 0.

Every number involved is tiny: at most 100 elements of at most 100 bound
the suffix sum by `99 * 100 = 9,900` and the cross-product
`nums[i] * (n - 1 - i)` by `100 * 99 = 9,900`, so the fixed-width
languages carry both in plain `int` without overflow, and JavaScript's
numbers hold every integer here exactly, far inside `2⁵³`.

**Complexity:** `O(n)` time, `O(1)` space.
