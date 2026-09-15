# Solutions — Shortest Distance in a Plane

## Each unordered pair once, then one ROUND

The shortest distance is a minimum over unordered row pairs, and a self-join
is what enumerates pairs — the entire design question is which pairs it
emits. Joining on bare inequality (`a.x <> b.x OR a.y <> b.y`) emits every
pair twice and, worse, misses nothing that matters; joining on a strict
total order over the coordinates — `a.x < b.x OR (a.x = b.x AND a.y <
b.y)` — emits each unordered pair exactly once and never pairs a row with
itself, because a row can never be strictly less than itself on the
lexicographic `(x, y)` order. The primary key carries the argument the rest
of the way: two distinct rows never share both coordinates, so the
`a.x = b.x` tie-break always fires between different rows, and no
zero-distance phantom from a point paired with its own duplicate can sneak
a `0.0` into the minimum. Ordering by `rowid` would enumerate pairs too,
but coordinates are the portable key.

Each joined row pair contributes `SQRT` of its squared coordinate deltas —
multiplication spells the squaring, since SQLite has no `^` operator — and
`MIN` reduces the column to the shortest true distance. `ROUND(..., 2)`
wraps the `MIN` once, and its placement is safe by monotonicity: rounding
never reorders values, so rounding every pair first and taking the minimum
afterward would return the same row. What `ROUND` rounds is the binary
double `SQRT` produced, not a decimal you would write by hand, and the
distances pin that down: a perfect-square sum such as `25` comes out an
exact double and renders `5.0`, while `sqrt(10001)` is the double
`100.00499987500...`, just below the `100.005` half, so it rounds down to
`100.0` where hand-copied `100.005` would round up — the answer is the
engine's, and the expected values are its own outputs.

With no index on `Point2D` the engine walks one scan against the other and
evaluates all `n(n-1)/2` orientation tests; the aggregate keeps a single
running value, and nothing beyond the input rows is materialized.

**Complexity:** `O(n^2)` time, `O(1)` space.
