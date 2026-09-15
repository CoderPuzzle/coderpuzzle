# Solutions — Interleaving String

## 2D dynamic programming over prefixes

An interleaving consumes `s1` and `s2` left to right, so the whole question lives on prefix pairs: `dp[i][j]` records whether the first `i` letters of `s1` and the first `j` letters of `s2` can be interleaved into the first `i + j` letters of `s3`. The last letter of that prefix had to come from one of the two strings, which is the entire recurrence — `dp[i][j]` holds when the reach from above still lives and `s1`'s `i`-th letter matches `s3` at position `i + j - 1`, or the reach from the left still lives and `s2`'s `j`-th letter does. A length mismatch is settled before any table work, since no interleaving can add or drop letters.

The table fills row by row: row 0 and column 0 are the degenerate prefixes where one string is empty and the answer is a plain run of equal letters, and every interior cell looks one step up and one step left. Greedy matching cannot replace this, because whenever the current letters of both strings equal the next letter of `s3`, the choice of source is genuinely forked — only the surviving-reaches table keeps both branches alive, which is exactly what the near-miss and repeated-letter cases probe.

The follow-up's rolling row would cut the footprint to one row of `s2`, but the prefixes table is kept here instead: at the stated ceiling it is 101 × 101 booleans — a few kilobytes against a 256 MB limit — so the space is never charged for, and the cell-for-proposition reading makes the same seven-line loop transcribe identically into every offered language.

**Complexity:** `O(m·n)` time and `O(m·n)` space for the prefix table, where `m = len(s1)` and `n = len(s2)`.
