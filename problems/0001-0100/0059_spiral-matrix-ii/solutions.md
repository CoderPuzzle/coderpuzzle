# Solutions — Spiral Matrix II

## Boundary-shrinking walk

Four boundaries — top, bottom, left, right — frame the part of the matrix that has not been filled yet. Each pass writes one ring with the next run of consecutive values: the top row left to right, the right column top to bottom, the bottom row right to left, and the left column bottom to top. Then every boundary steps inward by one and the same walk repeats on the smaller matrix that remains, so the values from `1` to `n²` are laid down ring by ring, in exactly the order a clockwise spiral visits.

The corners decide where each run starts and stops. The right-column run starts one row below the top row and the left-column run stops one row above it, because the top-left corner was already written with the top row; the bottom-row run likewise starts one column left of the bottom-right corner. When a single row or a single column is all that remains — the centre of an odd-sized matrix — the last two runs would retrace cells the first two runs already wrote, so each is guarded: the bottom-row run happens only while the ring is more than one row tall, the left-column run only while it is more than one column wide.

The walk stops on a count of written values rather than on the boundary positions. That is what keeps even-sized matrices safe: after the innermost ring of a 4 x 4 matrix the boundaries have crossed and no longer enclose anything, while the count has already reached `n²` and ends the walk. A 1 x 1 matrix is the degenerate first ring — the top-row run alone places the single value and every other run is empty.

**Complexity:** `O(n²)` time — each cell is written exactly once — and `O(1)` extra space beyond the returned matrix.
