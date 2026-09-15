# Department Top Three Salaries

## Description

Table: `Employee`

| Column Name  | Type    |
| ------------ | ------- |
| id           | int     |
| name         | varchar |
| salary       | int     |
| departmentId | int     |

`id` is the primary key (column with unique values) for this table.
`departmentId` is a foreign key (reference column) of the ID from the
`Department` table. Each row of this table indicates the ID, name, and salary
of an employee. It also contains the ID of their department.

Table: `Department`

| Column Name | Type    |
| ----------- | ------- |
| id          | int     |
| name        | varchar |

`id` is the primary key (column with unique values) for this table. Each row
of this table indicates the ID of a department and its name.

A company's executives are interested in seeing who earns the most money in
each of the company's departments. A high earner in a department is an
employee who has a salary in the top three unique salaries for that
department.

Write a solution to find the employees who are high earners in each of the
departments.

Return the result table in any order.

Each testcase's `dataset` seeds both tables: its script inserts the
testcase's `Employee` rows and `Department` rows before your query runs —
either table may hold no rows for a testcase. The result format is in the
following example.

### Example 1

```text
Input: Employee and Department tables from the dataset below.
Output:
Department  Employee  Salary
IT          Max       90000
IT          Joe       85000
IT          Randy     85000
IT          Will      70000
Sales       Henry     80000
Sales       Sam       60000
Explanation: In the IT department:
- Max earns the highest unique salary
- Both Randy and Joe earn the second-highest unique salary
- Will earns the third-highest unique salary
In the Sales department:
- Henry earns the highest salary
- Sam earns the second-highest salary
- There is no third-highest salary as there are only two employees
```

Write your solution as a single `SELECT` query returning three columns —
`Department`, `Employee`, and `Salary` — one row for every high earner: every
employee whose salary is one of the top three unique salaries of their
department, ties included.

### Constraints

- There are no employees with the exact same name, salary and department.

## Hints

### Hint 1

"Top three unique salaries" counts distinct salary values, not employees: rank the salary values of each department from the highest down, then admit every employee whose value carries one of the three best ranks — a tie at a value must not eat a rank.

### Hint 2

DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC) numbers each department's distinct salaries from the top and hands every employee tied at a value the same rank, so filtering `rank <= 3` keeps exactly the high earners — including whole ties at the third unique salary and every employee of a department with fewer than three unique salaries.

### Hint 3

The department name arrives through a join on departmentId = Department.id: employees whose departmentId has no Department row match nothing and drop out, and a department with no employees contributes no rows.
