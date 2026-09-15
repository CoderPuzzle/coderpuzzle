# Solutions — Ads Performance

## Approach: Conditional aggregation per ad

Every ad's CTR depends only on two counts of its own rows — how many
actions were `Clicked` and how many were `Viewed` — so one pass with
conditional aggregation answers everything: `SUM(CASE WHEN action =
'Clicked' THEN 1 ELSE 0 END)` and the `Viewed` twin, computed inside a
single `GROUP BY ad_id`. `Ignored` rows fall out of both sums, which is
exactly the statement's "we do not care about Ignored Ads".

The rate is `clicked * 100.0 / (clicked + viewed)` — multiplying by the
real `100.0` keeps the division fractional — and `ROUND(..., 2)` gives the
two-decimal answer. An ad whose rows are all `Ignored` divides zero by
zero, which is `NULL` in SQL, so `COALESCE(..., 0)` supplies the required
`0.00`. The outer `ORDER BY ctr DESC, ad_id ASC` matches the statement's
ordering rule.

**Complexity:** `O(R)` time over `R` rows (plus the sort of the grouped
output), `O(A)` space for `A` distinct ads.
