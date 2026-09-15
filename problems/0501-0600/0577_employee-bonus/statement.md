# Employee Bonus

## Description

Table: `Employee`

| Column Name | Type    |
| ----------- | ------- |
| empId       | int     |
| name        | varchar |
| supervisor  | int     |
| salary      | int     |

`empId` is the column with unique values for this table.
Each row of this table indicates the name and the ID of an employee in
addition to their salary and the id of their manager.

Table: `Bonus`

| Column Name | Type |
| ----------- | ---- |
| empId       | int  |
| bonus       | int  |

`empId` is the column of unique values for this table.
`empId` is a foreign key (reference column) to empId from the Employee
table.
Each row of this table contains the id of an employee and their respective
bonus.

Write a solution to report the name and bonus amount of each employee who
satisfies either of the following:

- The employee has a bonus less than 1000.
- The employee did not get any bonus.

Return the result table in any order.

Each testcase's `dataset` seeds both tables: its script inserts the
testcase's `Employee` rows and, when present, its `Bonus` rows before your
query runs. The result format is in the following example.

### Example 1

```text
Input: Employee and Bonus tables from the dataset below.
Output:
name    bonus
Brad    null
John    null
Dan     500
Explanation: Brad and John have no row in Bonus, so they got no bonus and
are reported with null; Dan's bonus is 500, which is less than 1000;
Thomas's bonus is 2000, so he satisfies neither condition.
```

Write your solution as a single `SELECT` query returning two columns —
`name` and `bonus`, the employee's bonus amount or null when they got
none — one row per qualifying employee.

## Hints

### Hint 1

An employee with no matching Bonus row must still be reported, and an inner join drops exactly those rows: keep every employee with Employee LEFT JOIN Bonus, which pads the missing side's columns with null.

### Hint 2

Match on empId alone — it is unique in Bonus, so each employee carries at most one bonus row and the join duplicates nobody. supervisor and salary never enter the answer.

### Hint 3

The filter needs both branches: bonus < 1000 — strictly, so a bonus of exactly 1000 does not qualify — OR bonus IS NULL, because the comparison null < 1000 is not true in SQL; the IS NULL branch is what keeps the bonus-less employees the left join preserved.
