# Solutions — Minimum Removals to Balance Array

## Sorted sliding window

Deletions never change values, only which survive, and a surviving set is
balanced exactly when its largest value is at most `k` times its smallest.
After sorting, the best survivor set can always be taken as a contiguous
window: between any two surviving values sit only deleted ones, and keeping
those instead of elements outside the window's ends never shrinks the set,
never raises the maximum, and never lowers the minimum. So the task reduces
to finding the longest window `[i, j]` with `nums[j] <= nums[i] * k`, and the
answer is `n` minus that window's length.

Sweep the right end across the sorted array while advancing the left end
whenever `nums[j]` exceeds `nums[i] * k`. A one-element window is always
balanced (`k >= 1` and every value is positive), so `i` never passes `j`, and
because both ends only move forward the scan is linear once sorted. The
comparison product reaches `10⁹ · 10⁵ = 10¹⁴`, far past 32-bit range, so each
compiled language widens before multiplying (`long long`, `long`, `int64`);
JavaScript numbers are doubles, exact through `2⁵³`, so they already hold it.

Keeping a single element is always legal, so the longest balanced window is
never empty and an answer always exists.

**Complexity:** `O(n log n)` time, `O(1)` extra space.
