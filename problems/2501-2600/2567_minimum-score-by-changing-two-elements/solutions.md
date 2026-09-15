# Solutions — Minimum Score by Changing Two Elements

Changing a slot does not have to move it: both free choices may land on
any integer, including copies of existing values and of each other. That
kills the low score immediately — with `n ≥ 3` some untouched element
remains, and the two rewrites can collide — so optimizing reduces to
minimizing the high score alone: the span of the final array.

## Sort and pick which two ends to spend

After sorting, only three plans can win, one per way of spending the two
changes: lift the two smallest values into the surviving body (new span
`nums[n-1] - nums[2]`), lower the two largest (`nums[n-3] - nums[0]`), or
split them across the ends (`nums[n-2] - nums[1]`). No other pair of
positions does better: whatever else you rewrite, the survivors still
include a run of sorted elements whose span contains one of these three
options as its floor, and a "wasted" change left over from touching fewer
than two useful positions can simply clone an interior value without
widening anything.

Equivalently the answer is how tightly `n − 2` sorted values can be
windowed after deleting up to two from either side or one from each side,
which is exactly those three spans. The largest gap involved never
exceeds 10⁹ − 1, comfortably inside every language's exact arithmetic
(JavaScript's 2⁵³ bound is far away).

**Complexity:** `O(n log n)` time for the sort, `O(1)` extra space
(in-place sort aside).
