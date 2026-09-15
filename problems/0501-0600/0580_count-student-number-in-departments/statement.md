# Count Student Number in Departments

## Description

Table: `Student`

| Column Name  | Type    |
| ------------ | ------- |
| student_id   | int     |
| student_name | varchar |
| gender       | varchar |
| dept_id      | int     |

`student_id` is the primary key (column with unique values) for this table.
`dept_id` is a foreign key (reference column) to dept_id in the Department
tables.
Each row of this table indicates the name of a student, their gender, and
the id of their department.

Table: `Department`

| Column Name | Type    |
| ----------- | ------- |
| dept_id     | int     |
| dept_name   | varchar |

`dept_id` is the primary key (column with unique values) for this table.
Each row of this table contains the id and the name of a department.

Write a solution to report the respective department name and number of
students majoring in each department for all departments in the Department
table (even ones with no current students).

Return the result table ordered by student_number in descending order. In
case of a tie, order them by dept_name alphabetically.

Each testcase's `dataset` seeds both tables: its script inserts the
testcase's `Student` rows and then its `Department` rows before your query
runs. The result format is in the following example.

### Example 1

```text
Input: Student and Department tables from the dataset below.
Output:
dept_name    student_number
Engineering  2
Science      1
Law          0
Explanation: two students (Jack and Jane) major in Engineering and one
(Mark) majors in Science, so Engineering leads with student_number 2 and
Science follows with 1; Law has no students at all, yet it still appears
in the result with student_number 0.
```

Write your solution as a single `SELECT` query returning two columns —
`dept_name` and `student_number` — one row per department, every
department in the Department table included.

## Hints

### Hint 1

Every department must be reported, staffed or not — that is exactly a LEFT JOIN with Department on the left: every Department row survives the join, and a department with no students comes back once with null in the Student columns instead of disappearing, as it would under an inner join.

### Hint 2

Count the students, not the joined rows: COUNT(student_id) skips the null student_id that a matchless department carries, so that department reports 0 — COUNT(*) would count the null-padded row itself and report 1 for a department with no students at all.

### Hint 3

GROUP BY dept_name collapses each department's joined rows into a single group, and ORDER BY student_number DESC, dept_name presents the counts from the highest to the lowest, breaking ties alphabetically — the alias student_number is usable in the ORDER BY even though the same SELECT computed it.
