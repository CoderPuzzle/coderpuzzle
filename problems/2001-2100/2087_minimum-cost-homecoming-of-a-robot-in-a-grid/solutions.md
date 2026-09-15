# Solutions — Minimum Cost Homecoming of a Robot in a Grid

## Walk directly toward home

Any route from the start to the home must enter every row between their row coordinates and every column between their column coordinates. Moving directly toward the home enters each of those required rows and columns exactly once; any detour only adds nonnegative costs and cannot improve the total.

Advance the current row one step toward the home row and add the cost of the row entered, then do the same for columns. Because cost belongs to the destination coordinate, stepping before adding naturally excludes the starting row and column while including the home coordinates.

**Complexity:** `O(|startrow - homerow| + |startcol - homecol|)` time and `O(1)` auxiliary space.
