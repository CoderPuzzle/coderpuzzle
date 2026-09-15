# Solutions — Absolute Difference Between Maximum and Minimum K Elements

## Sort and take both ends

The two quantities live at opposite ends of the sorted order: ascending
sort puts the `k` smallest elements in the first `k` slots and the `k`
largest in the last `k`, so one sort exposes both sums at once. A single
pass over indices `0..k-1` accumulates the bottom-end sum from
`nums[i]` and the top-end sum from `nums[n-k+i]` simultaneously.

Every element is positive, so the sum over the `k` largest elements can
never fall below the sum over the `k` smallest — at worst the two
selections coincide element-for-element and both sums are equal. The
absolute value therefore costs nothing: the answer is simply the top-end
sum minus the bottom-end sum. Sums are bounded by `100 * 100 = 10⁴`, far
inside 32-bit range.

Any `O(n log n)` comparison sort works here; with `n <= 100` even the
quadratic approaches clear the limits easily, but the sorted slice is the
shortest honest expression of "first and last k values" from the hint.

**Complexity:** `O(n log n)` time, `O(1)` extra space (beyond the sort).
