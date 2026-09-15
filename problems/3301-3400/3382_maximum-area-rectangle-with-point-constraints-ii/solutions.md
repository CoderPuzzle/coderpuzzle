# Solutions — Maximum Area Rectangle With Point Constraints II

Every valid rectangle is determined by a vertical edge: two points sharing
an x-coordinate with no other point between them, since any point between
would sit on the border. Sorting the points into columns by x and walking
consecutive y-pairs within each column enumerates exactly the candidate
edges, so the task reduces to finding, per edge, the partner edge that
completes an empty rectangle with maximum area.

## Compressed sweep with a min segment tree

Compress both coordinate axes and group the points into columns (same
compressed x, ascending compressed y). Sweep the columns right-to-left,
maintaining a min segment tree over compressed y whose leaf j holds the
index of the nearest column to the right containing a point at compressed
y = j. For each consecutive pair (y1, y2) of the current column, a
range-min query over [y1, y2] returns the nearest column to the right
holding any point in that closed range — the only possible partner, since
any farther column would leave that nearest point inside the rectangle or
on its border. The pair completes a valid rectangle exactly when that
column contains y1 and y2 and nothing else in [y1, y2]: both corners
present, no interior point, nothing on the border. A binary search over
the candidate column's sorted ys verifies it in logarithmic time. Each
column is inserted into the tree only after its own pairs are processed,
so a pair never matches its own column.

Areas are products of coordinate gaps, at most (8·10⁷)·(8·10⁷) = 6.4·10¹⁵,
far beyond 32-bit range — the product is widened to 64-bit, and it stays
below 2⁵³ ≈ 9.0·10¹⁵, so JavaScript/TypeScript numbers hold every area
exactly. The sweep performs O(n) queries and updates, each O(log n) over
at most n leaves.

**Complexity:** `O(n log n)` time, `O(n)` space.
