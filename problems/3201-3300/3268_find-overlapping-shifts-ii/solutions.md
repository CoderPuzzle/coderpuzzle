# Solutions — Find Overlapping Shifts II

## Pair self-join for the total, event sweep for the peak

The two requested numbers have different shapes, so the query computes them
separately and joins the results per employee. `total_overlap_duration` is a
property of shift pairs: `EmployeeShifts` joins itself on `employee_id`, and
the join conditions keep exactly the overlapping pairs — `e1.start_time <
e2.start_time` orders the two members of each unordered pair (the unique key
on `(employee_id, start_time)` makes start times a total order within an
employee), `DATE(e1.start_time) = DATE(e2.start_time)` restricts the pair to
one date as the statement requires, and `e1.end_time > e2.start_time` is the
overlap test itself. The strictness settles the boundary: shifts that merely
touch, one ending exactly when the next starts, contribute nothing. The
intersection of a kept pair runs from the later start to the earlier end,
and its length in minutes is the difference of epoch seconds divided by 60;
`SUM` over each employee's pairs gives the total.

`max_overlapping_shifts` is a running-count sweep. A `UNION ALL` turns every
shift into two events — its start carrying `+1` and its end carrying `-1`,
both stamped with the start's date so overnight shifts stay in their own
date group — and `SUM(delta) OVER (PARTITION BY employee_id, day ORDER BY
epoch_seconds, delta)` accumulates the number of shifts in progress.
Ordering by `delta` after the timestamp applies an end before a start at
the same instant, which is what the half-open overlap rule demands: a shift
ending at 17:00:00 leaves the count before one starting at 17:00:00 enters
it, so touching shifts never inflate the peak. `MAX` over the running sums
is the answer; a lone employee's single start event yields 1.

An employee with no overlapping pairs produces no rows on the join side, so
the totals are attached with a `LEFT JOIN` from the swept employees and
wrapped in `COALESCE(..., 0)`, and every employee appears once. The join
holds each employee's `k` same-date shifts against each other — `Σ k² ≤ N²`
candidate pairs over `N` total shifts — while the sweep sorts `2N` events;
both are bounded by the quadratic pairing.

**Complexity:** `O(N²)` time worst case from the pair join, `O(N log N)`
for the event sort, `O(N)` space beyond the input.
