# Percentage of Users Attended a Contest

## Description

Table: `Users`

| Column Name | Type    |
| ----------- | ------- |
| user_id     | int     |
| user_name   | varchar |

`user_id` is the column with unique values for this table. Each row of
this table contains the name and the id of a user.

Table: `Register`

| Column Name | Type |
| ----------- | ---- |
| contest_id  | int  |
| user_id     | int  |

`(contest_id, user_id)` is the primary key (combination of columns with
unique values) for this table. Each row of this table contains the id of
a user and the contest they registered into.

Write a solution to find the percentage of the users registered in each
contest, rounded to two decimal places.

Each testcase's `dataset` seeds both tables: its script inserts the
testcase's `Users` and `Register` rows before your query runs. Return
the result table ordered by `percentage` in descending order; in case of
a tie, order it by `contest_id` in ascending order. The result format is
in the following example.

### Example 1

```text
Input:
Users
+---------+-----------+
| user_id | user_name |
+---------+-----------+
| 6       | Alice     |
| 2       | Bob       |
| 7       | Alex      |
+---------+-----------+
Register
+------------+---------+
| contest_id | user_id |
+------------+---------+
| 215        | 6       |
| 209        | 2       |
| 208        | 2       |
| 210        | 6       |
| 208        | 6       |
| 209        | 7       |
| 209        | 6       |
| 215        | 7       |
| 208        | 7       |
| 210        | 2       |
| 207        | 2       |
| 210        | 7       |
+------------+---------+
Output:
+------------+------------+
| contest_id | percentage |
+------------+------------+
| 208        | 100.0      |
| 209        | 100.0      |
| 210        | 100.0      |
| 215        | 66.67      |
| 207        | 33.33      |
+------------+------------+
Explanation:
All three users registered in contests 208, 209, and 210, so each is
100%. Alice and Alex registered in contest 215 out of 3 total users:
(2 / 3) * 100 = 66.67%. Bob alone registered in contest 207:
(1 / 3) * 100 = 33.33%. Contests 208, 209, and 210 tie at 100.0%, so
they are ordered by contest_id ascending among themselves.
```

Write your solution as a single `SELECT` query returning `contest_id` and
`percentage` — the share, rounded to two decimal places, of every user in
`Users` who registered for that contest — one row per `contest_id` that
appears in `Register`. Order the result by `percentage` descending, then
by `contest_id` ascending. The ordering is judged — the query must emit
the rows in precisely this order.
