# Customer Purchasing Behavior Analysis

## Description

Table: `Transactions`

| Column Name      | Type    |
| ---------------- | ------- |
| transaction_id   | int     |
| customer_id      | int     |
| product_id       | int     |
| transaction_date | date    |
| amount           | decimal |

`transaction_id` is the unique identifier for this table.
Each row of this table contains information about a transaction,
including the customer ID, product ID, date, and amount spent.

Table: `Products`

| Column Name | Type    |
| ----------- | ------- |
| product_id  | int     |
| category    | varchar |
| price       | decimal |

`product_id` is the unique identifier for this table.
Each row of this table contains information about a product, including
its category and price.

Write a solution to analyze customer purchasing behavior. For each
customer, calculate:

- The total amount spent.
- The number of transactions.
- The number of unique product categories purchased.
- The average amount spent.
- The most frequently purchased product category (if there is a tie,
  choose the one with the most recent transaction).
- A loyalty score defined as: (Number of transactions * 10) + (Total
  amount spent / 100).

Round `total_amount`, `avg_transaction_amount`, and `loyalty_score` to 2
decimal places.

Return the result table ordered by `loyalty_score` in descending order,
then by `customer_id` in ascending order.

Each testcase's `dataset` seeds both tables: its script inserts the
testcase's `Transactions` rows and then its `Products` rows before your
query runs. Every `product_id` in `Transactions` appears in `Products`.
The result format is in the following example.

### Example 1

```text
Input: Transactions and Products tables from the dataset below.
Output:
customer_id  total_amount  transaction_count  unique_categories  avg_transaction_amount  top_category  loyalty_score
101          450.00        3                  3                  150.00                  C             34.50
102          300.00        2                  2                  150.00                  C             23.00
Explanation: for customer 101, total amount spent is
100.00 + 150.00 + 200.00 = 450.00 over 3 transactions covering the 3
unique categories A, B, and C, so the average transaction amount is
450.00 / 3 = 150.00; customer 101 made 1 purchase each in categories A,
B, and C, and since the count is the same for all categories, the most
recent transaction decides, which is category C on 2023-02-10; the
loyalty score is (3 * 10) + (450.00 / 100) = 34.50. For customer 102,
total amount spent is 100.00 + 200.00 = 300.00 over 2 transactions
covering the 2 unique categories A and C, so the average transaction
amount is 300.00 / 2 = 150.00; customer 102 made 1 purchase each in
categories A and C, and since the count is the same for both, the most
recent transaction decides, which is category C on 2023-01-22; the
loyalty score is (2 * 10) + (300.00 / 100) = 23.00.
```

Write your solution as a single `SELECT` query returning seven columns —
`customer_id`, `total_amount`, `transaction_count`, `unique_categories`,
`avg_transaction_amount`, `top_category`, and `loyalty_score` — one row
per customer who has at least one transaction.
