# Solutions — Trapping Rain Water

## Two Pointers

The water level above any bar `i` is `min(max height to its left, max height to its right)`, so the water trapped there is that level minus `height[i]` (clamped at zero). Rather than precomputing two running-maximum arrays, the solution derives both maxima on the fly with two pointers converging from the ends of the array.

The pointers `left` and `right` start at the extremes, with `left_max` and `right_max` tracking the tallest bar seen on each side (both initialized to `0`, which is safe because heights are non-negative). Each iteration compares the two current bars and processes the smaller side. When `height[left] < height[right]`, the right side is guaranteed to contain a bar at least as tall as `height[right]`, hence taller than `height[left]` — so the water at `left` is decided entirely by `left_max`, regardless of what lies further right. If `height[left]` sets a new `left_max` it traps nothing; otherwise it traps exactly `left_max - height[left]`, and the pointer advances. The symmetric argument applies to the right side.

![Two pointer states for height = [0,1,0,2,1,0,1,3,2,1,2,1]: at left = 2 the bar traps 1 unit against left_max = 1, and at left = 5 it traps 2 units against left_max = 2.](figures/solution-two-pointer-walk.svg)

This works because the pointer on the smaller-bar side always has its water bounded by the maximum already scanned on its own side: the other side's true maximum can only be larger than the opposing bar, so it never determines the `min`. Every step adds a definite amount of water or extends a maximum, and each step retires one index, so the scan finishes when the pointers meet.

The loop condition `left < right` means the single meeting index is never processed twice (and its contribution is zero anyway, since the global maximum traps nothing). The algorithm handles flat skylines, monotone slopes, and single-bar inputs naturally — with one bar the loop body never runs and the answer is `0`.

**Complexity:** `O(n)` time, `O(1)` space.
