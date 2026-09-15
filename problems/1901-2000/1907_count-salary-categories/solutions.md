# Solutions — Count Salary Categories

Each account lands in exactly one of three bands, so the answer is three
independent counts over the same table, glued into one row set — no join,
no grouping column, just one counted scan per category.

## One counted scan per category, UNION ALL

Each branch of the `UNION ALL` reads `Accounts` through a `CASE` that
marks only the rows its category owns: `income < 20000` for `"Low
Salary"`, `BETWEEN 20000 AND 50000` for `"Average Salary"` (the band is
inclusive on both ends, so exactly 20000 and exactly 50000 are average),
and `income > 50000` for `"High Salary"`. `COUNT` ignores the NULL a
non-matching row produces, so each branch returns one number — the size
of its band — with the category name riding along as a literal.

`COUNT` rather than `SUM` is what makes the empty-table case fall out
for free: `SUM` over zero rows is NULL, but `COUNT` over zero rows is 0,
which is exactly the value the statement demands for a category nobody
lands in. The three branches run with no `WHERE` between them, so an
empty `Accounts` still yields all three rows as zeroes, and no account is
ever dropped or double-counted because every `income` satisfies exactly
one of the three mutually exclusive, collectively exhaustive conditions.

**Complexity:** `O(n)` time (three linear scans of the table), `O(1)` extra
space.
