# Method Chaining

## Description

DataFrame `animals`:

| Column Name | Type   |
| ----------- | ------ |
| name        | object |
| species     | object |
| age         | int    |
| weight      | int    |

Write a solution to list the names of animals that weigh strictly more
than 100 kilograms.

Return the animals sorted by weight in descending order.

Each testcase supplies its own `dataset`: the script seeds the `animals`
table with that testcase's rows before your query runs. Weights within a
dataset are distinct, so the required descending order is unique.

The result format is in the following example.

### Example 1

```text
Input:
DataFrame animals:
+----------+---------+-----+--------+
| name     | species | age | weight |
+----------+---------+-----+--------+
| Tatiana  | Snake   | 98  | 464    |
| Khaled   | Giraffe | 50  | 41     |
| Alex     | Leopard | 6   | 328    |
| Jonathan | Monkey  | 45  | 463    |
| Stefan   | Bear    | 100 | 50     |
| Tommy    | Panda   | 26  | 349    |
+----------+---------+-----+--------+
Output:
+----------+
| name     |
+----------+
| Tatiana  |
| Jonathan |
| Tommy    |
| Alex     |
+----------+
Explanation:
All animals weighing more than 100 should be included in the results table.
Tatiana's weight is 464, Jonathan's weight is 463, Tommy's weight is 349, and Alex's weight is 328.
The results should be sorted in descending order of weight.
```

In Pandas, method chaining enables us to perform operations on a DataFrame
without breaking up each operation into a separate line or creating
multiple temporary variables.

Write your solution as a single `SELECT` query returning exactly one
column, `name`, holding the names of the animals whose `weight` is
strictly greater than 100 — an animal weighing exactly 100 is excluded —
ordered by `weight` from heaviest to lightest. That one statement is the
SQL counterpart of the method-chained one-liner: `WHERE weight > 100` does
the row filtering and `ORDER BY weight DESC` does the sort.
