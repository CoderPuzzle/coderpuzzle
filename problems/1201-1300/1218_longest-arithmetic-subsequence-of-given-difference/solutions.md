# Solutions — Longest Arithmetic Subsequence of Given Difference

## Hash Map DP on the Previous Value

The key insight is that a fixed common difference removes all the pairwise comparisons a general longest-subsequence DP needs. Because every step must go from a value `v` to exactly `v + difference`, the only fact worth remembering about a prefix is the length of the best subsequence ending at each value — so the DP table collapses from an array indexed by position to a dictionary keyed by value.

The array is scanned once, left to right. For each element `x`, the longest valid subsequence ending at `x` is one longer than the best subsequence ending at `x - difference` seen so far, or length 1 if no such predecessor has appeared yet (`dict.get` with a default of 0 handles both cases in one expression). Overwriting the entry for `x` is safe because a later subsequence through the same value is always at least as long as an earlier one — a longer predecessor chain can only have grown.

Correctness rests on the subsequence ordering: reading `dp[x - difference]` before processing `x` uses only elements strictly to the left of the current position, so the chain never runs backwards through the array. This also covers negative differences and repeated values, since the lookup target `x - difference` is simply a different key. A running maximum tracks the answer, which is at least 1 on any non-empty input.

**Complexity:** `O(n)` time, `O(n)` space.
