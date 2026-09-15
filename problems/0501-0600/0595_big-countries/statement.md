# Big Countries

## Description

Table: `World`

| Column Name | Type    |
| ----------- | ------- |
| name        | varchar |
| continent   | varchar |
| area        | int     |
| population  | int     |
| gdp         | bigint  |

`name` is the primary key (column with unique values) for this table. Each
row of this table gives information about the name of a country, the
continent to which it belongs, its area, the population, and the gdp value.

A country is big if:

- it has an area of at least three million (i.e. `3000000` km2), or
- it has a population of at least twenty-five million (i.e. `25000000`).

Write a solution to find the name, population, and area of the big
countries.

Return the result table in any order.

Each testcase supplies its own `dataset`: the script seeds the `World`
table with that testcase's rows. The result format is in the following
example.

### Example 1

```text
Input: World table from the dataset below.
Output:
name        population  area
Afghanistan 25500100    652230
Algeria     37100000    2381741
Explanation: Afghanistan has 25500100 people — at least twenty-five
million — so it is big; Algeria has 37100000 people, also big. Albania,
Andorra, and Angola are not big: all three have an area under three
million, and their populations — 2831741, 78115, and 20609294 — each
fall short of twenty-five million.
```

Write your solution as a single `SELECT` query returning three columns —
`name`, `population`, and `area`, in that order — one row per big country.

## Hints

### Hint 1

Big is a disjunction across two columns, so the filter is two branches joined by `OR`: `WHERE area >= 3000000 OR population >= 25000000` keeps a country that clears either bar — big by area, big by population, or both at once.

### Hint 2

Both boundaries are inclusive: "at least" means `>=`, so an area of exactly `3000000` or a population of exactly `25000000` qualifies while `2999999` and `24999999` fall short. Joining the branches with `AND` instead demands both bars at once and silently drops every country that is big on only one measure.

### Hint 3

`continent` and `gdp` never enter the answer — the projection is `name`, `population`, and `area` — and the judge compares rows as an unordered multiset, so no `ORDER BY` is needed.
