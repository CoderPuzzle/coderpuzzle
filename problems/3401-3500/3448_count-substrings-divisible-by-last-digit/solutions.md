# Solutions — Count Substrings Divisible By Last Digit

## Per-Digit Rolling Remainder DP

A substring is valid exactly when its numeric value is divisible by its final (non-zero) digit `d`, so run one independent counting pass for each candidate last digit `d = 1..9` and sum the results. During the pass over `s`, maintain `cnt[r]` = the number of non-empty suffixes of the already-processed prefix whose value is congruent to `r` modulo `d`. Only `d` remainders exist, so the table has at most 9 entries regardless of input size.

Appending a new digit `di` transforms every previously seen substring: a suffix with remainder `r` extends into one with remainder `(10*r + di) % d`, and the digit itself starts a fresh suffix with remainder `di % d`. This is a full remap of the table at each position — build `new_cnt` from `cnt` plus one for the new single-digit suffix, then swap.

Counting happens at positions where `di == d`: extending any earlier suffix whose value is `r` gives a new value `r*10 + d`, which is divisible by `d` exactly when `(r * 10) % d == 0`. Those remainders are fixed per `d`, so each matching position adds a constant subset of `cnt` plus 1 for the single-character substring `"d"` itself. Leading zeros are harmless because the DP treats each suffix by its true numeric value, and a zero-prefixed substring ending in `d` is counted exactly when its value is divisible by `d`.

Edge cases: `d` may be larger than any digit present (the pass simply counts nothing), substrings of length 1 are handled by the `+1`, and remainder `0` entries can be both extended substrings and stored suffixes without double counting, because stored suffixes are only counted again after being extended by one more digit.

**Complexity:** `O(45 * n)` time, `O(1)` space (the 45 is the sum of `d` for `d = 1..9`; each pass keeps a rolling table of at most 9 counters).
