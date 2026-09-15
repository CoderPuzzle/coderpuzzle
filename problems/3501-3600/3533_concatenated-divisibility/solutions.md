# Solutions — Concatenated Divisibility

## Bitmask DP on Remainder with Greedy Reconstruction

When a number x is appended to a concatenation whose value is congruent to r modulo k, the new remainder is (r · 10^len(x) + x) mod k — computable in O(1) from precomputed decimal lengths and powers of ten. So the only state that matters for feasibility is (mask of used numbers, current remainder): dp[mask][rem] is true when the unused numbers in mask can be arranged after a prefix with remainder rem so that the finished concatenation is divisible by k. The table is anchored at dp[full][0] = true and filled for masks in decreasing order, trying each unused number as the next pick; if dp[0][0] is false, no valid permutation exists and the answer is empty.

Reconstruction builds the lexicographically smallest permutation greedily: candidates are pre-sorted by value, and at each step the code takes the smallest unused number whose remainder transition lands on a state still marked true. This is safe because any such choice can be completed (the DP guarantees it), and a smaller number in an earlier position always yields a lexicographically smaller list regardless of what follows.

Edge cases worth noting: k = 1 makes every permutation valid so the sorted order wins immediately; duplicates in nums are harmless since equal values are interchangeable in the output; and with n ≤ 13 and k ≤ 100 the table holds at most 2^13 · 100 booleans, while the reconstruction adds only an O(n²) scan over the sorted candidates.

**Complexity:** `O(2^n · k · n)` time, `O(2^n · k)` space.
