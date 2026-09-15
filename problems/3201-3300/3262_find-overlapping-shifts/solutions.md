# Solutions — Find Overlapping Shifts

## Self-join same-employee shifts, count each overlapping pair once

Overlap is a property of two rows, so the query pairs rows:
`EmployeeShifts` joins itself on `employee_id`, and the `WHERE` clause
keeps exactly the overlapping pairs — `s1.start_time < s2.start_time`
orders the two members of each pair, and `s1.end_time > s2.start_time` is
the overlap test the statement states: one shift's `end_time` strictly
later than the other shift's `start_time`. The strictness settles both
boundaries — two shifts that merely touch, one ending exactly when the
next starts, do not overlap, and no pair is compared against itself
because equal start times would fail the ordering term.

The unique key `(employee_id, start_time)` is what makes one pass
enough: two shifts of one employee can never share a start time, so the
ordering term splits every unordered pair into exactly one directed
match, and `COUNT(*)` totals genuine pairs rather than each pair twice.
`GROUP BY s1.employee_id` collapses each employee's matches into one row,
and an employee with no matching pair produces no group at all — which is
exactly the required filtering, since only employees with at least one
overlapping pair are reported.

For each employee the join holds that employee's `k` shifts against each
other — `k²` candidate pairs worst case, `Σ k² ≤ N²` over `N` total
shifts — and grouping keeps one row per reported employee.

**Complexity:** `O(N²)` time worst case, `O(E)` space beyond the input
for the `E` reported employees.
