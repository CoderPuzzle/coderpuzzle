# Solutions — Zuma Game

## Memoized search over board and hand states

A position is fully described by two things: the row of balls and the multiset
still in hand — the order the hand balls arrived in never matters, only how
many of each color remain. `solve` walks these positions depth-first: for
every maximal run whose color is still held, it spends one ball to extend that
run, lets the cascade settle, and recurses, returning 0 once the row is empty.
The cheapest chain of insertions that empties the row is the answer; a position
from which no chain succeeds is marked with an over-large sentinel, so -1
propagates to the top.

The cascade is a pure function of the row: one pass scans out the maximal runs
and drops every run of three or more, and the pass repeats until it removes
nothing — removing a run welds its neighbors together, and that weld may itself
reach three. Because the function only reads its input, every move compresses
to exactly the row it settles into, which is what makes the memo key exact.

Two rules prune the branching without losing optimal lines. Only insertions
alongside a same-colored run are tried: a ball dropped between two foreign
colors can only join a removal after the groups separating it from its color
are gone, so deferring its insertion to that merge costs the same, and sliding
a ball along the run it joins yields an identical row — one canonical gap per
run covers them all. Each (row, hand-multiset) pair is then solved once; with
at most five hand balls over five colors there are at most 252 hand states, and
the ceiling inputs resolve in milliseconds.

**Complexity:** exponential in the hand size in the worst case; the memo caps
the work at one solve per (reachable row, hand multiset) — at most 252 hand
states — each settled by `O(L²)` cascade passes over a row of length `L ≤ 16`.
