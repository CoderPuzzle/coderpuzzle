# Shortest Distance in a Plane

## Description

Table: `Point2D`

| Column Name | Type |
| ----------- | ---- |
| x           | int  |
| y           | int  |

`(x, y)` is the primary key (combination of columns with unique values) for
this table. Each row of this table indicates the position of a point on the
X-Y plane.

The distance between two points `p1(x1, y1)` and `p2(x2, y2)` is
`sqrt((x2 - x1)^2 + (y2 - y1)^2)`.

Write a solution to report the shortest distance between any two points from
the `Point2D` table. Round the distance to two decimal points.

Each testcase supplies its own `dataset`: the DDL seeds the `Point2D` table
with that testcase's rows. Every dataset holds between 2 and 200 distinct
points with `-10^4 <= x, y <= 10^4`, so the shortest distance is always
defined. The result format is in the following example.

### Example 1

```text
Input: Point2D table from the dataset below.
Output:
shortest
1.0
Explanation: the distance from (-1, -1) to (-1, -2) is 1.0, which beats
sqrt(2) (from (-1, -1) to (0, 0)) and sqrt(5) (from (0, 0) to (-1, -2)),
so the shortest distance is 1.0.
```

Write your solution as a single `SELECT` query returning one column —
`shortest`, the minimum pairwise distance rounded to two decimal places — as
a single row. The rounded value travels as a number, so distances like
`1.00` or `100.00` appear as `1.0` and `100.0`.

## Hints

### Hint 1

Comparing every pair means joining `Point2D` with itself — but the join must
emit each unordered pair exactly once, and no row may pair with itself.
Impose a strict total order on the pair: `a.x < b.x OR (a.x = b.x AND
a.y < b.y)` keeps, for any two rows, exactly one of the two orientations,
and a row never satisfies it against itself. The primary key guarantees two
distinct rows never share both coordinates, so the tie-break always fires
and no zero-distance phantom can appear.

### Hint 2

The distance of one joined row pair is `SQRT` of the squared coordinate
deltas — multiplication, not `^`, spells squaring in SQLite — and `MIN`
over the joined rows picks the shortest. Apply `ROUND(..., 2)` once, around
the `MIN`, not per pair: rounding is monotone, so rounding first and taking
the minimum could not differ, but one `ROUND` states the shape of the
answer directly.

### Hint 3

`SQRT` returns a binary floating-point number, and `ROUND(x, 2)` rounds that
binary double — not the decimal string you would write by hand — to two
decimal places. When the true distance sits near a half-cent boundary the
double's exact position decides: `sqrt(10001)` is `100.00499987500...`,
just below `100.005`, so it rounds down to `100.0` even though copying
`100.005` off a calculator would round up. Distances that are perfect
squares come out of `SQRT` as exact doubles and render as `3.0`, `100.0`,
`2500.0`.
