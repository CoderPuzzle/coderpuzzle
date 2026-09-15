# Solutions — Percentage of Users Attended a Contest

## Group Register by contest, divide by the total user count

Each contest's numerator is the count of `Register` rows carrying its
`contest_id` — `GROUP BY contest_id` gathers those rows for every
contest that appears in the table, one group per contest, and
`COUNT(user_id)` counts the registrants inside each group. The
denominator is fixed across every contest: the total number of rows in
`Users`, fetched once with a scalar subquery `(SELECT COUNT(*) FROM
Users)` rather than a join, so it never inflates or shrinks with a
particular contest's registrant count. `* 100.0` forces floating
division before the ratio is taken — SQLite's integer division would
truncate a fraction like `1/3` to `0` — and `ROUND(x, 2)` rounds the
percentage to two decimal places, ties going away from zero (an exact
`3.125` rounds up to `3.13`).

`ORDER BY percentage DESC, contest_id ASC` finishes the query with the
required sort: highest attendance first, and contests tied at the same
percentage broken by ascending `contest_id`. A contest with no rows in
`Register` never enters the grouping and so never appears in the result,
matching the table's own definition of which contests exist.

**Complexity:** proportional to the size of `Register`, dominated by the
grouping scan and the final sort of the per-contest percentages.
