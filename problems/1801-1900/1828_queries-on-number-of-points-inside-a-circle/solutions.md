# Solutions — Queries on Number of Points Inside a Circle

Each query is a membership count over the plane, and the coordinate box is
tiny: at most five hundred points and five hundred circles inside a
501 × 501 integer grid. Per-query scans therefore cost at most a quarter
million containment tests in total — the brute force the second hint names
is already the right price.

## Squared-distance scan per query

A point `(x, y)` lies in the circle centered at `(xj, yj)` with radius `rj`
exactly when its euclidean distance to the center is at most `rj`, and the
statement counts border points as inside. Testing `dx² + dy² <= rj²` rather
than `sqrt(dx² + dy²) <= rj` makes that decision in pure integers: every
operand is bounded by `500² + 500² = 5 × 10⁵`, far inside 32-bit range, and
no floating-point rounding can flip a point that sits exactly on the border.
That borderline is precisely where the naive `sqrt` formulation loses
agreement between languages, so squaring is a correctness measure, not just
a speed one.

The loops nest queries outside points, accumulating one counter per query
into `answer`. Duplicated coordinates need no special handling — each copy
is a separate point and is counted separately, as the first example's
coincident-free geometry and the statement both assume. With `n` points and
`q` queries the scan does `n · q` constant-work tests; at the constraint
ceiling that is `2.5 × 10⁵` tests, microseconds in every language.

The follow-up's `O(n)`-per-query challenge (sorting points by distance from
each center, or a 2D grid bucketing) only pays off far beyond these bounds
and would add asymptotic ceremony without measurable effect here.

**Complexity:** `O(n · q)` time, `O(q)` space for the output (`O(1)` beyond
it), where `n` is the number of points and `q` the number of queries.
