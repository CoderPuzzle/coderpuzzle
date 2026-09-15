# Analyze Organization Hierarchy

## Description

Table: `Employees`

| Column Name   | Type    |
| ------------- | ------- |
| employee_id   | int     |
| employee_name | varchar |
| manager_id    | int     |
| salary        | int     |
| department    | varchar |

`employee_id` is the unique key. `manager_id` is NULL for the top-level
manager (the CEO).

Write a solution that analyzes the organizational hierarchy and reports, for
every employee:

- **level** — depth in the organization (CEO is level 1, direct reports of
  the CEO are level 2, and so on);
- **team_size** — the total number of employees under them (direct and
  indirect reports; 0 for non-managers);
- **budget** — the total salary they control (the sum of salaries of all
  employees under them, including indirect reports, plus their own salary).

Return the result ordered by `level` ascending, then `budget` descending,
then `employee_name` ascending. Ordering is part of the answer.

Hint: a recursive CTE can enumerate each manager's descendants; derive both
the level chain and the descendant pairs from it, then aggregate.

The test cases seed this table with different datasets; each testcase's
`dataset` value contains the `INSERT` statements.

### Example 1

```text
Input: Employees table from the dataset below.
Output:
employee_id | employee_name | level | team_size | budget
1           | Alice         | 1     | 9         | 84500
3           | Charlie       | 2     | 4         | 41500
2           | Bob           | 2     | 3         | 31000
6           | Frank         | 3     | 2         | 23000
4           | David         | 3     | 1         | 13500
7           | Grace         | 3     | 0         | 8500
5           | Eva           | 3     | 0         | 7500
9           | Ivy           | 4     | 0         | 7000
10          | Judy          | 4     | 0         | 7000
8           | Hank          | 4     | 0         | 6000
```

Write your solution as a single `SELECT` query returning columns
`employee_id`, `employee_name`, `level`, `team_size`, and `budget`.

## Hints

### Hint 1

One recursive CTE walks down from the CEO to compute levels; a second enumerates (manager, descendant) pairs.

### Hint 2

team_size counts descendants excluding the manager themselves; budget sums descendant salaries plus the manager's own.

### Hint 3

The final ORDER BY (level, budget DESC, employee_name) is judged exactly — do not skip it.
