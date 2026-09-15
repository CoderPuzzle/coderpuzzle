# Solutions — Maximum Number of Non-overlapping Palindrome Substrings

## Greedy DP over latest-starting palindromes

The hint's recurrence is `dp[i] = max(dp[i-1], dp[l] + 1)`, where `dp[i]` is
the answer for the prefix `s[0..i-1]` and the second term takes a palindrome
`s[l..i-1]` of length at least `k` and adds it to the best selection of the
earlier prefix. The subtlety is which `l` to use when several palindromes end
at the same index: because `dp` never decreases as the prefix grows, the
_latest_ start is always at least as good as any earlier one. It uses no more
room on the left than an earlier start would, and `dp[l]` is no smaller, so
one candidate per end index suffices.

To find that candidate, the code grows every palindrome from its center,
odd and even lengths separately, and records for each right endpoint `r` the
largest start `l` seen whose palindrome has length at least `k`. Expanding a
center visits each of its palindromes once, so every palindrome in the string
is considered and no table of pairwise palindrome tests is needed. The
sweeps run in `O(n²)` on a worst-case string of equal letters and `O(1)`
extra memory besides the two linear arrays.

The final pass walks the endpoints left to right, carrying `dp`: at index
`r` it either skips the character (`dp[r + 1] = dp[r]`) or closes the
recorded palindrome `[best[r], r]` (`dp[r + 1] = dp[best[r]] + 1`), keeping
the better of the two. `dp[n]` is the answer.

**Complexity:** `O(n²)` time, `O(n)` space.
