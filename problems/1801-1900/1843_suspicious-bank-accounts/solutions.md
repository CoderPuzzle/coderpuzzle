# Solutions — Suspicious Bank Accounts

Two months are consecutive only in the calendar sense: `2021-01` is
followed by `2021-02`, and December wraps into January of the next year.
A month with no deposits at all is still a real month — it breaks any
streak — so the check must run on the actual calendar, not on the list of
months that happen to appear in the data.

## Group by account-month, self-join on the next month

The inner query groups `'Creditor'` transactions by `(account_id,
SUBSTR(day, 1, 7))` to get one income figure per account per active
month. The outer query then joins that grouped set to itself on the same
account where the second row's month is the _calendar successor_ of the
first's — computed by incrementing the month number and rolling over
into the next year at December — and finally requires both rows' incomes
to exceed the account's `max_income` (joined from `Accounts`). Any pair
that survives proves two consecutive over-limit months, so the account is
suspicious; `DISTINCT` collapses the possibly several qualifying pairs
into one report row.

The successor arithmetic matters because naive approaches fail both ways:
matching "the next row for this account" would bridge silent months (an
account over-limit in January and March is clean), while string-comparing
`YYYY-MM` values breaks across year boundaries. The explicit
increment-and-rollover handles December-to-January correctly, as the
year-boundary case exercises. The work is one grouping pass over the
transactions plus a self-join on the much smaller monthly set.

**Complexity:** `O(T)` time to build the months and `O(M² / A)` worst-case
for the per-account join (`T` transactions, `M` account-months, `A`
accounts; each month pairs only with its successor), `O(M)` space.
