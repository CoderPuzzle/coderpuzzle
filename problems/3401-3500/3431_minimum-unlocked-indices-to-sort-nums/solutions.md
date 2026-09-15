# Solutions — Minimum Unlocked Indices to Sort Nums

The allowed swap exchanges two adjacent values that differ by exactly 1 — a
`(2, 1)` or a `(3, 2)` in descending order. Two elements whose values differ
by 2 can therefore never trade places: a 1 stuck after a 3 can never reach the
front, so such an array is beyond saving and the answer is `-1`. Every other
element moves with a strict direction: a 1 only ever moves left (it is always
the smaller value in its swap), a 3 only ever moves right, and each swap
consumes the boundary it happens on.

## Four boundary indices decide everything

Count, for every boundary between positions `i` and `i + 1`, how many 1s must
still cross it leftward and how many 3s must still cross it rightward to
reach the sorted arrangement. Both counts compare an initial tally against
the sorted final one, and the boundary is _forced_ — it must be unlocked —
exactly when either count is positive. Working that comparison out collapses
it to index arithmetic: the forced boundaries for the 1s are precisely those
from the first 2 up to (but excluding) the last 1, and for the 3s from the
first 3 up to (but excluding) the last 2. Unlocking exactly those always
suffices, because any adjacent inversion still present sits inside one of the
two ranges and is therefore swappable.

So one pass records `first2`, `last1`, `first3`, `last2` (sentinels `n` and
`-1` make missing values produce empty ranges), a second pass counts the
locked indices inside the two ranges, and `first3 < last1` short-circuits to
`-1`. The trailing entry of `locked` never matters: a swap at index `n - 1`
has no right neighbor. On `[2, 2, 1, 1]` with `locked = [1, 0, 0, 0]` the
1-range `[0, 3)` contains exactly one locked boundary, and the answer is 1 —
the innermost 1 really must swap across position 0.

**Complexity:** `O(n)` time, `O(1)` space.
