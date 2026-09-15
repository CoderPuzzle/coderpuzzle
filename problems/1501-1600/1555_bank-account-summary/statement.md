# Bank Account Summary

## Description

Table: `Users`

| Column Name | Type    |
| ----------- | ------- |
| user_id     | int     |
| user_name   | varchar |
| credit      | int     |

`user_id` is the column with unique values for this table. Each row
holds a user's starting credit balance, before any transactions are
applied.

Table: `Transactions`

| Column Name   | Type |
| ------------- | ---- |
| trans_id      | int  |
| paid_by       | int  |
| paid_to       | int  |
| amount        | int  |
| transacted_on | date |

`trans_id` is the column with unique values for this table. Each row
records a transfer of `amount` from the user with id `paid_by` to the
user with id `paid_to`, dated `transacted_on`.

The bank wants a summary of every user's current balance once all
transactions have been applied, along with a flag marking whether
that balance has dropped below zero.

Write a solution to report, for every user in `Users`, the
`user_id`, `user_name`, the user's current `credit` (the starting
credit plus everything the user received minus everything the user
paid), and `credit_limit_breached` — `"Yes"` if that current credit
is less than 0, `"No"` otherwise.

Return the result table in any order.

Each testcase supplies its own `dataset`, which seeds both tables.
The result format is in the following example.

### Example 1

```text
Input:
Users table:
+------------+--------------+-------------+
| user_id    | user_name    | credit      |
+------------+--------------+-------------+
| 1          | Moustafa     | 100         |
| 2          | Jonathan     | 200         |
| 3          | Winston      | 10000       |
| 4          | Luis         | 800         |
+------------+--------------+-------------+
Transactions table:
+------------+------------+------------+----------+---------------+
| trans_id   | paid_by    | paid_to    | amount   | transacted_on |
+------------+------------+------------+----------+---------------+
| 1          | 1          | 3          | 400      | 2020-08-01    |
| 2          | 3          | 2          | 500      | 2020-08-02    |
| 3          | 2          | 1          | 200      | 2020-08-03    |
+------------+------------+------------+----------+---------------+
Output:
+------------+------------+------------+-----------------------+
| user_id    | user_name  | credit     | credit_limit_breached |
+------------+------------+------------+-----------------------+
| 1          | Moustafa   | -100       | Yes                   |
| 2          | Jonathan   | 500        | No                    |
| 3          | Winston    | 9900       | No                    |
| 4          | Luis       | 800        | No                    |
+------------+------------+------------+-----------------------+
Explanation:
Moustafa paid $400 on 2020-08-01 and received $200 on 2020-08-03, so
credit = 100 - 400 + 200 = -$100.
Jonathan received $500 on 2020-08-02 and paid $200 on 2020-08-03, so
credit = 200 + 500 - 200 = $500.
Winston received $400 on 2020-08-01 and paid $500 on 2020-08-02, so
credit = 10000 + 400 - 500 = $9900.
Luis was not part of any transaction, so credit stays $800.
```

Write your solution as a single `SELECT` query returning `user_id`,
`user_name`, `credit`, and `credit_limit_breached`, one row for every
user in `Users`.
