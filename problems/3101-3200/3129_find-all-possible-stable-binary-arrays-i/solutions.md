# Solutions — Find All Possible Stable Binary Arrays I

## Sliding-window block closing

The subarray condition is exactly "no run of equal characters longer than
`limit`", because any offending subarray of size beyond `limit` contains
an offending window of exactly `limit + 1` identical characters. Building
an array left to right therefore means repeatedly appending a _block_ of
at most `limit` copies of one character onto a prefix that ends with the
other character — or starting with such a block outright. Track two
tables, `f0[a][b]` and `f1[a][b]`: how many stable prefixes use `a`
zeros and `b` ones and end in `0` / `1`. All-zero openers seed
`f0[a][0]` for `a <= limit`; all-one openers are handled identically on
the other axis.

Appending a block of `k <= limit` zeros onto a `1`-ending prefix sums
`f1[a-k][b]` over every k — a contiguous range along the same row. The
row-wise prefix sums `pref0[a][t] = f0[a][0] + … + f0[a][t-1]` turn each
such sum into one subtraction, so populating each `(a, b)` state costs
O(1); symmetrically, appending one-blocks reads column windows of the
freshly built `f1` through a rolling accumulator. Columns sweep `b = 1…`
with `f1` derived from completed columns first and `f0` from the fresh
column second, so nothing ever looks ahead. The whole construction is a
plain triple of nested loops — no recursion — reading off
`(f0[zero][one] + f1[zero][one]) mod 10^9 + 7` at the end.

**Complexity:** `O(zero · one)` time (~40k states), `O(zero · one)`
space. DP tables and window accumulators are 64-bit everywhere (window
sums reach ~2 × 10¹¹ > i³²), while JS stays exact without BigInt since
every intermediate is below 200 · (10⁹ + 7) < 2³⁸.
