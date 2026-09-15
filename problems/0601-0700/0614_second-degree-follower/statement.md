# Second Degree Follower

## Description

Table: `Follow`

| Column Name | Type    |
| ----------- | ------- |
| followee    | varchar |
| follower    | varchar |

`(followee, follower)` is the primary key (combination of columns with
unique values) for this table.
Each row of this table indicates that the user `follower` follows the user
`followee` in a social network.
There will not be a user following themself.

A second degree follower is a user who:

- follows at least one user, and
- is followed by at least one user.

Write a solution to report the second degree followers and the number of
their followers.

Return the result table ordered by `follower` in alphabetical order.

Each testcase supplies its own `dataset`: the DDL seeds the `Follow` table
with that testcase's rows. The result format is in the following example.

### Example 1

```text
Input: Follow table from the dataset below.
Output:
follower  num
Bob       2
Donald    1
Explanation: Bob has 2 followers, Cena and Donald, and he himself follows
Alice, so he is a second degree follower. Donald has 1 follower, Edward,
and he follows Bob, so he is a second degree follower too. Alice has 1
follower, Bob, but follows nobody, so she is not a second degree
follower; Cena and Edward each follow somebody but nobody follows them,
so they are not second degree followers either.
```

Write your solution as a single `SELECT` query returning two columns —
`follower` and `num` — with one row for every second degree follower.

## Hints

### Hint 1

Both conditions are membership claims about the table's two columns: a
user follows somebody when their name appears in some row's `follower`,
and somebody follows them when their name appears in some row's
`followee`. The reported `num` counts only the second relationship — how
many users follow them — never how many they follow.

### Hint 2

`GROUP BY followee` with `COUNT(*)` collapses the table into each user's
follower count, and `WHERE followee IN (SELECT follower FROM Follow)`
keeps only the users who also follow somebody: the subquery reads the
same single table in its other role, as the set of names that appear as
a `follower`, and `IN` asks each group's name for membership in it.

### Hint 3

`ORDER BY follower ASC` matches the statement's alphabetical demand; the
judge compares result rows as an unordered multiset, so the ordering
honors the statement rather than deciding correctness. Both columns hold
names, not ids, so every comparison here is a plain string comparison
and alphabetical means ascending by name.
