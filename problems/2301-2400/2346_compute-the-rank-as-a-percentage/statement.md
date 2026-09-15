# Compute the Rank as a Percentage

## Description

Table: `Students`

| Column Name   | Type |
| ------------- | ---- |
| student_id    | int  |
| department_id | int  |
| mark          | int  |

`student_id` contains unique values. Each row of this table indicates a
student's ID, the ID of the department in which the student enrolled,
and their mark in the exam.

Write a solution to report the rank of each student in their department
as a percentage, where the rank as a percentage is computed using the
following formula: (student_rank_in_the_department - 1) * 100 /
(the_number_of_students_in_the_department - 1). The percentage should be
rounded to 2 decimal places. `student_rank_in_the_department` is
determined by descending mark, such that the student with the highest
mark is rank 1. If two students get the same mark, they also get the
same rank.

Return the result table in any order.

Each testcase supplies its own `dataset`: the DDL seeds the `Students`
table with that testcase's rows. The rank is standard competition
ranking within the department: students with equal marks share one rank,
and the next distinct mark's rank skips accordingly — marks `9, 9, 7`
give ranks `1, 1, 3`, so with three students the shared-top pair lands
at percentage `0.0` and the remaining student at `100.0`. Every testcase
has at least two students in each department, so the denominator is
never zero. Write your solution as a single `SELECT` query returning
three columns — `student_id`, `department_id`, and `percentage`. The
result format is in the following example.

### Example 1

```text
Input:
Students table:
+------------+---------------+------+
| student_id | department_id | mark |
+------------+---------------+------+
| 2          | 2             | 650  |
| 8          | 2             | 650  |
| 7          | 1             | 920  |
| 1          | 1             | 610  |
| 3          | 1             | 530  |
+------------+---------------+------+
Output:
+------------+---------------+------------+
| student_id | department_id | percentage |
+------------+---------------+------------+
| 7          | 1             | 0.0        |
| 1          | 1             | 50.0       |
| 3          | 1             | 100.0      |
| 2          | 2             | 0.0        |
| 8          | 2             | 0.0        |
+------------+---------------+------------+
Explanation:
For Department 1:
 - Student 7: percentage = (1 - 1) * 100 / (3 - 1) = 0.0
 - Student 1: percentage = (2 - 1) * 100 / (3 - 1) = 50.0
 - Student 3: percentage = (3 - 1) * 100 / (3 - 1) = 100.0
For Department 2:
 - Student 2: percentage = (1 - 1) * 100 / (2 - 1) = 0.0
 - Student 8: percentage = (1 - 1) * 100 / (2 - 1) = 0.0
```
