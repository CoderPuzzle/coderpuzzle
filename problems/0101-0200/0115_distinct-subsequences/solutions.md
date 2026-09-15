# Solutions — Distinct Subsequences

## Dynamic Programming with a Rolling 1-D Array

Let `dp[j]` be the number of ways to form the first `j` characters of `t`
using the prefix of `s` processed so far. Reading one character `ch` of
`s` can only create new ways for positions where `t[j-1] == ch`: every
earlier way of forming `t[:j-1]` can be extended by matching `ch` against
that position, so `dp[j] += dp[j-1]`. Positions with a different character
keep their count, since `ch` is simply skipped. `dp[0] = 1` encodes the
empty string being formable exactly once — by matching nothing.

The array is updated with `j` running from `m` down to `1` so that
`dp[j-1]` is still the previous row's value when it is read. That makes
the single array equivalent to the two-dimensional recurrence
`dp[i][j] = dp[i-1][j] + (match ? dp[i-1][j-1] : 0)`; sweeping left to
right instead would read an already-updated `dp[j-1]` and wrongly let one
character of `s` be matched against several characters of `t`.

After all of `s` is consumed, `dp[m]` counts every distinct subsequence.
Characters of `s` that match nothing leave `dp` untouched, and Python's
arbitrary-width integers absorb the counts, which the constraints promise
fit in 32 bits anyway.

**Complexity:** `O(m·n)` time, `O(m)` space, where `n = len(s)` and
`m = len(t)` — each of the `n` outer iterations sweeps the `m+1`-entry
array once.
