# Solutions — Split Array with Equal Sum

## Middle cut fixed, left sums hashed

A valid triplet carves four parts with one common sum, and enumerating four
free indices is hopeless — but the middle cut `j` alone decides what each half
must accomplish on its own. On the left, some `i` with `0 < i < j - 1` must
balance the head against the block beside it: `sum(0, i - 1) ==
sum(i + 1, j - 1)`. On the right, some `k` with `j + 1 < k < n - 1` must
balance the block against the tail: `sum(j + 1, k - 1) == sum(k + 1, n - 1)`.
The four parts share one value exactly when a left split and a right split at
the same `j` land on the same sum, so fixing `j` collapses the four-index
search into two independent two-index searches.

For that fixed `j`, prefix sums make every part a difference of two table
entries, so one sweep over `i` collects each balanced left value into a hash
set in linear time, and a second sweep over `k` tests each balanced right
value for membership. Because `nums` may hold negatives, the prefix sums are
not monotonic — there is no sorted order for two pointers to close on — so
the set is the whole mechanism, not an accelerator. Each `j` costs `O(n)`,
and `j` itself ranges only from `3` to `n - 4`: the guards `i + 1 < j` and
`j + 1 < k < n - 1` force at least one element into every part, which is also
why arrays shorter than `7` fall straight through to `false`.

With `n` up to `2000` and `|nums[i]|` up to `10⁶`, a prefix sum reaches
`2 × 10⁹` in magnitude and overflows 32 bits, so the fixed-width ports
accumulate the prefix table in 64-bit integers; the comparisons are between
sums, never indices, so nothing else widens.

**Complexity:** `O(n²)` time, `O(n)` space.
