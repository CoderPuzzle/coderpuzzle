# Human Traffic of Stadium

## Description

Table: `Stadium`

| Column Name | Type |
| ----------- | ---- |
| id          | int  |
| visit_date  | date |
| people      | int  |

`visit_date` is the column with unique values for this table. Each row of
this table contains the visit date and visit id to the stadium with the
number of people during the visit. As the id increases, the date increases
as well.

Write a solution to display the records with three or more rows with
consecutive id's, and the number of people is greater than or equal to 100
for each.

Return the result table ordered by visit_date in ascending order.

Each testcase supplies its own `dataset`: the DDL seeds the `Stadium` table
with that testcase's rows, dates in ISO `YYYY-MM-DD` form. The result
format is in the following example.

### Example 1

```text
Input: Stadium table from the dataset below.
Output:
id  visit_date  people
5   2017-01-05  145
6   2017-01-06  1455
7   2017-01-07  199
8   2017-01-09  188
Explanation: The four rows with ids 5, 6, 7, and 8 have consecutive ids
and each of them has >= 100 people attended. Note that row 8 was included
even though the visit_date was not the next day after row 7. The rows with
ids 2 and 3 are not included because we need at least three consecutive
ids.
```

Write your solution as a single `SELECT` query returning three columns —
`id`, `visit_date`, and `people` — one row for every record that belongs
to three or more records with consecutive ids, each holding at least 100
people.

## Hints

### Hint 1

Consecutiveness lives in the ids, not in row order or in the dates: a record's neighbors in a run are the records whose ids are exactly one less and one more, and both must be present in the table. A missing id breaks a run even when the records on both sides hold 100+ people, while a skipped date between two consecutive ids breaks nothing.

### Hint 2

LAG and LEAD over ORDER BY id stamp each row with its neighbors up to two rows away on each side — pull the id and the people at distance 1 and 2, and compare LAG(id) with id - 1 and LEAD(id, 2) with id + 2: those equalities hold only when the neighboring rows carry exactly the neighboring ids, which is what refuses to bridge a gap.

### Hint 3

A row qualifies through any of its three possible positions in a run — the first, middle, or last member of some three consecutive ids each with people >= 100 — so three OR'd predicates, one per placement; every member of a longer run passes through a window of its own. Close with ORDER BY visit_date ASC — visit_date is unique and increases with id — though the judge compares rows as an unordered multiset, so the order is faithful to the statement rather than machine-checked.
