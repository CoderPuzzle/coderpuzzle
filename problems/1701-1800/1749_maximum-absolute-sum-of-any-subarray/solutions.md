# Solutions — Maximum Absolute Sum of Any Subarray

The absolute value of a subarray sum is large exactly when the sum
itself is extreme — far positive or far negative. The maximum of
`|sum|` over all subarrays is therefore the larger of the maximum
subarray sum and the negated minimum subarray sum: one of the two
extremes must realize the answer.

## Two Kadane sweeps

Run Kadane's algorithm twice over the array in one pass each: the
first sweep tracks the best (largest) sum of a subarray ending at the
current element, resetting when the running sum would drop below a
fresh start; the second sweep is its mirror, tracking the worst
(most negative) running sum the same way. The answer is the larger of
the best positive sweep value and the negated worst negative one.
Because the empty subarray is allowed, the answer is at least 0 — and
every non-empty extreme is already covered by the two sweeps, which
each start fresh at every element, so no candidate is missed.

On `[1,-3,2,3,-4]` the max-sum sweep peaks at `2 + 3 = 5` while the
min-sum sweep bottoms at `-4`; the answer is `max(5, 4) = 5`. On
`[2,-5,1,-4,3,-2]` the negative side wins: `-5 + 1 - 4 = -8`, and
`abs(-8) = 8` beats the best positive run of `3`. With
`n <= 10^5` and `|nums[i]| <= 10^4` the largest achievable magnitude is
`10^9` — inside 32-bit range but with no room for sloppy
intermediates, so the running sums are kept in 64-bit registers in
the fixed-width languages and narrowed once at the return.

**Complexity:** `O(n)` time, `O(1)` extra space.
