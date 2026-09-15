# Select Data

## Description

Table: `students`

| Column Name | Type   |
| ----------- | ------ |
| student_id  | int    |
| name        | object |
| age         | int    |

Write a solution to select the name and age of the student with
student_id = 101.

Each testcase supplies its own `dataset`: the script seeds the `students`
table with that testcase's rows before your query runs.

The result format is in the following example.

### Example 1

```text
Input:
+------------+---------+-----+
| student_id | name    | age |
+------------+---------+-----+
| 101        | Ulysses | 13  |
| 53         | William | 10  |
| 128        | Henry   | 6   |
| 3          | Henry   | 11  |
+------------+---------+-----+
Output:
+---------+-----+
| name    | age |
+---------+-----+
| Ulysses | 13  |
+---------+-----+
Explanation:
Student Ulysses has student_id = 101, we select the name and age.
```

Write your solution as a single `SELECT` query returning exactly two
columns, `name` then `age`, holding the row of the student whose
`student_id` is `101`, or the empty table when no student matches. Each
dataset's `student_id` values are distinct, so at most one row can match,
and the result needs no ordering.

## Hints

### Hint 1

Consider applying both row and column filtering to select the desired
data.
