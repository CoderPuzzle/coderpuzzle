# Solutions — Find Customer Referee

## The null-aware referee filter

The two qualifying populations both live in `referee_id`, so the query is a
single filter with two branches: `WHERE referee_id IS NULL OR referee_id != 2`
keeps every row whose referrer is nobody — `referee_id` null — and every row
whose referrer is somebody other than customer 2, and the projection is the
answer's one column, `name`.

The second branch alone is a trap. In SQL the comparison `null != 2` is
unknown, not true, so `WHERE referee_id != 2` on its own silently drops the
unreferred — exactly the customers the `IS NULL` branch exists to keep; the
same rescue is available as a coalesce, `IFNULL(referee_id, 0) != 2`, which
maps null to 0 before comparing. The boundary is exact: a `referee_id` of 2
is excluded, while 1 and 3 — or any other integer, negative or huge — are
kept, and a customer's own `id` never enters the filter: customer 2 is an
ordinary customer here, kept or dropped by their `referee_id` like anyone
else, and a customer who referred themselves qualifies unless their referee
id is 2.

One scan over the `C` rows of `Customer` streams the qualifying `name` values
out; nothing beyond the output itself is retained. Equivalent shapes reach
the same rows — the `IFNULL`/`COALESCE` coalesce above, or the null-safe
inequality `referee_id IS NOT 2`, which dialects such as SQLite evaluate as
true on null — but the two-branch predicate states both populations directly.

**Complexity:** `O(C)` time, `O(1)` space.
