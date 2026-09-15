# Friday Purchases II

## Description

Table: `Purchases`

| Column Name   | Type |
| ------------- | ---- |
| user_id       | int  |
| purchase_date | date |
| amount_spend  | int  |

(`user_id`, `purchase_date`, `amount_spend`) is the primary key (combination
of columns with unique values) for this table. `purchase_date` will range
from November 1, 2023, to November 30, 2023, inclusive of both dates. Each
row contains user id, purchase date, and amount spend.

Write a solution to calculate the total spending by users on each Friday of
every week in November 2023. If there are no purchases on a particular
Friday of a week, it will be considered as 0.

Return the result table ordered by week of month in ascending order.

Each testcase supplies its own `dataset`: the DDL seeds the `Purchases`
table with that testcase's rows. The result format is in the following
example.

### Example 1

```text
Input:
Purchases table:
+---------+---------------+--------------+
| user_id | purchase_date | amount_spend |
+---------+---------------+--------------+
| 11      | 2023-11-07    | 1126         |
| 15      | 2023-11-30    | 7473         |
| 17      | 2023-11-14    | 2414         |
| 12      | 2023-11-24    | 9692         |
| 8       | 2023-11-03    | 5117         |
| 1       | 2023-11-16    | 5241         |
| 10      | 2023-11-12    | 8266         |
| 13      | 2023-11-24    | 12000        |
+---------+---------------+--------------+
Output:
+---------------+---------------+--------------+
| week_of_month | purchase_date | total_amount |
+---------------+---------------+--------------+
| 1             | 2023-11-03    | 5117         |
| 2             | 2023-11-10    | 0            |
| 3             | 2023-11-17    | 0            |
| 4             | 2023-11-24    | 21692        |
+---------------+---------------+--------------+
Explanation:
- During the first week of November 2023, transactions amounting to $5,117 occurred on Friday, 2023-11-03.
- For the second week of November 2023, there were no transactions on Friday, 2023-11-10, resulting in a value of 0 in the output table for that day.
- Similarly, during the third week of November 2023, there were no transactions on Friday, 2023-11-17, reflected as 0 in the output table for that specific day.
- In the fourth week of November 2023, two transactions took place on Friday, 2023-11-24, amounting to $12,000 and $9,692 respectively, summing up to a total of $21,692.
Output table is ordered by week_of_month in ascending order.
```

Unlike a plain per-day total, this report is a calendar: all four Fridays
of November 2023 — the 3rd, 10th, 17th, and 24th — appear exactly once,
each in its own week of the month (week 1 covers the 1st through the 7th,
week 2 the 8th through the 14th, and so on), and a Friday with no
purchases reports 0 rather than dropping out. Fridays without data cannot
be read out of the `Purchases` table, so the four calendar rows have to
come from somewhere else. Write your solution as a single `SELECT` query
returning three columns — `week_of_month`, `purchase_date`, and
`total_amount`, in that order, with the weeks ascending.

## Hints

### Hint 1

The missing Fridays are not in the data, so generate the calendar yourself: a recursive CTE walking `DATE('2023-11-01')` forward with `DATE(d, '+1 day')` up to `2023-11-30` yields all thirty days of the month.

### Hint 2

Keep only the generated Fridays (`strftime('%w', d) = '5'` on the CTE side, before any join) and `LEFT JOIN Purchases` on the date, so purchase-free Fridays survive as rows with nulls.

### Hint 3

`COALESCE(SUM(amount_spend), 0)` turns a Friday that matched no purchases into the required 0, and `(CAST(strftime('%d', d) AS INTEGER) + 6) / 7` labels each Friday with its week of the month for the final ordering.
