# Solutions — Regular Expression Matching

## Bottom-up dynamic programming

Let `dp[i][j]` record whether the first `i` characters of `s` match the first `j` characters of `p`. The empty string matches the empty pattern (`dp[0][0] = true`), and the first row handles how a pattern can match nothing: only trailing `x*` units can vanish, so `dp[0][j]` is true exactly when `p[j-1]` is `*` and dropping that star's two-character unit still matches nothing, i.e. `dp[0][j] = dp[0][j-2]`.

The table is then filled row by row. If `p[j-1]` is a literal or `.`, it must consume one character of `s` that it equals, so `dp[i][j]` is true only when `dp[i-1][j-1]` holds and the characters agree (a `.` agrees with anything). If `p[j-1]` is `*`, its preceding element `p[j-2]` can be used any number of times, and two cases cover all counts: zero occurrences, which erases the `x*` unit and copies `dp[i][j-2]`; or one more occurrence, allowed when `p[j-2]` matches `s[i-1]`, in which case consuming that character reduces the question to `dp[i-1][j]`. Every possible repetition count reduces to some chain of these two moves, so the recurrence is complete.

Because the table is over prefixes, `dp[m][n]` is true exactly when the pattern matches the entire string, never just a prefix. The code assumes well-formed patterns (no leading `*`), which the problem guarantees. The full `(m+1) x (n+1)` table is kept for clarity even though only the previous row is strictly needed.

**Complexity:** `O(m*n)` time, `O(m*n)` space.
