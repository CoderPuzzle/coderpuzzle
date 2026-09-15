# Solutions — Friday Purchases II

A Friday calendar for November 2023, left-joined against the purchases.

## Generate the calendar, then left-join the purchases

The answer must list all four Fridays of November 2023 even when the table
holds no row for some of them, so the driving rows cannot come from
`Purchases`. A recursive CTE supplies them instead: it seeds
`DATE('2023-11-01')` and repeatedly applies `DATE(d, '+1 day')` while `d`
stays below `DATE('2023-11-30')`, producing the thirty days of the month.
The `WHERE strftime('%w', d) = '5'` filter acts on this generated side and
keeps only the four Fridays — the 3rd, 10th, 17th, and 24th — before any
matching happens.

Each surviving calendar day is then `LEFT JOIN`-ed to `Purchases` on the
date. A Friday with purchases matches one joined row per purchase, and
`SUM(amount_spend)` totals them; a Friday without purchases matches
nothing, but the outer join keeps the day alive as a single row whose
`amount_spend` is null — `SUM` over that lone null is null, and
`COALESCE(..., 0)` turns it into the required 0. Grouping by `d` collapses
each day's joined rows into the one output row. Because the filter sits on
the preserved side of the join, it never degrades the `LEFT JOIN` into an
inner one.

The `week_of_month` label reuses the same arithmetic as the single-Friday
variant: `CAST(strftime('%d', d) AS INTEGER)` is the day of the month and
`(day + 6) / 7` its ceiling over sevens, so the four Fridays read 1, 2, 3,
4 and the closing `ORDER BY week_of_month` emits them earliest-first. The
CTE materializes a constant 30 rows and each table row participates in one
join probe, so with `n` rows in `Purchases` the whole query is linear in
`n` plus a constant-size calendar.

**Complexity:** `O(n)` time, `O(1)` auxiliary space beyond the fixed
30-day calendar.
