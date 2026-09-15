# Solutions — Number of Perfect Pairs

## Absolute-value sort with two pointers

Both conditions only ever look at magnitudes. Write `x = |a|` and `y = |b|`
and assume `x <= y`; whatever the signs of `a` and `b`, one of `|a - b|`,
`|a + b|` equals `y - x` and the other equals `x + y`. The min condition
therefore reads `y - x <= x` and the max condition reads `x + y >= y`. The
second is always true, so a pair is perfect exactly when `y <= 2x` — the
larger magnitude at most twice the smaller. In particular a zero pairs only
with another zero, and equality at exactly twice counts.

Counting then needs no sign bookkeeping: take absolute values, sort them,
and count the index pairs `i < k` whose values satisfy `a[k] <= 2 * a[i]`.
Because the array is sorted, the bound `2 * a[i]` never decreases as `i`
moves right, so a frontier pointer `j` only ever advances: for each `i`,
push it forward while it still points at a value within the doubled bound,
then every position strictly between `i` and `j` pairs with `i` — add
`j - i - 1` to the answer. Each element crosses the frontier exactly once,
so counting is linear once the sort has run.

The answer itself outgrows 32 bits before the array outgrows anything: at
`n = 10^5` up to `n(n-1)/2 ≈ 5 * 10^9` pairs qualify, which is why
fixed-width languages accumulate and return through 64-bit integers
(`long long`, `long`, `int64`, `i64`). JavaScript numbers stay exact far
past that bound, and Python integers are unbounded.

**Complexity:** `O(n log n)` time, `O(n)` space.
