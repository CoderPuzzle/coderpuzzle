# Sales Person

## Description

Table: `SalesPerson`

| Column Name     | Type    |
| --------------- | ------- |
| sales_id        | int     |
| name            | varchar |
| salary          | int     |
| commission_rate | int     |
| hire_date       | date    |

`sales_id` is the primary key (column with unique values) for this table.
Each row of this table indicates the name and the ID of a salesperson
alongside their salary, commission rate, and hire date.

Table: `Company`

| Column Name | Type    |
| ----------- | ------- |
| com_id      | int     |
| name        | varchar |
| city        | varchar |

`com_id` is the primary key (column with unique values) for this table.
Each row of this table indicates the name and the ID of a company and the
city in which the company is located.

Table: `Orders`

| Column Name | Type |
| ----------- | ---- |
| order_id    | int  |
| order_date  | date |
| com_id      | int  |
| sales_id    | int  |
| amount      | int  |

`order_id` is the primary key (column with unique values) for this table.
`com_id` is a foreign key (reference column) to `com_id` from the
`Company` table.
`sales_id` is a foreign key (reference column) to `sales_id` from the
`SalesPerson` table.
Each row of this table contains information about one order. This
includes the ID of the company, the ID of the salesperson, the date of
the order, and the amount paid.

Write a solution to find the names of all the salespersons who did not
have any orders related to the company with the name `"RED"`.

Return the result table in any order.

Each testcase's `dataset` seeds all three tables: its script inserts the
testcase's `SalesPerson` rows, its `Company` rows, and, when present,
its `Orders` rows before your query runs. The result format is in the
following example.

### Example 1

```text
Input: the SalesPerson, Company, and Orders tables from the dataset below.
Output:
name
Amy
Mark
Alex
Explanation: orders 3 and 4 are the only orders at company RED (com_id 1),
placed by salespersons John and Pam, so every other salesperson is
reported.
```

Write your solution as a single `SELECT` query returning one column —
`name` — with one row for every salesperson who has no order at the
company named RED.

## Hints

### Hint 1

Exclusion flows through exactly one path — an `Orders` row: a salesperson is tied to RED precisely when some order carries their `sales_id` and the `com_id` of a company whose name is RED. Build that set of sales_ids first — join `Orders` to `Company` on `com_id` and keep `Company.name = 'RED'` — and the answer is everyone outside it.

### Hint 2

The complement needs no special case for the order-less: `sales_id NOT IN (...)` keeps any salesperson whose id appears nowhere in the exclusion set, and having no orders at all is the purest way to appear nowhere. One RED order is already enough to exclude — membership, not count, is what matters.

### Hint 3

Select from `SalesPerson`, never from `Orders`: each salesperson is one row of the base table, so duplicates cannot arise no matter how many orders they placed. The company match is exact and case-sensitive — a company `red` or `REDS` is a different company — and the judge compares rows as an unordered multiset, so no `ORDER BY` is needed.
