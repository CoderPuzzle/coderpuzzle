# Bank Account Summary II

## Description

Table: `Users`

| Column Name | Type    |
| ----------- | ------- |
| account     | int     |
| name        | varchar |

`account` is the column with unique values for this table. Each row
holds the account number of a user of the bank. No two users share a
name.

Table: `Transactions`

| Column Name   | Type |
| ------------- | ---- |
| trans_id      | int  |
| account       | int  |
| amount        | int  |
| transacted_on | date |

`trans_id` is the column with unique values for this table. Each row
records a change made to an account: `amount` is positive when the
account received money and negative when it sent money out. Every
account starts at a balance of 0, so an account's current balance is
the sum of `amount` over all of its rows in `Transactions`.

Write a solution to report the `name` and `balance` of every account
whose balance is strictly greater than 10000.

Return the result table in any order.

Each testcase's `dataset` seeds both tables: its script inserts the
testcase's `Users` rows and, when present, its `Transactions` rows
before your query runs. The result format is in the following
example.

### Example 1

```text
Input:
Users table:
+------------+--------------+
| account    | name         |
+------------+--------------+
| 900001     | Alice        |
| 900002     | Bob          |
| 900003     | Charlie      |
+------------+--------------+
Transactions table:
+------------+------------+------------+---------------+
| trans_id   | account    | amount     | transacted_on |
+------------+------------+------------+---------------+
| 1          | 900001     | 7000       |  2020-08-01   |
| 2          | 900001     | 7000       |  2020-09-01   |
| 3          | 900001     | -3000      |  2020-09-02   |
| 4          | 900002     | 1000       |  2020-09-12   |
| 5          | 900003     | 6000       |  2020-08-07   |
| 6          | 900003     | 6000       |  2020-09-07   |
| 7          | 900003     | -4000      |  2020-09-11   |
+------------+------------+------------+---------------+
Output:
+------------+------------+
| name       | balance    |
+------------+------------+
| Alice      | 11000      |
+------------+------------+
Explanation:
Alice's balance is (7000 + 7000 - 3000) = 11000.
Bob's balance is 1000.
Charlie's balance is (6000 + 6000 - 4000) = 8000.
Only Alice's balance is greater than 10000, so only her row is
returned.
```

Write your solution as a single `SELECT` query returning `name` and
`balance`, one row for every account whose summed `amount` exceeds 10000. Accounts with no matching rows in `Transactions` have a
balance of 0 and never appear in the result.
