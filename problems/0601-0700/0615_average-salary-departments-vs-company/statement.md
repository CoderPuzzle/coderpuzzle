# Average Salary: Departments VS Company

## Description

Table: `Salary`

| Column Name | Type |
| ----------- | ---- |
| id          | int  |
| employee_id | int  |
| amount      | int  |
| pay_date    | date |

In SQL, `id` is the primary key column for this table. Each row of this
table indicates the salary of an employee in one month. `employee_id` is a
foreign key (reference column) from the `Employee` table.

Table: `Employee`

| Column Name   | Type |
| ------------- | ---- |
| employee_id   | int  |
| department_id | int  |

In SQL, `employee_id` is the primary key column for this table. Each row of
this table indicates the department of an employee.

Write a solution to find the comparison result (`higher`/`lower`/`same`) of
the average salary of employees in a department versus the company's
average salary.

Return the result table in any order.

Each testcase supplies its own `dataset`: the script seeds the `Salary` and
`Employee` tables with that testcase's rows before your query runs. A
`pay_date` is written `YYYY/MM/DD`, and the reported `pay_month` is that
month as `YYYY-MM`. The result format is in the following example.

### Example 1

```text
Input: the Salary and Employee tables from the dataset below.
Output:
pay_month  department_id  comparison
2017-02    1              same
2017-03    1              higher
2017-02    2              same
2017-03    2              lower
Explanation: In March, the company's average salary is
(9000+6000+10000)/3 = 8333.33... The average salary for department 1 is
9000, the salary of employee 1 since there is only one employee in this
department, so the comparison is higher since 9000 > 8333.33. The average
salary of department 2 is (6000+10000)/2 = 8000, the average of employees 2
and 3, so the comparison is lower since 8000 < 8333.33. With the same
formula in February, the comparison is same for both departments: the
company and each of its two departments average exactly 7000.
```

Write your solution as a single `SELECT` query returning three columns —
`pay_month`, `department_id`, and `comparison` — with one row for every
(month, department) pair that has at least one salary row in that month.

## Hints

### Hint 1

Two averages at two grains, joined on the month. The department side joins
`Salary` to `Employee` on `employee_id` so each salary row carries a
`department_id`, then groups by month and department with `AVG(amount)` per
group; the company side is the same grouping over `Salary` alone, no join,
one average per month over every salary row the month holds.

### Hint 2

The month key doubles as the output format: `SUBSTR(pay_date, 1, 7)` takes
`2017/03/31` down to `2017/03`, and `REPLACE(..., '/', '-')` restyles that
prefix as the reported `2017-03`. Group on the full prefix — two pay dates
on different days of one month must merge into one group, while `2016/12`
and `2017/01` stay separate months.

### Hint 3

Classify with a `CASE`: a department average strictly above the company
average reads `higher`, strictly below reads `lower`, and exact equality
reads `same` — the boundary is equality itself, and averages that balance
exactly compare equal without any rounding. A department with no salary
rows in a month has no group, hence no row; the judge compares rows as an
unordered multiset, so no `ORDER BY` is needed.
