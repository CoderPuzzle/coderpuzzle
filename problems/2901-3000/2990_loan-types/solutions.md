# Solutions — Loan Types

## Group per user and require both types

The qualification is a per-user property: among all of a user's rows,
at least one must carry `Refinance` and at least one must carry
`Mortgage`. Collapsing the rows per user is exactly what `GROUP BY
user_id` does, and the `HAVING` clause turns the requirement into two
counted conditions: `COUNT(CASE WHEN loan_type = 'Refinance' THEN 1 END)`
and its `Mortgage` twin must both exceed zero.

Grouping also settles distinctness for free — each user collapses to one
group, so a user holding three Refinance loans and two Mortgage loans
still yields exactly one output row. Loan types other than the two targets
never increment either counter, so surrounding `AutoLoan` or `Inschool`
rows are pure noise, and the string comparison is exact, so near-miss
spellings simply do not count. The surviving groups are emitted with
`ORDER BY user_id`, the ascending order the statement fixes.

The query scans the `n` loan rows once to build and filter the groups, and
sorts only the qualifying users. **Complexity:** `O(n log n)` time, `O(n)`
space.
