# Products With Three or More Orders in Two Consecutive Years

## Description

Table: `Orders`

| Column Name   | Type |
| ------------- | ---- |
| order_id      | int  |
| product_id    | int  |
| quantity      | int  |
| purchase_date | date |

`order_id` contains unique values.
Each row in this table contains the ID of an order, the id of the product
purchased, the quantity, and the purchase date.

Write a solution to report the IDs of all the products that were ordered
three or more times in two consecutive years.

Return the result table in any order.

Each testcase supplies its own `dataset`: the DDL seeds the `Orders`
table with that testcase's rows. The result format is in the following
example.

### Example 1

```text
Input:
Orders table:
+----------+------------+----------+---------------+
| order_id | product_id | quantity | purchase_date |
+----------+------------+----------+---------------+
| 1        | 1          | 7        | 2020-03-16    |
| 2        | 1          | 4        | 2020-12-02    |
| 3        | 1          | 7        | 2020-05-10    |
| 4        | 1          | 6        | 2021-12-23    |
| 5        | 1          | 5        | 2021-05-21    |
| 6        | 1          | 6        | 2021-10-11    |
| 7        | 2          | 6        | 2022-10-11    |
+----------+------------+----------+---------------+
Output:
+------------+
| product_id |
+------------+
| 1          |
+------------+
Explanation:
Product 1 was ordered in 2020 three times and in 2021 three times. Since
it was ordered three times in two consecutive years, we include it in
the answer.
Product 2 was ordered one time in 2022. We do not include it in the
answer.
```

A product qualifies when some year y and the following year y + 1 each
contain at least three of its orders. Orders are counted one per row of
the table, taken by the calendar year of `purchase_date` alone — the
month, day and `quantity` play no part — so even orders on adjacent days
belong to whatever years they are dated in. The bar clears on exactly
three orders in both years, and a pair of qualifying counts sitting in
years that are not adjacent (three orders in 2020 and three in 2022,
with only two in 2021) does not qualify. A product may clear the bar
through several adjacent pairs at once when it is heavily ordered
across three or more straight years; report each qualifying product's
ID once. Write your solution as a single `SELECT` query returning one
column — `product_id` — with one row for every product that qualifies,
in any order.
