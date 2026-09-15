# Solutions — Get Highest Answer Rate Question

## Count answers and shows, rank the ratio

The rate of a question lives at question granularity, so `GROUP BY
question_id` collapses the log and two conditional sums reduce each group
to its terms: `SUM(CASE WHEN action = 'show' THEN 1 ELSE 0 END)` is the
denominator — how often the question was shown — and its
`action = 'answer'` twin is the numerator. A `skip` row matches neither
condition and adds to neither sum, exactly as the definition demands, and
the table's freedom to carry duplicate rows is honored too: every copy is
a separate event and counts separately.

The ranking must divide without losing the fraction. SQLite's `/` on
integers truncates — `1/2` is `0`, which would flatten every rate below
`1` into a tie — so the answer tally is multiplied by `1.0` first and the
quotient is a real number. `ORDER BY` that quotient `DESC` with
`question_id` as the second key and `LIMIT 1` picks the highest rate,
smallest id breaking ties. The comparison is exact at these magnitudes:
equal rationals (`1/2` and `2/4`, or `1/3` and `2/6`) are the same real
number and round to the same double, so a true tie reaches the id
tiebreak, while distinct rationals over log-sized counts differ by far
more than double precision's spacing.

One boundary is undefined rather than extreme: a question with answers
but zero shows divides by zero — there is nothing to divide by — and no
undefined rate can be the highest. `HAVING` on the show tally drops those
groups before the ranking, so they neither win nor poison the ordering,
and a dataset where no question was ever shown leaves no row to report.

One aggregation pass over the `N` rows of `SurveyLog` materializes one
row per question, `Q` of them, and `ORDER BY ... LIMIT 1` sorts those `Q`
rows to surface the winner.

**Complexity:** `O(N + Q log Q)` time, `O(Q)` space.
