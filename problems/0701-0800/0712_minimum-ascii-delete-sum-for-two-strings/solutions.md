# Solutions — Minimum ASCII Delete Sum for Two Strings

## Dynamic Programming on Prefixes

Let `dp[i][j]` be the minimum deleted-ASCII cost of making the prefixes `s1[:i]` and `s2[:j]` equal. The base cases charge full price for total deletion: matching a prefix against the empty string means deleting all of it, so row 0 and column 0 accumulate the ASCII prefix sums of the two strings.

For an interior cell there are two cases. If the current characters agree, keeping both costs nothing and the problem reduces to the shorter prefixes: `dp[i][j] = dp[i-1][j-1]`. Otherwise at least one of the two characters must go — no pair of equal final strings can retain both ends of a mismatch — so the recurrence takes the cheaper of deleting `s1[i-1]` (paying its ASCII value and moving to `dp[i-1][j]`) or deleting `s2[j-1]` (paying its value and moving to `dp[i][j-1]`). Equivalently, every solution keeps some common subsequence and pays the total ASCII weight of everything else; the table explores all such alignments.

The code fills the full table of one row per prefix length of `s1`, seeded with the base row, and returns the bottom-right cell. Both strings are non-empty per the constraints, so nothing beyond the base row and column needs special handling.

**Complexity:** `O(m · n)` time, `O(m · n)` space.
