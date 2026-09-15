# All the Matches of the League

## Description

Table: `Teams`

| Column Name | Type    |
| ----------- | ------- |
| team_name   | varchar |

`team_name` is the column with unique values of this table. Each row of
this table shows the name of a team.

Write a solution to report all the possible matches of the league. Note
that every two teams play two matches with each other, with one team
being the home_team once and the other time being the away_team.

Return the result table in any order.

Each testcase supplies its own `dataset`: the DDL seeds the `Teams`
table with that testcase's rows. A match is an ordered pair of distinct
teams — `(home_team, away_team)` and its reversal are two separate
matches of the same fixture — so `n` teams produce `n * (n - 1)` result
rows, and a lone team produces none. Team names compare for full
equality, so names that merely share a prefix or differ in spacing or
casing are different teams. Write your solution as a single `SELECT`
query returning two columns — `home_team` and `away_team`. The result
format is in the following example.

### Example 1

```text
Input:
Teams table:
+-------------+
| team_name   |
+-------------+
| Leetcode FC |
| Ahly SC     |
| Real Madrid |
+-------------+
Output:
+-------------+-------------+
| home_team   | away_team   |
+-------------+-------------+
| Real Madrid | Leetcode FC |
| Real Madrid | Ahly SC     |
| Leetcode FC | Real Madrid |
| Leetcode FC | Ahly SC     |
| Ahly SC     | Real Madrid |
| Ahly SC     | Leetcode FC |
+-------------+-------------+
Explanation: All the matches of the league are shown in the table.
```
