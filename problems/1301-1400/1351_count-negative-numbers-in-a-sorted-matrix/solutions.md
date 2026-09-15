# Count Negative Numbers in a Sorted Matrix

Both readings start from the same fact: every row is non-increasing, so
its negatives form one tail, and the tails only deepen on the way down
the grid. Row binary search works one row at a time, ignoring how the
columns compare — each row's first negative is one bisection away, and
the per-row counts sum. The staircase walk spends the column ordering
too, dragging a single pointer monotonically left across the whole grid
so the rows share their work; it is the tighter encoding and closes the
file.

## Approach: Row binary search

Treat every row as its own non-increasing array and forget the columns:
the negatives in a row are a suffix, so counting them means finding the
first index that holds a negative, and a monotone predicate like that is
exactly what bisection answers. Each row costs O(log n) comparisons, and
the rows are summed independently.

The code bisects a half-open window `[lo, hi)` of candidate boundary
indices per row. The midpoint decides which half survives: a negative at
`mid` keeps `mid` itself in play, so `hi` drops onto it; a non-negative
at `mid` clears every index up to and including it, so `lo` steps past.
When the window closes, `lo` is the first negative index — or `n` for a
row with none — and the row contributes `n - lo` to the total.

The m searches never share information, so the grid's column structure
goes unused: O(m log n) comparisons in total, against the single
monotone pass of the walk below.

**Complexity:** O(m log n) time, O(1) space.

## Approach: Staircase walk

The negatives form a staircase: in each row the negatives are a suffix
(rows are non-increasing), and moving down a column the boundary can only
move left (columns are non-increasing). Walking the rows top to bottom
while a single column pointer slides monotonically left — advance it
while it points at a negative — counts each row's negative suffix as
`n - 1 - pointer`, and the pointer never moves right again, giving one
pass of at most m + n steps.

Each matrix cell is examined at most once by the pointer, and each row's
contribution is computed in O(1) from the pointer position.

**Complexity:** O(m + n) time, O(1) space.
