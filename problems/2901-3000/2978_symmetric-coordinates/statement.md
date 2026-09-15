# Symmetric Coordinates

## Description

Table: `Coordinates`

| Column Name | Type |
| ----------- | ---- |
| X           | int  |
| Y           | int  |

Each row includes X and Y, where both are integers. Table may contain
duplicate values.

Two coordindates (X1, Y1) and (X2, Y2) are said to be symmetric
coordintes if X1 == Y2 and X2 == Y1.

Write a solution that outputs, among all these symmetric coordintes, only
those unique coordinates that satisfy the condition X1 <= Y1.

Return the result table ordered by X and Y (respectively) in ascending
order.

Each testcase supplies its own `dataset`: the DDL seeds the `Coordinates`
table with that testcase's rows. The result format is in the following
example.

### Example 1

```text
Input:
Coordinates table:
+----+----+
| X  | Y  |
+----+----+
| 20 | 20 |
| 20 | 20 |
| 20 | 21 |
| 23 | 22 |
| 22 | 23 |
| 21 | 20 |
+----+----+
Output:
+----+----+
| x  | y  |
+----+----+
| 20 | 20 |
| 20 | 21 |
| 22 | 23 |
+----+----+
Explanation:
- (20, 20) and (20, 20) are symmetric coordinates because, X1 == Y2 and X2 == Y1. This results in displaying (20, 20) as a distinctive coordinates.
- (20, 21) and (21, 20) are symmetric coordinates because, X1 == Y2 and X2 == Y1. However, only (20, 21) will be displayed because X1 <= Y1.
- (23, 22) and (22, 23) are symmetric coordinates because, X1 == Y2 and X2 == Y1. However, only (22, 23) will be displayed because X1 <= Y1.
The output table is sorted by X and Y in ascending order.
```

Write your solution as a single `SELECT` query returning two columns —
`x` and `y`.
