# Solutions — Find Third Transaction

## Sequence each user with windows, keep the rising third

One CTE walks every user's history in date order: `ROW_NUMBER() OVER
(PARTITION BY user_id ORDER BY transaction_date)` numbers each transaction
inside its user, while two `LAG(spend, k)` windows over the same partition
carry the spend one and two positions back. For the row numbered 3 those
lagged values are exactly the two preceding transactions' spends, so the
outer filter — `rn = 3 AND spend > prev_spend_1 AND spend > prev_spend_2` —
keeps precisely the third transactions that strictly top both of their
predecessors. Users with fewer than three rows never produce an `rn = 3`
row and drop out on their own, and later transactions are never examined.

The composite key `(user_id, transaction_date)` makes the per-user date
order total, so the numbering has no tie-breaking freedom to get wrong, and
`user_id` is unique among surviving rows, which makes the final `ORDER BY
user_id` deterministic. The two output aliases emit the spend and the date
of the surviving third transaction under the column names the statement
fixes.

The window sort dominates the cost: with `T` transactions the engine sorts
each partition once, and the filter and final sort are linear passes over
the windowed rows.

**Complexity:** `O(T log T)` time, `O(T)` space.
