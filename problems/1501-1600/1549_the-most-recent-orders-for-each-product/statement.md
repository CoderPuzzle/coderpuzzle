# The Most Recent Orders for Each Product

## Description

Table: `Customers`

| Column Name | Type    |
| ----------- | ------- |
| customer_id | int     |
| name        | varchar |

`customer_id` is the column with unique values for this table. This
table contains information about the customers.

Table: `Orders`

| Column Name | Type |
| ----------- | ---- |
| order_id    | int  |
| order_date  | date |
| customer_id | int  |
| product_id  | int  |

`order_id` is the column with unique values for this table. This
table contains information about the orders made by `customer_id`.
No customer orders the same product more than once on the same day.

Table: `Products`

| Column Name  | Type    |
| ------------ | ------- |
| product_id   | int     |
| product_name | varchar |
| price        | int     |

`product_id` is the column with unique values for this table. This
table contains information about the products.

Write a solution to find the most recent order(s) of each product. A
product's most recent order date is the latest `order_date` among its
rows in `Orders`; if two or more orders of that product share that
date, every one of them counts, regardless of which customer placed
it. A product that was never ordered contributes no row to the
result.

Return the result table ordered by `product_name` in ascending
order and, in case of a tie, by `product_id` in ascending order. If
there is still a tie, order the rows by `order_id` in ascending
order.

Each testcase's `dataset` seeds all three tables: its script inserts
the testcase's `Customers`, `Orders`, and `Products` rows before your
query runs — any of the three may hold no rows for a testcase. The
result format is in the following example.

### Example 1

```text
Input:
Customers table:
+-------------+-----------+
| customer_id | name      |
+-------------+-----------+
| 1           | Winston   |
| 2           | Jonathan  |
| 3           | Annabelle |
| 4           | Marwan    |
| 5           | Khaled    |
+-------------+-----------+
Orders table:
+----------+------------+-------------+------------+
| order_id | order_date | customer_id | product_id |
+----------+------------+-------------+------------+
| 1        | 2020-07-31 | 1           | 1          |
| 2        | 2020-07-30 | 2           | 2          |
| 3        | 2020-08-29 | 3           | 3          |
| 4        | 2020-07-29 | 4           | 1          |
| 5        | 2020-06-10 | 1           | 2          |
| 6        | 2020-08-01 | 2           | 1          |
| 7        | 2020-08-01 | 3           | 1          |
| 8        | 2020-08-03 | 1           | 2          |
| 9        | 2020-08-07 | 2           | 3          |
| 10       | 2020-07-15 | 1           | 2          |
+----------+------------+-------------+------------+
Products table:
+------------+--------------+-------+
| product_id | product_name | price |
+------------+--------------+-------+
| 1          | keyboard     | 120   |
| 2          | mouse        | 80    |
| 3          | screen       | 600   |
| 4          | hard disk    | 450   |
+------------+--------------+-------+
Output:
+--------------+------------+----------+------------+
| product_name | product_id | order_id | order_date |
+--------------+------------+----------+------------+
| keyboard     | 1          | 6        | 2020-08-01 |
| keyboard     | 1          | 7        | 2020-08-01 |
| mouse        | 2          | 8        | 2020-08-03 |
| screen       | 3          | 3        | 2020-08-29 |
+--------------+------------+----------+------------+
Explanation:
keyboard's most recent order date is 2020-08-01, reached by two
orders that day (order_id 6 and 7), so both are returned. mouse's
most recent order date is 2020-08-03, reached by a single order.
screen's most recent order date is 2020-08-29, also a single order.
hard disk was never ordered, so it contributes no row to the output.
```

Write your solution as a single `SELECT` query returning four
columns — `product_name`, `product_id`, `order_id`, and
`order_date` — one row for every order that reaches its product's
most recent order date.
