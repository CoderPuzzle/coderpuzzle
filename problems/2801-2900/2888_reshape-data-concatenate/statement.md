# Reshape Data: Concatenate

## Description

DataFrame `df1`:

| Column Name | Type   |
| ----------- | ------ |
| student_id  | int    |
| name        | object |
| age         | int    |

DataFrame `df2`:

| Column Name | Type   |
| ----------- | ------ |
| student_id  | int    |
| name        | object |
| age         | int    |

Write a solution to concatenate these two DataFrames vertically into one
DataFrame.

Each testcase supplies its own `dataset`: the script seeds the `df1` and
`df2` tables with that testcase's rows before your query runs. In every
dataset the `student_id` values are distinct within each dataframe, and a
dataframe's row order is its ascending `student_id` order; `student_id`
values may repeat across the two dataframes and may interleave between
them. Rows may be listed in any order inside the dataset's INSERT
statements, so a correct query cannot assume the scan order of either
table matches its frame order.

The result format is in the following example.

### Example 1

```text
Input:
df1
+------------+---------+-----+
| student_id | name    | age |
+------------+---------+-----+
| 1          | Mason   | 8   |
| 2          | Ava     | 6   |
| 3          | Taylor  | 15  |
| 4          | Georgia | 17  |
+------------+---------+-----+
df2
+------------+------+-----+
| student_id | name | age |
+------------+------+-----+
| 5          | Leo  | 7   |
| 6          | Alex | 7   |
+------------+------+-----+
Output:
+------------+---------+-----+
| student_id | name    | age |
+------------+---------+-----+
| 1          | Mason   | 8   |
| 2          | Ava     | 6   |
| 3          | Taylor  | 15  |
| 4          | Georgia | 17  |
| 5          | Leo     | 7   |
| 6          | Alex    | 7   |
+------------+---------+-----+
Explanation:
The two DataFramess are stacked vertically, and their rows are combined.
```

Write your solution as a single `SELECT` query returning exactly three
columns, `student_id` then `name` then `age`: all of df1's rows followed
by all of df2's rows, each dataframe's rows in ascending `student_id`
order — the vertical concatenation of the two DataFrames.

## Hints

### Hint 1

Consider using a built-in function in pandas library with the appropriate
axis argument. In SQL the counterpart of stacking two frames vertically is
`UNION ALL`, which appends df2's rows below df1's rows without dropping
anything, and an `ORDER BY` restores each dataframe's ascending
`student_id` order inside the stacked result.
