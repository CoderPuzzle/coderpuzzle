# Game Play Analysis IV

## Description

Table: `Activity`

| Column Name  | Type |
| ------------ | ---- |
| player_id    | int  |
| device_id    | int  |
| event_date   | date |
| games_played | int  |

(player_id, event_date) is the primary key (combination of columns with
unique values) of this table. This table shows the activity of players of
some games. Each row is a record of a player who logged in and played a
number of games (possibly 0) before logging out on someday using some
device.

Write a solution to report the fraction of players that logged in again
on the day after the day they first logged in, rounded to 2 decimal
places. In other words, count the players who logged in on the day
immediately following their first login, and divide that count by the
number of total players.

Each testcase supplies its own `dataset`: the DDL seeds the `Activity`
table with that testcase's rows, dates in ISO `YYYY-MM-DD` form. The
result format is in the following example.

### Example 1

```text
Input: Activity table from the dataset below.
Output:
fraction
0.33
Explanation: player 1 first logged in on 2016-03-01 and logged in again
on 2016-03-02, exactly one day later, so player 1 counts. Player 2 logged
in only on 2017-06-25, and player 3 first logged in on 2016-03-02 and
next on 2018-07-03, so neither counts. The fraction is 1/3 = 0.33.
```

Write your solution as a single `SELECT` query returning one column —
`fraction`, the share of players who logged in again on the day after
their first login, rounded to two decimal places — as a single row.

## Hints

### Hint 1

The fraction's two counts both live at player granularity: GROUP BY player_id with MIN(event_date) yields one first-login row per player — that player count is the denominator — and the numerator counts those players whose first-login date is followed, somewhere in their own rows, by a login exactly one day later.

### Hint 2

"One day later" is calendar arithmetic, not a row offset: in SQLite the day after d is DATE(d, '+1 day'), which resolves month ends, year ends, and leap days to the true next day. Match it inside the player: join Activity on both player_id and event_date = DATE(first_login, '+1 day') — a login on that date by a different player must not count.

### Hint 3

LEFT JOIN keeps every first-login row even when no next-day login exists, so the denominator survives; COUNT(a.player_id) skips the unmatched rows' NULLs and yields the numerator. Multiply by 1.0 before dividing — SQLite's integer 1/3 truncates to 0 — and ROUND(x, 2) rounds the ratio to two decimals, ties going up (1/8 is exactly 0.125 and rounds to 0.13).
