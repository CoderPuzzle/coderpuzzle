# Solutions — Best Meeting Point

## Median of each axis

Manhattan distance is a sum of an axis contribution and a column
contribution, so the two coordinates of the meeting point can be chosen
independently — Hint 1's one-dimension question in disguise. On a single
line, the point minimizing the sum of absolute differences to the homes is a
median of their coordinates: shifting the point one step toward the side with
more homes always saves more than it costs, and at a median the two sides
balance. The meeting point is therefore `(median row, median column)` and the
answer is the row spread plus the column spread around those two medians.

The code never sorts. Collecting the homes row-major appends their row
indexes in nondecreasing order, and a column-major pass does the same for the
column indexes, so two sweeps already produce the two sorted coordinate lists
the medians are read from. With an even number of homes every index between
the two middle ones ties for the minimum, so taking the upper middle one is
as good as any.

At the constraint ceiling the totals stay small: a `200 x 200` grid holds at
most `40000` homes, each at distance at most `398` from any cell, so the
answer fits comfortably in a 32-bit integer. Two homes at opposite corners of
that grid — the farthest apart two homes can be — already show the maximum
pair distance, `398`.

**Complexity:** `O(mn)` time, `O(mn)` space.
