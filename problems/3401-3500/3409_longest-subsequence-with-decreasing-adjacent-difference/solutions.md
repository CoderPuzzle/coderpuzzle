# Solutions — Longest Subsequence With Decreasing Adjacent Difference

Whether a subsequence can grow by one more element depends only on its last
value and its last adjacent difference, and both live in tiny domains:
values are at most 300, so differences span 0 to 299. That turns the
subsequence search into a table over that domain instead of over indices.

## Value-domain DP with suffix-max rows

Keep `E[x][d]` = the longest valid subsequence among processed prefixes that
ends with value `x` and whose last difference is at least `d` — a suffix
maximum in `d` for each value row. When element `v` arrives, a predecessor
reached with new difference `d` must sit at value `v - d` or `v + d`, and
the non-increasing rule asks the predecessor's last difference to be `>= d`,
which is precisely the column being looked up. So one pass over the 300
possible differences yields `lens[d] = E[v-d][d] or E[v+d][d] + 1`, the best
lengths of subsequences ending exactly at `v` with exact last difference
`d`. Every `lens` entry is already at least 1, so a lone `v` (no
predecessor) is covered by the same arithmetic.

Those exact-difference lengths must go back into the `>= d` view: a
right-to-left running max produces `suffix[d] = max lens[d' >= d]`, merged
element-wise into row `E[v]`, which accumulates earlier occurrences of the
same value. The answer is the largest suffix value seen at any element —
`E[v][0]` after each merge. Each element costs one 300-step query pass and
one 300-step merge pass regardless of `n`.

**Complexity:** `O(n * V)` time and `O(V²)` space, where `V = 300` is the
maximum value (independent of how many distinct values actually appear).
