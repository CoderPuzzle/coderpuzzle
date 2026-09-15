# Solutions — Find Nearest Point That Has the Same X or Y Coordinate

## One pass with a running best

Validity and distance both come cheap: `points[i]` is valid exactly when
`ai == x` or `bi == y`, and because a valid point already agrees with one
coordinate, its Manhattan distance collapses to the absolute gap on the other
coordinate — `abs(bi - y)` for an x-match, `abs(ai - x)` otherwise (the point
at your own location scores 0 either way). Nothing but the valid points ever
needs scoring.

The scan therefore carries one running pair, `(best_dist, best_index)`,
initialized to "no answer yet" (`+infinity` and `-1`). A candidate replaces
the incumbent only on a strictly smaller distance: an equal distance keeps the
earlier index, which is precisely the statement's tie rule, and if nothing
ever replaces the sentinel the `-1` index falls straight through as the
answer.

Each of the `n` points is visited once with constant work, and the loop keeps
nothing but the two scalars, so both passes over the input and auxiliary
storage are as small as the problem allows.

**Complexity:** `O(n)` time, `O(1)` space.
