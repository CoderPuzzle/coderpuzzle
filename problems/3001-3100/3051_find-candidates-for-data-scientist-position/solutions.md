# Solutions — Find Candidates for Data Scientist Position

## Group by candidate, count distinct required skills

Qualification is decided per candidate, never per row, so the query gathers
`Candidates` into one group per `candidate_id` and judges what each group
holds. `WHERE skill IN ('Python', 'Tableau', 'PostgreSQL')` first discards
every row whose skill is none of the three; the comparison is exact and
case-sensitive, so `python`, `Pythons`, and `Python` with a trailing space
are merely more unrelated strings and drop out alongside `R` and `Java`.
What survives for each candidate is their personal subset of the required
trio, and `HAVING COUNT(DISTINCT skill) = 3` keeps exactly the complete
ones. The count must run over distinct skills and must reach the full trio:
counting bare rows would promote anyone holding any three skills at all,
and counting without `DISTINCT` would silently lean on the `(candidate_id,
skill)` primary key forbidding repeated rows — `DISTINCT` states the actual
condition, three different required skills held.

`ORDER BY candidate_id ASC` produces the demanded ascending order. The judge
compares result rows as an unordered multiset, so the sort dresses the answer
rather than deciding it — and it is never contested: each qualifying
candidate contributes exactly one output row, so no two rows ever contend for
a position and the demanded order is total.

The scan touches each of the `n` rows once, grouping folds them into at most
one group per candidate, and the final sort orders the `k` qualifying ids.

**Complexity:** `O(n log n)` time, `O(n)` space.
