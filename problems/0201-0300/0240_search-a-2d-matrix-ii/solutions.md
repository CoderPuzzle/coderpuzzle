# Solutions — Search a 2D Matrix II

## Staircase Search from the Top-Right Corner

Rows sorted left to right and columns sorted top to bottom do not make the matrix globally sorted, so a single binary search cannot work. But the corners are special: the top-right element is simultaneously the largest in its row and the smallest in its column, so comparing it against the target eliminates an entire row or an entire column in one step. (The bottom-left corner is symmetric; the top-left and bottom-right corners only ever eliminate half-spaces that don't decompose this way.)

Starting at the top-right, if the current value exceeds the target, everything below it in its column is even larger, so the whole column is discarded by moving left; if the current value is smaller than the target, everything to its left in its row is even smaller, so the whole row is discarded by moving down. Each step therefore removes one row or one column from the still-plausible region, and the walk terminates either at the target or by falling off the left or bottom edge, proving absence.

![The example 5x5 matrix searching for 5: from 15 the walk moves left past 11 and 7, discarding those columns (shaded), then 4 < 5 discards the row and the walk steps down onto 5.](figures/solution-staircase-walk.svg)

The path is a monotone staircase of at most `m + n - 1` steps — compare with binary-searching all `m` rows at `O(m log n)`, which is strictly worse whenever the matrix is roughly square. An empty matrix or empty rows are guarded up front; the search itself needs only two index variables.

**Complexity:** `O(m + n)` time, `O(1)` space.

## Row-by-Row Binary Search

Ignore the column ordering for a moment and the matrix is just `m` independent sorted arrays, each searchable in `O(log n)`: keep the classic two-bound window `[lo, hi]`, push `lo` past everything smaller than the target, clamp `hi` down onto everything at least as large, and when the bounds meet, `lo` sits on the leftmost element `>= target` — one equality check decides the row.

The sorted columns are then used not to guide a search but to end the scan: reading rows top to bottom, the first element of each row is a lower bound for the entire submatrix below it, so the first time a row opens above the target, every remaining row starts even larger and cannot contain it — the scan stops and reports absence. Empty matrix or empty rows are guarded up front, exactly as in the staircase variant.

**Complexity:** `O(m log n)` time, `O(1)` space — strictly worse than the staircase's `O(m + n)` on roughly square matrices, but the better trade when there are few, very wide rows.
