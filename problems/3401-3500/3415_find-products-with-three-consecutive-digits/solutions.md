# Solutions — Find Products with Three Consecutive Digits

A product qualifies when its name contains at least one maximal run of
digits and every such run has length exactly three. That reading comes
straight from the statement's note — a name may carry several digit
sequences, but each one must be three digits long — so `123x456y`
qualifies while `123x4567y` and `Product56789` do not.

## Forbid every wrong run shape with GLOB patterns

SQLite's `GLOB` supports character classes including negated ones, so
"every maximal run is exactly three" decomposes into one positive test
and a handful of negative ones. The positive test is `*[0-9]*` — the name
must contain a digit at all. The negative tests enumerate every placement
where a run of the wrong length can appear: four or more consecutive
digits anywhere (`*[0-9][0-9][0-9][0-9]*`, which subsumes every longer
run), and a run of one or two digits — as the whole name (`[0-9]`,
`[0-9][0-9]`), at the start (`[0-9][^0-9]*`, `[0-9][0-9][^0-9]*`), at the
end (`*[^0-9][0-9]`, `*[^0-9][0-9][0-9]`), or in the middle
(`*[^0-9][0-9][^0-9]*`, `*[^0-9][0-9][0-9][^0-9]*`). A maximal run of
length one or two sits in exactly one of those positions, so a name that
passes all the `NOT GLOB` tests and contains a digit has no run other
than of length three, and at least one run of it.

Each pattern is a linear scan over the name, evaluated once per row;
`ORDER BY product_id` finishes the contract. The judge runs SQLite, which
matches `GLOB` classes character-wise, so unicode names behave as
expected — a multibyte letter is a non-digit.

**Complexity:** `O(N·L)` time for `N` rows of length at most `L` (a dozen
linear pattern scans each), `O(N)` space.
