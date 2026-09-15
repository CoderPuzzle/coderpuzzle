# Find Emotionally Consistent Users

## Description

Table: `Reactions`

| Column Name | Type    |
| ----------- | ------- |
| user_id     | int     |
| content_id  | int     |
| reaction    | varchar |

(`user_id`, `content_id`) is the primary key (unique value) for this
table. Each row represents a reaction given by a user to a piece of
content.

Write a solution to identify emotionally consistent users based on the
following requirements:

- For each user, count the total number of reactions they have given.
- Only include users who have reacted to at least 5 different content
  items.
- A user is considered emotionally consistent if at least 60% of their
  reactions are of the same type.

Return the result table ordered by `reaction_ratio` in descending order
and then by `user_id` in ascending order.

Note: `reaction_ratio` should be rounded to 2 decimal places.

Each testcase's `dataset` seeds the `Reactions` table: its script inserts
the testcase's `Reactions` rows before your query runs. The result format
is in the following example.

### Example 1

```text
Input:
Reactions table:
+---------+------------+----------+
| user_id | content_id | reaction |
+---------+------------+----------+
| 1       | 101        | like     |
| 1       | 102        | like     |
| 1       | 103        | like     |
| 1       | 104        | wow      |
| 1       | 105        | like     |
| 2       | 201        | like     |
| 2       | 202        | wow      |
| 2       | 203        | sad      |
| 2       | 204        | like     |
| 2       | 205        | wow      |
| 3       | 301        | love     |
| 3       | 302        | love     |
| 3       | 303        | love     |
| 3       | 304        | love     |
| 3       | 305        | love     |
+---------+------------+----------+
Output:
+---------+-------------------+----------------+
| user_id | dominant_reaction | reaction_ratio |
+---------+-------------------+----------------+
| 3       | love              | 1.00           |
| 1       | like              | 0.80           |
+---------+-------------------+----------------+
Explanation: User 1 has 5 total reactions, like appears 4 times, and
reaction_ratio = 4 / 5 = 0.80, meeting the 60% consistency requirement.
User 2 also has 5 total reactions but their most frequent reaction
appears only 2 times, so reaction_ratio = 2 / 5 = 0.40 and the
requirement is not met. User 3 has 5 total reactions, 'love' appears 5
times, and reaction_ratio = 5 / 5 = 1.00, meeting the requirement.
```

Write your solution as a single `SELECT` query returning `user_id`,
`dominant_reaction`, and `reaction_ratio` for every qualifying user,
ordered by `reaction_ratio` descending then `user_id` ascending.
