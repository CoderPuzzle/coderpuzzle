# Find the Quiet Students in All Exams

## Description

Table: `Student`

| Column Name  | Type    |
| ------------ | ------- |
| student_id   | int     |
| student_name | varchar |

`student_id` is the primary key (column with unique values) for this
table. `student_name` is the name of the student.

Table: `Exam`

| Column Name | Type |
| ----------- | ---- |
| exam_id     | int  |
| student_id  | int  |
| score       | int  |

`(exam_id, student_id)` is the primary key (combination of columns with
unique values) for this table. Each row of this table indicates that the
student with `student_id` had a `score` points in the exam with id
`exam_id`.

A quiet student is the one who took at least one exam and did not score
the highest or the lowest score.

Write a solution to report the students (`student_id`, `student_name`)
being quiet in all exams. Do not return the student who has never taken
any exam.

Each testcase's `dataset` seeds both tables: its script inserts the
testcase's `Student` rows and, when present, its `Exam` rows before your
query runs. Return the result table ordered by `student_id`. The result
format is in the following example.

### Example 1

```text
Input:
Student
+-------------+---------------+
| student_id  | student_name  |
+-------------+---------------+
| 1           | Daniel        |
| 2           | Jade          |
| 3           | Stella        |
| 4           | Jonathan      |
| 5           | Will          |
+-------------+---------------+
Exam
+------------+--------------+-----------+
| exam_id    | student_id   | score     |
+------------+--------------+-----------+
| 10         |     1        |    70     |
| 10         |     2        |    80     |
| 10         |     3        |    90     |
| 20         |     1        |    80     |
| 30         |     1        |    70     |
| 30         |     3        |    80     |
| 30         |     4        |    90     |
| 40         |     1        |    60     |
| 40         |     2        |    70     |
| 40         |     4        |    80     |
+------------+--------------+-----------+
Output:
+-------------+---------------+
| student_id  | student_name  |
+-------------+---------------+
| 2           | Jade          |
+-------------+---------------+
Explanation:
For exam 1: Student 1 and 3 hold the lowest and high scores respectively.
For exam 2: Student 1 hold both highest and lowest score.
For exam 3 and 4: Student 1 and 4 hold the lowest and high scores
respectively.
Student 2 and 5 have never got the highest or lowest in any of the exams.
Since student 5 is not taking any exam, he is excluded from the result.
So, we only return the information of Student 2.
```

Write your solution as a single `SELECT` query returning two columns —
`student_id` and `student_name` — one row per quiet student, ordered by
`student_id`.

## Hints

### Hint 1

Compute the highest and the lowest score of every exam first — one
grouped subquery over `Exam` gives `exam_id`, `MAX(score)` and
`MIN(score)`.

### Hint 2

A student is disqualified the moment any of their exam rows matches their
exam's maximum or minimum: join `Exam` to the grouped subquery and
collect those `student_id`s. Ties count — a student sharing the top or
bottom score holds it.

### Hint 3

Keep the students that took at least one exam (their id appears in
`Exam`) and are not in the disqualified set, then order by `student_id`.
