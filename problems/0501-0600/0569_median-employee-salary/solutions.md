# Solutions — Median Employee Salary

## Number the sorted rows, keep the middle

The median of a company is a position in an order, so give every row its
position: `ROW_NUMBER() OVER (PARTITION BY company ORDER BY salary, id)`
sorts each company's rows by salary — ties broken by id, exactly as the
contract demands — and numbers them from 1, while
`COUNT(*) OVER (PARTITION BY company)` carries that company's row count `n`
on every row. Both windows partition by `company`, so numbering never leaks
across companies and the count is per company, not global; equal salaries
inside one company resolve to a deterministic order before the numbers are
handed out, which is what makes the id tiebreak decide which of two
equal-salary rows stands at the median position.

The two parities then collapse into one integer-division test. When `n` is
odd, `(n+1)/2` and `(n+2)/2` both evaluate to the same middle position —
for `n=5`, both `3` — and `rn IN ((cnt + 1) / 2, (cnt + 2) / 2)` keeps that
one row; when `n` is even they are the two middle positions — for `n=6`,
`3` and `4` — and both rows survive. SQLite's `/` on integers truncates,
which is precisely the floor this formula needs; a one-employee company
keeps its only row because both positions are `1`, and equal salaries
sitting at the two middle positions of an even company each keep their own
row. The judge compares rows as an unordered multiset, so no `ORDER BY` is
needed on the way out — and none is pretended to.

The window pass sorts each company's rows once to feed both functions —
`ROW_NUMBER` rides the sort, and the partition `COUNT` is a running tally
per group — so nothing beyond the sort buffer is materialized. With `E`
rows across all companies the sort dominates.

**Complexity:** `O(E log E)` time, `O(E)` space.
