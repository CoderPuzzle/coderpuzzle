# Solutions — User Purchase Platform

## Classify per user and day, aggregate per day, pad 'both' with zeros

The classification unit is one user on one date: someone who appears on both
platforms that day belongs to `'both'` and their two amounts must merge. So
the innermost subquery groups by `(user_id, spend_date)`, sums `amount`, and
derives the class with `CASE WHEN COUNT(DISTINCT platform) = 2 THEN 'both'
ELSE MAX(platform) END` — a single-platform user's `MAX` is just that
platform, and the two-platform case is caught first.

The middle query aggregates those classified rows into `SUM(amount)` and
`COUNT(*)` per `(spend_date, platform)`. Because the primary key allows at
most one row per user, date, and platform, counting rows equals counting
users.

Dates where nobody used both platforms would otherwise be missing a
`'both'` row, but the expected output carries it with zeros. A `UNION ALL`
against `SELECT DISTINCT spend_date, 'both', 0, 0 FROM Spending` supplies a
zero row for every date in the table; the outer `GROUP BY (spend_date,
platform)` folds it into a real `'both'` row (adding zero) or lets it stand
alone when none exists.

**Complexity:** `O(N log N)` time over `N` Spending rows for the two grouped
aggregations and the distinct-date scan, `O(N)` space for the intermediates.
