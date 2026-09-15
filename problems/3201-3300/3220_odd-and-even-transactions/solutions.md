# Solutions — Odd and Even Transactions

## Group each day and split the sums by amount parity

The answer lives at day granularity, so `GROUP BY transaction_date` collapses
each day's rows into a single group, and two conditional sums reduce the group
to its terms: `SUM(CASE WHEN amount % 2 = 1 THEN amount ELSE 0 END)` totals
the odd amounts and its `% 2 = 0` twin totals the even ones. The `ELSE 0`
branch is what implements "display as 0" — a day carrying no transaction of
one kind simply adds zero on that side — so no outer join or `COALESCE` is
needed, and only days that actually have rows form groups: a calendar date
with no transaction produces no row at all.

The parity that classifies a transaction belongs to its amount, not to its
id: in the worked example 2024-07-01 reports `odd_sum` 75 from the
amount-75 transaction while the odd ids 1 and 3 hold 150 + 75 = 225 — which
the expected output never contains. Amounts are integers, so both sums are
exact; dates are stored as `'YYYY-MM-DD'` text, so grouping is exact equality
and `ORDER BY transaction_date` orders chronologically. The judge compares
rows as an unordered multiset, so that ordering is fidelity to the statement
rather than a correctness requirement.

One aggregation pass reads the `N` rows of `Transactions` once and
materializes one row per distinct day, `D` of them; ordering those `D` rows
costs a sort.

**Complexity:** `O(N + D log D)` time, `O(D)` space.
