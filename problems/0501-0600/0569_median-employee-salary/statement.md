# Median Employee Salary

## Description

Table: `Employee`

| Column Name | Type    |
| ----------- | ------- |
| id          | int     |
| company     | varchar |
| salary      | int     |

`id` is the primary key (column with unique values) for this table. Each
row of this table indicates the company and the salary of one employee.

Write a solution to find the rows that contain the median salary of each
company. Sort each company's rows by salary, breaking ties by id, and
keep the middle of that sorted order: a company with an odd number of
employees `n` contributes its single middle row — the one at position
`(n + 1) / 2` — and a company with an even number of employees
contributes both middle rows, at positions `(n + 1) / 2` and
`(n + 2) / 2` (positions count from 1).

Return the result table in any order.

Each testcase supplies its own `dataset`: the DDL seeds the `Employee`
table with that testcase's rows. The result format is in the following
example.

### Example 1

```text
Input: Employee table from the dataset below.
Output:
id  company  salary
5   A        451
6   A        513
12  B        234
9   B        1154
14  C        2645
Explanation: company A has six employees; sorted by salary its rows read
15, 341, 451, 513, 2341, 15314, so both middle rows — 451 (id 5) and 513
(id 6) — are kept. Company B also has six employees; sorted by salary its
rows read 13, 15, 234, 1154, 1221, 1345, so 234 (id 12) and 1154 (id 9)
are kept. Company C has five employees; sorted by salary its rows read 65,
2345, 2645, 2645, 2652 — the tie between the two 2645 rows is broken by
id, putting id 14 at the middle position 3 — so only id 14 is kept.
```

Write your solution as a single `SELECT` query returning three columns —
`id`, `company`, and `salary` — the median row(s) of each company.

## Hints

### Hint 1

The median here is a position in a sorted list, not an averaged value: per company, order the rows by salary with id breaking ties, then keep the middle position — or, when the company has an even headcount, both middle positions.

### Hint 2

ROW_NUMBER() OVER (PARTITION BY company ORDER BY salary, id) numbers each company's rows 1..n in exactly that order, and COUNT(*) OVER (PARTITION BY company) stamps each row with its company's n — two window functions in one pass, no self-join.

### Hint 3

The two parities unify under integer division: (n+1)/2 and (n+2)/2 are the same position when n is odd (for n=5, both 3) and the two middle positions when n is even (for n=6, 3 and 4), so rn IN ((cnt + 1) / 2, (cnt + 2) / 2) keeps exactly the median rows — including the lone row of a one-employee company.
