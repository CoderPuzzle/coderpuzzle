# Game Play Analysis I

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

Write a solution to find the first login date for each player.

Return the result table in any order.

Each testcase supplies its own `dataset`: the DDL seeds the `Activity`
table with that testcase's rows, dates in ISO `YYYY-MM-DD` form. The
result format is in the following example.

### Example 1

```text
Input: Activity table from the dataset below.
Output:
player_id  first_login
1          2016-03-01
2          2017-06-25
3          2016-03-02
Explanation: player 1 logged in on 2016-03-01 and 2016-05-02, so their
first login is 2016-03-01; player 2 logged in only on 2017-06-25; player 3
logged in on 2016-03-02 and 2018-07-03, so their first login is 2016-03-02.
```

Write your solution as a single `SELECT` query returning two columns —
`player_id` and the first-login date `first_login` — one row per player.

## Hints

### Hint 1

One output row per player, keyed on the player alone: GROUP BY player_id collapses each player's whole login history into one group, and the first login is that group's MIN(event_date).

### Hint 2

No date parsing is needed: event_date values are ISO 'YYYY-MM-DD' strings, whose zero-padded fixed-width fields make lexicographic order identical to calendar order, so MIN over the text is already the earliest date.

### Hint 3

device_id and games_played never enter the answer — a row with games_played = 0 is still a login — and the judge compares rows as an unordered multiset, so no ORDER BY is needed.
