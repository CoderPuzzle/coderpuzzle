# Solutions — Minimum Levels to Gain More Points

## Running prefix against total

Score each level as +1 when `possible[i]` is 1 and −1 when it is 0. If
Alice stops after `t` levels her score is the signed sum of the first `t`
values, Bob's score is the signed sum of the rest, and Alice is strictly
ahead exactly when `prefix(t) > total - prefix(t)`, i.e. when
`2 * prefix(t) > total`. "Both players play optimally" costs nothing here:
the point totals after any split are fixed by the array, since failing a
level loses its owner the same point regardless of who plays it — the only
decision is where the split lands.

So walk the array once keeping a running prefix and return the first index
where twice that prefix exceeds the total, adding one because the answer
counts levels rather than indices. The scan deliberately covers only the
first `n - 1` elements: every player must play at least one level, so the
last valid split leaves Bob the final element. If no covered split wins,
return -1.

All quantities stay tiny: signed sums over at most 10⁵ levels lie within
±10⁵, far inside 32-bit range (and inside JavaScript's exact integer
window), so plain machine integers suffice in every language. Early exit on
the first winning split keeps the pass linear with constant extra space.

**Complexity:** `O(n)` time, `O(1)` space.
