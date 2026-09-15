# Solutions — Maximize Area of Square Hole in Grid

## Sort each bar list and count consecutive runs

The two axes are independent. Removing one bar joins the two cell lines
on either side of it; removing a run of `t` bars with consecutive indices
joins `t + 1` lines into one open span, and nothing shorter beats that.
So the widest hole reachable along an axis has side (longest consecutive
run in that bar list) + 1, and a _square_ hole is limited by the smaller
of the two sides. Sorting each list turns run counting into one linear
walk that resets the counter whenever a step is larger than 1.

The grid dimensions never enter the computation — `n` and `m` only bound
where bars may sit, and the removed bars are what create the span. With
at most 100 bars per axis the run is at most 100, so the side is at most
101 and the area at most `101² = 10201`, comfortably inside 32-bit
integers; every language below counts runs in its own bar arrays and
squares the smaller side.

**Complexity:** `O(L log L)` time for `L` bars, `O(1)` extra space
beside the sort.
