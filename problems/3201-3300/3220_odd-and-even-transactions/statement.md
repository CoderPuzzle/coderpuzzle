# Odd and Even Transactions

## Description

Table: `Transactions`

| Column Name      | Type |
| ---------------- | ---- |
| transaction_id   | int  |
| amount           | int  |
| transaction_date | date |

The transactions_id column uniquely identifies each row in this table.
Each row of this table contains the transaction id, amount and transaction
date.

Write a solution to find the sum of amounts for odd and even transactions
for each day. If there are no odd or even transactions for a specific date,
display as 0.

Return the result table ordered by transaction_date in ascending order.

Each testcase supplies its own `dataset`: the DDL seeds the `Transactions`
table with that testcase's rows. A transaction is _odd_ when its `amount`
is odd and _even_ when its `amount` is even — parity classifies the amount,
not the `transaction_id` — so a day's `odd_sum` totals its odd amounts and
its `even_sum` totals its even ones, either side reading 0 when the day has
no transaction of that kind. Only days present in the table produce a row;
a calendar date with no transaction never appears in the result. The result
format is in the following example.

### Example 1

```text
Input: Transactions table from the dataset below.
Output:
transaction_date  odd_sum  even_sum
2024-07-01        75       350
2024-07-02        0        350
2024-07-03        0        120
Explanation: on 2024-07-01 the odd amounts total 75 (the transaction whose
amount is 75) and the even amounts total 150 + 200 = 350; 2024-07-02 has
only even amounts, 300 + 50 = 350, so its odd_sum reads 0; 2024-07-03
carries the single even amount 120, so its odd_sum reads 0 and its
even_sum reads 120.
```

Write your solution as a single `SELECT` query returning three columns —
`transaction_date`, `odd_sum`, and `even_sum` — one row per day present in
the table, ordered by `transaction_date` ascending.
