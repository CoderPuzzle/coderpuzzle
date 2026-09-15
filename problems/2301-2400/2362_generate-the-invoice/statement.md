# Generate the Invoice

## Description

Table: `Products`

| Column Name | Type |
| ----------- | ---- |
| product_id  | int  |
| price       | int  |

`product_id` contains unique values. Each row in this table shows the ID
of a product and the price of one unit.

Table: `Purchases`

| Column Name | Type |
| ----------- | ---- |
| invoice_id  | int  |
| product_id  | int  |
| quantity    | int  |

`(invoice_id, product_id)` is the primary key (combination of columns
with unique values) for this table. Each row in this table shows the
quantity ordered from one product in an invoice.

Write a solution to show the details of the invoice with the highest
price, where an invoice's price is the sum over its purchases of the
unit price times the quantity. If two or more invoices have the same
price, return the details of the one with the smallest `invoice_id`.

Return the result table in any order.

Each testcase supplies its own `dataset`: the DDL seeds the `Products`
and `Purchases` tables with that testcase's rows. Every purchase
references a product present in `Products`, so no join can drop a line,
while nothing requires the reverse — products never purchased simply
never appear. An invoice is whatever its purchases say it is: ids need
not be contiguous and arrive in no particular order. Write your solution
as a single `SELECT` query returning three columns — `product_id`,
`quantity`, and `price`, where `price` is the line's total (unit price
times quantity), not the unit price itself. The result format is in the
following example.

### Example 1

```text
Input:
Products table:
+------------+-------+
| product_id | price |
+------------+-------+
| 1          | 100   |
| 2          | 200   |
+------------+-------+
Purchases table:
+------------+------------+----------+
| invoice_id | product_id | quantity |
+------------+------------+----------+
| 1          | 1          | 2        |
| 3          | 2          | 1        |
| 2          | 2          | 3        |
| 2          | 1          | 4        |
| 4          | 1          | 10       |
+------------+------------+----------+
Output:
+------------+----------+-------+
| product_id | quantity | price |
+------------+----------+-------+
| 2          | 3        | 600   |
| 1          | 4        | 400   |
+------------+----------+-------+
Explanation:
Invoice 1: price = (2 * 100) = $200
Invoice 2: price = (4 * 100) + (3 * 200) = $1000
Invoice 3: price = (1 * 200) = $200
Invoice 4: price = (10 * 100) = $1000

The highest price is $1000, and the invoices with the highest prices are
2 and 4. We return the details of the one with the smallest ID, which is
invoice 2.
```
