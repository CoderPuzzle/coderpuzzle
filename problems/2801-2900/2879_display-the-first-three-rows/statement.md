# Display the First Three Rows

## Description

Table: `Employees`

| Column Name  | Type |
| ------------ | ---- |
| row_position | int  |
| employee_id  | int  |
| name         | text |
| department   | text |
| salary       | int  |

row_position is the primary key for this table.

The frame this problem displays is a pandas `employees` DataFrame with the
four data columns `employee_id` (int), `name` (object), `department`
(object), and `salary` (int), read in a fixed row order. Each row of the
`Employees` table holds one row of that frame — its employee_id, name,
department, and salary — together with the row's 1-based position in the
frame, so the frame's row order survives the seeding.

Write a solution to display the first 3 rows of this DataFrame.

Each testcase supplies its own `dataset`: the script seeds the `Employees`
table with that testcase's DataFrame rows before your query runs. The
result format is in the following example.

### Example 1

```text
Input:
Employees table:
+---------------+-------------+-----------+-----------------------+--------+
| row_position  | employee_id | name      | department            | salary |
+---------------+-------------+-----------+-----------------------+--------+
| 1             | 3           | Bob       | Operations            | 48675  |
| 2             | 90          | Alice     | Sales                 | 11096  |
| 3             | 9           | Tatiana   | Engineering           | 33805  |
| 4             | 60          | Annabelle | InformationTechnology | 37678  |
| 5             | 49          | Jonathan  | HumanResources        | 23793  |
| 6             | 43          | Khaled    | Administration        | 40454  |
+---------------+-------------+-----------+-----------------------+--------+
Output:
+-------------+---------+-------------+--------+
| employee_id | name    | department  | salary |
+-------------+---------+-------------+--------+
| 3           | Bob     | Operations  | 48675  |
| 90          | Alice   | Sales       | 11096  |
| 9           | Tatiana | Engineering | 33805  |
+-------------+---------+-------------+--------+
Explanation:
Only the first 3 rows are displayed.
```

Write your solution as a single `SELECT` query returning exactly four
columns, `employee_id`, `name`, `department`, then `salary`: the frame's
first three rows in their original row order — all of the frame's rows
when there are fewer than three.

## Hints

### Hint 1

Consider using a built-in function in pandas library to retrieve the
initial rows. In SQL the counterpart is the row limiter: `LIMIT 3` keeps
exactly the first three rows of an ordered scan, and lets fewer through
when the frame has fewer.
