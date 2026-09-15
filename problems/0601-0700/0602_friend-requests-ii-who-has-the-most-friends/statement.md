# Friend Requests II: Who Has the Most Friends

## Description

Table: `RequestAccepted`

| Column Name  | Type |
| ------------ | ---- |
| requester_id | int  |
| accepter_id  | int  |
| accept_date  | date |

`(requester_id, accepter_id)` is the primary key (combination of columns
with unique values) for this table.
Each row of this table contains the ID of the user who sent the request,
the ID of the user who accepted it, and the date when the request was
accepted.

Write a solution to find the people who have the most friends and the
most friends number.

The test cases are generated so that only one person has the most
friends.

Each testcase's `dataset` seeds the table: its script inserts the
testcase's `RequestAccepted` rows before your query runs. The result
format is in the following example.

### Example 1

```text
Input: the RequestAccepted table from the dataset below.
Output:
id  num
3   3
Explanation: person 3 is a friend of people 1, 2, and 4 — three friends
in total, more than anyone else.
```

Write your solution as a single `SELECT` query returning two columns —
`id` and `num` — and exactly one row, the person with the most friends
and that person's friend count.

### Follow up

In the real world, multiple people could have the same most number of
friends. Could you find all these people in this case?

## Hints

### Hint 1

Friendship is bidirectional: when a request is accepted, both the sender
and the accepter gain one friend. Every row of `RequestAccepted` feeds
two counts — one for its `requester_id`, one for its `accepter_id` — so
a person's friend total is the number of rows in which they appear in
either column.

### Hint 2

Stack both columns into one before counting: `UNION ALL` of
`SELECT requester_id FROM RequestAccepted` and
`SELECT accepter_id FROM RequestAccepted` yields one row per friendship
per side, and `GROUP BY id` with `COUNT(*)` turns that column into each
person's friend total. `UNION ALL`, not `UNION` — appearing in many rows
is many friends, so duplicate ids must survive.

### Hint 3

The guarantee does the tie-breaking: only one person has the most
friends, so the top total is unique and `ORDER BY num DESC LIMIT 1`
returns that person alone — no tie-break key is needed. Counting is
order-independent, so row order and accept dates never matter.
