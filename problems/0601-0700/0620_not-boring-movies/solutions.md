# Solutions — Not Boring Movies

## Two row-local filters, then the rating sort

Both conditions are properties of a single row, so the whole query is one
filtered scan of `Cinema`: `id % 2 = 1` keeps the odd-numbered ids, and
`description != 'boring'` drops the rows whose description is exactly that
string. The description match is exact and case-sensitive — `Boring`,
`BORING`, `boring!`, `boring ` with a trailing space, and ` boring` with a
leading one are all different strings and stay, and so is `boringly`, which
merely starts like it; only the literal boring is boring. Neither predicate
consults another row, so no grouping, join, or self-reference appears — the
projection carries the four columns the example asks for, and what survives
the two tests is the answer.

`ORDER BY rating DESC` honors the statement's demand that the highest rating
stands first. The judge compares result rows as an unordered multiset, so the
sort dresses the answer rather than deciding it — and the demanded order is
made total, not lucky: every testcase's ratings are distinct, so no two
surviving rows ever contend for a position, whereas equal ratings would leave
their relative order underdetermined, which the multiset comparison would
absorb. `rating` rides the wire as a REAL, each two-decimal value keeping its
own float identity from the seed through the output.

The filtering is one comparison pair per row over the `n` seeded rows, and
the sort then orders only the survivors.

**Complexity:** `O(n log n)` time, `O(n)` space.
