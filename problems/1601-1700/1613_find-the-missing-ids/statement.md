# Find the Missing IDs

## Description

Table: `Customers`

| Column Name   | Type    |
| ------------- | ------- |
| customer_id   | int     |
| customer_name | varchar |

`customer_id` is the column with unique values for this table. Each row
of this table contains the name and the id of a customer.

Write a solution to find the missing customer IDs. The missing IDs are
ones that are not in the `Customers` table but fall in the range between
1 and the maximum `customer_id` present in the table — the range always
starts at 1, regardless of how large the smallest `customer_id` in the
table is.

The maximum `customer_id` will not exceed 100.

Each testcase's `dataset` seeds the `Customers` table with that
testcase's rows. Return the result table ordered by `ids` in ascending
order. The result format is in the following example.

### Example 1

```text
Input:
Customers table:
+-------------+---------------+
| customer_id | customer_name |
+-------------+---------------+
| 1           | Alice         |
| 4           | Bob           |
| 5           | Charlie       |
+-------------+---------------+
Output:
+-----+
| ids |
+-----+
| 2   |
| 3   |
+-----+
Explanation:
The maximum customer_id present in the table is 5, so in the range
[1,5], IDs 2 and 3 are missing from the table.
```

Write your solution as a single `SELECT` query returning one column
`ids` — every integer in `[1, MAX(customer_id)]` that does not appear as
a `customer_id` in `Customers`. Order the result by `ids` ascending.
