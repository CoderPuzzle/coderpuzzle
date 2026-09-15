# Solutions — Number of Calls Between Two Persons

One grouping answers the question: collapse `Calls` on the unordered person
pair — normalized so the smaller id always lands in `person1` — and each
group's `call_count` and `total_duration` are the plain `COUNT(*)` and
`SUM(duration)` over its rows.

## Normalize each row to least/greatest, then group

Each call is stored from one side's perspective: the same pair may appear as
`from_id = 1, to_id = 2` in one row and the reverse in another, so grouping on
the raw columns would split it in two. The query canonicalizes every row
first: `CASE WHEN from_id < to_id THEN from_id ELSE to_id END` yields the
least of the two ids and the mirrored `CASE` its greatest — SQLite carries no
scalar `LEAST`/`GREATEST`, so the two `CASE` expressions spell the
normalization out. Because `from_id != to_id` holds on every row, the two
expressions name the pair unambiguously, with `person1 < person2` by
construction.

`GROUP BY` on both expressions then folds every row of a pair into one group —
whichever side each call was placed from — so `COUNT(*)` counts every call and
`SUM(duration)` totals them all. The table has no primary key and may contain
duplicates, and duplicates count individually: the example's (3, 4) pair holds
four rows, two of them byte-identical 200s, and reports `call_count` 4 with
`total_duration` 999. The statement allows the result in any order, so the
query carries no `ORDER BY` — the judge compares result multisets, and row
order cannot fail a case.

**Complexity:** `O(n log n)` time (grouping), `O(p)` space.
