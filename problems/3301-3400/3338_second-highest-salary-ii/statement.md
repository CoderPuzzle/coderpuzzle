# Second Highest Salary II

## Description

Table: `employees`

| Column Name | Type    |
| ----------- | ------- |
| emp_id      | int     |
| salary      | int     |
| dept        | varchar |

`emp_id` is the unique key for this table. Each row of this table
contains information about an employee including their ID, salary, and
department.

Write a solution to find the employees who earn the second-highest
salary in each department. If multiple employees have the second-highest
salary, include all employees with that salary.

Return the result table ordered by `emp_id` in ascending order.

Each testcase supplies its own `dataset`: the DDL seeds the `employees`
table with that testcase's rows. The result format is in the following
example.

### Example 1

```text
Input:

employees table:

+--------+--------+-----------+
| emp_id | salary | dept      |
+--------+--------+-----------+
| 1      | 70000  | Sales     |
| 2      | 80000  | Sales     |
| 3      | 80000  | Sales     |
| 4      | 90000  | Sales     |
| 5      | 55000  | IT        |
| 6      | 65000  | IT        |
| 7      | 65000  | IT        |
| 8      | 50000  | Marketing |
| 9      | 55000  | Marketing |
| 10     | 55000  | HR        |
+--------+--------+-----------+

Output:

+--------+-----------+
| emp_id | dept      |
+--------+-----------+
| 2      | Sales     |
| 3      | Sales     |
| 5      | IT        |
| 8      | Marketing |
+--------+-----------+

Explanation:

	Sales Department:

		Highest salary is 90000 (emp_id: 4)
		Second-highest salary is 80000 (emp_id: 2, 3)
		Both employees with salary 80000 are included

	IT Department:

		Highest salary is 65000 (emp_id: 6, 7)
		Second-highest salary is 55000 (emp_id: 5)
		Only emp_id 5 is included as they have the second-highest salary

	Marketing Department:

		Highest salary is 55000 (emp_id: 9)
		Second-highest salary is 50000 (emp_id: 8)
		Employee 8 is included

	HR Department:

		Only has one employee
		Not included in the result as it has fewer than 2 employees
```

Write your solution as a single `SELECT` query returning two columns —
`emp_id` and `dept`, in that order. Within each department the
second-highest distinct salary wins: every employee earning exactly that
value is returned together, and a department whose salaries never take
two distinct values (one employee, or one shared salary) contributes no
rows. Rows come back ordered by `emp_id` ascending.
