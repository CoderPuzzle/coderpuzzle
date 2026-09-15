# Solutions — Longest Palindromic Subsequence

Both methods fill a quadratic table over the same letters, but they enter
the problem from different doors. The interval DP stays inside the string,
scoring each stretch by what its two end letters admit — agreeing ends
wrap, disagreeing ends shed. The reversal view steps outside instead: a
mirror is precisely a subsequence the string shares with its own reverse,
so the longest-common-subsequence recurrence over two prefix families does
the work — and because that table reads only the row above it, the whole
fill folds into two rows of memory.

## Interval Dynamic Programming

Let `dp[i][j]` be the length of the longest palindromic subsequence inside `s[i..j]`. The table is filled over `i` descending and `j` ascending so that when a cell is written, the three cells it depends on — the interval without its left end, without its right end, and without both ends — are already final. A single character is a palindrome of length 1, handled by `dp[i][i] = 1` as the diagonal.

The recurrence has two cases. When the ends match, `s[i] == s[j]`, the two characters can wrap the best palindrome strictly inside, giving `dp[i][j] = dp[i + 1][j - 1] + 2`; when they differ, at least one of the two ends is not part of an optimal palindrome for this interval, so `dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])`. Wrapping the inner best is safe because any palindrome of the inner interval combined with the matching outer pair remains a subsequence in order.

Filling the table for Example 1, `s = "bbbab"`, one diagonal at a time:

1. The diagonal seeds `dp[i][i] = 1` for every cell.
2. Length 2: `b = b` at (0,1) and (1,2) wraps an empty inside, giving 2; the mismatched pairs (2,3) and (3,4) keep 1.
3. Length 3: `dp[0][2] = dp[1][1] + 2 = 3` (the `b…b` ends match), `dp[1][3] = max(dp[2][3], dp[1][2]) = 2` (`b ≠ a`), and `dp[2][4] = dp[3][3] + 2 = 3`.
4. Length 4: `dp[0][3] = max(dp[1][3], dp[0][2]) = 3`; `dp[1][4] = dp[2][3] + 2 = 3` (matching `b`s at positions 1 and 4).
5. Length 5: `s[0] = s[4] = 'b'`, so `dp[0][4] = dp[1][3] + 2 = 2 + 2 = 4` — the subsequence "bbbb".

Two edge details fall out of the initialization. The zero-filled table makes `dp[i + 1][j - 1]` evaluate to 0 for adjacent equal characters, where the inner interval is empty, correctly yielding 2; and the empty-string guard returns 0 up front even though the constraints promise `n >= 1`. The answer for the whole string is `dp[0][n - 1]`, computed after the double loop visits every interval once.

**Complexity:** `O(n^2)` time, `O(n^2)` space.

## LCS With the Reversed String

A mirror is a subsequence that survives reversal, which invites a change of
venue: lay the string beside its own reverse and take what they share. The
claim is that `LPS(s)` equals `LCS(s, reverse(s))`. One direction is
immediate. A mirror of length `k` picked from `s` also appears in the
reversal, because reversing `s` reverses the picked letters and a mirror
reads the same both ways — so it is common to both strings. The other
direction is the theorem's content. A common subsequence `Z` of length `k`
gives `s` two readings of `Z`: one left-to-right, one right-to-left. Pair
each letter's slot in the forward reading with the same letter's slot in
the backward reading; those pairs cross at some middle slot `m`. The slots
left of the crossing spell the first `m` letters of `Z` followed by those
same letters in reverse order — a mirror of length `2m` inside `s` — and
the slots right of it spell the last `k - m` letters with their reverse,
another mirror, of length `2(k - m)`. The two lengths sum to `2k` (a slot
shared by both readings merges a single letter and still leaves the longer
side at least `k`), so a common subsequence of length `k` forces a mirror
of length `k`, and neither table can beat the other.

The recurrence is the textbook LCS one, over prefixes of the two strings.
Let `t` be the reversal and `dp[i][j]` score `s[0..i)` against `t[0..j)`.
When the two first letters agree they open a common subsequence, so
`dp[i][j] = dp[i - 1][j - 1] + 1`; when they differ, at least one is absent
from an optimal answer and `dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])`.
The zero row seeds the table, and the answer is `dp[n][n]`.

Each cell reads only the cell above it and the cell to its left, so the
code keeps two rows — `prev` holds row `i - 1` while `curr` grows left to
right — and the fill lives in `O(n)` memory where the interval table needed
`n²`. For `s = "acgtca"` the reversal is `"actgca"`; the letters `a c g c a`
appear in order in both, which is the same `acgca` the interval DP dug out
of the stretch table — two independent recurrences witnessing one optimum.
The guard for an empty string returns 0, matching the interval solution's
caution.

**Complexity:** `O(n²)` time, `O(n)` space.
