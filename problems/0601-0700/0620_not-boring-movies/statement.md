# Not Boring Movies

## Description

Table: `Cinema`

| Column Name | Type    |
| ----------- | ------- |
| id          | int     |
| movie       | varchar |
| description | varchar |
| rating      | float   |

`id` is the primary key (column with unique values) for this table.
Each row contains information about the name of a movie, its genre, and
its rating on the review site.
`rating` is a float with two decimal places in the range `[0, 10]`.

Write a solution to report the movies with an odd-numbered ID and a
description that is not `"boring"`.

Return the result table ordered by `rating` in descending order.

Each testcase supplies its own `dataset`: the DDL seeds the `Cinema`
table with that testcase's rows. The result format is in the following
example.

### Example 1

```text
Input: Cinema table from the dataset below.
Output:
id  movie       description   rating
5   House card  Interesting   9.1
1   War         great 3D      8.9
Explanation: three movies have odd-numbered ids — 1, 3, and 5 — and the
movie with id 3 is boring, so it is left out; the two that remain are
reported highest rating first, 9.1 above 8.9.
```

Write your solution as a single `SELECT` query returning four columns —
`id`, `movie`, `description`, and `rating` — with one row for every movie
that has an odd-numbered id and a description other than boring.

## Hints

### Hint 1

Both filters are row-local: the id's parity and the description string
are decided by one row of `Cinema` alone, and neither consults any other
row, so the whole query is a single filtered scan with no grouping and
no join.

### Hint 2

Spell the two predicates as one `AND` in the `WHERE` clause:
`id % 2 = 1 AND description != 'boring'`. The description test is an
exact, case-sensitive string match — `Boring`, `BORING`, `boring!`, and
`boring ` with a trailing space are all different descriptions and stay
in the answer; only the literal string boring leaves.

### Hint 3

`ORDER BY rating DESC` honors the statement's demand that the highest
rating stands first; the judge compares result rows as an unordered
multiset, so the sort dresses the answer rather than deciding it. Equal
ratings would leave their relative order underdetermined — the test data
keeps every testcase's ratings distinct, so the demanded order is total.
