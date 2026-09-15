# CEO Subordinate Hierarchy

## Description

Table: `Employees`

| Column Name   | Type    |
| ------------- | ------- |
| employee_id   | int     |
| employee_name | varchar |
| manager_id    | int     |
| salary        | int     |

`employee_id` is the unique identifier for this table.
`manager_id` is the `employee_id` of the employee's manager. The CEO has a
null `manager_id`.

Write a solution to find subordinates of the CEO (both direct and
indirect), along with their level in the hierarchy and their salary
difference from the CEO.

Each testcase supplies its own `dataset`: the script seeds the `Employees`
table with that testcase's rows, `manager_id` null on the CEO's row alone.
The result format is in the following example.

### Example 1

```text
Input: Employees table from the dataset below.
Output:
subordinate_id  subordinate_name  hierarchy_level  salary_difference
2               Bob               1                -30000
3               Charlie           1                -40000
4               David             2                -45000
5               Eve               2                -50000
6               Frank             2                -55000
7               Grace             2                -52000
8               Helen             3                -60000
Explanation: Bob and Charlie are direct subordinates of Alice (CEO) and
thus have a hierarchy_level of 1; David and Eve report to Bob, while Frank
and Grace report to Charlie, making them second-level subordinates
(hierarchy_level 2); Helen reports to Eve, making Helen a third-level
subordinate (hierarchy_level 3). Salary differences are calculated relative
to Alice's salary of 150000. The result is ordered by hierarchy_level
ascending, and then by subordinate_id ascending.
```

The result columns are:

- `subordinate_id`: The `employee_id` of the subordinate
- `subordinate_name`: The name of the subordinate
- `hierarchy_level`: The level of the subordinate in the hierarchy (1 for
  direct reports, 2 for their direct reports, and so on)
- `salary_difference`: The difference between the subordinate's salary and
  the CEO's salary

Return the result table ordered by `hierarchy_level` ascending, and then by
`subordinate_id` ascending.

Write your solution as a single `SELECT` query returning these four
columns — one row per subordinate of the CEO, and none for the CEO
themself.
