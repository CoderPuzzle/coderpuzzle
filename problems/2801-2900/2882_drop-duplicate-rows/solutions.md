# Solutions — Drop Duplicate Rows

## Keep the first row of each email with an aggregate over the ids

An email's first occurrence is, by the dataset contract, the row holding the
smallest `customer_id` among the rows with that email — so the rows to keep
are exactly the rows whose `customer_id` equals the minimum `customer_id` of
its email group. The inner query computes that keep-set in one sweep:
`GROUP BY email` collapses the rows sharing an email into one group and
`MIN(customer_id)` reads the first occurrence's id out of each group. The
outer query then keeps the rows whose id is in that set — the SQL
counterpart of the pandas mask `~customers['email'].duplicated()` followed
by indexing.

Because a duplicate row is dropped, not merged, every surviving row is an
original `(customer_id, name, email)` triple; no aggregation is applied to
the outer columns. The trailing `ORDER BY customer_id` restores the
seeding order, which is also the order in which the example's output table
lists the kept rows, so the result is the input table minus rows
`5`-style late duplicates: Finn's row is gone because `john@example.com`
already occurred at `customer_id = 4`.

**Complexity:** `O(n log n)` time, `O(n)` space — grouping `n` rows by
`email` costs an `n log n` sort-backed aggregation, the id set holds at
most one entry per distinct email, and the outer scan visits each row once.
