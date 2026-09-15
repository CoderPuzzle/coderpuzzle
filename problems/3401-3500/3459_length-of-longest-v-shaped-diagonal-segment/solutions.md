# Solutions — Length of Longest V-Shaped Diagonal Segment

A V-shaped segment is a run of a head `1` followed by alternating `2, 0`
values that walks a diagonal and may bend clockwise exactly once. Since the
allowed values depend only on the parity of the distance from the head, the
longest segment through any cell decomposes into table lookups.

## Row-swept dynamic programming over (cell, direction, turn, value)

Order the four diagonal directions clockwise — NW, NE, SE, SW — so a
clockwise 90-degree turn is simply `(d + 1) % 4`. Past the head, the
expected value alternates `2, 0, 2, 0, ...`, so each cell's role is one of
two values `e ∈ {0, 2}` and the next role is `2 - e`. Build two families of
tables: straight tables `S[e][d]` holding the longest purely straight run
starting at each cell in direction `d` when the cell must hold `e`, and
one-turn tables `M[e][d]` that may either continue straight (`M` of the
next cell, same direction) or make the single clockwise turn (straight `S`
of the next cell in direction `(d+1) % 4`). The answer is `1` plus the best
`M[2][d]` over the four neighbors of each `1` head.

Every transition steps one cell along a diagonal, so each table is filled
by sweeping rows against its direction (top-down for upward directions,
bottom-up for downward ones) — dependencies are always a finished row
above or below. The sweeps are fully iterative, which matters at the
500 x 500 limit: the longest segment spans about a thousand cells, deep
enough to threaten recursion limits in stack-constrained runtimes. Lengths
never exceed `n + m ≤ 1000`, so 32-bit counters suffice everywhere.

**Complexity:** `O(n · m)` time — sixteen constant-work state tables — and
`O(n · m)` space for the tables.
