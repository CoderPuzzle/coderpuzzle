# Class Performance

## Description

Table: `Scores`

| Column Name  | Type    |
| ------------ | ------- |
| student_id   | int     |
| student_name | varchar |
| assignment1  | int     |
| assignment2  | int     |
| assignment3  | int     |

`student_id` is column of unique values for this table. This table contains
`student_id`, `student_name`, `assignment1`, `assignment2`, and
`assignment3`.

Write a solution to calculate the difference in the total score (sum of all
3 assignments) between the highest score obtained by students and the
lowest score obtained by them.

Return the result table in any order.

Each testcase supplies its own `dataset`: the DDL seeds the `Scores` table
with that testcase's rows. The result format is shown in the following
example.

### Example 1

```text
Input:
Scores table:
+------------+--------------+-------------+-------------+-------------+
| student_id | student_name | assignment1 | assignment2 | assignment3 |
+------------+--------------+-------------+-------------+-------------+
| 309        | Owen         | 88          | 47          | 87          |
| 321        | Claire       | 98          | 95          | 37          |
| 338        | Julian       | 100         | 64          | 43          |
| 423        | Peyton       | 60          | 44          | 47          |
| 896        | David        | 32          | 37          | 50          |
| 235        | Camila       | 31          | 53          | 69          |
+------------+--------------+-------------+-------------+-------------+
Output
+---------------------+
| difference_in_score |
+---------------------+
| 111                 |
+---------------------+
Explanation
- student_id 309 has a total score of 88 + 47 + 87 = 222.
- student_id 321 has a total score of 98 + 95 + 37 = 230.
- student_id 338 has a total score of 100 + 64 + 43 = 207.
- student_id 423 has a total score of 60 + 44 + 47 = 151.
- student_id 896 has a total score of 32 + 37 + 50 = 119.
- student_id 235 has a total score of 31 + 53 + 69 = 153.
student_id 321 has the highest score of 230, while student_id 896 has the lowest score of 119. Therefore, the difference between them is 111.
```

Each student's total score is the sum of their three assignment columns,
and the answer is the spread between the largest and the smallest of those
per-row sums — duplicates and ties need no special handling, since only
the extreme values matter. The result is a single row with a single
column, `difference_in_score`, holding that spread; when every student has
the same total the spread is `0`. Write your solution as a single `SELECT`
query.
