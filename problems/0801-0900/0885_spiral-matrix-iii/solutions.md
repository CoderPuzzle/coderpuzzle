# Solutions — Spiral Matrix III

The answer is a fixed geometric object, not a search: the clockwise square
spiral unrolled from `(rStart, cStart)` facing east, with the stretches of
that spiral that fall outside the grid simply discarded. Nothing is chosen or
compared — the visit order is completely determined by the start cell, so the
only work is to generate the walk and keep the positions that land inside the
grid.

## Turtle walk with growing runs

Simulate the walk directly. The turtle cycles through the four headings east,
south, west, north — turning clockwise each time — and the straight runs grow
by one step every second turn: `1, 1, 2, 2, 3, 3, ...`, two runs per length,
one run per side of each ever-larger square ring around the start. Every step
is taken even when it leaves the grid, because the spiral only reaches the
cells far from the start by leaving the grid and curling back into it; a step
is recorded exactly when both coordinates land in range.

The walk is self-avoiding — ring `k` tours exactly the cells at Chebyshev
distance `k` from the start, and rings never overlap — so the recorded cells
are distinct and the count reaches `rows * cols` precisely when the whole grid
has been covered. That gives the stop condition: the loop ends the moment the
`rows * cols`-th cell is recorded. The few steps the turtle still takes before
the check re-runs all land outside the grid, since the spiral only ever
expands outward, so nothing extra is appended and the output holds each cell
exactly once, in visit order.

**Complexity:** `O(rows·cols)` time, `O(rows·cols)` space.
