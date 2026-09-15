# Solutions — Maximum Value Sum by Placing Three Rooks I

## Keep each row's top three cells and enumerate row triples

A placement is three distinct rows with one cell each and no shared column.
Trying every cell of every chosen row would cost `O(n³)` per row triple, but
almost all of that work is wasted: only each row's three most valuable cells
can ever matter. The pruning stays exact because of a pigeonhole exchange.
Take any optimal placement and a row whose rook sits outside that row's top
three cells. Those top three cells lie in three distinct columns and each
holds a value at least as large as the rook's cell, while the other two
rooks block at most two columns — so some top-three column is free, and
moving the rook there keeps the placement legal without lowering its sum.
Doing this for every row yields an optimal placement made only of top-three
cells, so enumerating row triples against three candidates per row still
reaches the maximum.

The search then trims itself two more ways without losing exactness.
Candidates are kept sorted by value, so inside a row triple the combos are
tried in decreasing partial-sum order and a prefix is dropped the moment
even its best possible completion cannot beat the running answer; likewise
rows are visited in decreasing order of their best cell, which lets whole
row triples be abandoned once their own upper bound cannot beat it. Every
discard rule only ever skips placements that provably cannot strictly
improve the incumbent. Sums of three values reach `3 · 10⁹` in absolute
value, past the 32-bit range, so the fixed-width languages accumulate in
64-bit (`long long`/`long`/`int64`/`i64`); JavaScript numbers stay exact
because `3 · 10⁹` sits far below `2⁵³`.

**Complexity:** `O(mn)` time to distill the per-row candidate lists plus
`O(m³)` worst case for the enumeration — `C(m,3)` row triples of at most 27
constant-time candidate checks, roughly 4.4 million at `m = 100`, with the
bounds cutting most triples far sooner — and `O(m)` extra space for the
candidate lists.
