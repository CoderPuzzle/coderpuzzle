# Solutions — Friend Requests I: Overall Acceptance Rate

## Distinct pairs, then one ratio

Both terms of the rate are counts of distinct user pairs, and nothing
joins the two tables. `SELECT DISTINCT sender_id, send_to_id FROM
FriendRequest` reduces the request log to one row per requested pair —
three copies of `(1,2)` on three dates are one request as far as the
rate is concerned — and its `requester_id, accepter_id` twin does the
same for acceptances. `COUNT(*)` over each reduction is the denominator
and the numerator. An acceptance counts in the numerator whether or not
a matching request exists, so the rate can exceed `1`, and direction is
part of every pair: `(1,2)` and `(2,1)` stay two requests and two
acceptances because the `DISTINCT` spans both id columns in each
table's own order.

The arithmetic then carries two guards. SQLite's `/` on integers
truncates — `1/3` is `0`, which would flatten every honest rate — so
the acceptance count is multiplied by `1.0` first and the quotient is a
real number. A dataset with no requests divides by zero, and the
problem pins that case to `0.00` rather than `NULL`:
`NULLIF(requests, 0)` turns the zero denominator into `NULL`,
`COALESCE(..., 0)` maps it back to `0`, and `ROUND(x, 2)` rounds the
quotient to two decimals, ties going up (`1/8` is exactly `0.125` and
rounds to `0.13`). Each count is an aggregate, so it returns exactly
one row even over an empty table, and the `CROSS JOIN` of the two
one-row CTEs leaves a single `accept_rate` row.

Each table is scanned once into its distinct-pair set — `R` request
rows shrinking to at most `R` pairs, `A` acceptance rows likewise —
and one row leaves.

**Complexity:** `O(R + A)` time, `O(R + A)` space.
