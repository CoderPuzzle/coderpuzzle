# Solutions — Sum of Matrix After Queries

## Sweep reversed with seen rows and columns

Every query paints one whole row or one whole column, and each later query
painting that same line fully replaces the earlier value — so reading the
queries in reverse order turns every overwriting chain into a
first-writer-wins rule: the first time a row or column is encountered in
the reverse sweep is the last write in real time, and its value sticks for
good. Any later (that is, earlier-in-input) query on an already-claimed
row or column can be skipped entirely, which collapses the whole workload
to at most `n` effective writes.

When an unclaimed row is claimed during the reverse sweep, its value
survives exactly on the cells whose columns were not claimed by some even
later reverse-sweep step — meaning columns still unclaimed when this row
is processed. The surviving area is therefore `(number of columns not yet
claimed) * value`, symmetrically `remainingRows * value` for a fresh
column. Tracking just two counters plus the seen flags gives the whole
answer in one pass; there is no need to materialize any part of the
`n x n` grid.

The answer can reach `n * n * val = 10⁴ * 10⁴ * 10⁵ = 10¹³`, far past
the 32-bit signed range, so fixed-width languages accumulate and return
64-bit integers; JavaScript's doubles hold integers exactly below
2⁵³ ≈ 9.0 × 10¹⁵, comfortably above the bound.

**Complexity:** `O(n + q)` time, `O(n)` space.
