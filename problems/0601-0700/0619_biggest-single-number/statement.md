# Biggest Single Number

## Description

Table: `MyNumbers`

| Column Name | Type |
| ----------- | ---- |
| num         | int  |

This table may contain duplicates (in other words, there is no primary key
for this table in SQL).
Each row of this table contains an integer.

A single number is a number that appeared only once in the `MyNumbers`
table.

Write a solution to find the largest single number. If there is no single
number, report null.

Each testcase supplies its own `dataset`: the DDL seeds the `MyNumbers`
table with that testcase's rows. The result format is in the following
example.

### Example 1

```text
Input: MyNumbers table from the dataset below.
Output:
num
6
Explanation: the single numbers are 1, 4, 5, and 6. Since 6 is the largest
single number, we return it.
```

### Example 2

```text
Input: MyNumbers table from the dataset below.
Output:
num
null
Explanation: there are no single numbers in the input table, so we return
null.
```

Write your solution as a single `SELECT` query returning one column — `num`
— with exactly one row: the largest single number, or null when no number
appears exactly once.

## Hints

### Hint 1

A number is single exactly when its group has size one. `GROUP BY num`
collapses each cluster of equal rows into one group whose `COUNT(*)` is its
frequency, and `HAVING COUNT(*) = 1` keeps only the values that occurred
once — that filtered set is the candidates the answer is drawn from.

### Hint 2

An aggregate collapses the candidates into the required one-row shape:
`SELECT MAX(num)` over the singles returns the largest one, and when no
number is single it still returns exactly one row, holding null. The
no-single case is not an error state to handle — it falls out of `MAX` for
free.

### Hint 3

The tempting spelling `ORDER BY num DESC LIMIT 1` over the singles fails the
second example: with no singles it returns zero rows, but the statement asks
for one row holding null. A `COALESCE` wrapper cannot repair it, because the
defect is the missing row, not a null value — reach for the aggregate
instead of the sort.
