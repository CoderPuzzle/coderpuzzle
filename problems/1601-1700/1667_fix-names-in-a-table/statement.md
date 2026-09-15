# Fix Names in a Table

## Description

Table: `Users`

| Column Name | Type    |
| ----------- | ------- |
| user_id     | int     |
| name        | varchar |

`user_id` is the primary key (column with unique values) for this table.
This table contains the ID and the name of the user. The name consists of
only lowercase and uppercase characters.

Write a solution to fix the names so that only the first character is
uppercase and the rest are lowercase.

Return the result table ordered by `user_id`.

Each testcase's `dataset` seeds the `Users` table: its script inserts the
testcase's `Users` rows before your query runs. The result format is in
the following example.

### Example 1

```text
Input:
Users table:
+---------+-------+
| user_id | name  |
+---------+-------+
| 1       | aLice |
| 2       | bOB   |
+---------+-------+
Output:
+---------+-------+
| user_id | name  |
+---------+-------+
| 1       | Alice |
| 2       | Bob   |
+---------+-------+
Explanation:
aLice keeps its uppercase first character and lowercases the rest: Alice.
bOB uppercases its first character and lowercases the rest: Bob.
```

Write your solution as a single `SELECT` query returning `user_id` and
the fixed `name` — first character uppercase, rest lowercase — for every
user, ordered by `user_id` ascending.
