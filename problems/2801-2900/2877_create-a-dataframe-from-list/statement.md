# Create a DataFrame from List

## Description

Table: `StudentData`

| Column Name   | Type |
| ------------- | ---- |
| list_position | int  |
| student_id    | int  |
| age           | int  |

list_position is the primary key for this table.
Each row of this table holds one pair of the 2D list `student_data`: the
pair's student_id and age, together with the pair's 1-based position in
that list.

Write a solution to create a DataFrame from a 2D list called student_data.
This 2D list contains the IDs and ages of some students.

The DataFrame should have two columns, student_id and age, and be in the
same order as the original 2D list.

Each testcase supplies its own `dataset`: the script seeds the `StudentData`
table with that testcase's list rows before your query runs.

The result format is in the following example.

### Example 1

```text
Input:
StudentData table:
+---------------+------------+-----+
| list_position | student_id | age |
+---------------+------------+-----+
| 1             | 1          | 15  |
| 2             | 2          | 11  |
| 3             | 3          | 11  |
| 4             | 4          | 20  |
+---------------+------------+-----+
Output:
+------------+-----+
| student_id | age |
+------------+-----+
| 1          | 15  |
| 2          | 11  |
| 3          | 11  |
| 4          | 20  |
+------------+-----+
Explanation:
A DataFrame was created on top of student_data, with two columns named
student_id and age, and it is in the same order as the original 2D list.
```

Write your solution as a single `SELECT` query returning exactly two
columns, `student_id` then `age`, one row per pair of the list, ordered by
ascending `list_position` — that is, in the same order as the original 2D
list.

## Hints

### Hint 1

Name the two output columns explicitly in the SELECT list —
`SELECT student_id, age FROM ...` — instead of selecting every column:
naming them fixes both the column set and their order, which is the
"specify the column names" step the frame constructor does in pandas.
