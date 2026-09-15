# Apples & Oranges

## Description

Table: `Sales`

| Column Name | Type |
| ----------- | ---- |
| sale_date   | date |
| fruit       | enum |
| sold_num    | int  |

`(sale_date, fruit)` is the primary key (combination of columns with
unique values) of this table. This table contains the sales of "apples"
and "oranges" sold each day.

Write a solution to report the difference between the number of apples
and oranges sold each day.

Each testcase's `dataset` seeds the table: its script inserts the
testcase's `Sales` rows before your query runs. Return the result table
ordered by `sale_date`. The `diff` column is `apples sold - oranges
sold`, which may be negative. The result format is in the following
example.

### Example 1

```text
Input:
Sales
+------------+------------+-------------+
| sale_date  | fruit      | sold_num    |
+------------+------------+-------------+
| 2020-05-01 | apples     | 10          |
| 2020-05-01 | oranges    | 8           |
| 2020-05-02 | apples     | 15          |
| 2020-05-02 | oranges    | 15          |
| 2020-05-03 | apples     | 20          |
| 2020-05-03 | oranges    | 0           |
| 2020-05-04 | apples     | 15          |
| 2020-05-04 | oranges    | 16          |
+------------+------------+-------------+
Output:
+------------+--------------+
| sale_date  | diff         |
+------------+--------------+
| 2020-05-01 | 2            |
| 2020-05-02 | 0            |
| 2020-05-03 | 20           |
| 2020-05-04 | -1           |
+------------+--------------+
Explanation:
Day 2020-05-01, 10 apples and 8 oranges were sold (Difference 10 - 8 =
2). Day 2020-05-02, 15 apples and 15 oranges were sold (Difference 15 -
15 = 0). Day 2020-05-03, 20 apples and 0 oranges were sold (Difference
20 - 0 = 20). Day 2020-05-04, 15 apples and 16 oranges were sold
(Difference 15 - 16 = -1).
```

Write your solution as a single `SELECT` query returning two columns —
`sale_date` and `diff` — one row per day, ordered by `sale_date`.

## Hints

### Hint 1

Group the rows by `sale_date`; each group holds one apples row and one
oranges row.

### Hint 2

A conditional sum per group builds the difference directly:
`SUM(CASE WHEN fruit = 'apples' THEN sold_num ELSE -sold_num END)`
adds apples and subtracts oranges in one expression, then
`ORDER BY sale_date` finishes the contract.
