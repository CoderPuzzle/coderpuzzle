# Unique Orders and Customers Per Month

## Description

Table: `Orders`

| Column Name | Type |
| ----------- | ---- |
| order_id    | int  |
| order_date  | date |
| customer_id | int  |
| invoice     | int  |

`order_id` is the column with unique values for this table. This
table contains information about the orders made by `customer_id`.

Write a solution to find, for each calendar month that appears in
`Orders`, the number of orders with `invoice > 20` placed that month
and the number of distinct customers who placed at least one such
order. A month where no order clears the `$20` invoice threshold
contributes no row to the result — only months with at least one
qualifying order appear.

Each testcase's `dataset` seeds the `Orders` table before your query
runs; the table may hold no rows at all for a testcase. Return the
result table sorted in any order. The result format is in the
following example.

### Example 1

```text
Input:
Orders table:
+----------+------------+-------------+---------+
| order_id | order_date | customer_id | invoice |
+----------+------------+-------------+---------+
| 1        | 2020-09-15 | 1           | 30      |
| 2        | 2020-09-17 | 2           | 90      |
| 3        | 2020-10-06 | 3           | 20      |
| 4        | 2020-10-20 | 3           | 21      |
| 5        | 2020-11-10 | 1           | 10      |
| 6        | 2020-11-21 | 2           | 15      |
| 7        | 2020-12-01 | 4           | 55      |
| 8        | 2020-12-03 | 4           | 77      |
| 9        | 2021-01-07 | 3           | 31      |
| 10       | 2021-01-15 | 2           | 20      |
+----------+------------+-------------+---------+
Output:
+---------+-------------+----------------+
| month   | order_count | customer_count |
+---------+-------------+----------------+
| 2020-09 | 2           | 2              |
| 2020-10 | 1           | 1              |
| 2020-12 | 2           | 1              |
| 2021-01 | 1           | 1              |
+---------+-------------+----------------+
Explanation:
September 2020 has two orders from two different customers, both
above the threshold, so both count. October 2020 has two orders from
the same customer, but only one clears $20 (the other sits exactly
at $20, which does not qualify), so that month reports one order and
one customer. November 2020 has two orders from two customers but
neither clears $20, so the month is left out of the result entirely.
December 2020 has two orders from a single customer, both above the
threshold, so the month reports two orders but only one customer.
January 2021 has two orders from two customers, but only one clears
$20, so the month reports one order and one customer.
```

Write your solution as a single `SELECT` query returning three
columns — `month` (formatted `YYYY-MM`), `order_count`, and
`customer_count` — one row for every month that has at least one
order with `invoice > 20`.
