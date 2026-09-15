# Solutions — Find the Level of Tree with Minimum Sum

Every node belongs to exactly one level, fixed by its distance from the
root, so the level sums partition all node values into disjoint groups.
Walking the tree in breadth-first order visits those groups one after
another — each batch drawn off the queue is precisely one level's worth
of nodes, and appending children as you go prepares the next batch. That
gives a natural place to total each group and compare.

## Level-by-level BFS sums

Keep a queue seeded with the root. Each round drains the entire current
batch, summing values and collecting non-null children into the next
batch; when a level's total beats the running minimum strictly, both the
minimum and its level index update together. Because levels are visited
in ascending order, using strict less-than means an equal later sum never
displaces an earlier level — ties resolve to the lowest level for free,
exactly as the statement demands, with no extra bookkeeping.

Two care points: recursion is not an option, since a skewed tree runs
10⁵ nodes deep and would blow the small per-language stack limits — the
explicit queue keeps the pass iterative. And a level's sum reaches
10⁵ × 10⁹ = 10¹⁴, past 32-bit range: accumulate in 64-bit types (Java
`long`, C++ `long long`, Go `int64`, Rust `i64`); JS/TS Numbers are exact
here because every intermediate stays below 2⁵³ ≈ 9·10¹⁵. The whole
walk touches each node once and holds at most one level of nodes at a
time.

**Complexity:** `O(n)` time, `O(w)` space (w = max level width).
