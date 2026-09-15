# All Valid Triplets That Can Represent a Country

## Description

Table: `SchoolA`

| Column Name  | Type    |
| ------------ | ------- |
| student_id   | int     |
| student_name | varchar |

`student_id` is the column with unique values for this table. Each row
of this table contains the id and the name of a student in school A. All
`student_name` values are distinct.

Table: `SchoolB`

| Column Name  | Type    |
| ------------ | ------- |
| student_id   | int     |
| student_name | varchar |

`student_id` is the column with unique values for this table. Each row
of this table contains the id and the name of a student in school B. All
`student_name` values are distinct.

Table: `SchoolC`

| Column Name  | Type    |
| ------------ | ------- |
| student_id   | int     |
| student_name | varchar |

`student_id` is the column with unique values for this table. Each row
of this table contains the id and the name of a student in school C. All
`student_name` values are distinct.

There is a country with three schools, and every student is enrolled in
exactly one of them. The country wants to field one representative from
each school such that:

- `member_A` is selected from `SchoolA`,
- `member_B` is selected from `SchoolB`,
- `member_C` is selected from `SchoolC`, and
- the three selected students' names and ids are pairwise distinct — no
  two of them share a name, and no two of them share an id.

Each testcase's `dataset` seeds all three tables: its script inserts the
testcase's `SchoolA`, `SchoolB`, and `SchoolC` rows (whichever are
present) before your query runs. Write a solution to find every valid
triplet. Return the result table in any order. The result format is in
the following example.

### Example 1

```text
Input:
SchoolA
+------------+--------------+
| student_id | student_name |
+------------+--------------+
| 1          | Alice        |
| 2          | Bob          |
+------------+--------------+
SchoolB
+------------+--------------+
| student_id | student_name |
+------------+--------------+
| 3          | Tom          |
+------------+--------------+
SchoolC
+------------+--------------+
| student_id | student_name |
+------------+--------------+
| 3          | Tom          |
| 2          | Jerry        |
| 10         | Alice        |
+------------+--------------+
Output:
+----------+----------+----------+
| member_A | member_B | member_C |
+----------+----------+----------+
| Alice    | Tom      | Jerry    |
| Bob      | Tom      | Alice    |
+----------+----------+----------+
Explanation:
- (Alice, Tom, Tom) is rejected: member_B and member_C share both the
  id 3 and the name Tom.
- (Alice, Tom, Jerry) is a valid triplet: all three ids (1, 3, 2) and
  all three names are distinct.
- (Alice, Tom, Alice) is rejected: member_A and member_C share the name
  Alice.
- (Bob, Tom, Tom) is rejected: member_B and member_C share both the id
  3 and the name Tom.
- (Bob, Tom, Jerry) is rejected: member_A and member_C share the id 2.
- (Bob, Tom, Alice) is a valid triplet: all three ids (2, 3, 10) and
  all three names are distinct.
```

Write your solution as a single `SELECT` query returning `member_A`,
`member_B`, and `member_C` for every triplet of one `SchoolA` student,
one `SchoolB` student, and one `SchoolC` student whose ids and names are
all pairwise distinct. Return the result table in any order.
