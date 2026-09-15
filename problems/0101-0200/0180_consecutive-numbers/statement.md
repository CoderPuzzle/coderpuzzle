# Consecutive Numbers

## Description

Table: `Logs`

| Column Name | Type    |
| ----------- | ------- |
| id          | int     |
| num         | varchar |

In SQL, `id` is the primary key for this table. `id` is an autoincrement
column starting from 1.

Find all numbers that appear at least three times consecutively.

Return the result table in any order.

Each testcase supplies its own `dataset`: the DDL seeds the `Logs` table
with that testcase's rows. The result format is in the following example.

### Example 1

```text
Input: Logs table from the dataset below.
Output:
ConsecutiveNums
1
Explanation: 1 is the only number that appears consecutively for at least
three times.
```

Write your solution as a single `SELECT` query returning one column,
`ConsecutiveNums`: every number that appears at least three times in a row
at consecutive ids, each such number once.

## Hints

### Hint 1

"Consecutively" means at consecutive ids: some three rows with ids k, k + 1, k + 2. Three aliases of Logs — l1, l2, l3 — line exactly those triples up through l1.id = l2.id - 1 AND l2.id = l3.id - 1.

### Hint 2

The values must agree across the whole window: AND l1.num = l2.num AND l2.num = l3.num. Equality chains transitively, so testing the two adjacent pairs fixes all three values at once.

### Hint 3

A run of four or more contains several overlapping triples, and one number can qualify in several separate runs — DISTINCT collapses every match of the same number into a single row.
