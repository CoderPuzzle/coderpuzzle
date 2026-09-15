# Solutions — Max Increase to Keep City Skyline

The four skylines pin down remarkably little: seen along one axis, a row
shrinks to its tallest building, and seen along the other, a column does.
Every building that is not the tallest of its row and column is soft
material — it may rise freely, each under its own ceiling, and the answer
is nothing more than the sum of all those individual gaps.

## Raise every building to the shorter of its row and column maxima

A raise preserves every skyline exactly while the building stays at or
below the tallest of its row and the tallest of its column: crossing its
row's tallest would lift that side silhouette, crossing its column's
tallest would lift the other, and no raise of an interior building can do
anything else to a contour. The ceiling for cell `(r, c)` is therefore
`min(rowMax[r], colMax[c])`, and it is never below the current height,
since `grid[r][c]` already sits under both maxima.

These per-cell maxima compose. Raise every cell to its ceiling at once:
the cell that sets row `r`'s maximum sits in some column whose maximum is
at least as tall, so its own ceiling equals `rowMax[r]` and it stays
exactly where it was — no cell of the row rises past it, and the row's
silhouette survives untouched. The same argument holds for every column,
so all four skylines are unchanged and the total increase is simply
`sum(min(rowMax[r], colMax[c]) - grid[r][c])`.

Two sweeps tabulate the `2n` maxima, and a third sums the gaps — uniform
and all-zero grids come out at `0` with no special case, since every
building already sits at its ceiling.

**Complexity:** `O(n²)` time, `O(n)` space.
