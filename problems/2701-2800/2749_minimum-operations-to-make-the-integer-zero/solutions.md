# Solutions — Minimum Operations to Make the Integer Zero

## Enumerate the operation count, check the popcount

The choices in different operations do not interact: after `k` operations that
picked exponents `i_1 … i_k`, the starting value has become
`num1 - k*num2 - (2^i_1 + … + 2^i_k)`, so reaching `0` is exactly the question
of whether `m = num1 - k*num2` can be written as a sum of exactly `k` powers of
two. That has a clean criterion. Each term contributes at least `1`, so
`k <= m` is necessary; and carrying equal terms (`2^j + 2^j` becoming `2^(j+1)`)
only ever shrinks the term count, so `popcount(m)` terms is the fewest possible
and `popcount(m) <= k` is necessary too. Both are also sufficient: start from
the binary expansion and split any term `2^j` with `j >= 1` into two `2^(j-1)`
terms, raising the count by exactly one per split until it reaches `k` (at the
latest at `k = m`, all ones).

So the answer is the smallest `k` with `m >= k` and `popcount(m) <= k`, found by
enumerating `k = 1 … 60`. The range suffices: when `num2 > 0` the window where
`m >= k` only shrinks, and if it still covers `60` then `m <= 10^9 + 6*10^10`
has at most 36 set bits, well under `k = 60`; when `num2 < 0`, `m` grows past
any popcount by `k ≈ 40`; and `num2 = 0` leaves `m = num1` fixed, answer
`popcount(num1) <= 30`. Feasibility is not monotone in `k` — the popcount of
`m` wanders as `k` advances — but scanning `k` upward means the first hit is
automatically the minimum; concluding `-1` just takes waiting out the full
range.

The intermediate value `m` peaks near `|10^9| + 60*10^9 ≈ 6.1*10^10`, beyond
32-bit range, so every compiled language computes it in a 64-bit integer.
JavaScript has no such type, but its Number represents integers exactly up to
`2^53`, far above `6.1*10^10`; note its bitwise operators truncate to 32 bits,
so the popcount is counted by division instead.

**Complexity:** `O(60)` time, `O(1)` space.
