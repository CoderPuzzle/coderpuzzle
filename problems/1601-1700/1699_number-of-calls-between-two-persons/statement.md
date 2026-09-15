# Number of Calls Between Two Persons

## Description

Table: `Calls`

| Column Name | Type |
| ----------- | ---- |
| from_id     | int  |
| to_id       | int  |
| duration    | int  |

This table does not have a primary key (column with unique values), it may
contain duplicates. This table contains the duration of a phone call between
`from_id` and `to_id`. `from_id != to_id` holds for every row — no call
connects a person to themself.

Write a solution to report the number of calls and the total call duration
between each pair of distinct persons (`person1`, `person2`) where
`person1 < person2`.

Return the result table in any order.

Each testcase's `dataset` seeds the `Calls` table: its script inserts the
testcase's `Calls` rows (whichever are present) before your query runs. The
result format is in the following example.

### Example 1

```text
Input:
Calls table:
+---------+-------+----------+
| from_id | to_id | duration |
+---------+-------+----------+
| 1       | 2     | 59       |
| 2       | 1     | 11       |
| 1       | 3     | 20       |
| 3       | 4     | 100      |
| 3       | 4     | 200      |
| 3       | 4     | 200      |
| 4       | 3     | 499      |
+---------+-------+----------+
Output:
+---------+---------+------------+----------------+
| person1 | person2 | call_count | total_duration |
+---------+---------+------------+----------------+
| 1       | 2       | 2          | 70             |
| 1       | 3       | 1          | 20             |
| 3       | 4       | 4          | 999            |
+---------+---------+------------+----------------+
Explanation:
Users 1 and 2 had 2 calls and the total duration is 70 (59 + 11).
Users 1 and 3 had 1 call and the total duration is 20.
Users 3 and 4 had 4 calls and the total duration is 999 (100 + 200 + 200 + 499).
```

Write your solution as a single `SELECT` query returning `person1`, `person2`,
`call_count`, and `total_duration` for every pair of persons with at least one
call between them in `Calls`, in any order.
