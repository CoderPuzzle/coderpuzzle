# Get the Size of a DataFrame

## Description

DataFrame players:

| Column Name | Type   |
| ----------- | ------ |
| player_id   | int    |
| name        | object |
| age         | int    |
| position    | object |
| ...         | ...    |

Write a solution to calculate and display the number of rows and columns
of players.

Return the result as an array:

[number of rows, number of columns]

Each testcase supplies its own `dataset`: the script seeds two tables
before your query runs. `PlayerColumns` holds one row per column of the
frame, with its 1-based `column_position` and its `column_name`.
`Players` holds one row per row of the frame, with its 1-based
`row_position`.

The result format is in the following example.

### Example 1

```text
Input:
+-----------+----------+-----+-------------+--------------------+
| player_id | name     | age | position    | team               |
+-----------+----------+-----+-------------+--------------------+
| 846       | Mason    | 21  | Forward     | RealMadrid         |
| 749       | Riley    | 30  | Winger      | Barcelona          |
| 155       | Bob      | 28  | Striker     | ManchesterUnited   |
| 583       | Isabella | 32  | Goalkeeper  | Liverpool          |
| 388       | Zachary  | 24  | Midfielder  | BayernMunich       |
| 883       | Ava      | 23  | Defender    | Chelsea            |
| 355       | Violet   | 18  | Striker     | Juventus           |
| 247       | Thomas   | 27  | Striker     | ParisSaint-Germain |
| 761       | Jack     | 33  | Midfielder  | ManchesterCity     |
| 642       | Charlie  | 36  | Center-back | Arsenal            |
+-----------+----------+-----+-------------+--------------------+
Output:
[10, 5]
Explanation:
This DataFrame contains 10 rows and 5 columns.
```

Write your solution as a single `SELECT` query returning exactly one row
of two columns — the number of rows, then the number of columns.

## Hints

### Hint 1

Consider using a built-in function in pandas library to get the size of a
DataFrame. Here both dimensions are plain row counts of the seeded
tables, so the counterpart of pandas' shape is one `COUNT(*)` per table.
