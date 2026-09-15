# Solutions — Average Selling Price

## Join each sale to its period, then weigh and divide

A sale belongs to exactly one price period — the one covering its
`purchase_date` — so the join condition carries both the product match and
the date range `BETWEEN start_date AND end_date`. Because periods for one
product never overlap, each `UnitsSold` row meets at most one `Prices` row
and no sale is double counted.

The average is the revenue-weighted price: `SUM(units * price) / SUM(units)`
over each product's joined rows, `ROUND(..., 2)` as the statement asks. The
`* 1.0` keeps the division in real arithmetic rather than integer division.

Products with no sales (or none inside any period) keep their `Prices` row
through the left join, but both sums come out null — `NULLIF` guards the
zero-denominator case and `COALESCE` maps the null result to the `0` the
statement assigns to unsold products.

**Complexity:** `O(p + u)` rows joined and aggregated for `p` price periods
and `u` sales; `O(g)` space for the `g` product groups.
