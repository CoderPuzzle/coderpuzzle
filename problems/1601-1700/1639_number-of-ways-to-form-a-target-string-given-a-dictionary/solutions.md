# Solutions — Number of Ways to Form a Target String Given a Dictionary

## Column frequency counts with a 2D DP

The rows only matter through which letter sits in each column, and how
many rows share it: if `words` has `W` columns, precompute
`charCount[k][c]`, the number of rows whose `k`th character is `c`, for
every column `k` and letter `c`. Any way to place `target[i]` at column
`k` can pick any of those `charCount[k][target[i]]` rows independently,
so that count is exactly the number of choices available at that
column for that character.

Because the column used for `target[i]` must exceed every column used
for `target[0..i)`, the process is equivalent to scanning the columns
left to right once and deciding, at each column, whether to spend it on
the next unplaced character of `target` or skip it. That makes a
textbook two-index DP: `dp[i][j]` is the number of ways to have placed
the first `i` characters of `target` using only the first `j` columns.
Skipping column `j - 1` gives `dp[i][j - 1]` ways; spending it on
`target[i - 1]` (only possible when `i >= 1`) multiplies
`dp[i - 1][j - 1]` by `charCount[j - 1][target[i - 1]]`. Summing the two,
mod `1e9 + 7`, gives `dp[i][j]`. The base row `dp[0][j] = 1` for every
`j` (the empty prefix needs no columns), and the answer is
`dp[len(target)][W]`.

The table has `(len(target) + 1) * (W + 1)` cells, each computed in
O(1) once the frequency table exists, so the whole computation is
dominated by building `charCount` and filling the DP grid; a rolling
pair of rows keeps the space linear in `W`.

**Complexity:** `O(words.length * W + target.length * W)` time,
`O(W)` space (after the frequency table, using a rolling DP row).
