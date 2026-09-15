# Change Data Type

## Description

Table: `students`

| Column Name  | Type   |
| ------------ | ------ |
| row_position | int    |
| student_id   | int    |
| name         | object |
| age          | int    |
| grade        | float  |

row_position is the primary key for this table.

The frame this problem transforms is a pandas `students` DataFrame with
the four data columns `student_id` (int), `name` (object), `age` (int),
and `grade` (float), read in a fixed row order. Each row of the
`students` table holds one row of that frame — its student_id, name,
age, and grade — together with the row's 1-based position in the frame,
so the frame's row order survives the seeding.

Write a solution to correct the errors:

The grade column is stored as floats, convert it to integers.

Each testcase supplies its own `dataset`: the script seeds the `students`
table with that testcase's DataFrame rows before your query runs, storing
each grade as a SQL `REAL`. The result format is in the following
example.

### Example 1

```text
Input:
+--------------+------------+------+-----+-------+
| row_position | student_id | name | age | grade |
+--------------+------------+------+-----+-------+
| 1            | 1          | Ava  | 6   | 73.0  |
| 2            | 2          | Kate | 15  | 87.0  |
+--------------+------------+------+-----+-------+
Output:
+------------+------+-----+-------+
| student_id | name | age | grade |
+------------+------+-----+-------+
| 1          | Ava  | 6   | 73    |
| 2          | Kate | 15  | 87    |
+------------+------+-----+-------+
Explanation:
The data types of the column grade is converted to int.
```

Write your solution as a single `SELECT` query returning exactly four
columns, `student_id` then `name` then `age` then `grade`, one row per
frame row, ordered by ascending `row_position` — that is, in the same
row order as the original DataFrame. The `grade` output column carries
the converted values: every grade is delivered as an integer, with any
fractional part dropped.

## Hints

### Hint 1

Consider using a build-in function in pandas library with a dictionary to
convert the datatype of columns as specified. In SQL terms the conversion
becomes the SELECT-list entry `CAST(grade AS INTEGER) AS grade`, which
re-types the column in the output while the stored rows stay untouched.
