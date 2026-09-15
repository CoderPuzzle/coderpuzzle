# Solutions — Product Sales Analysis IV

## Pool each user's spending per product, then keep the per-user maximum

The comparison the statement asks for lives at the (user, product)
grain, so the query builds that grain first: `Sales` joins `Product` on
`product_id` to put each sale's `price` beside its `quantity`, and
`GROUP BY s.user_id, s.product_id` collapses a user's purchases of a
product into one row holding `SUM(quantity * price)`. Pooling before
comparing is what makes the answer right — the per-user winner is
chosen among whole products, never among individual sale rows, so a
product bought in several modest orders can still outspend a single
flashier one.

With spending pooled, each user's best total is one grouped `MAX` away:
CTE `best` reduces `spent` to one row per user carrying that user's
winning spend. Joining `spent` back to `best` on user and on the exact
total keeps precisely the rows whose spend equals their user's maximum.
The shape absorbs the tie contract for free: a user whose top was
reached on k products contributes k surviving rows, which is exactly
"report all of them", while everyone else keeps one. Users exist in the
answer only through `Sales`, so an empty sales table forms no groups and
reports nothing. No `ORDER BY` is needed — the judge compares result
rows as an unordered multiset, and the statement accepts any order.

The join touches each of the n sale rows once; both aggregations sweep
their inputs linearly (n joined rows, then at most n user-product
groups), and the final join pairs those groups by user.

**Complexity:** `O(n log n)` time, `O(n)` space.
