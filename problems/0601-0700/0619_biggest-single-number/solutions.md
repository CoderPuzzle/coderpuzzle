# Solutions — Biggest Single Number

## One aggregate over the singleton groups

The problem is two questions in sequence: which values occurred exactly
once, and what is the largest of those. `GROUP BY num` answers the first —
it collapses each cluster of equal rows into one group whose `COUNT(*)` is
that value's frequency — and `HAVING COUNT(*) = 1` keeps only the singleton
groups. Feeding that set to the outer scan as `WHERE num IN (subquery)`
leaves a table holding just the single numbers, and `MAX(num)` over it is
the answer.

The result's shape is as much the problem as its value. The other natural
spelling of "largest" — `ORDER BY num DESC LIMIT 1` over the singles — fails
the second example: when every number is duplicated the singles set is empty
and `LIMIT 1` returns zero rows, while the statement asks for one row
holding null. `MAX` produces exactly that, because an aggregate without
`GROUP BY` always returns one row, and over an empty set that row's value is
null. The same property handles the empty table with no special casing, and
it is why no `IFNULL`/`COALESCE` wrapper belongs in the query: the null is
not a defect in the value but the correct value, and no wrapper can conjure
the missing row for the `LIMIT` form anyway. A window function —
`COUNT(*) OVER (PARTITION BY num)` annotating each row with its own
frequency, then the same filter and `MAX` — spells the same computation
without a subquery.

The subquery is uncorrelated, so the engine can evaluate it once: one scan
builds the per-value counts, a second pass over the table filters
membership, and `MAX` folds the survivors — with nothing beyond the count
set materialized.

**Complexity:** `O(n)` time, `O(n)` space.
