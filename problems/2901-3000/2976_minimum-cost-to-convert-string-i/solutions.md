# Solutions — Minimum Cost to Convert String I

Both methods rest on the same pin: a rewrite rule is a priced directed edge
between two of the 26 letters, so the cheapest way to turn one letter into
another is a shortest path, and the whole menu can be settled before the
string is ever touched. Dijkstra asks each letter in turn for its prices,
settling one row of the table per source with a heap and paying only for the
rules that exist. Floyd–Warshall relaxes the entire table through every
letter in one fixed cube of work, whatever the menu holds. Either way the
bill that matters is the mandatory scan that zips `source` against `target`,
adding one table entry per differing position.

## Dijkstra from Each of the 26 Letters

Floyd–Warshall's cube never asks how many rules the menu holds; this variant
does. Each rule becomes one directed edge in a 26-node adjacency list —
duplicates included, since the relaxation test keeps whichever copy of a
pair is cheaper — and every letter then runs its own single-source search:
tentative prices start at 0 for the source letter and infinity elsewhere,
and a min-heap always offers the cheapest unsettled letter.

Positive costs are the whole licence for the greed. The smallest tentative
price on the heap is already final — any other route to that letter must
leave through a letter at least as expensive — so each pop settles one
letter for good. Settling a letter relaxes its rules, re-queueing a neighbor
only when the route through it strictly improves the record; heap entries
that went stale before a cheaper route was found are discarded by a
`price > dist` guard, and a letter still at infinity when the heap empties
is genuinely unreachable.

Twenty-six finished runs fill the same 676-entry price table the all-pairs
pass would have, so the finishing scan is unchanged: matching positions are
skipped at no charge, every other position adds its table entry, and one
infinity is enough to answer -1. The prices are the prices, whichever search
produced them — the run from `e` still prices the e-to-u entry of
`peck -> puck` at 5 through `o`, and `dodo -> nono` still charges 7 per `d`.
The trade behind the placement: the menu holds at most 26 · 25 = 650
distinct letter pairs, so the graph always lives in the dense regime where
the heap's log factor buys nothing, and both graph passes are noise beside
the O(n) scan that follows — the fixed cube and the smaller table keep the
last word.

**Complexity:** `O(26 (k + 26) log 26 + n)` time, `O(k + 26^2)` space.

## Floyd–Warshall on the 26-letter conversion graph

Model every conversion rule as a directed weighted edge between two of the 26 lowercase letters, and note that a chain of conversions is exactly a path in this graph. The cheapest way to turn a letter `a` into a letter `b` is therefore the shortest path from `a` to `b`, where duplicate rules for the same pair simply contribute their minimum cost as the edge weight.

Since there are only 26 nodes, Floyd–Warshall precomputes all 676 pairwise distances in essentially constant time: start with a 0 diagonal and infinity everywhere else, apply each rule as `dist[a][b] = min(dist[a][b], w)`, then relax through every intermediate letter. The infinity sentinel is Python's `float("inf")`; it is the only floating-point value in the matrix, so unreachability can be detected with an exact equality comparison — real costs are integers and can never collide with it.

Finally, walk `source` and `target` together. Positions where the characters already match cost nothing; every other position adds `dist[source[i]][target[i]]` to the total, and a single infinite distance makes the whole answer -1. With up to 10^5 positions but only 26 possible character pairs, answering each position is a table lookup after the precomputation.

**Complexity:** `O(26^3 + n)` time, `O(26^2)` space.
