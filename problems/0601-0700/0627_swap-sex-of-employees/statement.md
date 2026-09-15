# Swap Sex of Employees

## Description

Table: `Salary`

| Column Name | Type    |
| ----------- | ------- |
| id          | int     |
| name        | varchar |
| sex         | ENUM    |
| salary      | int     |

`id` is the primary key (column with unique values) for this table. The sex
column is ENUM (category) value of type `('m', 'f')`. The table contains
information about an employee.

Write a solution to swap all `'f'` and `'m'` values (i.e., change all `'f'`
values to `'m'` and vice versa) with a single update statement and no
intermediate temporary tables.

On LeetCode this problem is answered with a single `UPDATE` statement — no
`SELECT` at all — that rewrites `Salary` in place. The runner's SQL executor
judges a single `SELECT` only — it cannot run a mutation against the table —
so your query instead returns the `Salary` table exactly as it must read
after the swap: every employee's row present, each `'m'` turned into an
`'f'` and each `'f'` into an `'m'`, every other column untouched. The judge
compares the returned rows as an unordered multiset, so the order of the
rows does not matter.

Each testcase supplies its own `dataset`: the DDL seeds the `Salary` table
with that testcase's rows. The result format is in the following example.

### Example 1

```text
Input: Salary table from the dataset below.
Output:
id  name  sex  salary
1   A     f    2500
2   B     m    1500
3   C     f    5500
4   D     m    500
Explanation: (1, A) and (3, C) changed from 'm' to 'f'; (2, B) and (4, D)
changed from 'f' to 'm'.
```

Write your solution as a single `SELECT` query returning four columns —
`id`, `name`, `sex`, and `salary` — one row per employee, with every
employee's sex value swapped and every other column left exactly as it
stands.

## Hints

### Hint 1

The swap is row-local: a row's new sex depends only on that row's own sex,
not on any other row, so the whole query is one pass over `Salary` with no
grouping, no join, and no self-reference.

### Hint 2

`CASE sex WHEN 'm' THEN 'f' ELSE 'm' END` spells the flip. The enum holds
exactly the two values `'m'` and `'f'`, so one matched arm plus the residual
`ELSE` covers every row: the `WHEN` arm carries `'m'` to `'f'`, and the
`ELSE` arm is left to carry `'f'` to `'m'`.

### Hint 3

`id`, `name`, and `salary` pass through untouched — only the one column is
rewritten. The judge compares rows as an unordered multiset, and an empty
`Salary` correctly yields zero rows.
