# Find Cumulative Salary of an Employee

## Description

Table: `Employee`

| Column Name | Type |
| ----------- | ---- |
| id          | int  |
| month       | int  |
| salary      | int  |

(id, month) is the primary key (combination of columns with unique values)
of this table. Each row in this table indicates the salary of an employee
in one month of the year 2020.

Write a solution to calculate the cumulative salary summary for every
employee in a single unified table.

The cumulative salary summary of an employee is calculated as follows:

- For each month the employee worked, sum the salaries of that month and
  the two previous months — that month's 3-month sum. If the employee did
  not work for the company in some of those previous months, their
  effective salary for those months is 0.
- Do not include the 3-month sum for the most recent month that the
  employee worked.
- Do not include the 3-month sum for any month the employee did not work.

Return the result table ordered by id in ascending order. In case of a
tie, order it by month in descending order.

Each testcase supplies its own `dataset`: the DDL seeds the `Employee`
table with that testcase's rows. The result format is in the following
example.

### Example 1

```text
Input: Employee table from the dataset below.
Output:
id  month  Salary
1   7      90
1   4      130
1   3      90
1   2      50
1   1      20
2   1      20
3   3      100
3   2      40
Explanation: employee 1 worked months 1, 2, 3, 4, 7, and 8; month 8 is
their most recent, so it is excluded. Month 7 sums 90 + 0 + 0 — months 5
and 6 were not worked — month 4 sums 60 + 40 + 30, month 3 sums 40 + 30 +
20, month 2 sums 30 + 20 + 0, and month 1 sums 20 + 0 + 0. Employee 2
worked months 1 and 2; month 2 is excluded and month 1 sums 20 + 0 + 0.
Employee 3 worked months 2, 3, and 4; month 4 is excluded, month 3 sums
60 + 40 + 0, and month 2 sums 40 + 0 + 0.
```

Write your solution as a single `SELECT` query returning three columns —
`id`, `month`, and `Salary`, the 3-month sum — one row per employee for
every month they worked except their most recent one.

## Hints

### Hint 1

The 3-month sum is defined on the calendar, not on the row sequence: a month's window is that month and the two months numerically before it, so a month with no row simply contributes 0 — reaching back two worked months instead would wrongly bridge a gap, summing month 4's salary into month 7's window.

### Hint 2

SUM(salary) OVER (PARTITION BY id ORDER BY month RANGE BETWEEN 2 PRECEDING AND CURRENT ROW) builds exactly that window — a RANGE frame measures distance in the ORDER BY value, so months m-2, m-1, and m are the frame whatever rows exist — and MAX(month) OVER (PARTITION BY id) stamps each row with its employee's most recent worked month in the same pass.

### Hint 3

Keep only the rows with month < last_month: that drops each employee's most recent worked month, and an employee with a single worked month disappears entirely, since that month is their most recent. The demanded order is id ascending, month descending.
