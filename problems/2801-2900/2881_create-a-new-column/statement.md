# Create a New Column

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

A company plans to provide its employees with a bonus.

Write a solution to create a new column name bonus that contains the
doubled values of the salary column.

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
| 1            | Piper   | 4548   |
| 2            | Grace   | 28150  |
| 3            | Georgia | 1103   |
| 4            | Willow  | 6593   |
| 5            | Finn    | 74576  |
| 6            | Thomas  | 24433  |
+--------------+---------+--------+
Output:
+---------+--------+--------+
| name    | salary | bonus  |
+---------+--------+--------+
| Piper   | 4548   | 9096   |
| Grace   | 28150  | 56300  |
| Georgia | 1103   | 2206   |
| Willow  | 6593   | 13186  |
| Finn    | 74576  | 149152 |
| Thomas  | 24433  | 48866  |
+---------+--------+--------+
Explanation:
A new column bonus is created by doubling the value in the column salary.
```

Write your solution as a single `SELECT` query returning exactly three
columns, `name` then `salary` then `bonus`, one row per employee, ordered
by ascending `row_position` — that is, in the same row order as the
original DataFrame.

## Hints

### Hint 1

Consider using the `[]` brackets with the new column name at the left side
of the assignment. The calculation of the value is done element-wise. In
SQL terms the assignment becomes a third SELECT-list entry:
`salary * 2 AS bonus` adds the column without touching the stored rows.
