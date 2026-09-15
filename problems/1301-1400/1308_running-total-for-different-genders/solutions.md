# Solutions — Running Total for Different Genders

## Cumulative window partitioned by gender

The running total is a cumulative sum: for each row, the sum of
`score_points` over all rows of the same gender whose day is less than or
equal to the current row's day. A window function expresses exactly that —
`SUM(score_points) OVER (PARTITION BY gender ORDER BY day)` accumulates
within each gender, in day order, without collapsing the rows the way a
plain `GROUP BY` would.

The primary key `(gender, day)` guarantees one row per gender per day, so
the ordered window has no ties to break and each day contributes exactly
once to its gender's running sum. Ordering the final output by `gender`
then `day` satisfies the statement's ordering requirement; because the
window's `ORDER BY day` already computes totals in calendar order, the
outer `ORDER BY` merely presents the same rows in the required sequence.

The window reads each row once, keeping only the partition's accumulator;
with `S` rows in `Scores` the work and the emitted result are both linear
in `S`.

**Complexity:** `O(S)` time, `O(S)` space.
