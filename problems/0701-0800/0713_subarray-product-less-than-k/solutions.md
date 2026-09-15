# Solutions — Subarray Product Less Than K

## Two-Pointer Sliding Window

Since every element is at least 1, every subarray product is at least 1, so `k <= 1` admits no solutions and is handled up front. For `k >= 2`, grow a window over the array: multiply each new right element into the running product, and while the product has reached `k`, divide out the leftmost element and advance the left edge. When the inner loop settles, `[left, right]` is the longest window ending at `right` whose product is strictly below `k`.

Every subwindow of that window also ends at `right` and has a product at most as large (the elements are positive), so the window contributes exactly `right - left + 1` subarrays. Counting by right endpoint like this tallies each valid subarray exactly once.

![The longest valid window ending at each right end of [10, 5, 2, 6] with k = 100, and the subarrays each one contributes.](figures/solution-sliding-window.svg)

The left pointer only ever moves forward: adding elements can only grow the product, so the smallest feasible left index is non-decreasing in `right`, which is what licenses the two-pointer scan. If an element alone is at least `k`, the left edge simply marches past it and that right end contributes zero.

**Complexity:** `O(n)` time, `O(1)` space.
