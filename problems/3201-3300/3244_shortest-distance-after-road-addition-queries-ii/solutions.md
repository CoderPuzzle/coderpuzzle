# Solutions — Shortest Distance After Road Addition Queries II

## Jump-pointer greedy

Keep, for every city `i`, the next hop `nxt[i]` taken by a maintained route
from 0 to `n - 1` (initially just `i + 1`), together with the route's hop
count. A new road `(u, v)` can only improve the route when its departure
city is still on it and it leaps past the recorded successor, i.e.
`0 < nxt[u] < v`. Otherwise it is redundant: either `u` was swallowed by an
earlier road (cities strictly inside a road's span are retired from the
route), or an earlier road out of `u` already reaches at least as far as
`v`. A useful road is spliced in directly: walk the recorded chain from
`nxt[u]` until reaching `v`, retiring each city passed along the way, then
set `nxt[u] = v`. Every retired city previously contributed exactly one hop,
so the hop count falls by one per retirement and that value is the answer
for this query.

The greedy state stays optimal because the roads never properly cross — any
two are nested, share an endpoint, or sit side by side. On such a family the
best route always prefers a maximal road over anything nested inside it:
roads lying strictly inside a road `(a, b)` span at most `b - a - 1`
positions in total, so their combined saving can never beat the `b - a - 1`
hops `(a, b)` itself saves. Distinct maximal roads cannot properly cross,
which makes them mutually compatible, so the optimum equals the sum of all
maximal-road savings — and that is exactly what the maintained route
realizes: one jump per maximal road, with its interior cities retired.

Each query costs constant work plus one step per city it retires, and a
retired city never returns, so the retirements across the whole run are
bounded by `n - 1`.

**Complexity:** `O(n+q)` time, `O(n)` space.
