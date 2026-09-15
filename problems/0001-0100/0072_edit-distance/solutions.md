# Solutions — Edit Distance

## Two-Row Wagner–Fischer DP

Let `dp[i][j]` be the minimum number of operations that turn the first `i`
characters of `word1` into the first `j` characters of `word2`. The base
cases are pure bookkeeping: converting the empty prefix into a `j`-character
prefix costs `j` insertions, and converting an `i`-character prefix into the
empty prefix costs `i` deletions. The code encodes both directly in its
rolling rows — `prev` starts as `list(range(n + 1))` and every new row opens
with `curr[0] = i`.

For the interior, only the last characters of the two prefixes matter. If
`word1[i - 1] == word2[j - 1]`, the pair aligns for free and
`dp[i][j] = dp[i - 1][j - 1]`. Otherwise one paid operation must fix the
mismatch, and the cheapest of the three is chosen: replace makes the
characters equal and inherits `prev[j - 1]`; delete drops `word1[i - 1]` and
inherits `prev[j]`; insert appends `word2[j - 1]` to `word1` and inherits
`curr[j - 1]`, since that prefix now needs one fewer character of `word2`.
Each choice covers a distinct final move, so the minimum over the three is
exact.

![The Wagner-Fischer table for horse -> ros fills to dp[5][3] = 3, with the free diagonal alignments o/o and r/r shaded.](figures/solution-dp-table.svg)

Because row `i` only ever reads row `i - 1` and its own left neighbor, two
one-dimensional rows are enough: `curr` is built left to right and then
swapped in as `prev`. Empty inputs need no special-casing — if `word1` is
empty the loop never runs and the seeded `prev[n] = n` is returned; if
`word2` is empty each row collapses to `[i]` and the answer is `m`.

**Complexity:** `O(m * n)` time, `O(n)` space.
