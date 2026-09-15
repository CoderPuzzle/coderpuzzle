# Solutions — Big Countries

## The two-threshold OR filter

A country is big on either of two independent measures, so the query is a
single filter with two branches: `WHERE area >= 3000000 OR
population >= 25000000` keeps every row whose area reaches three million
square kilometers and every row whose population reaches twenty-five
million, and the projection is the answer's three columns, `name`,
`population`, and `area`.

The boundaries are exact and inclusive: "at least" means `>=`, so an area
of exactly `3000000` or a population of exactly `25000000` qualifies,
while `2999999` and `24999999` fall one short and are dropped. The other
trap is the connective: `AND` demands both bars at once and silently
discards every country that is big on exactly one measure; `OR` is what
either-threshold says. A country big on both still leaves exactly once,
because the predicate is one test per row, not one per qualifying measure.

One scan over the `W` rows of `World` streams the qualifying rows out;
nothing beyond the output itself is retained. Equivalent shapes reach the
same rows — a `UNION` of the two single-threshold filters, where the
duplicate a both-big country produces in the two branches collapses back
to one because `name` is the primary key and the paired rows are
identical, or two `CASE` indicators summed and tested `>= 1` — but the
two-branch `OR` states both populations directly.

**Complexity:** `O(W)` time, `O(1)` space.
