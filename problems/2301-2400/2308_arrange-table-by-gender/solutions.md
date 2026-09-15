# Solutions — Arrange Table by Gender

## Windowed rank per gender, then a cycle-aware sort

The output interleaves three independently ascending ID sequences, so the
query first gives every row its position inside its own gender's ascending
list: a CTE applies `ROW_NUMBER() OVER (PARTITION BY gender ORDER BY
user_id)` and calls it `rn`. Two rows from different genders share an `rn`
exactly when they occupy the same position in their respective groups.

The outer `ORDER BY` then sorts first by that rank and second by the
statement's fixed cycle. Ranking by `rn` pulls all first-position rows to
the front, then all second-position rows, and so on; within each rank the
`CASE` maps `'female'` to 0, `'other'` to 1, and `'male'` to 2, emitting
them in the required order. Because the three groups are equal in size,
the largest `rn` is identical across genders, so no rank is ever short a
row and the interleaving comes out perfectly even.

The partition both groups and orders each group in one pass, and the sort
walks the resulting rows once more. The two output columns are emitted in
the exact order the statement requires, so the row set is compared against
the expected table directly.

**Complexity:** `O(n log n)` time, `O(n)` space.
