# Solutions — Maximum Transaction Each Day

A transaction belongs to a calendar day, not to the moment it happened:
`2021-4-28 08:47:25` and `2021-4-28 16:39:59` are the same day, while
`23:59:59` and the next midnight are different days. So the first step is
to reduce each `day` value to its date prefix, group by it, and find the
maximum `amount` inside each group.

## Rank rows per day, keep rank 1

The query partitions all rows by the date prefix of `day`
(`SUBSTR(day, 1, 10)` — the stored timestamps are zero-padded
`YYYY-MM-DD HH:MM:SS`, so the first ten characters are exactly the
calendar day), orders each partition by `amount` descending, and tags each
row with its `RANK()`. Ranking rather than row-numbering is what makes the
tie rule free: every transaction tied for a day's maximum shares rank 1,
and the outer filter `rnk = 1` keeps all of them. That is precisely the
example's third case — transactions `1` and `6` both have amount `58` on
their day, so both survive. The final `ORDER BY transaction_id ASC`
satisfies the statement's required output order; the comparison is
order-sensitive here because the statement pins one.

The window pass is one scan plus a sort per partition — `O(N log N)`
overall for `N` transactions, `O(N)` extra space for the tagged rows,
which is far inside the limits at any realistic table size. Days with a
single transaction fall out trivially (rank 1 of a one-row partition), and
an empty input produces no groups and no rows.

**Complexity:** `O(N log N)` time, `O(N)` space.
