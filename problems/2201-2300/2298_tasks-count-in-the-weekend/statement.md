# Tasks Count in the Weekend

## Description

Table: `Tasks`

| Column Name | Type |
| ----------- | ---- |
| task_id     | int  |
| assignee_id | int  |
| submit_date | date |

`task_id` is the primary key (column with unique values) for this table.
Each row in this table contains the ID of a task, the id of the assignee,
and the submission date.

Write a solution to report:

- the number of tasks that were submitted during the weekend (Saturday,
  Sunday) as `weekend_cnt`, and
- the number of tasks that were submitted during the working days as
  `working_cnt`.

Return the result table in any order.

The weekend derives from `submit_date` alone. SQLite keeps these dates as
ISO-8601 text, and `strftime('%w', submit_date)` reads each date's weekday
back out as `'0'` through `'6'`, counting Sunday as `'0'` up to Saturday
as `'6'`. A submission belongs to the weekend exactly when its weekday is
`'6'` (Saturday) or `'0'` (Sunday); every other weekday is a working day.

Each testcase supplies its own `dataset`: the DDL seeds the `Tasks` table
with that testcase's rows. Write your solution as a single `SELECT` query
returning two columns — `weekend_cnt` and `working_cnt` — aggregated over
the whole table into one row; an empty table reports `[0, 0]`. The result
format is in the following example.

### Example 1

```text
Input:
Tasks table:
+---------+-------------+-------------+
| task_id | assignee_id | submit_date |
+---------+-------------+-------------+
| 1       | 1           | 2022-06-13  |
| 2       | 6           | 2022-06-14  |
| 3       | 6           | 2022-06-15  |
| 4       | 3           | 2022-06-18  |
| 5       | 5           | 2022-06-19  |
| 6       | 7           | 2022-06-19  |
+---------+-------------+-------------+
Output:
+-------------+-------------+
| weekend_cnt | working_cnt |
+-------------+-------------+
| 3           | 3           |
+-------------+-------------+
Explanation:
Task 1 was submitted on Monday.
Task 2 was submitted on Tuesday.
Task 3 was submitted on Wednesday.
Task 4 was submitted on Saturday.
Task 5 was submitted on Sunday.
Task 6 was submitted on Sunday.
3 tasks were submitted during the weekend.
3 tasks were submitted during the working days.
```
