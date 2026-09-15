# Solutions — Fix Names in a Table

One string recomposition per row fixes every name: keep `user_id` as it
is, and rebuild `name` from an uppercased first character followed by a
lowercased remainder.

## Uppercase the first character, lowercase the rest

The fix never inspects a name's shape — it always writes the same normal
form. `SUBSTR(name, 1, 1)` extracts the first character and
`SUBSTR(name, 2)` everything after it, so `UPPER(...) || LOWER(...)`
concatenates the two pieces into exactly the required shape: first
character uppercase, rest lowercase. Already-correct names pass through
unchanged (each piece is re-applied, never checked), and a
single-character name reduces to `UPPER` of that character with an empty
remainder.

`user_id` rides along untouched, and `ORDER BY user_id` finishes the
query with the required ordering. The judge compares result multisets,
so that ordering is a statement requirement rather than a comparison
one — row order cannot fail a case.

**Complexity:** `O(n log n)` time (ordering), `O(n)` space.
