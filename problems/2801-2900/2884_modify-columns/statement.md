# Modify Columns

## Description

Table: `employees`

| Column Name  | Type   |
| ------------ | ------ |
| row_position | int    |
| name         | object |
| salary       | int    |

row_position is the primary key for this table.
Each row of this table holds one employee of the frame: their name and
salary, together with the employee's 1-based position in it.

A company intends to give its employees a pay rise.

Write a solution to modify the salary column by multiplying each salary by 2.

Each testcase supplies its own `dataset`: the script seeds the `employees`
table with that testcase's rows before your query runs.

The result format is in the following example.

### Example 1

```text
Input:
employees table:
+--------------+---------+--------+
| row_position | name    | salary |
+--------------+---------+--------+
| 1            | Jack    | 19666  |
| 2            | Piper   | 74754  |
| 3            | Mia     | 62509  |
| 4            | Ulysses | 54866  |
+--------------+---------+--------+
Output:
+---------+--------+
| name    | salary |
+---------+--------+
| Jack    | 39332  |
| Piper   | 149508 |
| Mia     | 125018 |
| Ulysses | 109732 |
+---------+--------+
Explanation:
Every salary has been doubled.
```

Write your solution as a single `SELECT` query returning exactly two
columns, `name` then `salary`, one row per employee, ordered by ascending
`row_position` — that is, in the same row order as the original DataFrame.
The `salary` output column carries the modified values: each employee's
stored salary is replaced by its doubled value.

## Hints

### Hint 1

Considering multiplying each salary value by 2, using a simple assignment
operation. The calculation of the value is done column-wise. In SQL terms
the assignment becomes the SELECT-list entry `salary * 2 AS salary`, which
redefines the column in the output while the stored rows stay untouched.
