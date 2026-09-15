# Top Three Wineries

## Description

Table: `Wineries`

| Column Name | Type    |
| ----------- | ------- |
| id          | int     |
| country     | varchar |
| points      | int     |
| winery      | varchar |

`id` is column of unique values for this table. This table contains `id`,
`country`, `points`, and `winery`.

Write a solution to find the top three wineries in each country based on
their total points. If multiple wineries have the same total points, order
them by winery name in ascending order. If there's no second winery,
output 'No second winery,' and if there's no third winery, output 'No
third winery.'

Return the result table ordered by `country` in ascending order.

Each testcase supplies its own `dataset`: the DDL seeds the `Wineries`
table with that testcase's rows. The result format is shown in the
following example.

### Example 1

```text
Input:
Wineries table:
+-----+-----------+--------+-----------------+
| id  | country   | points | winery          |
+-----+-----------+--------+-----------------+
| 103 | Australia | 84     | WhisperingPines |
| 737 | Australia | 85     | GrapesGalore    |
| 848 | Australia | 100    | HarmonyHill     |
| 222 | Hungary   | 60     | MoonlitCellars  |
| 116 | USA       | 47     | RoyalVines      |
| 124 | USA       | 45     | Eagle'sNest     |
| 648 | India     | 69     | SunsetVines     |
| 894 | USA       | 39     | RoyalVines      |
| 677 | USA       | 9      | PacificCrest    |
+-----+-----------+--------+-----------------+
Output:
+-----------+---------------------+-------------------+----------------------+
| country   | top_winery          | second_winery     | third_winery         |
+-----------+---------------------+-------------------+----------------------+
| Australia | HarmonyHill (100)   | GrapesGalore (85) | WhisperingPines (84) |
| Hungary   | MoonlitCellars (60) | No second winery  | No third winery      |
| India     | SunsetVines (69)    | No second winery  | No third winery      |
| USA       | RoyalVines (86)     | Eagle'sNest (45)  | PacificCrest (9)     |
+-----------+---------------------+-------------------+----------------------+
Explanation
For Australia
 - HarmonyHill Winery accumulates the highest score of 100 points in Australia.
 - GrapesGalore Winery has a total of 85 points, securing the second-highest position in Australia.
 - WhisperingPines Winery has a total of 80 points, ranking as the third-highest.
For Hungary
 - MoonlitCellars is the sole winery, accruing 60 points, automatically making it the highest. There is no second or third winery.
For India
 - SunsetVines is the sole winery, earning 69 points, making it the top winery. There is no second or third winery.
For the USA
 - RoyalVines Wines accumulates a total of 47 + 39 = 86 points, claiming the highest position in the USA.
 - Eagle'sNest has a total of 45 points, securing the second-highest position in the USA.
 - PacificCrest accumulates 9 points, ranking as the third-highest winery in the USA
Output table is ordered by country in ascending order.
```

A winery's total is the sum of the `points` of all its rows within its
country — the same winery name in two countries is two independent
wineries. Within each country the wineries are ranked by total descending,
with the winery name ascending as the tie-break, and the first three take
the podium. Each podium entry is rendered as the winery name followed by
its total in parentheses — `HarmonyHill (100)` — and a country with fewer
wineries shows `'No second winery'` and/or `'No third winery'` in the
missing slots. The result holds exactly one row per country with the
columns `country`, `top_winery`, `second_winery`, `third_winery`, ordered
by `country` in ascending order. Write your solution as a single `SELECT`
query.
