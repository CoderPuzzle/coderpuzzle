# Solutions — Maximum Compatibility Score Sum

## Bitmask DP over Used Mentors

The assignment is a perfect matching between students and mentors, and with `m <= 8` it pays to make the set of already-used mentors the DP state. Define `dp[mask]` as the best total compatibility for matching the first `popcount(mask)` students to exactly the mentors in `mask` — student identities never conflict with the mask, because in any assignment the first `i+1` students occupy exactly `i+1` mentors, so the number of used mentors pins down which student is being placed next. `dp[0] = 0` and the answer is `dp[full - 1]`.

The sweep processes masks in increasing numeric order (every mask's submasks are numerically smaller, so dependencies are ready). For each mask, the student to place is `i = popcount(mask) - 1`, and the recurrence tries every mentor `j` in the mask, extending `dp[mask ^ (1 << j)]` by `score[i][j]`. Each state branches over at most `m` choices, giving `2^m · m` transitions — at most 2048 for `m = 8`, effectively instant.

Pairwise scores are precomputed first as an `m × m` table of agreement counts (`sum(a == b ...)`), so the DP itself touches only integers. Popcounts come from `bin(mask).count("1")`. The empty-mask and single-pair cases are covered by the same recurrence with no special-casing; with `m = 1` there is exactly one mask to fill.

**Complexity:** `O(2^m · m + m^2 · n)` time, `O(2^m + m^2)` space.
