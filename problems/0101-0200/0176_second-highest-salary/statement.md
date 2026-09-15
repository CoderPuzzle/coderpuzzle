# Second Highest Salary

## Description

Table: `Employee`

| Column Name | Type |
| ----------- | ---- |
| id          | int  |
| salary      | int  |

`id` is the primary key (column with unique values) for this table. Each row
of this table contains information about the salary of an employee.

Write a solution to find the second highest distinct salary from the `Employee`
table. If there is no second highest salary, return `null`.

Each testcase supplies its own `dataset`: the DDL seeds the `Employee` table
with that testcase's rows. The result format is in the following examples.

### Example 1

```text
Input: Employee table from the dataset below.
Output:
SecondHighestSalary
200
Explanation: the distinct salaries ordered from highest to lowest are
300, 200, 100, so the second highest is 200.
```

### Example 2

```text
Input: Employee table from the dataset below.
Output:
SecondHighestSalary
null
Explanation: there is only one distinct salary (100), so the second highest
does not exist.
```

Write your solution as a single `SELECT` query returning one row with one
column: the second highest distinct salary, or `null`.

## Hints

### Hint 1

The second highest is the largest salary strictly below the overall maximum — (SELECT MAX(salary) FROM Employee) gives the top, and only rows with `salary <` that value are candidates.

### Hint 2

An aggregate over zero rows yields null, which is exactly the "no second highest" case: all salaries equal, a single row, or an empty table. MAX therefore always returns exactly one row with the right shape.

### Hint 3

Duplicates need no explicit handling: the strict `<` excludes every copy of the top salary at once, and MAX collapses repeats below it for free.
