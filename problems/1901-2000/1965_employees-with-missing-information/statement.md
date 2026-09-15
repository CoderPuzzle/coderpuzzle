# Employees With Missing Information

## Description

Table: `Employees`

| Column Name | Type    |
| ----------- | ------- |
| employee_id | int     |
| name        | varchar |

`employee_id` is the column with unique values for this table.
Each row of this table indicates the name of the employee whose ID is
`employee_id`.

Table: `Salaries`

| Column Name | Type |
| ----------- | ---- |
| employee_id | int  |
| salary      | int  |

`employee_id` is the column with unique values for this table.
Each row of this table indicates the salary of the employee whose ID is
`employee_id`.

Write a solution to report the IDs of all the employees with missing
information. The information of an employee is missing if:

- The employee's name is missing, or
- The employee's salary is missing.

Return the result table ordered by `employee_id` in ascending order.

Each testcase supplies its own `dataset`: the DDL seeds the `Employees` and
`Salaries` tables with that testcase's rows. The result format is shown in
the following example.

### Example 1

```text
Input:
Employees table:
+-------------+----------+
| employee_id | name     |
+-------------+----------+
| 2           | Crew     |
| 4           | Haven    |
| 5           | Kristian |
+-------------+----------+
Salaries table:
+-------------+--------+
| employee_id | salary |
+-------------+--------+
| 5           | 76071  |
| 1           | 22517  |
| 4           | 63539  |
+-------------+--------+
Output:
+-------------+
| employee_id |
+-------------+
| 1           |
| 2           |
+-------------+
Explanation:
Employees 1, 2, 4, and 5 are working at this company.
The name of employee 1 is missing.
The salary of employee 2 is missing.
```

An employee's information is incomplete exactly when their ID appears in
only one of the two tables: if the ID is in `Salaries` but not `Employees`,
the name is missing; if it is in `Employees` but not `Salaries`, the salary
is missing. Every ID that appears in exactly one table is therefore part of
the answer, and every ID in both tables is not. Write your solution as
a single `SELECT` query returning one column — `employee_id` — with the
rows in ascending `employee_id` order.
