# Customer Placing the Largest Number of Orders

## Description

Table: `Orders`

| Column Name     | Type |
| --------------- | ---- |
| order_number    | int  |
| customer_number | int  |

`order_number` is the primary key (column with unique values) for this
table. Each row of this table contains information about the order ID and
the customer ID.

Write a solution to find the `customer_number` for the customer who has
placed the largest number of orders.

The test cases are generated so that exactly one customer will have
placed more orders than any other customer.

Each testcase supplies its own `dataset`: the DDL seeds the `Orders`
table with that testcase's rows. The result format is in the following
example.

### Example 1

```text
Input: Orders table from the dataset below.
Output:
customer_number
3
Explanation: customer 3 placed two orders, more than customers 1 and 2,
who placed one order each; the customer placing the largest number of
orders is customer 3.
```

Write your solution as a single `SELECT` query returning one column —
`customer_number` — and exactly one row, the customer who placed the
largest number of orders.

Follow up: what if more than one customer had placed the largest number
of orders — could you find all the `customer_number` values then?

## Hints

### Hint 1

Count before you pick: GROUP BY customer_number collapses each customer's rows into one group, and because every Orders row is one placed order, that group's COUNT(*) is exactly the customer's order total.

### Hint 2

Rank the groups by size and keep the top: ORDER BY COUNT(*) DESC sorts customers by order total descending and LIMIT 1 keeps the largest group — its customer_number is the answer.

### Hint 3

The guarantee does the tie-breaking: exactly one customer places more orders than any other, so the top group is unique and LIMIT 1 returns that customer alone — no tie-break key is needed. COUNT is order-independent, so order_number values and insertion order never matter.
