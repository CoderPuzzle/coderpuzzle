# Solutions — Customer Who Visited but Did Not Make Any Transactions

## Left anti-join onto Transactions, grouped and counted

The wanted set is a difference over `Visits` rows, not over customers:
`Visits v LEFT JOIN Transactions t ON t.visit_id = v.visit_id` keeps
every visit, filling in the `Transactions` columns when a match exists
and leaving them null otherwise. `WHERE t.transaction_id IS NULL` keeps
exactly the unmatched visits — the anti-join, stated inline — regardless
of how many transactions a matched visit carries: a visit with three
transactions produces three joined rows, all non-null, all filtered out,
so it still counts zero toward the total.

Grouping the surviving rows by `v.customer_id` and taking `COUNT(*)`
then tallies each customer's no-transaction visits in one pass; a
customer with no unmatched visit at all has nothing left in the group
and drops out of the result on its own, which is the correct behavior
since customers with zero qualifying visits should not appear.

**Complexity:** `O(n)` time and `O(n)` space, where `n` is the combined
number of visit and transaction rows — every row is touched once by the
join and once by the aggregation.
