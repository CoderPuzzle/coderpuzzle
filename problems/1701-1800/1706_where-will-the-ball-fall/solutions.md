# Solutions — Where Will the Ball Fall

Every column's ball travels alone: nothing one ball does can touch
another, so the answer decomposes into `n` independent walks, each
stepping one row at a time until it leaves the bottom of the box or dies
on the way down. The whole problem is reading those walks off the grid.

## Follow one ball down, row by row

A ball hovering over column `c` of row `r` has no choice: the board
`d = grid[r][c]` deflects it sideways into the gap between columns `c`
and `c + d`, and only the board on the far side of that gap decides what
happens next. If `grid[r][c + d]` points the same way `d`, the two boards
funnel the ball through and it settles over column `c + d` of the next
row. Anything else is death, and it takes exactly two shapes: a facing
pair — `grid[r][c + d] != d` — whose boards close the gap's bottom in a
`"V"`, and the box wall, which is all that `c + d` leaving `[0, n)` can
mean.

So each walk is one loop over the rows carrying a single column index:
replace `c` with `c + d` after the two checks, and let a failed check pin
the ball's answer to `-1`. A walk that clears the final row exits at
whatever column it carries. Running this for every starting column fills
the output left to right, and since the rows are walked with a `for`
loop rather than recursion, a 100-deep grid costs nothing but the loop
counter.

Each of the `n` walks reads at most two boards per row, so the whole pass
touches `O(m * n)` cells; outside the returned array, only a handful of
scalars are alive at once.

**Complexity:** `O(m * n)` time, `O(n)` space (output).
