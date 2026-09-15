# Solutions — Count Different Palindromic Subsequences

## Begin-and-end-with-character interval DP

Counting _distinct_ palindromic subsequences is what makes this hard: the
same palindrome arises from many index sets, and any DP that counts index
sets overcounts. The fix is to partition by outer character — every
non-empty palindrome has exactly one first character and one last character,
and they are equal — so `dp[x][i][j]`, the number of distinct palindromic
subsequences of `s[i..j]` that begin and end with character `x`, sums to the
answer with each palindrome counted exactly once. Within one `x` the
recurrence only shrinks the window: if `s[i] != x` the window's left end is
useless (`dp[x][i][j] = dp[x][i+1][j]`), if `s[j] != x` the right end is
(`dp[x][i][j] = dp[x][i][j-1]`), and single positions hold `dp[x][i][i] =
1` exactly when `s[i] == x`.

When both ends match — `s[i] == s[j] == x` with `i < j` — every palindromic
subsequence of the interior `s[i+1..j-1]`, for any outer character `y`,
becomes a distinct `x…x` palindrome by gluing an `x` on each side, and the
two one-letter-bounded palindromes `"x"` and `"xx"` exist beyond them:
`dp[x][i][j] = 2 + sum_y dp[y][i+1][j-1]`. Nothing collides: gluing
preserves distinctness, and `"x"` cannot equal a glued palindrome because
the interior is non-empty. Adjacent ends (`j == i + 1`) have no interior, so
exactly `"x"` and `"xx"` survive and the cell is 2. In `"bccb"` this prices
the `b`-outered family at `2 + dp[b] + dp[c]` over `"cc"` = 4 (`b`, `bb`,
`bcb`, `bccb`), the `c`-family at 2, and the total at 6.

The table fills bottom-up: `i` descends so row `i+1` is already complete, `j`
ascends so `dp[x][i][j-1]` is too. Every read touches rows `i` and `i+1`
only, so two rolling rows of `n × |Σ|` cells carry the whole computation —
the full `O(n²·|Σ|)` table never needs to exist. The alphabet is four
letters, so each window costs a four-cell copy plus an occasional four-way
sum: at `n = 1000` that is under `10^7` elementary updates, far inside the
limit. Raw counts pass `10^9 + 7` well before the bound (the 80-character
example already holds 3,104,860,382) and grow past every fixed width, so
each write reduces modulo `10^9 + 7`, the interior sum is accumulated in a
64-bit integer first (`4 · (10^9 + 6) + 2 < 2^34`), and the final
`sum_x dp[x][0][n-1] mod (10^9 + 7)` fits the 32-bit return.

**Complexity:** `O(n²·|Σ|)` time, `O(n·|Σ|)` space.
