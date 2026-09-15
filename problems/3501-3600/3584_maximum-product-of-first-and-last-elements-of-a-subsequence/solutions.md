# Solutions — Maximum Product of First and Last Elements of a Subsequence

## Suffix max/min sweep over the first index

A size-`m` subsequence is fully described by its first index `i` and last
index `j`: both must satisfy `j >= i + m - 1`, because the `m - 2` middle
elements have to fit strictly between them, and any pair meeting that bound
can always be padded out to exactly `m` elements. When `m == 1` the first
and last element are the same entry, so the answer is simply the largest
`nums[i]²`, which favors a negative value with large magnitude exactly as
much as the same positive value.

For `m >= 2`, fix the first index and ask which last element pairs best
with `nums[i]`. The eligible last positions form the suffix
`nums[i + m - 1 .. n - 1]`, and the product `nums[i] * nums[j]` is maximized
over that window by one of its two extremes — the window maximum or the
window minimum, whichever multiplies to the larger product. Sweeping `i`
from `n - m` down to `0`, the window grows by exactly one element per step,
so its maximum and minimum are maintained incrementally in constant time and
each index contributes two candidate products. The initial window for
`i = n - m` is the single element `nums[n - 1]`, which seeds both extremes.

Products are bounded by `10⁵ * 10⁵ = 10¹⁰` in absolute value, which exceeds
the 32-bit integer range, so all arithmetic runs in 64-bit integers (exact
in JavaScript's `Number` as well, since `10¹⁰ < 2⁵³`).

**Complexity:** `O(n)` time, `O(1)` space.
