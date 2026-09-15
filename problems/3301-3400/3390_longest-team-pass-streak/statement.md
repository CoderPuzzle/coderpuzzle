# Longest Team Pass Streak

## Description

Table: `Teams`

| Column Name | Type    |
| ----------- | ------- |
| player_id   | int     |
| team_name   | varchar |

`player_id` is the unique key for this table.
Each row contains the unique identifier for player and the name of one of the
teams participating in that match.

Table: `Passes`

| Column Name | Type    |
| ----------- | ------- |
| pass_from   | int     |
| time_stamp  | varchar |
| pass_to     | int     |

(pass_from, time_stamp) is the unique key for this table.
pass_from is a foreign key to player_id from Teams table.
Each row represents a pass made during a match, time_stamp represents the time
in minutes (00:00-90:00) when the pass was made, pass_to is the player_id of
the player receiving the pass.

Write a solution to find the longest successful pass streak for each team
during the match. The rules are as follows:

- A successful pass streak is defined as consecutive passes where:
    - Both the pass_from and pass_to players belong to the same team
- A streak breaks when either:
    - The pass is intercepted (received by a player from the opposing team)

Return the result table ordered by team_name in ascending order.

Each testcase supplies its own `dataset`: the DDL seeds the `Teams` and
`Passes` tables with that testcase's rows. Score the match by walking each
team's own passes — its players as `pass_from` — in `time_stamp` order,
ties broken by `pass_from` then `pass_to`: a successful pass extends that
team's current streak, while an interception ends it (and scores for nobody).
Passes belonging to other teams never affect a team's count. Every team in
`Teams` appears once with its longest run — `0` when it never strung passes
together. Write your solution as a single `SELECT` query returning two
columns — `team_name` and `longest_streak` — ordered by `team_name`
ascending.

The result format is in the following example.

### Example 1

```text
Input:
Teams table:
+-----------+-----------+
| player_id | team_name |
+-----------+-----------+
| 1         | Arsenal   |
| 2         | Arsenal   |
| 3         | Arsenal   |
| 4         | Arsenal   |
| 5         | Chelsea   |
| 6         | Chelsea   |
| 7         | Chelsea   |
| 8         | Chelsea   |
+-----------+-----------+
Passes table:
+-----------+------------+---------+
| pass_from | time_stamp | pass_to |
+-----------+------------+---------+
| 1         | 00:05      | 2       |
| 2         | 00:07      | 3       |
| 3         | 00:08      | 4       |
| 4         | 00:10      | 5       |
| 6         | 00:15      | 7       |
| 7         | 00:17      | 8       |
| 8         | 00:20      | 6       |
| 6         | 00:22      | 5       |
| 1         | 00:25      | 2       |
| 2         | 00:27      | 3       |
+-----------+------------+---------+
Output:
+-----------+----------------+
| team_name | longest_streak |
+-----------+----------------+
| Arsenal   | 3              |
| Chelsea   | 4              |
+-----------+----------------+
Explanation:
Arsenal's streaks:
First streak: 3 passes (1→2→3→4) ended when player 4 passed to Chelsea's player 5
Second streak: 2 passes (1→2→3)
Longest streak = 3
Chelsea's streaks:
First streak: 3 passes (6→7→8→6→5)
Longest streak = 4
```
