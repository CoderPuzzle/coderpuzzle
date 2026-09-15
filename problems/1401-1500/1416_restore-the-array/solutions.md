# Solutions — Restore The Array

## Suffix-count dynamic programming

Let `dp[i]` count the ways to split the suffix `s[i..]` into valid pieces.
The empty suffix has exactly one splitting (the empty one), `dp[n] = 1`,
and every other position sums over the piece that starts there: for each
length `L` from `1` up to the digit count of `k`, the piece `s[i..i+L)`
must avoid a leading zero and parse to a value at most `k`, contributing
`dp[i + L]`.

Two bounds keep the loop tight. A piece starting with `'0'` is never
valid — the array holds values `>= 1` with no leading zeros — so those
lengths are skipped outright. And a valid piece has at most as many
digits as `k` itself (`k <= 10⁹` gives at most ten), so `L` never needs
to run past that, making the whole pass `O(10 · n)`. Parsing each piece
numerically is safe in 64-bit arithmetic since ten digits stay far below
`2⁶³`; the running counts are reduced modulo `10⁹ + 7` as they accumulate
so the additions cannot overflow either.

The answer is `dp[0]`, and on a string like `"1317"` with `k = 2000` the
table reproduces the eight splittings the example lists.

**Complexity:** `O(n · log₁₀ k)` time — at most ten candidate lengths per
position — and `O(n)` space for the table.
