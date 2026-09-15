# Solutions — Users With Two Purchases Within Seven Days

## Pair every user's purchases, keep the pairs inside a week

A user qualifies when some two of their purchase dates are at most 7 days
apart — the pair need not be adjacent in time, and "at most" includes same
day (distance 0) and exactly 7. A self-join of `Purchases` with itself on
`user_id` enumerates every within-user pair once by requiring
`p1.purchase_id < p2.purchase_id`, and `julianday` turns each date into a
day number so the window test is one absolute-difference comparison
(`ABS(...) <= 7`) that works regardless of which row holds the earlier date.
`DISTINCT` collapses the surviving pairs back to users, and `ORDER BY
user_id` finishes the required shape.

The join is quadratic in each user's purchase count but linear in users, so
it stays cheap for any realistic log table; the empty-table case naturally
returns no rows.

**Complexity:** `O(n²)` time in the worst case (one user, n purchases),
`O(n)` space.
