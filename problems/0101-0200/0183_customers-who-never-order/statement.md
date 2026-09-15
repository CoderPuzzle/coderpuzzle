# Customers Who Never Order

## Description

Table: `Customers`

| Column Name | Type    |
| ----------- | ------- |
| id          | int     |
| name        | varchar |

`id` is the primary key (column with unique values) for this table. Each
row of this table indicates the ID and name of a customer.

Table: `Orders`

| Column Name | Type |
| ----------- | ---- |
| id          | int  |
| customerId  | int  |

`id` is the primary key (column with unique values) for this table.
`customerId` is a foreign key (reference columns) of the ID from the
`Customers` table. Each row of this table indicates the ID of an order and
the ID of the customer who ordered it.

Write a solution to find all customers who never order anything.

Return the result table in any order.

Each testcase's `dataset` seeds both tables: its script inserts the
testcase's `Customers` rows and, when present, its `Orders` rows before your
query runs. The result format is in the following example.

### Example 1

```text
Input: Customers and Orders tables from the dataset below.
Output:
Customers
Henry
Max
Explanation: Joe with Id = 1 and Sam with Id = 3 have orders; Henry with
Id = 2 and Max with Id = 4 do not have any, so exactly their names are
reported.
```

Write your solution as a single `SELECT` query returning one column —
`Customers`, the name of every customer who never orders anything.

## Hints

### Hint 1

A customer who never orders is a `Customers` row with no match in `Orders` — `Customers c LEFT JOIN Orders o ON c.id = o.customerId` keeps every customer, and the unmatched ones come back with null in the `Orders` columns.

### Hint 2

Keep the unmatched rows with `WHERE o.id IS NULL`: `Orders.id` is that table's primary key, so it is null exactly when the join found no order for that customer.

### Hint 3

No deduplication and no empty-case handling anywhere: a customer with several orders produces several matched rows, every one of them non-null and filtered out, and when every customer orders the filter keeps nothing — zero rows is the answer.
