# Solutions — Bank Account Summary

## Aggregate paid and received amounts separately, then combine

Compute each user's total paid and total received as two separate
`GROUP BY` subqueries over `Transactions` — one grouped by `paid_by`,
one grouped by `paid_to` — and `LEFT JOIN` both onto `Users`. A user
who never appears on one side of a transaction gets no matching row
from that subquery, so `COALESCE` turns the resulting `NULL` into 0
before it enters the arithmetic. This keeps users with zero
transactions, or with transactions on only one side, correct without
special-casing them.

The current balance is then `credit + received - paid`, reused both
as the projected `credit` column and inside a `CASE` that reports
`credit_limit_breached` as `"Yes"` only when that balance is strictly
negative — a balance of exactly 0 does not breach the limit.

**Complexity:** `O(n)` time and `O(n)` space, where `n` is the number
of transactions — each subquery scans `Transactions` once and the
two aggregates join back onto `Users` in a single pass.
