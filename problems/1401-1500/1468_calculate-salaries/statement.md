# Calculate Salaries

## Description

Table `Salaries`:

| Column Name   | Type    |
| ------------- | ------- |
| company_id    | int     |
| employee_id   | int     |
| employee_name | varchar |
| salary        | int     |

In SQL, `(company_id, employee_id)` is the primary key for this table.
This table contains the company id, the id, the name, and the salary for
an employee.

Find the salaries of the employees after applying taxes. Round the salary
to the nearest integer, with halves rounding up.

The tax rate is calculated for each company based on the following
criteria:

- `0%` If the max salary of any employee in the company is less than
  `$1000`.
- `24%` If the max salary of any employee in the company is in the range
  `[1000, 10000]` inclusive.
- `49%` If the max salary of any employee in the company is greater than
  `$10000`.

Each testcase's `dataset` seeds the table: its script inserts the
testcase's `Salaries` rows before your query runs. Return the result
table in any order. The result format is in the following example.

### Example 1

```text
Input:
Salaries
+------------+-------------+---------------+--------+
| company_id | employee_id | employee_name | salary |
+------------+-------------+---------------+--------+
| 1          | 1           | Tony          | 2000   |
| 1          | 2           | Pronub        | 21300  |
| 1          | 3           | Tyrrox        | 10800  |
| 2          | 1           | Pam           | 300    |
| 2          | 7           | Bassem        | 450    |
| 2          | 9           | Hermione      | 700    |
| 3          | 7           | Bocaben       | 100    |
| 3          | 2           | Ognjen        | 2200   |
| 3          | 13          | Nyancat       | 3300   |
| 3          | 15          | Morninngcat   | 7777   |
+------------+-------------+---------------+--------+
Output:
+------------+-------------+---------------+--------+
| company_id | employee_id | employee_name | salary |
+------------+-------------+---------------+--------+
| 1          | 1           | Tony          | 1020   |
| 1          | 2           | Pronub        | 10863  |
| 1          | 3           | Tyrrox        | 5508   |
| 2          | 1           | Pam           | 300    |
| 2          | 7           | Bassem        | 450    |
| 2          | 9           | Hermione      | 700    |
| 3          | 7           | Bocaben       | 76     |
| 3          | 2           | Ognjen        | 1672   |
| 3          | 13          | Nyancat       | 2508   |
| 3          | 15          | Morninngcat   | 5911   |
+------------+-------------+---------------+--------+
Explanation:
For company 1, Max salary is 21300. Employees in company 1 have taxes =
49%. For company 2, Max salary is 700. Employees in company 2 have
taxes = 0%. For company 3, Max salary is 7777. Employees in company 3
have taxes = 24%. The salary after taxes = salary - (taxes percentage /
100) * salary. For example, Salary for Morninngcat (3, 15) after taxes =
7777 - 7777 * (24 / 100) = 7777 - 1866.48 = 5910.52, which is rounded
to 5911.
```

Write your solution as a single `SELECT` query returning four columns —
`company_id`, `employee_id`, `employee_name` and `salary` — one row per
employee.

## Hints

### Hint 1

Each company's rate depends on its own maximum salary: a grouped subquery
over `Salaries` gives `(company_id, MAX(salary))`.

### Hint 2

Join that per-company maximum back to the employees, map it to `0`, `0.24`
or `0.49` with a `CASE`, and round `salary * (1 - rate)` — `ROUND` rounds
halves away from zero, matching the statement's rounding.
