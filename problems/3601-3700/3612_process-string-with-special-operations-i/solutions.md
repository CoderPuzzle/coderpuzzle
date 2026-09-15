# Solutions — Process String with Special Operations I

## Simulate the operations directly

The four specials are local edits to the result built so far, so the most
faithful implementation performs exactly those edits on a mutable string as
it scans `s` left to right. Letters append, `*` pops the last character when
one exists, `#` doubles the whole string onto itself, and `%` reverses it.
The result of each operation is used immediately by the next one, which is
precisely the "current result" the rules describe.

With `s` capped at 20 characters the result cannot outgrow `2^19`
characters — one letter followed by nineteen `#` operations is the fastest
growth the input allows — so the largest intermediate is only about half a
million characters. The two operations that touch every character (`#` and
`%`) reallocate at most a few million characters in total across the whole
scan, far inside the time budget, and a direct transcription leaves no room
for interpretation error: the branch for each rule is a literal encoding of
that rule, including the "if it exists" guard on `*`, which leaves an empty
result empty.

The four branches are disjoint, so the scan needs no lookahead or
backtracking. Because each edit lands at the exact moment its rule fires,
the string held at the end of the loop is the final result with no
post-processing.

**Complexity:** `O(s.length · L)` time where `L` is the largest intermediate
length (`L ≤ 2^19`), `O(L)` space for the built result.
