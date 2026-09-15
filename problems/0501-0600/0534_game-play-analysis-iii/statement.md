# Game Play Analysis III

## Description

Table: `Activity`

| Column Name  | Type |
| ------------ | ---- |
| player_id    | int  |
| device_id    | int  |
| event_date   | date |
| games_played | int  |

`(player_id, event_date)` is the primary key. Each row records a player who
logged in and played a number of games (possibly 0) before logging out some
day using some device.

Write a solution to report, for each player and date, how many games the
player has played **so far** — the total number of games played by that
player up to and including that date.

The test cases seed this table with different datasets; each testcase's
`dataset` value contains the `INSERT` statements.

### Example 1

```text
Input: Activity table from the dataset below.
Output:
player_id | event_date | games_played_so_far
1         | 2016-03-01 | 5
1         | 2016-05-02 | 11
1         | 2017-06-25 | 12
3         | 2016-03-02 | 0
3         | 2018-07-03 | 5
Explanation: player 1 played 5 + 6 = 11 games by 2016-05-02 and
5 + 6 + 1 = 12 by 2017-06-25. Only days the player actually logged in
appear in the result.
```

Write your solution as a single `SELECT` query returning columns
`player_id`, `event_date`, and `games_played_so_far`.

## Hints

### Hint 1

A running total per player ordered by date is a classic window function shape.

### Hint 2

SUM(...) OVER (PARTITION BY player_id ORDER BY event_date) accumulates without collapsing rows.

### Hint 3

No GROUP BY is needed — every login row stays in the output.
