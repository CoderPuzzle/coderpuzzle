# Consecutive Available Seats II

## Description

Table: `Cinema`

| Column Name | Type |
| ----------- | ---- |
| seat_id     | int  |
| free        | bool |

seat_id is an auto-increment column for this table. Each row of this table
indicates whether the ith seat is free or not. 1 means free while 0 means
occupied.

Write a solution to find the length of longest consecutive sequence of
available seats in the cinema.

Note:

There will always be at most one longest consecutive sequence.
If there are multiple consecutive sequences with the same length, include
all of them in the output.

Return the result table ordered by first_seat_id in ascending order.

Each testcase supplies its own `dataset`: the DDL seeds the `Cinema` table
with that testcase's rows. The result format is in the following example.

### Example 1

```text
Input:
Cinema table:
+---------+------+
| seat_id | free |
+---------+------+
| 1       | 1    |
| 2       | 0    |
| 3       | 1    |
| 4       | 1    |
| 5       | 1    |
+---------+------+
Output:
+-----------------+----------------+-----------------------+
| first_seat_id   | last_seat_id   | consecutive_seats_len |
+-----------------+----------------+-----------------------+
| 3               | 5              | 3                     |
+-----------------+----------------+-----------------------+
Explanation:
Longest consecutive sequence of available seats starts from seat 3 and
ends at seat 5 with a length of 3.
Output table is ordered by first_seat_id in ascending order.
```

Write your solution as a single `SELECT` query returning three columns —
`first_seat_id`, `last_seat_id`, `consecutive_seats_len`, the inclusive
endpoints and length of every maximal run of consecutive free seats whose
length equals the maximum run length anywhere in the table (every tie at
the maximum is listed) — ordered by `first_seat_id` ascending. Return the
result table in that order.
