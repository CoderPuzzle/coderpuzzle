# Solutions — Sort Transformed Array

## Two-pointer merge on the parabola

f(x) = ax² + bx + c is a parabola, and that shape decides where the extremes
of the transformed array live. Moving outward from the vertex, f is monotone
on each side, so as the sorted `nums` walk away from the vertex in both
directions the transformed values only grow (a > 0, opens upward) or only
shrink (a < 0, opens downward) — the extreme values must sit at the two ends
of `nums`, never in the middle.

That turns sorting into a merge. Two indexes, `lo` at the front and `hi` at
the back, each hold one candidate extreme; compare f(`nums[lo]`) with
f(`nums[hi]`), emit the winner, and advance the index that produced it. When
a > 0 the largest values wait at the ends, so the result is filled from the
back, each step taking the larger of the two candidates; when a < 0 the
parabola is inverted and the smallest values sit at the ends, so the fill
runs from the front taking the smaller. Either discipline consumes exactly
one element per step and never needs to look back — the pointer that did not
move still guards a value at least as extreme as everything already written.

The degenerate a = 0 leaves f a straight line, monotone over the sorted
input, and either discipline stays correct; this code folds that case into
the a > 0 branch (fill from the back, take the larger). Values never
overflow: |f(x)| is bounded by 100 · 100² + 100 · 100 + 100 = 1,010,100,
comfortably inside 32 bits.

**Complexity:** `O(n)` time, `O(1)` extra space beyond the output array.
