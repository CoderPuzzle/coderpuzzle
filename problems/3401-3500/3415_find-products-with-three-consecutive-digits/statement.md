# Find Products with Three Consecutive Digits

## Description

Table: `Products`

| Column Name | Type    |
| ----------- | ------- |
| product_id  | int     |
| name        | varchar |

`product_id` is the unique key for this table.
Each row of this table contains the ID and name of a product.

Write a solution to find all products whose names contain a sequence of
exactly three consecutive digits in a row.

Return the result table ordered by product_id in ascending order.

The result format is in the following example.

Note that the name may contain multiple such sequences, but each should
have length three.

### Example 1

```text
Input:
Products table:
+-------------+--------------------+
| product_id  | name               |
+-------------+--------------------+
| 1           | ABC123XYZ          |
| 2           | A12B34C            |
| 3           | Product56789       |
| 4           | NoDigitsHere       |
| 5           | 789Product         |
| 6           | Item003Description |
| 7           | Product12X34       |
+-------------+--------------------+
Output:
+-------------+--------------------+
| product_id  | name               |
+-------------+--------------------+
| 1           | ABC123XYZ          |
| 5           | 789Product         |
| 6           | Item003Description |
+-------------+--------------------+
Explanation: Product 1: ABC123XYZ contains the digits 123.
Product 5: 789Product contains the digits 789.
Product 6: Item003Description contains 003, which is exactly three digits.
Note:
Results are ordered by product_id in ascending order.
Only products with exactly three consecutive digits in their names are
included in the result.
```

Write your solution as a single `SELECT` query returning the `product_id`
and `name` of every qualifying product, ordered by `product_id` in
ascending order. A name qualifies when it contains at least one maximal
run of digits and every maximal run of digits in it has length exactly
three — so `123x456y` qualifies while `123x4567y`, `1x234`, and
`Product56789` do not. Each testcase supplies its own `dataset`: the
script seeds the `Products` table before your query runs.
