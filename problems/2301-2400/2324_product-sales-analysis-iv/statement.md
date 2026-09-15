# Product Sales Analysis IV

## Description

Table: `Sales`

| Column Name | Type |
| ----------- | ---- |
| sale_id     | int  |
| product_id  | int  |
| user_id     | int  |
| quantity    | int  |

`sale_id` contains unique values.
`product_id` is a foreign key (reference column) to the `Product` table.
Each row of this table shows the ID of the product and the quantity
purchased by a user.

Table: `Product`

| Column Name | Type |
| ----------- | ---- |
| product_id  | int  |
| price       | int  |

`product_id` contains unique values.
Each row of this table indicates the price of each product.

Write a solution that reports for each user the product id on which the
user spent the most money. In case the same user spent the most money on
two or more products, report all of them.

Return the resulting table in any order.

Each testcase supplies its own `dataset`: the DDL seeds the `Sales` and
`Product` tables with that testcase's rows. A user's spending on a
product pools every one of their sales rows of that product into one
total — the sum of `quantity * price` over those rows — before anything
is compared, so several modest purchases can outspend a single larger
one. Every user appearing in `Sales` buys at least one priced product
and receives at least one answer row; products that were never bought
belong to no user's totals and appear in none. Write your solution as a
single `SELECT` query returning two columns — `user_id` and
`product_id` — reporting all of a user's top-spending products whenever
their maximum is reached on more than one. The result format is in the
following example.

### Example 1

```text
Input:
Sales table:
+---------+------------+---------+----------+
| sale_id | product_id | user_id | quantity |
+---------+------------+---------+----------+
| 1       | 1          | 101     | 10       |
| 2       | 3          | 101     | 7        |
| 3       | 1          | 102     | 9        |
| 4       | 2          | 102     | 6        |
| 5       | 3          | 102     | 10       |
| 6       | 1          | 102     | 6        |
+---------+------------+---------+----------+
Product table:
+------------+-------+
| product_id | price |
+------------+-------+
| 1          | 10    |
| 2          | 25    |
| 3          | 15    |
+------------+-------+
Output:
+---------+------------+
| user_id | product_id |
+---------+------------+
| 101     | 3          |
| 102     | 1          |
| 102     | 2          |
| 102     | 3          |
+---------+------------+
Explanation:
User 101:
    - Spent 10 * 10 = 100 on product 1.
    - Spent 7 * 15 = 105 on product 3.
User 101 spent the most money on product 3.
User 102:
    - Spent (9 + 6) * 10 = 150 on product 1.
    - Spent 6 * 25 = 150 on product 2.
    - Spent 10 * 15 = 150 on product 3.
User 102 spent the most money on products 1, 2, and 3.
```
