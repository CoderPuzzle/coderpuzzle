# Primary Department for Each Employee

## Description

Table: `Employee`

```text
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| employee_id   | int     |
| department_id | int     |
| primary_flag  | varchar |
+---------------+---------+
```

`(employee_id, department_id)` is the primary key (combination of columns
with unique values) for this table.

`employee_id` is the id of the employee. `department_id` is the id of the
department to which the employee belongs. `primary_flag` is an ENUM
(category) of type `('Y', 'N')`: if the flag is `'Y'`, the department is
the primary department for the employee; if the flag is `'N'`, the
department is not the primary.

Employees can belong to multiple departments. When the employee joins
other departments, they need to decide which department is their primary
department. Note that when an employee belongs to only one department,
their primary column is `'N'`.

Write a solution to report all the employees with their primary
department. For employees who belong to one department, report their only
department.

Each testcase's `dataset` seeds the table: its script inserts the
testcase's `Employee` rows before your query runs. Return the result
table in any order. The result format is in the following example.

### Example 1

```text
Input:
Employee table:
+-------------+---------------+--------------+
| employee_id | department_id | primary_flag |
+-------------+---------------+--------------+
| 1           | 1             | N            |
| 2           | 1             | Y            |
| 2           | 2             | N            |
| 3           | 3             | N            |
| 4           | 2             | N            |
| 4           | 3             | Y            |
| 4           | 4             | N            |
+-------------+---------------+--------------+
Output:
+-------------+---------------+
| employee_id | department_id |
+-------------+---------------+
| 1           | 1             |
| 2           | 1             |
| 3           | 3             |
| 4           | 3             |
+-------------+---------------+--------------+
Explanation:
- The Primary department for employee 1 is 1.
- The Primary department for employee 2 is 1.
- The Primary department for employee 3 is 3.
- The Primary department for employee 4 is 3.
```

Write your solution as a single `SELECT` query returning `employee_id`
and `department_id`, one row for each of an employee's primary
departments: a row is a primary department when its `primary_flag` is
`'Y'`, or when the employee belongs to exactly one department, in which
case that department is the employee's primary department even though the
flag reads `'N'`.
