# Classifying Triangles by Lengths

## Description

Table: `Triangles`

| Column Name | Type |
| ----------- | ---- |
| A           | int  |
| B           | int  |
| C           | int  |

`(A, B, C)` is the primary key for this table.
Each row include the lengths of each of a triangle's three sides.

Write a query to find the type of triangle. Output one of the following
for each row:

- `Equilateral`: It's a triangle with 3 sides of equal length.
- `Isosceles`: It's a triangle with 2 sides of equal length.
- `Scalene`: It's a triangle with 3 sides of differing lengths.
- `Not A Triangle`: The given values of A, B, and C don't form a
  triangle.

Return the result table in any order.

Each testcase supplies its own `dataset`: the DDL seeds the `Triangles`
table with that testcase's rows. The result format is in the following
example.

### Example 1

```text
Input: Triangles table from the dataset below.
Output:
triangle_type
Isosceles
Equilateral
Scalene
Not A Triangle
Explanation: Values in the first row from an Isosceles triangle,
because A = B. Values in the second row from an Equilateral triangle,
because A = B = C. Values in the third row from an Scalene triangle,
because A != B != C. Values in the fourth row cannot form a triangle,
because the combined value of sides A and B is not larger than that of
side C.
```

Write your solution as a single `SELECT` query returning one column —
`triangle_type` — with one row for every row in the `Triangles` table.

## Hints

### Hint 1

Before any equality counting, a row must pass the triangle inequality:
every pair of sides must sum to strictly more than the remaining one. A
single failing pair — usually the two shorter sides against the longest
— makes the row `Not A Triangle`, whatever its equalities look like.

### Hint 2

Order a `CASE` so validity is decided first, then let the equality
pattern name the triangle: `A = B AND B = C` yields `Equilateral`, any
single pair equal (`A = B OR B = C OR A = C`) yields `Isosceles`, and
all three sides differing falls through to `Scalene`.

### Hint 3

The comparisons are strict on purpose: a row where two sides sum to
exactly the third collapses onto a straight line and reads
`Not A Triangle` even when two of its sides are equal, and a zero or
negative side fails the same three comparisons without a special case.
No `ORDER BY` is needed: the judge compares result rows as an unordered
multiset.
