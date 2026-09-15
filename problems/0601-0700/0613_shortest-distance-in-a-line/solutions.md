# Solutions — Shortest Distance in a Line

## One self-join over ordered pairs

Each row of `Point` is one point on the X-axis, and the distance between
two rows is the absolute difference of their `x` values — so the answer
is the minimum of |x_i - x_j| over all pairs of rows. The primary key
pays off before any SQL is written: `x` values are unique, which makes
every pair of distinct rows a pair of distinct points, so the pair set to
search is exactly the set of row pairs and nothing needs to be filtered.

Enumerating those pairs is a self-join, and the join condition can carry
the geometry instead of a filter that follows it. `p1.x > p2.x` keeps
each unordered pair exactly once, always with the larger value on the
left, so every difference `p1.x - p2.x` is already positive — the
absolute value is free, and the forbidden-looking pairs (a row with
itself, the same two rows the other way around) never enter the result.
The answer then collapses to one aggregate: `MIN(p1.x - p2.x) AS
shortest`, the smallest of the positive differences. The statement's
guarantee that the table holds at least two rows closes the last gap —
the join always returns at least one pair, so `MIN` never sees an empty
input and returns a number, not NULL.

Mechanically the join is a nested loop over the table: each of the n rows
is tested against the n - 1 others, keeping the pairs that satisfy the
inequality, and the aggregate scans the kept differences once. Nothing
beyond the two row scans is materialized.

**Complexity:** `O(n^2)` time, `O(1)` space.
