# Sellers With No Sales

## Description

Table: `Customer`

| Column Name   | Type    |
| ------------- | ------- |
| customer_id   | int     |
| customer_name | varchar |

`customer_id` is the column with unique values for this table. Each row
of this table contains the information of a customer in the web store.

Table: `Orders`

| Column Name | Type |
| ----------- | ---- |
| order_id    | int  |
| sale_date   | date |
| order_cost  | int  |
| customer_id | int  |
| seller_id   | int  |

`order_id` is the column with unique values for this table. Each row of
this table contains information about an order placed in the web store.
`sale_date` is the date the transaction happened between the customer
(`customer_id`) and the seller (`seller_id`).

Table: `Seller`

| Column Name | Type    |
| ----------- | ------- |
| seller_id   | int     |
| seller_name | varchar |

`seller_id` is the column with unique values for this table. Each row of
this table contains the information of a seller.

Write a solution to report the names of all sellers who did not make any
sales in 2020.

Each testcase's `dataset` seeds all three tables: its script inserts the
testcase's `Customer`, `Orders`, and `Seller` rows (whichever are present)
before your query runs. Return the result table ordered by `seller_name`
in ascending order. The result format is in the following example.

### Example 1

```text
Input:
Customer
+-------------+---------------+
| customer_id | customer_name |
+-------------+---------------+
| 101         | Alice         |
| 102         | Bob           |
| 103         | Charlie       |
+-------------+---------------+
Orders
+----------+------------+------------+-------------+-----------+
| order_id | sale_date  | order_cost | customer_id | seller_id |
+----------+------------+------------+-------------+-----------+
| 1        | 2020-03-01 | 1500       | 101         | 1         |
| 2        | 2020-05-25 | 2400       | 102         | 2         |
| 3        | 2019-05-25 | 800        | 101         | 3         |
| 4        | 2020-09-13 | 1000       | 103         | 2         |
| 5        | 2019-02-11 | 700        | 101         | 2         |
+----------+------------+------------+-------------+-----------+
Seller
+-----------+-------------+
| seller_id | seller_name |
+-----------+-------------+
| 1         | Daniel      |
| 2         | Elizabeth   |
| 3         | Frank       |
+-----------+-------------+
Output:
+-------------+
| seller_name |
+-------------+
| Frank       |
+-------------+
Explanation:
Daniel made one sale in March 2020, so he is excluded.
Elizabeth made two sales in 2020 (orders 2 and 4) and one in 2019
(order 5); the 2020 sales exclude her regardless of the 2019 one.
Frank made one sale, in 2019 (order 3), but none in 2020, so he
qualifies.
```

Write your solution as a single `SELECT` query returning `seller_name`
for every seller with zero rows in `Orders` whose `sale_date` falls in
2020 — whether that seller has orders only outside 2020, or no orders at
all. Order the result by `seller_name` ascending.
