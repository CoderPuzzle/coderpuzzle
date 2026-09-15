# Employees Whose Manager Left the Company

## Description

Table: `Employees`

| Column Name | Type    |
| ----------- | ------- |
| employee_id | int     |
| name        | varchar |
| manager_id  | int     |
| salary      | int     |

In SQL, `employee_id` is the primary key for this table.
This table contains information about the employees, their salary, and the
ID of their manager. Some employees do not have a manager (`manager_id` is
null).

Find the IDs of the employees whose salary is strictly less than $30000 and
whose manager left the company. When a manager leaves the company, their
information is deleted from the `Employees` table, but the reports still
have their `manager_id` set to the manager that left.

Return the result table ordered by `employee_id`.

Each testcase supplies its own `dataset`: the DDL seeds the `Employees`
table with that testcase's rows. The result format is shown in the
following example.

### Example 1

```text
Input:
Employees table:
+-------------+-----------+------------+--------+
| employee_id | name      | manager_id | salary |
+-------------+-----------+------------+--------+
| 3           | Mila      | 9          | 60301  |
| 12          | Antonella | null       | 31000  |
| 13          | Emery     | null       | 67084  |
| 1           | Kalel     | 11         | 21241  |
| 9           | Mikaela   | null       | 50937  |
| 11          | Joziah    | 6          | 28485  |
+-------------+-----------+------------+--------+
Output:
+-------------+
| employee_id |
+-------------+
| 11          |
+-------------+
Explanation:
The employees with a salary less than $30000 are 1 (Kalel) and 11 (Joziah).
Kalel's manager is employee 11, who is still in the company (Joziah).
Joziah's manager is employee 6, who left the company because there is no row
for employee 6 as it was deleted.
```

An employee is reported exactly when three conditions hold at once: their
salary is strictly below `30000`, their `manager_id` is not null, and that
`manager_id` names no row in the table — the manager's row was deleted when
they left. Every employee whose manager is still present fails the third
condition, and every employee without a manager fails the second. Write
your solution as a single `SELECT` query returning one column —
`employee_id` — with the rows in ascending `employee_id` order.
