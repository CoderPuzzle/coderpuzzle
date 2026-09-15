# Solutions — Find Loyal Customers

## One Group per Customer, Judged in HAVING

Every loyalty rule is a property of a customer's transaction set, so the
query is a single grouped pass: group `customer_transactions` by
`customer_id` and judge all three criteria inside each group. The
purchase count is `SUM(transaction_type = 'purchase')`, since SQLite
scores each row's type test as 1 or 0. The active period is the gap
between a group's extreme dates, measured with `julianday`: converting
the ISO dates to Julian day numbers turns the span into a plain
subtraction, and requiring at least 30 of those days is exactly the
statement's floor.

The refund rate never needs division. Being below 20% means
refunds / total < 1/5, and cross-multiplying keeps the whole decision in
integers: `5 * refunds < total`. All three tests are per-group facts, so
they live in `HAVING` — customers that miss any one of them simply lose
their entire group, which is what an empty result looks like here, with
no outer joins or extra branches. `ORDER BY customer_id ASC` emits the
required row order straight from the grouping key.

Each transaction row is read once and feeds a constant number of
aggregate terms, so with hash grouping the query runs in one linear
sweep over the table (sort-based plans add a log factor); working
storage holds one accumulator set per distinct customer.

**Complexity:** `O(T)` time and `O(C)` space for `T` transactions and
`C` customers.
