# Solutions — Falling Squares

## Coordinate compression over the edges

The coordinate values run up to `10^8`, far too large for a height array over
the X-axis — but only the relative order of the edges matters. Collecting
every square's left edge and right edge, sorting, and deduplicating yields at
most `2n` boundaries; the gaps between consecutive boundaries become cells,
and each square's footprint is exactly the run of cells from its left edge to
its right edge. Because the squares are half-open (`[left, left + side)`)
intervals over these cells, two squares that merely brush sides share no cell
at all, which encodes the statement's brushing rule without any special
casing.

Each drop then reads and writes one run of cells: the square lands at its own
side length plus the maximum cell height under its footprint, that top height
is written across the whole run, and the running maximum of all tops is
appended to the answer. Summing heights is safe in 32-bit arithmetic — `1000`
squares of side `10^6` stack to at most `10^9`, under `2^31`. A segment tree
with lazy max-update could push each drop to `O(log n)`, but at `n <= 1000`
the plain cell scan is at most a few million operations and wins on constants.

**Complexity:** `O(n²)` time — each of the `n` drops scans up to `2n` cells —
and `O(n)` space for the compressed cells and their heights.
