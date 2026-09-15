# Arrange Table by Gender

## Description

Table: `Genders`

| Column Name | Type    |
| ----------- | ------- |
| user_id     | int     |
| gender      | varchar |

`user_id` is the primary key (column with unique values) for this table.
`gender` is ENUM (category) of type `'female'`, `'male'`, or `'other'`.
Each row in this table contains the ID of a user and their gender.
The table has an equal number of `'female'`, `'male'`, and `'other'`.

Write a solution to rearrange the `Genders` table such that the rows
alternate between `'female'`, `'other'`, and `'male'` in order. The table
should be rearranged such that the IDs of each gender are sorted in
ascending order.

Return the result table in the mentioned order.

Each testcase supplies its own `dataset`: the DDL seeds the `Genders`
table with that testcase's rows. The result format is shown in the
following example.

### Example 1

```text
Input:
Genders table:
+---------+--------+
| user_id | gender |
+---------+--------+
| 4       | male   |
| 7       | female |
| 2       | other  |
| 5       | male   |
| 3       | female |
| 8       | male   |
| 6       | other  |
| 1       | other  |
| 9       | female |
+---------+--------+
Output:
+---------+--------+
| user_id | gender |
+---------+--------+
| 3       | female |
| 1       | other  |
| 4       | male   |
| 7       | female |
| 2       | other  |
| 5       | male   |
| 9       | female |
| 6       | other  |
| 8       | male   |
+---------+--------+
Explanation:
Female gender: IDs 3, 7, and 9.
Other gender: IDs 1, 2, and 6.
Male gender: IDs 4, 5, and 8.
We arrange the table alternating between 'female', 'other', and 'male'.
Note that the IDs of each gender are sorted in ascending order.
```

The rearrangement is a perfect interleaving of the three gender groups:
each gender's IDs are read in ascending order, then the rows are emitted
one ID from each group in turn, in the fixed cycle `'female'`, `'other'`,
`'male'`. Because the table holds an equal number of each gender, the
cycles exhaust all three groups at exactly the same row; a gender whose
list has run out early simply yields its turns while the remaining
groups keep alternating. The `user_id` values are unique, so the order
is total — no two output rows can ever tie. Write your solution as
a single `SELECT` query returning two columns — `user_id` and `gender`,
in that order — with the rows in the exact alternating order described
above.
