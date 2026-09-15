# Nth Highest Salary

## Description

Table: `Employee`

| Column Name | Type |
| ----------- | ---- |
| id          | int  |
| salary      | int  |

`id` is the primary key (column with unique values) for this table. Each row
of this table contains information about the salary of an employee.

Write a solution to find the nth highest distinct salary from the `Employee`
table. If there are less than `n` distinct salaries, return `null`.

Each testcase carries its own `n`: besides seeding `Employee`, the
testcase's `dataset` seeds a one-row `Params` table whose `n` column holds
that testcase's `n`. The result format is in the following examples.

### Example 1

```text
Input: Employee table from the dataset below, n = 2.
Output:
getNthHighestSalary(2)
200
Explanation: the distinct salaries ordered from highest to lowest are
300, 200, 100, so the 2nd highest is 200.
```

### Example 2

```text
Input: Employee table from the dataset below, n = 2.
Output:
getNthHighestSalary(2)
null
Explanation: there is only one distinct salary (100), so the 2nd highest
does not exist.
```

Write your solution as a single `SELECT` query returning one row with one
column: the nth highest distinct salary, or `null`.

## Hints

### Hint 1

DENSE_RANK() OVER (ORDER BY salary DESC) numbers the distinct salaries 1, 2, 3, ... with no gaps — duplicates share a rank, so rank n is the nth _distinct_ salary.

### Hint 2

Keep only the row whose rank equals n, then collapse it with MAX: an aggregate over zero rows yields null, which is exactly the "less than n distinct salaries" case.

### Hint 3

The testcase's n lives in the one-row Params table — read it with the scalar subquery (SELECT n FROM Params).
