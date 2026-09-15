# Solutions — Max Dot Product of Two Subsequences

## Suffix dynamic programming over matched pairs

Let `dp[i][j]` be the best dot product obtainable from the suffixes
`nums1[i:]` and `nums2[j:]`, with at least one pair chosen. Three moves
cover every optimum: pair the two heads (`nums1[i] * nums2[j]` plus the
best of the remaining suffixes — but only when that remainder is
positive, since a pair may stand alone), or skip `nums1[i]`, or skip
`nums2[j]`. The forced-pair formulation is what handles the
all-negative-products case honestly: when every product is negative, the
skips bottom out in exactly one pair, the least negative one — no "empty
subsequence" zero ever leaks in.

Filling the table from the bottom-right corner upward gives each state's
three options in `O(1)`, and the answer is `dp[0][0]`. With both lengths
at most 500 the table holds 250,000 cells; products of values bounded by
1000 keep every entry within 32-bit range (at most `5 · 10⁸`).

A rolling one-dimensional array would halve the memory, but the plain
table is clearer and comfortably inside the limit.

**Complexity:** `O(n · m)` time, `O(n · m)` space.
