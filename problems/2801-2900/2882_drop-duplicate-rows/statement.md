# Drop Duplicate Rows

## Description

Table: `customers`

| Column Name | Type   |
| ----------- | ------ |
| customer_id | int    |
| name        | object |
| email       | object |

There are some duplicate rows in the table based on the email column.

Write a solution to remove these duplicate rows and keep only the first
occurrence.

Each testcase supplies its own `dataset`: the script seeds the `customers`
table with that testcase's rows before your query runs. Rows are seeded in
ascending `customer_id` order and every `customer_id` in a dataset is
distinct, so the first occurrence of an email is precisely its row with the
smallest `customer_id`. Emails are duplicates only when they match exactly —
the comparison is case-sensitive.

The result format is in the following example.

### Example 1

```text
Input:
+-------------+---------+---------------------+
| customer_id | name    | email               |
+-------------+---------+---------------------+
| 1           | Ella    | emily@example.com   |
| 2           | David   | michael@example.com |
| 3           | Zachary | sarah@example.com   |
| 4           | Alice   | john@example.com    |
| 5           | Finn    | john@example.com    |
| 6           | Violet  | alice@example.com   |
+-------------+---------+---------------------+
Output:
+-------------+---------+---------------------+
| customer_id | name    | email               |
+-------------+---------+---------------------+
| 1           | Ella    | emily@example.com   |
| 2           | David   | michael@example.com |
| 3           | Zachary | sarah@example.com   |
| 4           | Alice   | john@example.com    |
| 6           | Violet  | alice@example.com   |
+-------------+---------+---------------------+
Explanation:
Alic (customer_id = 4) and Finn (customer_id = 5) both use john@example.com, so only the first occurrence of this email is retained.
```

Write your solution as a single `SELECT` query returning all three columns,
`customer_id`, `name`, `email`, holding exactly the rows that remain once
each duplicated email has been dropped to its first occurrence, ordered by
`customer_id` ascending.

## Hints

### Hint 1

Consider using a build-in aggregate function to remove the duplicate rows
based on specified data.
