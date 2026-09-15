# Solutions — Distinct Subsequences II

## Doubling DP with Last-Occurrence Deduplication

Let `dp[i]` be the number of distinct subsequences of the first `i` characters, including the empty one. Appending a new character `c` nominally doubles the count: every existing subsequence appears once unchanged and once with `c` appended. That doubling is exact only when `c` has never appeared before; on a repeat, some of the "new" strings were already produced the last time `c` was appended, and the count must be corrected.

The overcount is exactly the subsequences of the prefix that ended just before the previous occurrence of `c`, each with `c` appended — precisely `dp[last[c]]` of them, where `last[c]` records that prefix's dp index. So the recurrence is `dp[i] = 2 * dp[i - 1] - dp[last[c]]` for a repeated character and plain doubling for a new one, after which `last[c]` is refreshed for the future. In `"aba"`, the second `a` doubles 4 to 8 but subtracts the single already-counted string `"a"`, giving 7; dropping the empty subsequence leaves the expected 6.

Each step is O(1) with a 26-slot `last` array, and all arithmetic is taken modulo `10^9 + 7` as it goes — Python's non-negative `%` also repairs the final subtraction of the empty subsequence, `dp[n] - 1`, in the wrapped case.

**Complexity:** `O(n)` time, `O(n)` space.
