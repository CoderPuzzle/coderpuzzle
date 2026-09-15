# Grand Slam Titles

## Description

Table: `Players`

```text
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| player_id      | int     |
| player_name    | varchar |
+----------------+---------+
```

`player_id` is the primary key (column with unique values) for this
table.

Each row in this table contains the name and the ID of a tennis player.

Table: `Championships`

```text
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| year          | int     |
| Wimbledon     | int     |
| Fr_open       | int     |
| US_open       | int     |
| Au_open       | int     |
+---------------+---------+
```

`year` is the primary key (column with unique values) for this table.

Each row of this table contains the IDs of the players who won one each
tennis tournament of the grand slam.

Write a solution to report the number of grand slam tournaments won by
each player. Do not include the players who did not win any tournament.

Return the result table in any order.

Each testcase's `dataset` seeds both tables: its script inserts the
testcase's `Players` rows and, when present, its `Championships` rows
before your query runs. The result format is in the following example.

### Example 1

```text
Input:
Players table:
+-----------+-------------+
| player_id | player_name |
+-----------+-------------+
| 1         | Nadal       |
| 2         | Federer     |
| 3         | Novak       |
+-----------+-------------+
Championships table:
+------+-----------+---------+---------+---------+
| year | Wimbledon | Fr_open | US_open | Au_open |
+------+-----------+---------+---------+---------+
| 2018 | 1         | 1       | 1       | 1       |
| 2019 | 1         | 1       | 2       | 2       |
| 2020 | 2         | 1       | 2       | 2       |
+------+-----------+---------+---------+---------+
Output:
+-----------+-------------+-------------------+
| player_id | player_name | grand_slams_count |
+-----------+-------------+-------------------+
| 2         | Federer     | 5                 |
| 1         | Nadal       | 7                 |
+-----------+-------------+-------------------+
Explanation:
Player 1 (Nadal) won 7 titles: Wimbledon (2018, 2019), Fr_open (2018, 2019, 2020), US_open (2018), and Au_open (2018).
Player 2 (Federer) won 5 titles: Wimbledon (2020), US_open (2019, 2020), and Au_open (2019, 2020).
Player 3 (Novak) did not win anything, we did not include them in the result table.
```

Write your solution as a single `SELECT` query returning `player_id`,
`player_name`, and `grand_slams_count`, one row for every player who won
at least one grand slam tournament: `grand_slams_count` is that player's
total wins across the four tournament columns of every year, and players
with no wins do not appear in the result at all.
