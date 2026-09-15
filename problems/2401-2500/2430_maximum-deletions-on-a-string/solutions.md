# Solutions — Maximum Deletions on a String

## Suffix DP with an LCP table

Let `dp[i]` be the maximum number of operations needed to delete the suffix `s[i:]`, with `dp[n] = 0` for the empty suffix. Deleting the whole suffix in one operation is always available, so `dp[i]` is at least 1. Otherwise the first operation deletes a prefix of some length `L` with `(n - i) / 2 >= L` such that `s[i : i + L] == s[i + L : i + 2L]`, leaving `s[i + L :]`, which gives the transition `dp[i] = max(1 + dp[i + L])` over every valid split length.

Testing all candidate substrings naively would be cubic, so equality is decided with a longest-common-prefix table: `lcp(j, k) = lcp(j + 1, k + 1) + 1` when `s[j] == s[k]`, else 0. Then `s[i : i + L] == s[i + L : i + 2L]` exactly when `lcp(i, i + L) >= L`. The recurrence only ever looks one row down, so the code fills the table row by row for decreasing `i`, keeping just two rows (`cur` and `next_row`) — `O(n)` extra memory for an `O(n^2)`-sized table.

Each row is finished right before its `dp[i]` is computed, so the split-length loop reads `cur[i + L]` from the row just built while `dp[i + L]` values to the right are already final. Degenerate inputs fall out naturally: a string of one repeated character takes the length-1 split repeatedly, and any suffix whose only option is full deletion still gets the floor value of 1.

**Complexity:** `O(n^2)` time, `O(n)` space.
