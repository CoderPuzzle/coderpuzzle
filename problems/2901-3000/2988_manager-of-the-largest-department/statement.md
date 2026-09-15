# Manager of the Largest Department

## Description

Table: `Employees`

| Column Name | Type    |
| ----------- | ------- |
| emp_id      | int     |
| emp_name    | varchar |
| dep_id      | int     |
| position    | varchar |

`emp_id` is column of unique values for this table. This table contains
`emp_id`, `emp_name`, `dep_id`, and `position`.

Write a solution to find the name of the manager from the largest
department. There may be multiple largest departments when the number of
employees in those departments is the same.

Return the result table sorted by `dep_id` in ascending order.

Each testcase supplies its own `dataset`: the DDL seeds the `Employees`
table with that testcase's rows. The result format is shown in the
following example.

### Example 1

```text
Input:
Employees table:
+--------+----------+--------+---------------+
| emp_id | emp_name | dep_id | position      |
+--------+----------+--------+---------------+
| 156    | Michael  | 107    | Manager       |
| 112    | Lucas    | 107    | Consultant    |
| 8      | Isabella | 101    | Manager       |
| 160    | Joseph   | 100    | Manager       |
| 80     | Aiden    | 100    | Engineer      |
| 190    | Skylar   | 100    | Freelancer    |
| 196    | Stella   | 101    | Coordinator   |
| 167    | Audrey   | 100    | Consultant    |
| 97     | Nathan   | 101    | Supervisor    |
| 128    | Ian      | 101    | Administrator |
| 81     | Ethan    | 107    | Administrator |
+--------+----------+--------+---------------+
Output
+--------------+--------+
| manager_name | dep_id |
+--------------+--------+
| Joseph       | 100    |
| Isabella     | 101    |
+--------------+--------+
Explanation
- Departments with IDs 100 and 101 each has a total of 4 employees, while department 107 has 3 employees. Since both departments 100 and 101 have an equal number of employees, their respective managers will be included.
Output table is ordered by dep_id in ascending order.
```

A department's size is its number of rows in `Employees`, and its manager
is the employee whose `position` is `'Manager'` — every department carries
exactly one. The largest department is the one with the most employees;
when several departments tie on that count, each of their managers appears
in the result. The output lists two columns — `manager_name` then `dep_id`
— with one row per largest department, ordered by `dep_id` in ascending
order. Because `dep_id` values are unique among the output rows, the order
is total — no two rows can ever tie. Write your solution as a single
`SELECT` query.
