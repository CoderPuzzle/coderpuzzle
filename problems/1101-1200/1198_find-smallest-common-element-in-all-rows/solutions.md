# Solutions — Find Smallest Common Element in All Rows

## Frequency count over the value axis

Rows are strictly increasing, so no row ever repeats a value: a value common
to every row must appear exactly `m` times across the whole matrix, and no
other value can reach that count. That turns the question into pure counting
— one tally array indexed by value, bounded by the 10⁴ value range, bumped
once per matrix entry.

A single scan fills the tally; a second scan over value indices in ascending
order finds the first index whose count equals `m`. Walking values in
ascending order (rather than collecting matches and sorting) is what makes
the returned element the _smallest_ common one for free, and the walk can
stop at the first hit. If no index reaches `m`, the answer is -1.

**Complexity:** `O(m·n + V)` time with `V = 10⁴` the value range, `O(V)`
space for the tally.
