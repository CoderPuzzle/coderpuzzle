# Department Highest Salary

## Description

Table: `Employee`

| Column Name  | Type    |
| ------------ | ------- |
| id           | int     |
| name         | varchar |
| salary       | int     |
| departmentId | int     |

`id` is the primary key (column with unique values) for this table.
`departmentId` is a foreign key (reference columns) of the ID from the
`Department` table. Each row of this table indicates the ID, name, and
salary of an employee. It also contains the ID of their department.

Table: `Department`

| Column Name | Type    |
| ----------- | ------- |
| id          | int     |
| name        | varchar |

`id` is the primary key (column with unique values) for this table. It is
guaranteed that department name is not NULL. Each row of this table
indicates the ID of a department and its name.

Write a solution to find the employees who have the highest salary in each
of the departments.

Return the result table in any order.

Each testcase's `dataset` seeds both tables: its script inserts the
testcase's `Employee` rows and, when present, its `Department` rows before
your query runs. The result format is in the following example.

### Example 1

```text
Input: Employee and Department tables from the dataset below.
Output:
Department  Employee  Salary
IT          Jim       90000
Sales       Henry     80000
IT          Max       90000
Explanation: Max and Jim both have the highest salary in the IT department
and Henry has the highest salary in the Sales department.
```

Write your solution as a single `SELECT` query returning three columns —
`Department`, `Employee`, and `Salary` — one row for every employee tied at
the highest salary of their department.

## Hints

### Hint 1

The per-department maxima come from one grouped pass: (SELECT departmentId, MAX(salary) FROM Employee GROUP BY departmentId) yields each department's top salary alongside its id.

### Hint 2

Join `Employee` back onto those maxima with an `ON` that requires both `departmentId` and `salary` to match: the equality on salary keeps every employee tied at their department's maximum — a tie yields several rows — and can never admit anyone below it.

### Hint 3

Join `Department` last to translate each surviving `departmentId` into its name, alias the three output columns `Department`, `Employee`, and `Salary`, and leave the rows unordered: the judge compares them as an unordered multiset, and a department with no employees simply contributes no rows.
