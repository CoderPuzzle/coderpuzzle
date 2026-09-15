# Students Report By Geography

## Description

Table: `Student`

| Column Name | Type    |
| ----------- | ------- |
| name        | varchar |
| continent   | varchar |

This table may contain duplicate rows.
Each row of this table indicates the name of a student and the continent
they came from.

A school has students from Asia, Europe, and America.

Write a solution to pivot the `continent` column so that each name is
sorted alphabetically and displayed underneath its corresponding
continent. The output headers should be `America`, `Asia`, and `Europe`,
respectively: row `i` of the report holds the `i`-th name of each
continent in that continent's own alphabetical order, and when a
continent runs out of students its column reads `NULL` for the remaining
rows. The report has one row per student from America.

The test cases are generated so that the number of students from America
is not less than the number from either Asia or Europe.

Return the result table in any order.

Each testcase supplies its own `dataset`: the DDL seeds the `Student`
table with that testcase's rows. The result format is in the following
example.

### Example 1

```text
Input: Student table from the dataset below.
Output:
America  Asia  Europe
Jack     Xi    Pascal
Jane     null  null
Explanation: each continent's names sort alphabetically — America reads
Jack, Jane; Asia reads Xi; Europe reads Pascal. The first row pairs each
continent's first name, and the second row holds America's second name
with NULL in the Asia and Europe columns, which have run out of
students.
```

Write your solution as a single `SELECT` query returning three columns —
`America`, `Asia`, and `Europe` — the geography report, with one row per
student from America.

## Hints

### Hint 1

The report pairs positions, not students: the `i`-th output row holds
the `i`-th name of each continent in that continent's own alphabetical
order, so each column is that continent's sorted name list read top to
bottom, with `NULL` once the continent runs out. America's list is never
shorter than the others, so the report has exactly as many rows as
America has students.

### Hint 2

ROW_NUMBER() OVER (PARTITION BY continent ORDER BY name) stamps every row
with its position inside its continent — 1 for the alphabetically first
name, then upward. Equal names take neighboring positions in arbitrary
order, which changes nothing: the values sitting at those positions are
equal, so whichever duplicate stands where, the column reads the same.

### Hint 3

The pivot itself is GROUP BY that row number: each group gathers one
name from each continent, and MAX(CASE WHEN continent = 'America' THEN
name END) — spelled three times, once per continent — lifts the group's
name into its output column, because the CASE is non-NULL for exactly
one continent per group and MAX skips the NULLs the other two produce.
