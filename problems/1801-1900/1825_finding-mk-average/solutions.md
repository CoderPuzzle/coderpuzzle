# Solutions — Finding MK Average

Every query re-derives its answer from the last `m` stream elements, and
`10⁵` of those operations must stay cheap, so the class needs a summary of
the window it can maintain incrementally rather than a sort per query.

## Fenwick trees over the value domain

Stream values are bounded (`1 <= num <= 10⁵`), which turns the value axis
itself into an index space. The class keeps two Fenwick trees over that
axis — one storing element counts per value, one storing value sums — plus
the window in arrival order. `addElement` appends the newcomer to both
trees and, once more than `m` elements have arrived, removes the value
that just slid out of the window; both updates cost `O(log V)` with `V`
the value bound, and a plain deque holds the arrival order so eviction
knows exactly which value to retire.

`calculateMKAverage` needs the sum of the middle `m - 2k` elements. If
`S(j)` denotes the combined value of the `j` smallest elements in the
window, that middle sum is simply `S(m - k) - S(k)`, so the query descends
the count tree once per argument — the classic Fenwick binary-lift that
walks toward the position where the running count reaches `j`, pairing
each covered bucket with its sum and charging the final partial bucket at
its exact value — and floor-divides the difference by `m - 2k`. While the
stream is shorter than `m` the answer is `-1`. Window sums reach
`10⁵ · 10⁵ = 10¹⁰`, past 32-bit range, so sums live in 64-bit integers
(exact as JavaScript numbers, which hold integers up to `2⁵³`).

**Complexity:** `O(log V)` per `addElement` and per
`calculateMKAverage`, `O(m + V)` space.
