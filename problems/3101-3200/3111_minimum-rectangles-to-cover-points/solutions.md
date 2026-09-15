# Solutions — Minimum Rectangles to Cover Points

## Sort the x coordinates and pack windows

Only the x axis carries information here. A rectangle must contain every
covered point vertically, but its upper end may sit arbitrarily high
(`y2 >= 0` unbounded), so whatever column of space it spans horizontally,
it can always be stretched to swallow every y coordinate beneath it.
Each rectangle therefore acts purely as a window `[x1, x1 + w]` over the
sorted list of x values, and minimizing rectangles becomes packing those
values into the fewest windows of width `w`.

Sorting makes the packing a single scan: plant a window starting at the
smallest uncovered x, consume every subsequent value that lies within
distance `w` of it, and open the next window at the first value beyond.
The window we plant can always start exactly at some point's x, so the
greedily extended window dominates any other placement for the remaining
points; a counting-exchange argument finishes the proof. Coordinates are
bounded by `10⁹`, so comparisons are written as `x - anchor > w`, which
cannot overflow a signed 32-bit integer in any language.

**Complexity:** `O(n log n)` time, `O(n)` space for the extracted x
list (the sort dominates).
