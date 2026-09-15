# Solutions — Daily Leads and Partners

One grouping answers the question: collapse `DailySales` on the
(`date_id`, `make_name`) pair, and each group's `unique_leads` and
`unique_partners` are the distinct counts of its two id columns.

## Group on the pair and count distinct ids

`GROUP BY date_id, make_name` folds every row sharing both keys into one
group, and `COUNT(DISTINCT lead_id)` / `COUNT(DISTINCT partner_id)` reduce
each group's column to its set of values — the number of distinct ids, not
the number of rows. That distinction is the whole problem: the table has no
primary key and may contain duplicates, so the same (`date_id`, `make_name`,
`lead_id`, `partner_id`) row can repeat, and a repeated row must not move
either count. Plain `COUNT(*)` or an unmodified `COUNT` would inflate both
figures on duplicate rows; the `DISTINCT` inside each count absorbs them,
as the example's groups show (`toyota` on `2020-12-8` counts two leads
across three rows).

The statement allows the result in any order, so the query carries no
`ORDER BY` — the judge compares result multisets, and row order cannot fail
a case.

**Complexity:** `O(n log n)` time (grouping), `O(n)` space.
