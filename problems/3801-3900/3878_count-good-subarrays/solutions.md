# Solutions — Count Good Subarrays

A subarray is good exactly when its bitwise OR equals its maximum element,
which lets the count be decomposed per maximum position instead of scanning
all O(n²) subarrays.

## Monotonic stacks and bit windows

The OR of a subarray always contains every element, so it equals the maximum
element `M` if and only if every element's set bits are a subset of `M`'s
bits — otherwise the OR has a 1-bit that `M` lacks and exceeds it. To count
without duplicates, assign each subarray to its rightmost maximum: a
monotonic stack gives, for each index `i`, the first strictly-greater element
on the left (`left[i]`) and the first greater-or-equal element on the right
(`right[i]`), so `i` owns exactly the subarrays whose left end lies in
`(left[i], i]` and right end in `[i, right[i])`.

The bit-containment constraint then shrinks that ownership window. For every
bit `b` absent from `nums[i]`, any element with bit `b` set is forbidden, so
the usable window must start after the nearest forbidden element to the left
and end before the nearest forbidden element to the right. Two rolling arrays
of last/next occurrence per bit supply those nearest positions in O(1) each,
making the whole loop `O(n · B)` with `B = 31` bits. The number of subarrays
`i` owns after both shrinks is `(i - eff_left) · (eff_right - i)`, and the
answer is the sum.

Bounds force 64-bit arithmetic: at n = 10⁵ the count of good subarrays can
reach n·(n+1)/2 = 5,000,050,000, past the 32-bit ceiling, so the accumulator
and return are 64-bit everywhere (exact in JavaScript as well, since the
count and every intermediate sit far below 2⁵³ ≈ 9.0×10¹⁵).

**Complexity:** `O(n)` time, `O(n)` space.
