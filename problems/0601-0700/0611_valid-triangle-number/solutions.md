# Solutions — Valid Triangle Number

## Sort and Two Pointers

After sorting, any triplet can be written with sides `a <= b <= c`, and the triangle inequality collapses to the single check `a + b > c` (the other two inequalities hold automatically for sorted sides). The solution exploits this by fixing the largest side with an outer pointer and counting, among the smaller elements, the pairs whose sum exceeds it.

The outer loop walks `i` from the end of the array toward the front, treating `nums[i]` as the largest side. Two pointers `lo = 0` and `hi = i - 1` sweep the prefix: whenever `nums[lo] + nums[hi] > nums[i]`, the sum is already large enough at the leftmost position, so every index between `lo` and `hi - 1` also pairs with `hi` — that is `hi - lo` valid triplets added at once — and `hi` moves down; otherwise the sum is too small even at the rightmost partner, so `lo` must move up. Each pointer only moves inward, giving a linear inner scan per fixed largest side.

![Sorted [2, 2, 3, 4] with the largest side fixed at 4: lo + hi already exceeds it, so hi − lo = 2 triplets are counted in one step.](figures/solution-two-pointers.svg)

Zero-length sides are handled by the descending outer loop: since the array is sorted, the first `nums[i] == 0` encountered means every remaining (smaller) candidate is also 0, and no triangle can use a zero side, so the loop breaks. Fewer than three elements leaves the range empty and correctly returns 0.

Sorting produces a fresh sorted copy (Python's `sorted`), and the scan itself uses only counters and indices.

**Complexity:** `O(n^2)` time, `O(n)` space.
