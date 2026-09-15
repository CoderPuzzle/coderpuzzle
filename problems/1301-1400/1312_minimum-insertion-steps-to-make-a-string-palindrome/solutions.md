# Solutions — Minimum Insertion Steps to Make a String Palindrome

## Interval DP on Palindrome Insertions

Let `dp[i][j]` be the minimum insertions needed to make the substring `s[i..j]` a palindrome. Filling by increasing interval length, the two outer characters decide everything: if `s[i] == s[j]`, they can mirror each other for free and the cost is whatever the inner interval `s[i+1..j−1]` needs (0 when the interval has length at most two, since equal or single characters are already palindromes). If they differ, one insertion is unavoidable — either insert a copy of `s[i]` after `j` or a copy of `s[j]` before `i` — and the cheaper side wins: `dp[i][j] = 1 + min(dp[i+1][j], dp[i][j−1])`.

This recurrence is optimal because an insertion always adds a character at some position, and matching an unmatched outer character against its new mirror is never worse than inserting elsewhere first; the recurrence exactly charges one insertion per mismatch resolved from the outside in. The answer for the whole string is `dp[0][n−1]`.

Equivalently, the result is `n` minus the length of the longest palindromic subsequence: characters already inside such a subsequence pair up for free, and every character outside it needs exactly one matching insertion. The interval DP computes this quantity directly without extracting the subsequence. Edge cases are covered by the length-2 handling (adjacent equal pairs cost 0, adjacent mismatches cost 1) and single characters costing 0.

**Complexity:** `O(n²)` time, `O(n²)` space.
