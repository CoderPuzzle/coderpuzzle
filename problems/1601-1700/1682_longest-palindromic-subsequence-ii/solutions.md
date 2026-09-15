# Solutions — Longest Palindromic Subsequence II

Peeling the two outer characters off a good palindrome leaves either nothing
or another good palindrome, and the adjacency rule pins down exactly one new
fact about what remains: its own outer pair must use a different letter. That
letter is the single dimension the classic longest-palindromic-subsequence
recurrence lacks — carrying it as a state restores the optimal substructure
and turns all four conditions into one nested chain of table lookups.

## Interval DP on the outermost pair's letter

An even palindrome is a half `x1 x2 ... xk` followed by its own mirror, so its
consecutive pairs are exactly `(x_i, x_i+1)` for `i < k`, the middle
`(x_k, x_k)`, and the mirrored copies — "no equal neighbours except the two
middle ones" therefore says `x_i != x_i+1` for every `i < k`, and nothing
more. Building from the edges, define `dp[l][r][c]` as the length of the
longest good palindromic subsequence inside `s[l..r]` whose outermost pair —
its first and last characters — is the letter `c`. Stripping the outer pair
exposes an inner good palindrome whose own outer pair sits flush against `c`,
so when `s[l] == s[r] == c` the pair is worth `2 +` the best
`dp[l+1][r-1][y]` over letters `y != c`, with an empty inside contributing 0
and making a lone pair worth 2. The inner state already enforces its own
adjacencies by induction, so excluding just this one letter at each nesting
level enforces every adjacency at once. A subsequence may also ignore either
boundary, so each cell additionally carries `dp[l+1][r][c]` and
`dp[l][r-1][c]`; the answer is the maximum over `c` of `dp[0][n-1][c]`,
which is 0 exactly when no letter of `s` appears twice.

The table fills by shrinking intervals — `l` runs from `n - 1` down and `r`
from `l + 1` up — so the three cells a state reads (`[l+1][r-1]`, `[l+1][r]`,
`[l][r-1]`) are already final. Each interval costs `O(26)`: twenty-six
two-term maxima for the boundary carries, plus one "best inner letter other
than `c`" lookup, taken as the row maximum when the row peaks elsewhere and
as the best of the remaining twenty-five letters when it peaks exactly at
`c`. On `"bbabab"` an `a`-pair nests inside a `b`-pair around the middle
`"aa"` to form `"baab"`; on `"dcbccacdb"` two `c`'s nest inside two `d`'s
for `"dccd"` — both answer 4. The table holds `n^2 * 26` integers, about
6.5 MB at `n = 250`, comfortably inside the memory budget.

**Complexity:** `O(n^2 * 26)` time, `O(n^2 * 26)` space.
