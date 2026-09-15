# Solutions — Minimum Moves to Get a Peaceful Board

## Sort each axis onto its target indices

A unit move changes exactly one coordinate of exactly one rook, so the
horizontal moves and vertical moves never interfere. A peaceful board
uses every row index `0..n-1` exactly once, which means the rooks' final
x-coordinates form a permutation of `0..n-1` paired one-to-one with the
rooks; likewise for the y-coordinates. The total number of horizontal
moves is therefore `sum |xi - pi|` over some permutation `p`, and by the
rearrangement inequality that sum is minimized by pairing the k-th
smallest xi with target index `k-1` — sort the x-coordinates and compare
against `0, 1, 2, ...`. The y-axis is handled identically and
independently.

The two sorted cost sums are then simply added. Neither axis can exceed
`n*(n-1)/2 <= 124750` moves (even all-coordinates-equal costs at most
`0+1+...+(n-1)`), so the answer — bounded by roughly `5 * 10^5` — fits a
plain 32-bit integer in every language. The "never two rooks in one
cell" rule constrains legality of paths but not the count: the sorted
targets can always be approached axis-by-axis without any collision,
which the greedy constructive order guarantees.

**Complexity:** `O(n log n)` time for the two sorts, `O(n)` extra space.
