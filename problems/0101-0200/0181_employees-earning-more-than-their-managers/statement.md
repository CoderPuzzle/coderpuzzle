# Employees Earning More Than Their Managers

## Description

Table: `Employee`

| Column Name | Type    |
| ----------- | ------- |
| id          | int     |
| name        | varchar |
| salary      | int     |
| managerId   | int     |

`id` is the primary key (column with unique values) for this table. Each row
of this table indicates the ID of an employee, their name, salary, and the
ID of their manager.

Write a solution to find the employees who earn more than their managers.

Return the result table in any order.

Each testcase supplies its own `dataset`: the DDL seeds the `Employee` table
with that testcase's rows. The result format is in the following example.

### Example 1

```text
Input: Employee table from the dataset below.
Output:
Employee
Joe
Explanation: Joe is the only employee who earns more than his manager.
```

Write your solution as a single `SELECT` query returning one column,
`Employee`: the name of every employee whose salary is strictly greater than
their manager's.

## Hints

### Hint 1

A row's manager is another row of the same table: `managerId` holds the `id` of that manager. Read `Employee` as two copies — one of employees, one of managers — and join them on `e1.managerId = e2.id` to pair each employee with their manager's row.

### Hint 2

Rows without a manager need no filter of their own: a null `managerId` matches no `id` in an inner join — and neither does one naming an id that is not in the table — so those rows never form a pair.

### Hint 3

The comparison is strict: `e1.salary > e2.salary` excludes an employee who exactly ties their manager, and each surviving pair contributes one output row, the employee's name.
