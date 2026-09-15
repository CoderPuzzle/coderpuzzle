# Solutions — Maximum Subarray Sum After One Operation

## Two-state Kadane

Exactly one element of the chosen subarray may be squared, so the natural
state is a pair of running bests for subarrays that end at the current
position: `dp0` for subarrays that have not used the operation yet, and
`dp1` for subarrays that have already squared exactly one element.

For each `nums[i]`, `dp0` is the ordinary Kadane choice — extend the
previous no-square subarray or start a fresh one. `dp1` can be reached in
three ways: start a fresh subarray whose single square is `nums[i]`; take
a no-square subarray ending at `i - 1` and square `nums[i]`; or take a
one-square subarray ending at `i - 1` and append `nums[i]` unsquared.
Whichever of the three is largest becomes the new `dp1`. Because the
operation must be used exactly once, the answer is the largest `dp1`
over all positions — every valid subarray with one square ends somewhere,
and `dp1` at that ending index captures it.

All sums stay below `2³¹ - 1`: a subarray of at most `10⁵` elements with
one squared value sums to at most `(10⁵ - 1)·10⁴ + 10⁸ ≈ 1.1·10⁹`, so a
32-bit result is exact. The recurrence reads only the two previous
states, so it needs no table at all — just two scalars advanced in one
pass.

**Complexity:** `O(n)` time, `O(1)` space.
