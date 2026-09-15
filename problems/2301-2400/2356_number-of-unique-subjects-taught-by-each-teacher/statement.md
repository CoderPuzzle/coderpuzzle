# Number of Unique Subjects Taught by Each Teacher

## Description

Table: `Teacher`

| Column Name | Type |
| ----------- | ---- |
| teacher_id  | int  |
| subject_id  | int  |
| dept_id     | int  |

(subject_id, dept_id) is the primary key (combinations of columns with
unique values) of this table.
Each row in this table indicates that the teacher with teacher_id teaches
the subject subject_id in the department dept_id.

Write a solution to calculate the number of unique subjects each teacher
teaches in the university.

Return the result table in any order.

Each testcase supplies its own `dataset`: the DDL seeds the `Teacher`
table with that testcase's rows. A teacher's number counts distinct
subjects, not rows: the same subject taught in several departments
occupies one row per department but contributes once, so the answer
follows the set of subjects behind a teacher's rows rather than their row
count. The primary key keeps the rows themselves honest — no
`(subject_id, dept_id)` pair ever repeats — yet teachers still overlap
freely, and one teacher's subjects say nothing about another's. Write
your solution as a single `SELECT` query returning two columns —
`teacher_id` and `cnt`. The result format is in the following example.

### Example 1

```text
Input:
Teacher table:
+------------+------------+---------+
| teacher_id | subject_id | dept_id |
+------------+------------+---------+
| 1          | 2          | 3       |
| 1          | 2          | 4       |
| 1          | 3          | 3       |
| 2          | 1          | 1       |
| 2          | 2          | 1       |
| 2          | 3          | 1       |
| 2          | 4          | 1       |
+------------+------------+---------+
Output:
+------------+-----+
| teacher_id | cnt |
+------------+-----+
| 1          | 2   |
| 2          | 4   |
+------------+-----+
Explanation:
Teacher 1:
  - They teach subject 2 in departments 3 and 4.
  - They teach subject 3 in department 3.
Teacher 2:
  - They teach subject 1 in department 1.
  - They teach subject 2 in department 1.
  - They teach subject 3 in department 1.
  - They teach subject 4 in department 1.
```
