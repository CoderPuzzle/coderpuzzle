# Solutions — Sum of Consecutive Subsequences

## Per-Value Chain Sum DP

A consecutive subsequence is a chain whose steps are all `+1` (increasing)
or all `-1` (decreasing), so every chain is fully described by the value
its elements end at. Scan the array once carrying four hash maps keyed by
value: for each direction, how many chains seen so far end at an element
of that value (`inc_cnt` / `dec_cnt`) and the total element-sum carried by
those chains (`inc_sum` / `dec_sum`). Buckets accumulate across duplicate
occurrences, which is what makes subsequences — not substrings — fall out
correctly: when element `x` arrives it extends _every_ earlier chain
ending at value `x - 1` (or `x + 1`), regardless of where those chains sit
in the array, because index order is automatic in a left-to-right scan.

The transition does three things per direction. It reads the neighbour
bucket `(cnt, sum)` at `x - 1` for increasing and at `x + 1` for
decreasing. The chains newly ending here are that bucket extended onto
this element plus the singleton `[x]`, so their count is `cnt + 1` and
their sum is `sum + cnt * x + x` — each extending chain grows by exactly
one new tail worth `x`, hence the `cnt * x`. Those new chains join the
same-value bucket for future extensions, and their sum is added to the
answer. The singleton exists in both directions but must be counted once,
so each step contributes `(inc_sum' ) + (dec_sum') - x`; equivalently the
step adds `sum_inc + cnt_inc * x + sum_dec + cnt_dec * x + x`.

All four maps are reduced modulo `10⁹ + 7` after every update, so every
stored value stays below the modulus and the widest intermediates are
single products `cnt * x < 10⁹⁺⁷ · 10⁵ ≈ 10¹⁴` plus one add — inside
64-bit range with huge margin, and far below `2⁵³`, so JavaScript `Number`
arithmetic stays exact throughout.

**Complexity:** `O(n)` time, `O(n)` space.
