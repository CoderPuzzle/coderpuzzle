# Solutions — Spiral Matrix

## Boundary-shrinking walk

Four boundaries — top, bottom, left, right — frame the part of the matrix that has not been walked yet. Each pass emits that outer ring as four straight runs: the top row left to right, the right column top to bottom, the bottom row right to left, and the left column bottom to top. Then every boundary steps inward by one, and the same walk repeats on the smaller matrix that remains.

The corners decide the exact run lengths. The right-column run starts one row below the top row and the left-column run stops one row above it, because the top-left corner was already emitted with the top row; the bottom-row run likewise starts one column left of the bottom-right corner. When a single row or a single column is all that remains, the last two runs would retrace cells the first two runs already emitted, so each is guarded: the bottom-row run happens only while the ring is more than one row tall, the left-column run only while it is more than one column wide.

The walk stops on a count of emitted elements rather than on the boundary positions. That is what keeps even-sized matrices safe: after the outer ring of, say, a two-column matrix, the boundaries still enclose cells that the right-column run has already taken, and re-entering the loop would duplicate them — while the count has already reached `m · n` and ends the walk.

**Complexity:** `O(m · n)` time — each element is appended exactly once — and `O(1)` extra space beyond the output list.
