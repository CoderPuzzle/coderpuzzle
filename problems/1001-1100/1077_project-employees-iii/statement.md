# Project Employees III

## Description

Table: `Project`

| Column Name | Type |
| ----------- | ---- |
| project_id  | int  |
| employee_id | int  |

`(project_id, employee_id)` is the primary key (combination of columns
with unique values) of this table.
`employee_id` is a foreign key (reference column) to `Employee` table.
Each row of this table indicates that the employee with `employee_id`
is working on the project with `project_id`.

Table: `Employee`

| Column Name      | Type    |
| ---------------- | ------- |
| employee_id      | int     |
| name             | varchar |
| experience_years | int     |

`employee_id` is the primary key (column with unique values) of this
table. Each row of this table contains information about one employee.

Write a solution to report the most experienced employees in each
project. In case of a tie, report all employees with the maximum
number of experience years.

Return the result table in any order.

Each testcase's `dataset` seeds the `Project` and `Employee` tables:
its script inserts the testcase's rows before your query runs. The
query result format is in the following example.

### Example 1

```text
Input:
Project table:
+-------------+-------------+
| project_id  | employee_id |
+-------------+-------------+
| 1           | 1           |
| 1           | 2           |
| 1           | 3           |
| 2           | 1           |
| 2           | 4           |
+-------------+-------------+
Employee table:
+-------------+--------+------------------+
| employee_id | name   | experience_years |
+-------------+--------+------------------+
| 1           | Khaled | 3                |
| 2           | Ali    | 2                |
| 3           | John   | 3                |
| 4           | Doe    | 2                |
+-------------+--------+------------------+
Output:
+-------------+---------------+
| project_id  | employee_id   |
+-------------+---------------+
| 1           | 1             |
| 1           | 3             |
| 2           | 1             |
+-------------+---------------+
Explanation: Both employees with id 1 and 3 have the most experience
among the employees of the first project. For the second project, the
employee with id 1 has the most experience.
```

Write your solution as a single `SELECT` query returning `project_id`
and `employee_id` for the most experienced employee(s) of every
project, in any order.
