# Friday Purchases I

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
every week in November 2023. Output only weeks that include at least one
purchase on a Friday.

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
| 4             | 2023-11-24    | 21692        |
+---------------+---------------+--------------+
Explanation:
- During the first week of November 2023, transactions amounting to $5,117 occurred on Friday, 2023-11-03.
- For the second week of November 2023, there were no transactions on Friday, 2023-11-10.
- Similarly, during the third week of November 2023, there were no transactions on Friday, 2023-11-17.
- In the fourth week of November 2023, two transactions took place on Friday, 2023-11-24, amounting to $12,000 and $9,692 respectively, summing up to a total of $21,692.
Output table is ordered by week_of_month in ascending order.
```

November 2023 holds exactly four Fridays — the 3rd, 10th, 17th, and 24th —
and each lives in a different week of the month, where week 1 covers the
1st through the 7th, week 2 the 8th through the 14th, and so on. A week
shows up in the output only when its Friday carries at least one purchase,
so consecutive output rows may skip weeks entirely. Because every Friday
occupies its own week, ordering by `week_of_month` ascending never ties.
Write your solution as a single `SELECT` query returning three columns —
`week_of_month`, `purchase_date`, and `total_amount`, in that order.

## Hints

### Hint 1

Filter to Fridays before anything else: in SQLite `strftime('%w', purchase_date)` returns the weekday with Sunday = 0, so Friday is `'5'`.

### Hint 2

One output row per purchasing Friday: `GROUP BY purchase_date` with `SUM(amount_spend)` totals the day, and Fridays without purchases never form a group because their rows were already filtered out.

### Hint 3

Derive `week_of_month` from the day of the month: `CAST(strftime('%d', purchase_date) AS INTEGER)` is the day, and the integer expression `(day + 6) / 7` is its ceiling over sevens — November's Fridays (3, 10, 17, 24) map to weeks 1, 2, 3, 4.
