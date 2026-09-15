# Managers with at Least 5 Direct Reports

## Description

Table: `Employee`

| Column Name | Type    |
| ----------- | ------- |
| id          | int     |
| name        | varchar |
| department  | varchar |
| managerId   | int     |

`id` is the primary key (column with unique values) for this table. Each
row of this table indicates the name of an employee, their department, and
the id of their manager. If `managerId` is null, then the employee does not
have a manager. No employee will be the manager of themself.

Write a solution to find managers with at least five direct reports.

Return the result table in any order.

Each testcase supplies its own `dataset`: the DDL seeds the `Employee` table
with that testcase's rows. The result format is in the following example.

### Example 1

```text
Input: Employee table from the dataset below.
Output:
name
John
Explanation: Dan, James, Amy, Anne, and Ron all carry managerId 101, so
employee 101, John, has five direct reports and is the only qualifying
manager.
```

Write your solution as a single `SELECT` query returning one column,
`name`: the name of every manager with at least five direct reports.

## Hints

### Hint 1

A manager's direct reports are exactly the rows whose `managerId` equals that manager's `id`: `GROUP BY managerId` collapses them into one group per manager, and `HAVING COUNT(*) >= 5` keeps precisely the groups of five or more — the surviving `managerId` values are the qualifying managers' ids.

### Hint 2

An employee whose `managerId` is null has no manager, and those rows form their own group under `GROUP BY managerId` — but null never equals an `id`, so that group can never name a qualifying manager, however many manager-less employees share it. The converse still holds: a manager-less employee is a perfectly normal manager, and rows pointing at their `id` count for them like any others.

### Hint 3

Mapping ids back to names is a membership test: `WHERE id IN (subquery)` keeps the `Employee` rows of the qualifying managers, and the projection is the single column `name` — the judge compares rows as an unordered multiset, so no `ORDER BY` is needed.
