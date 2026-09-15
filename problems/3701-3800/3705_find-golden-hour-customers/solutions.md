# Solutions — Find Golden Hour Customers

## Tag Peak Orders Once, Then Judge Every Bar in HAVING

Every golden-hour rule is a property of one customer's set of orders, so
the query is a single grouped pass. A small derived table scans
`restaurant_orders` once and tags each row with an `is_peak` flag: the
time of day extracted with `strftime` has a fixed `HH:MM:SS` shape, so
comparing it as plain text against the four window bounds is already a
chronological comparison, and the half-open lunch and evening windows
become one two-branch `CASE`. Everything downstream aggregates that flag
instead of re-deriving the predicate.

The outer query groups by `customer_id` and judges all four bars in
`HAVING`, keeping every decision in integer arithmetic. The order-count
floor is `COUNT(*) >= 3`. The two share bars are cross-multiplied to
dodge floats: `5 * SUM(is_peak) >= 3 * COUNT(*)` pins the 60% bar, and
`2 * COUNT(order_rating) >= COUNT(*)` pins the half-coverage bar. The
rating bar `SUM(order_rating) >= 4 * COUNT(order_rating)` says the rated
rows average at least 4.0 with no division at all.
`COUNT(order_rating)` counts only non-NULL ratings, so unrated orders
widen the totals but never leak into the average, and a group with no
ratings at all dies on the coverage test before its NULL sum could
matter. Only after qualification do the reported columns round: the
peak share scaled by 100.0 and the rating sum scaled by 1.0 each pass
through `ROUND(..., 2)`, and ordering by the reported `average_rating`
descending, ties broken by `customer_id` descending, emits the mandated
order straight from the sort.

Each order feeds a constant number of aggregate terms, so with hash
grouping the whole query is one linear sweep over the table (a
sort-based plan adds only a log factor); working storage holds one
accumulator set per distinct customer.

**Complexity:** `O(T)` time and `O(C)` space for `T` orders and `C`
customers.
