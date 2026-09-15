# Solutions — Maximum Multiplication Score

Only the order of positions matters, not which indices are skipped, so the
state that matters while scanning `b` is just how many picks have been made
so far. Four counters over one pass capture every increasing quadruple.

## Dynamic programming over position and pick count

Let `dp[t][j]` be the maximum score achievable using only the first `j`
elements of `b` with exactly `t` of the four weights already placed.
Scanning left to right, element `b[j]` either extends a state or not:
`dp[t][j] = max(dp[t][j-1], dp[t-1][j-1] + a[t-1] * b[j])`, with
`dp[0][*] = 0` and fewer than `t` elements making `dp[t][j]` impossible.
Because each row reads only the previous row, four rolling variables (one
per count) carry everything: process each element from `t = 4` down to
`t = 1`, updating `dp[t] = max(dp[t], dp[t-1] + a[t-1] * b[j])`, and the
answer is the final `dp[4]`. This is exactly the hint's two-state dp —
current position plus number of indices considered.

Every intermediate value stays inside `[-4 × 10¹⁰, 4 × 10¹⁰]`: at most four
terms, each bounded by `10⁵ × 10⁵ = 10¹⁰`. That exceeds the 32-bit integer
range (about `2.1 × 10⁹`), so typed languages accumulate in 64-bit
integers (`long long`, `long`, `int64`, `i64`) and return through the
64-bit wire type. JavaScript computes on doubles, which represent integers
exactly up to `2⁵³ ≈ 9 × 10¹⁵`; since `|answer| ≤ 4 × 10¹⁰ ≪ 2⁵³`, every
sum and product along the way is exact there too.

**Complexity:** `O(n)` time, `O(1)` space.
