# Solutions — Image Smoother

## Clamped 3x3 window per cell

Every output cell is the rounding-down average of the cells in the 3x3 window
around it, and a window that runs past the matrix simply loses its missing
members rather than wrapping or clamping values. So the whole problem is one
double loop: for each cell `(i, j)`, walk the rows from `max(i-1, 0)` to
`min(i+2, m)` and the columns from `max(j-1, 0)` to `min(j+2, n)` — the clamped
window — adding each value to an integer `total` and counting how many landed
in `count`. A corner cell collects 4 values, an edge cell 6, an interior cell
all 9, and the division `total / count` needs no case analysis.

Writing each average into a fresh matrix is what keeps the filter honest: every
window then reads the _original_ image, never a value that was itself already
smoothed. Reusing the input in place would mix generations of output and change
the result, and the statement asks for the smoother applied once to each cell.

The sums stay small — at most `9 · 255 = 2295` — and every value is
non-negative, so floor division is plain integer division in every language
(the average is rounded down, never toward zero differently). The `m · n <=
40,000` ceiling bounds the work at under four hundred thousand additions.

**Complexity:** `O(mn)` time, `O(mn)` space for the returned matrix.
