# Solutions — Products With Three or More Orders in Two Consecutive Years

## Count orders per product and year, then join adjacent-year counts

The whole question lives at the (product, year) grain, so the query first
collapses the table to that grain: `strftime('%Y', purchase_date)` reads
the calendar year back out of each date — SQLite stores these dates as
ISO-8601 text, so the pattern simply lifts the leading four characters —
and one `GROUP BY product_id, yr` turns every product's orders into a
per-year count, cast to an integer so year arithmetic is numeric. The
result, aliased `yearly`, holds exactly one row per product per year it
was ordered in.

Qualifying is now a two-row property: some pair of `yearly` rows for the
same product whose years differ by exactly one, both counts at least
three. A self-join states that directly — `yearly a, yearly b` with
`a.product_id = b.product_id AND b.yr = a.yr + 1 AND a.orders >= 3 AND
b.orders >= 3`. The explicit `yr + 1` test matters: a window function's
LEAD would hand back the next year _present in the table_, silently
comparing 2020 against 2022 when 2021 had no orders at all, while this
join finds nothing to pair with and correctly rejects the gap.

`DISTINCT` carries the report-each-product-once contract: a product
ordered heavily across three straight years produces two qualifying
pairs, (y, y+1) and (y+1, y+2), and both join rows name the same
`product_id`, which collapses to one output row. No `ORDER BY` is needed
— the statement accepts the rows in any order.

Aggregating sweeps the n orders once into g product-year groups; the
self-join then pairs those groups, quadratic in g alone — tiny next to n,
since g is bounded by products times years actually present — and the
distinct pass keeps one row per qualifying product.

**Complexity:** `O(n + g^2)` time for n orders and g product-year groups,
`O(g)` space.
