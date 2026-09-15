# Solutions — Create a Session Bar Chart

## One counting arm per bin

The output's four rows are fixed by the statement, not by the data — a
bin with no sessions still reports `0` — so the query is naturally a
`UNION ALL` of four SELECTs that each emit one constant label and one
count. Every arm filters `Sessions` with its own `WHERE` range over
`duration`: under 300 seconds, then `[300, 600)`, then `[600, 900)`, and
finally 900 or more. `COUNT(*)` inside each arm returns 0 when the filter
keeps nothing, which is exactly the empty-bin behavior required.

The bin edges are half-open intervals of seconds — `[0-5>` means
`0 <= duration < 300` — so each `WHERE` uses `>=` on the low edge and
`<` on the high one, with the last arm unbounded above. Sessions never
straddle bins because the ranges partition the domain.

Four full scans of a small table is nothing next to the clarity of one
arm per bin; row order is free since the comparison treats the result as
a multiset.

**Complexity:** `O(n)` time (four passes over the table), `O(1)` space.
