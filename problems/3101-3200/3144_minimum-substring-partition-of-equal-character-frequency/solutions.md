# Solutions — Minimum Substring Partition of Equal Character Frequency

## Prefix dynamic programming with running window counts

Let `dp[i]` be the fewest balanced pieces that cover the first `i`
characters. Any optimal partition decomposes along its last piece, so
`dp[i] = 1 + min(dp[j])` over the starts `j < i` whose piece `s[j..i)` is
balanced — a string is balanced exactly when
`(number of distinct letters) × (largest letter count) == length`.

Checking every candidate start from scratch would re-count each window,
but growing the start leftwards one character at a time lets the count
table, the number of live letters, and the maximum count update in O(1):
the new leftmost letter is the only thing that changes. That turns each
prefix endpoint into one backwards sweep of constant work per step, and
every substring beginning inside `s[j..i)` remains balanced-or-not
consistent with its own sweep pass. The table is rebuilt per endpoint,
leaving O(n²) steps with an implicit 26-letter constant overall; no
recursion is involved anywhere.

**Complexity:** `O(26 · n²)` time (amortized O(n²) integer work),
`O(n + 26)` space.
