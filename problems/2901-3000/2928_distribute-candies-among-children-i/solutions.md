# Solutions — Distribute Candies Among Children I

Fix one child's share and the problem collapses from three capped parts
to counting a single interval, which turns the hinted triple scan into one
small loop.

## Fix the first child, count the interval of the rest

Suppose the first child gets `first` candies, ranging over
`0 <= first <= min(n, limit)`. The other two must then split the remaining
`rest = n - first` candies between them, so if the second child takes `b`
candies, both `b <= limit` and `rest - b <= limit` must hold — that is,
`max(0, rest - limit) <= b <= min(limit, rest)`. A closed interval of
integers contributes exactly `high - low + 1` splits, or nothing when the
ends cross (which happens precisely when the remaining candies cannot fit
under the caps). Summing that count over the first child's range enumerates
every valid triple exactly once, because each distribution has a unique
`first` value.

The count stays tiny — at most C(52, 2) = 1326 triples exist even with no
caps at all — so every language here holds the total in its default
integer width with no wide-arithmetic care.

**Complexity:** `O(min(n, limit))` time, `O(1)` space.
