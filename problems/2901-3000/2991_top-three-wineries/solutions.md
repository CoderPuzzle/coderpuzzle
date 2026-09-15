# Solutions — Top Three Wineries

## Sum per winery, rank per country, pivot the podium

The ranking works on two levels of aggregation. A winery's total is the
sum of its rows inside one country, so the first CTE applies
`GROUP BY country, winery` with `SUM(points)` and yields one `total_points`
per competitor — the same winery name in two countries stays two separate
rows. The second CTE then positions every competitor inside its country
with `ROW_NUMBER() OVER (PARTITION BY country ORDER BY total_points DESC,
winery)`: totals descending, winery name ascending as the tie-break, exactly
the statement's ordering. `ROW_NUMBER` rather than `RANK` is deliberate —
the output asks for three labeled slots, not peer groups, so a tie must be
resolved into positions 1, 2, 3 by the name order rather than sharing a
rank.

The final `SELECT` pivots the ranks into columns. Grouped by `country`,
each slot is `MAX(CASE WHEN rn = k THEN winery || ' (' || total_points ||
')' END)`, so a podium entry renders as the winery name followed by its
total in parentheses — `HarmonyHill (100)`. `MAX` over a group where slot
k's `CASE` never fires is `NULL`, and `COALESCE` replaces exactly those
holes with `'No second winery'` and `'No third winery'`; slot 1 always
exists because a country in the table has at least one winery.
`ORDER BY country` closes the query with the required ascending country
order.

Aggregating the `n` input rows into `w` winery totals is one pass, the
window sorts each country's competitors, and the pivot re-groups the same
`w` rows by country — the whole pipeline touches each row a constant
number of times plus the sorts. **Complexity:** `O(n + w log w)` time,
`O(n)` space.
