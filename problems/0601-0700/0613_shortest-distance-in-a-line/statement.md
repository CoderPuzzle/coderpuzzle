# Shortest Distance in a Line

## Description

Table: `Point`

| Column Name | Type |
| ----------- | ---- |
| x           | int  |

In SQL, `x` is the primary key column for this table.
Each row of this table indicates the position of a point on the X-axis.

Write a solution to find the shortest distance between any two points
from the `Point` table.

It is guaranteed that the `Point` table contains at least two rows.

Each testcase supplies its own `dataset`: the DDL seeds the `Point` table
with that testcase's rows. The result format is in the following example.

### Example 1

```text
Input: Point table from the dataset below.
Output:
shortest
1
Explanation: the shortest distance is the one between points -1 and 0,
whose separation is |(-1) - 0| = 1 — smaller than the gap of 2 between
0 and 2.
```

Write your solution as a single `SELECT` query returning one column —
`shortest` — and exactly one row, the smallest distance between any two
of the points.

### Follow up

How could you optimize your solution if the values in the `Point` table
are already given in ascending order?

## Hints

### Hint 1

The distance between two points is the absolute difference of their `x`
values, and the answer is the minimum of that quantity over all pairs of
rows. The primary key does quiet work here: `x` values are unique, so
every pair of distinct rows is automatically a pair of distinct points —
there is no same-position pair to exclude.

### Hint 2

Comparing each row with every other row means pairing the table with
itself, and the join condition can carry the geometry: `p1.x > p2.x`
keeps each unordered pair exactly once with the larger value on the left,
so every difference `p1.x - p2.x` is already positive — the minimum over
those differences is the shortest distance, and no `ABS` is needed.

### Hint 3

The guarantee that the table holds at least two rows means the self-join
never comes back empty, so `MIN` always has a difference to return: no
NULL answer, no fallback expression. One aggregate over the joined pairs
is the whole query.
