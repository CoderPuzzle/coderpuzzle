# Game Play Analysis II

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

Write a solution to report the device that is first logged in for each
player.

Return the result table in any order.

Each testcase supplies its own `dataset`: the DDL seeds the `Activity`
table with that testcase's rows, dates in ISO `YYYY-MM-DD` form. The
result format is in the following example.

### Example 1

```text
Input: Activity table from the dataset below.
Output:
player_id  device_id
1          2
2          3
3          1
Explanation: player 1 first logged in on 2016-03-01 using device 2;
player 2 logged in only once, on 2017-06-25 with device 3; player 3
first logged in on 2016-03-02 with device 1 — their 2018-07-03 login
used device 4, but a later login is not the first.
```

Write your solution as a single `SELECT` query returning two columns —
`player_id` and `device_id`, the device of that player's first login —
one row per player.

## Hints

### Hint 1

The row to report per player is their earliest-dated Activity row: (SELECT player_id, MIN(event_date) FROM Activity GROUP BY player_id) computes exactly those (player, first-date) pairs.

### Hint 2

Match whole rows, not bare dates: compare the pair (player_id, event_date) against the grouped pairs — SQLite row values allow (a, b) IN (SELECT x, y ...) — so each player matches their own first-login row and the device_id of that row is the answer.

### Hint 3

(player_id, event_date) is the primary key, so the earliest-dated row is unique per player: exactly one output row per player follows with no DISTINCT. games_played never enters the answer — a first login with games_played = 0 still carries its device.
