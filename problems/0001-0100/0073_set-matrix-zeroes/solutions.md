# Solutions — Set Matrix Zeroes

## First row and column as markers

The rule only needs one bit per row and one bit per column: does this line contain a zero? The follow-up asks for constant space, and the matrix already owns m + n such bits — the first row and the first column — provided their own fate is decided before they are overwritten. So two flags first record whether row 0 and column 0 themselves hold a zero; only then may the matrix be stamped.

The first pass scans the interior and, for every zero at `(i, j)`, marks its row and column by clearing `matrix[i][0]` and `matrix[0][j]`. The second pass replays those markers, wiping the interior of each marked row and column; since neither pass writes into the marker zone, the markers stay readable until both sweeps have consumed them. The saved flags are applied last, zeroing row 0 and column 0 themselves when needed — this ordering is what makes the corner traps come out right, because a marker cleared into the first row or column must never be mistaken for an original zero there.

Once the flags are applied the method returns the same `matrix` object it received, now zeroed, which is what the judge compares. A `1 x 1` matrix is its own first row and column, and both flags route its single cell to the same wipe; values at the int32 extremes need no special handling because only `0` is ever used as a marker, never any other sentinel.

**Complexity:** `O(mn)` time, `O(1)` space.
