# Solutions — Minimum Operations to Reduce X to Zero

## Sliding Window on the Middle Subarray

Removing elements only from the two ends and totaling exactly `x` is equivalent to keeping a contiguous middle subarray whose sum is `total - x`; the operations used are the elements outside it. Minimizing operations therefore means maximizing the length of a subarray summing to `target = total - x`, and the answer is `len(nums) - best`.

The elements are strictly positive, so the window sum is strictly increasing as the window grows — the classic shrink-when-too-large sliding window applies. Expand the right edge one element at a time; while the window sum exceeds `target`, advance the left edge. Whenever the sum equals `target`, record the window length as a candidate for the best. Because sums only grow with width, no candidate can be missed by never re-widening a shrunk window.

![The example array 1, 1, 4, 2, 3 with the window at target 6 = 11 − 5: at right = 2 the window 1, 1, 4 sums to 6, at right = 3 the sum 8 forces a shrink to 4, 2, and the longest hit of length 3 leaves exactly 2 and 3 outside — the 2 operations that remove x = 5.](figures/solution-middle-window.svg)

Two degenerate cases are handled up front: if `target < 0`, `x` exceeds the total sum and the result is -1; if `target == 0`, the middle subarray is empty and every element must be removed, giving `len(nums)` immediately. If no window ever hits `target`, the answer is -1.

**Complexity:** `O(n)` time, `O(1)` space.
