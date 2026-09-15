# Solutions — Calculate Orders Within Each Interval

## Group By the Integer-Division Interval Number

Every output column is a function of a single grouping key — the interval
number — so one `GROUP BY` produces the whole result. Because minutes are
1-based, minute `m` falls in interval `(m - 1) / 6 + 1`: integer division
by 6 maps minutes 1-6 to interval 1, minutes 7-12 to interval 2, and so
on, exactly the bucketing the statement describes. The interval count is
always `total_rows / 6`, and each interval appears exactly once in the
output, so no group needs post-filtering or padding.

The aggregates themselves are plain `SUM(order_count)` — every row of an
interval participates, and SQLite sums in 64-bit, so totals far beyond
the 32-bit per-row range stay exact. Grouping directly on the `interval_no`
alias (computed in the select list) keeps the formula in one place, and
the final `ORDER BY interval_no` emits the groups in the ascending order
the statement requires.

**Complexity:** `O(N log N)` time for the grouped aggregation over `N`
orders rows (SQLite builds a temporary b-tree on the group key), `O(G)`
space for the `G` produced intervals.
