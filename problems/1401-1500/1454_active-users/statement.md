# Active Users

## Description

Table: `Accounts`

| Column Name | Type    |
| ----------- | ------- |
| id          | int     |
| name        | varchar |

`id` is the primary key (column with unique values) for this table. This
table contains the account id and the user name of each account.

Table: `Logins`

| Column Name | Type |
| ----------- | ---- |
| id          | int  |
| login_date  | date |

This table may contain duplicate rows. This table contains the account id
of the user who logged in and the login date. A user may log in multiple
times in the day.

Active users are those who logged in to their accounts for five or more
consecutive days.

Write a solution to find the id and the name of active users.

Each testcase's `dataset` seeds both tables: its script inserts the
testcase's `Accounts` and `Logins` rows before your query runs. Return
the result table ordered by `id`. The result format is in the following
example.

### Example 1

```text
Input:
Accounts
+----+----------+
| id | name     |
+----+----------+
| 1  | Winston  |
| 7  | Jonathan |
+----+----------+
Logins
+----+------------+
| id | login_date |
+----+------------+
| 7  | 2020-05-30 |
| 1  | 2020-05-30 |
| 7  | 2020-05-31 |
| 7  | 2020-06-01 |
| 7  | 2020-06-02 |
| 7  | 2020-06-02 |
| 7  | 2020-06-03 |
| 1  | 2020-06-07 |
| 7  | 2020-06-10 |
+----+------------+
Output:
+----+----------+
| id | name     |
+----+----------+
| 7  | Jonathan |
+----+----------+
Explanation:
User Winston with id = 1 logged in 2 times only in 2 different days, so,
Winston is not an active user. User Jonathan with id = 7 logged in 7
times in 6 different days, five of them were consecutive days, so,
Jonathan is an active user.
```

Write your solution as a single `SELECT` query returning two columns —
`id` and `name` — one row per active user, ordered by `id`.

### Follow up

Could you write a general solution if the active users are those who
logged in to their accounts for `n` or more consecutive days?

## Hints

### Hint 1

Deduplicate `(id, login_date)` first — a user logging in several times a
day still holds that day only once in a streak.

### Hint 2

Number each user's distinct dates with `ROW_NUMBER` ordered by date; in a
consecutive run, subtracting the row number from the date gives the same
day for every member of the run, so that expression groups streaks.

### Hint 3

Group by user and streak key, keep the groups of five or more days,
deduplicate the surviving user ids, and join `Accounts` for the names.
