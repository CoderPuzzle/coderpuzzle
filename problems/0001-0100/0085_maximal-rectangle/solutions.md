# Solutions — Maximal Rectangle

## Row-by-Row Histogram with Monotonic Stack

Any all-ones rectangle in the matrix has a bottom row, and if you look at the columns it occupies, that bottom row sees a "histogram": each column has a height equal to the number of consecutive `1`'s ending at that row. So the problem decomposes into solving Largest Rectangle in Histogram once per row and taking the overall maximum — every rectangle of `1`'s is a histogram rectangle in the row where it ends.

The solution maintains a `heights` array of length `cols` that is updated incrementally as it walks down the rows: a cell of `'1'` extends the run and increments `heights[c]`, while a `'0'` breaks it and resets `heights[c]` to `0` (a rectangle cannot span a zero, so the height of usable ones above it becomes irrelevant). After each row is folded in, the helper `largest_area` finds the biggest rectangle under that row's histogram and the running best is updated.

![Per-row histograms [1,0,1,0,0], [2,0,2,1,1], [3,1,3,2,2], [4,0,0,3,0]; row 2's bars over columns 2-4 hold the 2x3 = 6 rectangle.](figures/solution-row-histograms.svg)

The helper is the classic monotonic-stack scan: it keeps a stack of column indices with strictly increasing heights. When a shorter bar arrives, every taller bar on the stack has found its right boundary (the current index `i`); it is popped, its left boundary is the new stack top (or `-1` if the stack is empty), and the candidate area is `height * (i - left - 1)`. A sentinel `0` appended to the iteration flushes whatever remains on the stack at the end of the row, and equal heights are left on the stack safely because the strict `>` test makes the earlier of two equal bars account for the full run when it is finally popped.

An empty matrix or a matrix with empty rows returns `0` up front; a matrix that is entirely `'0'`s never produces a positive histogram and also yields `0`. Since each cell is touched once to update `heights` and each column index is pushed and popped at most once per row's stack scan, the whole pass is linear in the number of cells.

**Complexity:** `O(rows × cols)` time, `O(cols)` space.
