# Solutions — Longest Palindrome After Substring Concatenation II

## Boundary-anchored interval DP

A palindrome formed as a substring of `s` followed by a substring of `t` has
a clear anchor point: its left edge lies inside `s` and its right edge inside
`t`. Preprocess `p[i]`, the longest palindrome that starts at `s[i]` (a
palindromic prefix of `s[i:]`), and `q[j]`, the longest palindrome that ends
at `t[j]` (a palindromic suffix of `t[:j+1]`). These already account for the
"possibly empty" side: a palindrome may live entirely in `s` or entirely in
`t`, and `max(p)` / `max(q)` captures both.

For the crossing part, let `dp[i][j]` be the longest palindrome that starts
with `s[i]` and ends with `t[j]`. If `s[i] != t[j]` those two characters
cannot interlock, so `dp[i][j] = max(p[i], q[j])`. If they match, the pair
can wrap around the best palindrome starting with `s[i+1]` and ending with
`t[j-1]`, giving `dp[i][j] = max(p[i], q[j], 2 + dp[i+1][j-1])`.

Each cell depends only on its neighbour along the diagonal `i + j`, so the
table never needs to be materialised: one scalar walks each diagonal from the
far corner inward, computing every `dp[i][j]` in `O(n·m)` time and `O(1)`
extra space. Both preprocessing tables use a rolling row of the classic
interval-palindrome recurrence, giving `O(n² + m²)` time with `O(n + m)`
memory — no recursion anywhere, so the 1000-character bound is safe.

**Complexity:** `O(n² + m² + n·m)` time, `O(n + m)` space.
