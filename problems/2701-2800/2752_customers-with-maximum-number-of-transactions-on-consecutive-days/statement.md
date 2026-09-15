# Customers with Maximum Number of Transactions on Consecutive Days

## Description

Table: `Transactions`

| Column Name      | Type |
| ---------------- | ---- |
| transaction_id   | int  |
| customer_id      | int  |
| transaction_date | date |
| amount           | int  |

transaction_id is the column with unique values of this table.
Each row contains information about transactions that includes unique (customer_id, transaction_date) along with the corresponding customer_id and amount.

Write a solution to find all customer_id who made the maximum number of transactions on consecutive days.

Return all customer_id with the maximum number of consecutive transactions. Order the result table by customer_id in ascending order.

Each testcase supplies its own `dataset`, whose statements insert all
rows into `Transactions` before the query runs. Transaction dates are
ISO `YYYY-MM-DD` calendar dates and no customer ever has two rows on
the same date. Consecutive days means adjacent calendar dates, rolling
over months and years included: 2023-12-31 and 2024-01-01 count as
consecutive, and in the non-leap year 2023 so do 2023-02-28 and
2023-03-01. A customer with a single transaction has a run of 1, so
when no customer has two adjacent dates every customer qualifies. The
result format is in the following example.

### Example 1

```text
Input:
Transactions table:
+----------------+-------------+------------------+--------+
| transaction_id | customer_id | transaction_date | amount |
+----------------+-------------+------------------+--------+
| 1              | 101         | 2023-05-01       | 100    |
| 2              | 101         | 2023-05-02       | 150    |
| 3              | 101         | 2023-05-03       | 200    |
| 4              | 102         | 2023-05-01       | 50     |
| 5              | 102         | 2023-05-03       | 100    |
| 6              | 102         | 2023-05-04       | 200    |
| 7              | 105         | 2023-05-01       | 100    |
| 8              | 105         | 2023-05-02       | 150    |
| 9              | 105         | 2023-05-03       | 200    |
+----------------+-------------+------------------+--------+
Output:
+-------------+
| customer_id |
+-------------+
| 101         |
| 105         |
+-------------+
Explanation:
- customer_id 101 has a total of 3 transactions, and all of them are consecutive.
- customer_id 102 has a total of 3 transactions, but only 2 of them are consecutive.
- customer_id 105 has a total of 3 transactions, and all of them are consecutive.
In total, the highest number of consecutive transactions is 3, achieved by customer_id 101 and 105. The customer_id are sorted in ascending order.
```

Write your solution as a single `SELECT` query returning `customer_id`
for every customer tied at the longest run, ordered ascending by
`customer_id` — the ordering is judged.

## Hints

### Hint 1

A customer's dates form runs of adjacent calendar days — the classic gaps-and-islands shape: partition rows by customer_id, order each partition by transaction_date, and LAG(transaction_date) over that frame tells whether the current row extends its predecessor's run (difference of exactly one day) or starts a new one.

### Hint 2

Compare dates as day numbers, not strings: julianday(transaction_date) maps ISO dates onto a continuous integer timeline, so the difference is exactly 1 precisely when the dates are adjacent — across month and year boundaries too, where naive string arithmetic breaks.

### Hint 3

Number the runs with a running SUM of the new-run flags, COUNT(*) per run to get each length, MAX per customer to get each customer's best, then keep the customers whose best equals the global MAX — ties survive, and ORDER BY customer_id ASC supplies the judged order.
