# Solutions — Sum of Good Subsequences

## Value-Indexed DP Tracking Count and Sum

Instead of enumerating subsequences, track two dictionaries indexed by ending value: `cnt[v]` = the number of good subsequences seen so far that end in value `v`, and `sm[v]` = the sum of all elements across those subsequences. A good subsequence's constraint — adjacent chosen elements differ by exactly 1 — depends only on the last value, so this summary is a sufficient state.

When a new element `v` arrives, the good subsequences newly ending at `v` are the singleton `[v]` plus every previously recorded subsequence ending in `v - 1` or `v + 1`, extended by `v`. Their count is `new_cnt = 1 + cnt[v-1] + cnt[v+1]`, and their element sum is `v · new_cnt + sm[v-1] + sm[v+1]` — the old elements carry their sums forward and each of the `new_cnt` subsequences gains one copy of `v`. These are added into `cnt[v]` and `sm[v]` (the element may extend subsequences recorded earlier at the same value), and `new_sum` is folded into the running total.

Because each subsequence's contribution is counted at the moment its last element is appended, the total accumulates each good subsequence's sum exactly once. All arithmetic is done modulo `10⁹ + 7`; since only sums and counts are combined linearly, the modular result equals the true sum taken mod.

Edge cases: single-element subsequences are good by definition, which the `1 +` term supplies; values are bounded by `10⁵` so `v ± 1` lookups that miss the dictionary simply return zero; duplicate values extend each other legitimately (e.g. `[1,2,1]`), since only consecutive chosen elements need differ by one.

**Complexity:** `O(n)` time, `O(n)` space.
