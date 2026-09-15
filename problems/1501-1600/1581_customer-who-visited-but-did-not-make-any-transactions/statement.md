# Customer Who Visited but Did Not Make Any Transactions

## Description

Table: `Visits`

| Column Name | Type |
| ----------- | ---- |
| visit_id    | int  |
| customer_id | int  |

`visit_id` is the column with unique values for this table. This table
contains information about the customers who visited the mall.

Table: `Transactions`

| Column Name    | Type |
| -------------- | ---- |
| transaction_id | int  |
| visit_id       | int  |
| amount         | int  |

`transaction_id` is the column with unique values for this table. This
table contains information about the transactions made during the
`visit_id`.

Write a solution to find the IDs of the customers who visited without
making any transactions and the number of times they made these types of
visits.

Return the result table sorted in any order.

Each testcase's `dataset` seeds both tables: its script inserts the
testcase's `Visits` rows and, when present, its `Transactions` rows before
your query runs. The result format is in the following example.

### Example 1

```text
Input:
Visits
+----------+-------------+
| visit_id | customer_id |
+----------+-------------+
| 1        | 23          |
| 2        | 9           |
| 4        | 30          |
| 5        | 54          |
| 6        | 96          |
| 7        | 54          |
| 8        | 54          |
+----------+-------------+
Transactions
+----------------+----------+--------+
| transaction_id | visit_id | amount |
+----------------+----------+--------+
| 2              | 5        | 310    |
| 3              | 5        | 300    |
| 9              | 5        | 200    |
| 12             | 1        | 910    |
| 13             | 2        | 970    |
+----------------+----------+--------+
Output:
+-------------+----------------+
| customer_id | count_no_trans |
+-------------+----------------+
| 54          | 2              |
| 30          | 1              |
| 96          | 1              |
+-------------+----------------+
Explanation:
Customer 23 visited once and made a transaction (id 12) on that visit.
Customer 9 visited once and made a transaction (id 13) on that visit.
Customer 30 visited once and made no transaction.
Customer 54 visited three times: visit 5 carries three transactions, so
it does not count, while visits 7 and 8 carry none, so they do — two
no-transaction visits.
Customer 96 visited once and made no transaction.
So customers 30 and 96 each contribute one no-transaction visit, and
customer 54 contributes two.
```

Write your solution as a single `SELECT` query returning `customer_id`
and `count_no_trans`, one row for every customer with at least one visit
that has no matching row in `Transactions`. `count_no_trans` is the
number of such visits for that customer; a visit is excluded from the
count as soon as it has one or more transactions, however many it has.
Customers whose every visit has a transaction do not appear in the
result at all.
