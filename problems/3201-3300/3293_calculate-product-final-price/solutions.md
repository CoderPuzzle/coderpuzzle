# Solutions — Calculate Product Final Price

## LEFT JOIN products to discounts, apply the percentage

The answer is one row per product, and a product must appear even when its
category has no row in `Discounts` — that rules out an inner join, which
would silently drop exactly the rows the statement says keep their price.
Starting from `Products` and `LEFT JOIN`ing `Discounts ON category` keeps
every product and attaches the discount where one exists; for the others the
discount columns come back NULL, and `COALESCE(discount, 0)` turns that into
"no discount at all". The price itself is then a single expression:
`price * (100 - discount) / 100`, which reads directly as the statement's
"price minus discount percent of price". The example walks it end to end:
Electronics carries 10%, so products 1 and 3 land on 900 and 1080; Clothing
carries 20%, so product 2 lands on 40; Home has no row in `Discounts`, so its
`COALESCE` yields 0 and product 4 stays at 500.

An alternative shape computes the kept price with a `CASE WHEN d.category IS
NULL THEN p.price ELSE ... END`, or unions a matched join against an
anti-join of undiscounted products; both reach the same rows but carry more
machinery for what `COALESCE` already expresses. The join is the whole cost:
for each product SQLite probes the discounts table by the join key, and with
an index on `Discounts(category)` that is O(N + M) over N products and M
discounts — effectively linear. Without any index the probe degrades to a
scan per product, O(N * M); either way grouping plays no part here because
the output grain is the input grain.

`ORDER BY product_id` presents the required table. The judge compares result
rows as an unordered multiset, so that ordering is presentation rather than
correctness, but it costs nothing beyond the sort itself.

**Complexity:** `O(N log N)` time with the output sort (`O(N)` without),
`O(N)` space for the result rows.
