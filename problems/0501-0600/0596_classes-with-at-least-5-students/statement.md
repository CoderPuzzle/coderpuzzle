# Classes With at Least 5 Students

## Description

Table: `Courses`

| Column Name | Type    |
| ----------- | ------- |
| student     | varchar |
| class       | varchar |

`(student, class)` is the primary key (combination of columns with unique
values) for this table. Each row of this table indicates the name of a
student and the class in which they are enrolled.

Write a solution to find all the classes that have at least five students.

Return the result table in any order.

Each testcase supplies its own `dataset`: the DDL seeds the `Courses` table
with that testcase's rows. The result format is in the following example.

### Example 1

```text
Input: Courses table from the dataset below.
Output:
class
Math
Explanation: Math has 6 students — A, C, E, G, H, and I — so it is
included; English, Biology, and Computer each have 1 student, so none
of them is.
```

Write your solution as a single `SELECT` query returning one column,
`class`: every class with at least five students.

## Hints

### Hint 1

A class's enrollment is exactly its rows: every `Courses` row is one student's enrollment in one class, so `GROUP BY class` collapses each class's rows into a single group and the group's `COUNT(*)` is literally its headcount. `HAVING COUNT(*) >= 5` keeps precisely the groups of five or more — the surviving `class` values are the answer.

### Hint 2

The boundary is inclusive: "at least five" means `>= 5`, so a class with exactly five students qualifies while a class with four falls short. And the `(student, class)` primary key guarantees a student can enroll in a given class at most once, so `COUNT(*)` is a true headcount — never inflated by a repeated row.

### Hint 3

The projection is the single column `class` — the grouping key itself, so nothing needs to be joined back — and the judge compares rows as an unordered multiset, so no `ORDER BY` is needed.
