# Premier League Table Ranking II

## Description

Table: `TeamStats`

| Column Name    | Type    |
| -------------- | ------- |
| team_id        | int     |
| team_name      | varchar |
| matches_played | int     |
| wins           | int     |
| draws          | int     |
| losses         | int     |

`team_id` is the unique key for this table.
This table contains team id, team name, `matches_played`, `wins`, `draws`,
and `losses`.

Write a solution to calculate the points, position, and tier for each team
in the league. Points are calculated as follows:

- 3 points for a win
- 1 point for a draw
- 0 points for a loss

Note: Teams with the same points must be assigned the same position.

Tier ranking:

Divide the league into 3 tiers based on points:

- Tier 1: Top 33% of teams
- Tier 2: Middle 33% of teams
- Tier 3: Bottom 34% of teams

In case of ties at tier boundaries, place tied teams in the higher tier.

The cut lines follow positions, not raw counts of teams: a position is a
team's competition rank by points — 1 plus the number of teams with
strictly more points — so tied teams share one position. With `N` teams in
the league, Tier 1 holds positions `1` through `⌈0.33 · N⌉`, Tier 2 holds
every position up through `⌈0.66 · N⌉`, and all later positions are
Tier 3. A tie that sits across a cut line takes its shared position's
tier, which is always the higher one.

Return the result table ordered by points in descending, and then by
team_name in ascending order.

Each testcase supplies its own `dataset`: the script seeds the `TeamStats`
table with that testcase's rows. The result format is in the following
example.

### Example 1

```text
Input: TeamStats table from the dataset below.
Output:
team_name          points  position  tier
Sheffield United   56      1         Tier 1
Fulham             55      2         Tier 1
Newcastle United   43      3         Tier 1
Chelsea            41      4         Tier 1
Burnley            27      5         Tier 2
Nottingham Forest  24      6         Tier 2
Everton            12      7         Tier 2
Luton Town         12      7         Tier 2
Liverpool          11      9         Tier 3
Aston Villa        9       10        Tier 3
Explanation: Sheffield United has 56 points (18 wins * 3 points + 2 draws
* 1 point) and is in position 1. Fulham has 55 points (18 wins * 3 points
+ 1 draw * 1 point) and is in position 2. Newcastle United has 43 points
(11 wins * 3 points + 10 draws * 1 point) and is in position 3. Chelsea
has 41 points (13 wins * 3 points + 2 draws * 1 point) and is in position
4. Burnley has 27 points (6 wins * 3 points + 9 draws * 1 point) and is
in position 5. Nottingham Forest has 24 points (6 wins * 3 points + 6
draws * 1 point) and is in position 6. Everton and Luton Town both have
12 points, with Everton having 2 wins * 3 points + 6 draws * 1 point, and
Luton Town having 4 wins * 3 points. Both teams share position 7.
Liverpool has 11 points (1 win * 3 points + 8 draws * 1 point) and is in
position 9. Aston Villa has 9 points (1 win * 3 points + 6 draws * 1
point) and is in position 10. Tier calculation: the top 33% of teams
based on points — Sheffield United, Fulham, Newcastle United, and Chelsea
— form Tier 1; the middle 33% — Burnley, Nottingham Forest, Everton, and
Luton Town — form Tier 2; the bottom 34% — Liverpool and Aston Villa —
form Tier 3.
```

Write your solution as a single `SELECT` query returning four columns —
`team_name`, `points`, `position`, and `tier` — one row per team, ordered
by points in descending order and then by team_name in ascending order.
The position is competition ranking: equal totals take equal positions,
and the next distinct total skips past every tied team — two co-leaders
sit at positions 1 and 1 while the best team behind them sits at position 3. The judge compares result rows as an unordered multiset, so row order
does not affect correctness — produce the demanded order anyway.
