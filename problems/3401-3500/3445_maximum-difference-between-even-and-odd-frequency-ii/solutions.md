# Solutions — Maximum Difference Between Even and Odd Frequency II

## Prefix Parities with a 2x2 Minimum Table

Because `s` uses only digits `'0'`–`'4'`, there are just `5 * 4 = 20` ordered pairs `(a, b)` with `a != b`, and the answer maximizes `freq[a] - freq[b]` over some pair. For a fixed pair, define prefix arrays over positions `0..n`: `diff[i]` = (#a in the first `i` chars) − (#b), and parities `pa[i]`, `pb[i]` of those two counts. A substring `s[l..r-1]` then has `diff[r] - diff[l]` as its frequency difference, it needs `pa[r] ^ pa[l] = 1` (odd count of `a`) and `pb[r] ^ pb[l] = 0` (even count of `b`), plus the window constraints `r - l >= k` and at least one `b` inside the window.

The "nonzero even" condition on `b` is handled by tracking `last_b_at[r]`, the index of the last occurrence of `b` within the first `r` characters: a left boundary `l` yields at least one `b` exactly when `l <= last_b_at[r]`. Combining this with the length requirement, valid left boundaries form the prefix range `l in [0, min(r - k, last_b_at[r])]`. Over that range we want the minimum `diff[l]` within the single parity class `(pa[r] ^ 1, pb[r])`, so `diff[r] - min` is maximized.

Rather than re-scanning candidates for every `r`, note the range's upper bound `bound = min(r - k, last_b_at[r])` is non-decreasing in `r` (both arguments are). So a pointer `prev_bound` extends a `2x2` table `min_val[p_a][p_b]` with `diff[l]` for each newly admitted `l`, and each right endpoint reads its candidate in `O(1)`. If no `b` has occurred yet (`last_b_at[r] == -1`) the range is empty and `r` is skipped, since a zero frequency of `b` is not allowed.

Edge cases: pairs where `a` or `b` never occurs contribute nothing (the table stays at infinity or parities never match); the problem guarantees at least one valid substring exists, so the initialized sentinel `-10^18` is always replaced; and `k = 1` simply means any single-position window satisfying the parity conditions.

**Complexity:** `O(20 * n)` time, `O(n)` space.
