# Solutions — Market Analysis III

## Two-level aggregation: count distinct non-favorite items, keep the max

The inner query does the scoring: join `Orders` to `Items` for each
item's brand and to `Users` for each seller's favorite brand, keep only
the orders where the two differ (`i.item_brand <> u.favorite_brand`),
group by seller, and count `DISTINCT item_id` — distinct because the
same item ordered repeatedly is one unique item, as the example's seller
2 shows. The `WHERE` runs before grouping, so favorite-brand orders are
excluded before the count; sellers whose every order matches their
favorite brand form no group at all and never appear.

The outer query keeps the winners: a correlated-free scalar subquery
reduces those per-seller counts to the single maximum, and the `HAVING`
clause compares each group's count against it. Ties therefore survive —
every seller at the maximum is returned, which is the "if there are
multiple sellers with the same highest count, return all of them" rule —
while `ORDER BY o.seller_id` emits them in the ascending order the
statement fixes. When no seller has any non-favorite order, the inner
query is empty, `MAX` yields `NULL`, and the comparison eliminates every
group, so the result is empty.

Each aggregation scans the orders once after the joins; with `R` orders
the two levels are two passes plus a small sort of the winning group
keys.

**Complexity:** `O(R log R)` time, `O(S)` space.
