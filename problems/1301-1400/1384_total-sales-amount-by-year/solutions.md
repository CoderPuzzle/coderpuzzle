# Solutions — Total Sales Amount by Year

## Approach: Cross the period with each report year and count overlapping days

Each sales period overlaps at most one day-window per report year, so join
`Sales` with a three-row years table (2018, 2019, 2020) and intersect
`[period_start, period_end]` with that year's `[Jan 1, Dec 31]`: the overlap
runs from `MAX(period_start, year start)` to `MIN(period_end, year end)`, and
its inclusive day count is the Julian-day difference plus one — kept only when
positive. Multiply by `average_daily_sales`, keep non-empty intersections,
join `Product` for the name, and order by `product_id`, `report_year`.

**Complexity:** `O(S)` time for `S` sales rows (each row joins against a
constant three-year table), `O(P * 3)` output for `P` products.
