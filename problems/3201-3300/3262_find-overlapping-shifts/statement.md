# Find Overlapping Shifts

## Description

Table: `EmployeeShifts`

| Column Name | Type |
| ----------- | ---- |
| employee_id | int  |
| start_time  | time |
| end_time    | time |

(`employee_id`, `start_time`) is the unique key for this table.
This table contains information about the shifts worked by employees,
including the start and end times on a specific date.

Write a solution to count the number of overlapping shifts for each
employee. Two shifts are considered overlapping if one shift’s `end_time`
is later than another shift’s `start_time`.

Return the result table ordered by `employee_id` in ascending order.

Each testcase supplies its own `dataset`: the DDL seeds the
`EmployeeShifts` table with that testcase's rows. An employee whose shifts
never overlap appears nowhere in the result — only employees with at least
one overlapping pair of shifts are reported. The result format is in the
following example.

### Example 1

```text
Input: EmployeeShifts table from the dataset below.
Output:
employee_id  overlapping_shifts
1            2
2            1
4            1
Explanation: employee 1 has three shifts, 08:00:00 to 12:00:00,
11:00:00 to 15:00:00, and 14:00:00 to 18:00:00; the first overlaps with
the second, and the second overlaps with the third, resulting in 2
overlapping shifts. Employee 2 has two shifts, 09:00:00 to 17:00:00 and
16:00:00 to 20:00:00, which overlap with each other, resulting in 1
overlapping shift. Employee 3 has three shifts, 10:00:00 to 12:00:00,
13:00:00 to 15:00:00, and 16:00:00 to 18:00:00; none of these shifts
overlap, so employee 3 is not included in the output. Employee 4 has two
shifts, 08:00:00 to 10:00:00 and 09:00:00 to 11:00:00, which overlap
with each other, resulting in 1 overlapping shift.
```

Write your solution as a single `SELECT` query returning two columns —
`employee_id` and `overlapping_shifts` — one row for every employee who
has at least one pair of overlapping shifts.
