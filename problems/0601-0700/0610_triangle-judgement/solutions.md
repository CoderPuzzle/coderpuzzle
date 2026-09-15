# Solutions — Triangle Judgement

## One CASE over the three pair sums

Three line segments close into a triangle exactly when every pair of them
sums to strictly more than the remaining one — the triangle inequality.
A single `CASE` walks each row of `Triangle` and `AND`s the three
comparisons `x + y > z`, `x + z > y`, and `y + z > x`: all three true
yields `'Yes'`, anything else `'No'`, and the projection is the input row
plus its verdict, the four columns the example asks for.

Each comparison guards a different side, and any one of them can be the
one that fails — a side at least as long as the other two together can
never be met by them. For positive lengths at most one comparison can
fail, the one against the longest side, so testing `max(x, y, z)` against
the sum of the other two is an equivalent shape; picking that maximum
asks for a `max` of its own, while the three-way `AND` needs no ordering
and reads exactly like the definition. The comparisons must be strict: a
row where two sides sum to exactly the third is degenerate, its segments
collapsed onto one straight line, and it reads `'No'` — as does any row
with a zero side, which the same three comparisons reject without a
special case. No `ORDER BY` is needed: the statement accepts any row
order, and the judge compares rows as an unordered multiset.

Every row is decided from its own three values, so one scan of the `n`
rows settles everything and only the output is retained.

**Complexity:** `O(n)` time, `O(1)` space.
