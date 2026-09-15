# Triangle Judgement

## Description

Table: `Triangle`

| Column Name | Type |
| ----------- | ---- |
| x           | int  |
| y           | int  |
| z           | int  |

In SQL, `(x, y, z)` is the primary key column for this table.
Each row of this table contains the lengths of three line segments.

Report for every three line segments whether they can form a triangle.

Return the result table in any order.

Each testcase supplies its own `dataset`: the DDL seeds the `Triangle`
table with that testcase's rows. The result format is in the following
example.

### Example 1

```text
Input: Triangle table from the dataset below.
Output:
x   y   z   triangle
13  15  30  No
10  20  15  Yes
Explanation: 13 + 15 = 28 does not exceed 30, so those three segments
cannot close into a triangle; for 10, 20, and 15 every pair of sides sums
to more than the remaining side, so they can.
```

Write your solution as a single `SELECT` query returning four columns —
`x`, `y`, `z`, and `triangle` — with one row for every row in the
`Triangle` table.

## Hints

### Hint 1

Three segments close into a triangle exactly when no one of them is as
long as the other two laid end to end — every pair of sides must sum to
strictly more than the remaining side.

### Hint 2

Spell the three comparisons as one `AND` inside a `CASE`:
`x + y > z AND x + z > y AND y + z > x` yields `'Yes'`, anything else
`'No'`. Each comparison guards a different side, so all three belong.

### Hint 3

The inequality is strict on purpose: a row where two sides sum to exactly
the third (`x + y = z`) is degenerate — the segments collapse onto one
straight line — and must read `'No'`. No `ORDER BY` is needed: the judge
compares result rows as an unordered multiset.
