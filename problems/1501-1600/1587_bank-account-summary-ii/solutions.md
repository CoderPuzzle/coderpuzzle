# Solutions — Bank Account Summary II

## Aggregate transactions per account, then filter on the sum

Group `Transactions` by `account` and sum `amount` to get each
account's balance in one pass, then join that aggregate onto `Users`
by `account`. An account with no rows in `Transactions` never
produces a group, so a plain inner join already drops it correctly —
its balance is 0, which can never exceed the 10000 threshold anyway.

Apply the `> 10000` filter with a `HAVING` clause on the grouped sum
rather than a `WHERE` clause on a per-row `amount`, since the
threshold applies to the aggregate balance, not to any individual
transaction. Project `name` alongside the summed `amount` as
`balance`.

**Complexity:** `O(n)` time and `O(n)` space, where `n` is the number
of transactions — a single grouped scan of `Transactions` followed by
a join onto `Users`.
