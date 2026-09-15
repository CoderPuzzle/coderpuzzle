# Solutions — Flip Game II

## Backtracking over run lengths, memoized

The player to move wins exactly when some flip of a `"++"` hands the opponent a position from which they cannot win; a position with no `"++"` left is a loss for whoever must move. That definition is already the algorithm: try every legal flip, recurse on the position it produces, and stop at the first recursion that reports the opponent stuck. Only when every flip still leaves the opponent a winning reply is the position itself recorded as a loss.

The restructure that keeps the table small: a flip never crosses a `'-'`, so the string is really a disjoint collection of `'+'`-runs that never interact, and a position is decided by nothing more than the multiset of live run lengths — those of length at least 2, sorted. A flip at spot `i` inside a run of length `r` replaces it by runs of lengths `i` and `r-2-i`, so memoizing on that sorted multiset collapses positions that differ only in dead `'+'`s or in run order: the mirror split `(r-2-i, i)` is the same successor and is tried once, and runs of length 1 are dropped outright because they can never move again.

Without the memo the game tree is exponential in the pluses: each move consumes exactly two `'+'`, so at most `k/2` plies stack up, each choosing among up to `n-1` flips — `O(n^(k/2))` leaves. With the memo each distinct position is solved once, over `O(n)` flips at most, and the positions are multisets of live runs — at most the partitions of the `k` pluses into parts of size at most 20, which the consecutive-plus cap keeps to a few tens of thousands on the 60-character ceiling.

**Complexity:** `O(n·p(k))` time worst case — `p(k)` distinct positions (partitions of the `k` pluses into live runs), each expanded over `O(n)` flips — and `O(p(k))` space for the memo plus `O(k/2)` recursion depth, at most 30 stacked calls on the 60-character ceiling.
