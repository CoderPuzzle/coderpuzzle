# Solutions — Find Minimum in Rotated Sorted Array

## Binary Search against the Right End

A rotated sorted array of distinct values consists of two ascending runs, and the minimum is the first element of the second run — the unique point where the sequence drops. The midpoint is compared against the rightmost element of the current window: if `nums[mid] > nums[hi]`, the drop lies strictly to the right of mid, so the search moves to [mid + 1, hi]; otherwise the segment from mid to hi is non-decreasing and the minimum sits at mid or to its left, so the window shrinks to [lo, mid].

Each step discards half the window while provably keeping the minimum inside it. Comparing against `hi` rather than `lo` is what makes the boundary cases work: `hi` is always a live endpoint of the current window, and when the array was rotated a full n times — no drop at all — every comparison falls into the second branch and hi simply collapses onto index 0.

The loop ends when lo and hi meet on the single survivor, whose value is returned; a one-element array skips the loop entirely. Distinctness guarantees the comparison is strict and unambiguous, and the halving steps deliver the logarithmic running time the problem demands.

**Complexity:** `O(log n)` time, `O(1)` space.
