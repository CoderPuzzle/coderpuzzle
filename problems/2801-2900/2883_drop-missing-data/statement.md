# Drop Missing Data

## Description

Table: `students`

| Column Name  | Type   |
| ------------ | ------ |
| row_position | int    |
| student_id   | int    |
| name         | object |
| age          | int    |

row_position is the primary key for this table.

The frame this problem transforms is a pandas `students` DataFrame with
the three data columns `student_id` (int), `name` (object), and `age`
(int), read in a fixed row order. Each row of the `students` table holds
one row of that frame — its student_id, name, and age — together with the
row's 1-based position in the frame, so the frame's row order survives
the seeding.

There are some rows having missing values in the name column.

Write a solution to remove the rows with missing values.

Each testcase supplies its own `dataset`: the script seeds the `students`
table with that testcase's DataFrame rows before your query runs, storing
a row's missing name as SQL `NULL`. The result format is in the following
example.

### Example 1

```text
Input:
+--------------+------------+---------+-----+
| row_position | student_id | name    | age |
+--------------+------------+---------+-----+
| 1            | 32         | Piper   | 5   |
| 2            | 217        | None    | 19  |
| 3            | 779        | Georgia | 20  |
| 4            | 849        | Willow  | 14  |
+--------------+------------+---------+-----+
Output:
+------------+---------+-----+
| student_id | name    | age |
+------------+---------+-----+
| 32         | Piper   | 5   |
| 779        | Georgia | 20  |
| 849        | Willow  | 14  |
+------------+---------+-----+
Explanation:
Student with id 217 havs empty value in the name column, so it will be removed.
```

Write your solution as a single `SELECT` query returning exactly three
columns, `student_id` then `name` then `age`: every frame row that has a
name, in the frame's original row order — each row whose name is missing
is removed.

## Hints

### Hint 1

Consider using a build-in function in pandas library to remove the rows
with missing values based on specified data. In SQL the counterpart is
the `NULL` test: `WHERE name IS NOT NULL` keeps exactly the rows that
have a name, and `ORDER BY row_position` restores the frame's original
row order.
