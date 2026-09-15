# Find Loyal Customers

## Description

Table: `customer_transactions`

| Column Name      | Type    |
| ---------------- | ------- |
| transaction_id   | int     |
| customer_id      | int     |
| transaction_date | date    |
| amount           | decimal |
| transaction_type | varchar |

`transaction_id` is the unique ID for this table. Each row records one
transaction a customer made with the business; `transaction_type` is
either `'purchase'` or `'refund'`.

A customer is **loyal** when all of the following criteria hold:

- They made at least 3 purchase transactions.
- They have been active for at least 30 days — the number of days
  between their earliest and latest transaction dates is at least 30.
- Their refund rate is less than 20%. The refund rate is the proportion
  of transactions that are refunds: the number of refund transactions
  divided by the total number of transactions, purchases and refunds
  alike.

Return the result table ordered by `customer_id` in ascending order.

Each testcase supplies its own `dataset`: its statements fill the table
before your query runs. The result format is shown in the following
example.

### Example 1

```text
Input: the customer_transactions table from the dataset below.
transaction_id | customer_id | transaction_date | amount | transaction_type
1              | 101         | 2024-01-05       | 150.00 | purchase
2              | 101         | 2024-01-15       | 200.00 | purchase
3              | 101         | 2024-02-10       | 180.00 | purchase
4              | 101         | 2024-02-20       | 250.00 | purchase
5              | 102         | 2024-01-10       | 100.00 | purchase
6              | 102         | 2024-01-12       | 120.00 | purchase
7              | 102         | 2024-01-15       | 80.00  | refund
8              | 102         | 2024-01-18       | 90.00  | refund
9              | 102         | 2024-02-15       | 130.00 | purchase
10             | 103         | 2024-01-01       | 500.00 | purchase
11             | 103         | 2024-01-02       | 450.00 | purchase
12             | 103         | 2024-01-03       | 400.00 | purchase
13             | 104         | 2024-01-01       | 200.00 | purchase
14             | 104         | 2024-02-01       | 250.00 | purchase
15             | 104         | 2024-02-15       | 300.00 | purchase
16             | 104         | 2024-03-01       | 350.00 | purchase
17             | 104         | 2024-03-10       | 280.00 | purchase
18             | 104         | 2024-03-15       | 100.00 | refund
Output:
customer_id
101
104
Explanation: Customer 101 made 4 purchases and no refunds, so the
refund rate is 0/4 = 0%, under the 20% bar, and their activity runs
from Jan 5 to Feb 20 — 46 days, over the 30-day floor. All three
criteria hold, so 101 is loyal. Customer 102 made 3 purchases and 2
refunds, so the refund rate is 2/5 = 40% and they miss the rate test
however loyal the rest of their record looks. Customer 103 cleared the
rate test at 0/3 = 0% but was active only from Jan 1 to Jan 3 — 2 days,
under the floor. Customer 104 made 5 purchases and 1 refund, so the
refund rate is 1/6 = 16.67%, under 20%, and their activity runs from
Jan 1 to Mar 15 — 73 days. They qualify alongside 101.
```

Answer with one `SELECT` whose output column is `customer_id`.
