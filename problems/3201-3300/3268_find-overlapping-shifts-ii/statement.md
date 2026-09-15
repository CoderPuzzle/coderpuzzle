# Find Overlapping Shifts II

## Description

Table: `EmployeeShifts`

| Column Name | Type     |
| ----------- | -------- |
| employee_id | int      |
| start_time  | datetime |
| end_time    | datetime |

(`employee_id`, `start_time`) is the unique key for this table.
This table contains information about the shifts worked by employees,
including the start time, and end time.

Write a solution to analyze overlapping shifts for each employee. Two
shifts are considered overlapping if they occur on the same date and one
shift's `end_time` is later than another shift's `start_time`.

For each employee, calculate the following:

- The maximum number of shifts that overlap at any given time.
- The total duration of all overlaps in minutes.

Return the result table ordered by `employee_id` in ascending order.

Each testcase supplies its own `dataset`: the script seeds the
`EmployeeShifts` table with that testcase's rows. Every employee with at
least one shift is reported — an employee with a single shift counts as a
maximum of one and a total overlap duration of zero. The result format is
in the following example.

### Example 1

```text
Input: EmployeeShifts table from the dataset below.
Output:
employee_id  max_overlapping_shifts  total_overlap_duration
1            3                       600
2            2                       360
3            1                       0
Explanation: Employee 1 has 3 shifts: 2023-10-01 09:00:00 to 2023-10-01
17:00:00, 2023-10-01 15:00:00 to 2023-10-01 23:00:00, and 2023-10-01
16:00:00 to 2023-10-02 00:00:00. The maximum number of overlapping shifts
is 3 (from 16:00 to 17:00). The total overlap duration is: 2 hours
(15:00-17:00) between 1st and 2nd shifts, 1 hour (16:00-17:00) between
1st and 3rd shifts, and 7 hours (16:00-23:00) between 2nd and 3rd shifts;
total: 10 hours = 600 minutes. Employee 2 has 2 shifts, 2023-10-01
09:00:00 to 2023-10-01 17:00:00 and 2023-10-01 11:00:00 to 2023-10-01
19:00:00; the maximum number of overlapping shifts is 2, and the total
overlap duration is 6 hours (11:00-17:00) = 360 minutes. Employee 3 has
only 1 shift, so there are no overlaps.
```

Write your solution as a single `SELECT` query returning three columns —
`employee_id`, `max_overlapping_shifts`, and `total_overlap_duration` —
one row per employee, ordered by `employee_id` in ascending order. A shift
that ends exactly when another starts does not overlap it, since
`end_time` must be strictly later than the other's start. The judge
compares result rows as an unordered multiset, so row order does not
affect correctness — produce the demanded order anyway.
