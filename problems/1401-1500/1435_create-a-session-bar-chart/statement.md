# Create a Session Bar Chart

## Description

Table: `Sessions`

| Column Name | Type |
| ----------- | ---- |
| session_id  | int  |
| duration    | int  |

`session_id` is the column of unique values for this table. `duration` is
the time in seconds that a user has visited the application.

You want to know how long a user visits your application. You decided to
create bins of `[0-5>`, `[5-10>`, `[10-15>`, and `15 minutes or more`
and count the number of sessions on it.

Write a solution to report the (bin, total).

Each testcase's `dataset` seeds the table: its script inserts the
testcase's `Sessions` rows before your query runs. All four bins appear
in the result even when their count is `0`, with the exact labels
`[0-5>`, `[5-10>`, `[10-15>` and `15 or more`. Durations are seconds, so
the bin edges sit at 300, 600 and 900 seconds. Return the result table
in any order. The result format is in the following example.

### Example 1

```text
Input:
Sessions
+-------------+---------------+
| session_id  | duration      |
+-------------+---------------+
| 1           | 30            |
| 2           | 199           |
| 3           | 299           |
| 4           | 580           |
| 5           | 1000          |
+-------------+---------------+
Output:
+--------------+--------------+
| bin          | total        |
+--------------+--------------+
| [0-5>        | 3            |
| [5-10>       | 1            |
| [10-15>      | 0            |
| 15 or more   | 1            |
+--------------+--------------+
Explanation:
For session_id 1, 2, and 3 have a duration greater or equal than 0
minutes and less than 5 minutes. For session_id 4 has a duration greater
or equal than 5 minutes and less than 10 minutes. There is no session
with a duration greater than or equal to 10 minutes and less than 15
minutes. For session_id 5 has a duration greater than or equal to 15
minutes.
```

Write your solution as a single `SELECT` query returning two columns —
`bin` and `total` — exactly four rows.

## Hints

### Hint 1

The four output rows exist whether or not any session falls in them, so
produce them with a `UNION ALL` of four fixed-label SELECTs.

### Hint 2

Each arm counts its own sessions with a `WHERE` range on `duration`:
below 300, `[300, 600)`, `[600, 900)`, and 900 or more seconds.
