# Solutions — Bitwise User Permissions Analysis

## Spread the masks across bit positions, then MIN/MAX each column

SQLite has no `BIT_AND`/`BIT_OR` aggregates, so the query first builds
the vertical structure that makes those folds expressible with ordinary
aggregates: a recursive `bits` CTE numbers every bit position the masks
can touch, and a cross join re-renders each permission row thirty-one
times — one copy per settable bit. Grouping by position and taking
`MIN((permissions >> b) & 1)` collapses a whole column of users into
a single 0/1 verdict for "does everyone own this bit", while
`MAX((...) & 1)` answers "does anyone". Shifting each verdict back to its
position (`and_bit << b`) and summing the columns reassembles the two
aggregate integers exactly: a sum of distinct powers of two is just the
number whose binary digits are those verdicts.

The row count after the cross join is at most 31 × table size, so the
whole computation is linear in input size regardless of how sparse or
dense the masks are. The result comes back as one row — `common_perms`
then `any_perms` — which trivially satisfies the statement's any-order
guarantee. Permissions are non-negative and below 2³¹ in every dataset,
so no sign extension ever pollutes the shifted extracts.

**Complexity:** `O(U · B)` time and space for `U` users and `B = 31` bit
positions — effectively `O(U)`.
