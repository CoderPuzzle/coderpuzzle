# Solutions

Both solutions treat the `k`-th factor as a counting question and never
sweep all of `1..n`. Binary search makes the count the whole story: the
number of factors of `n` that are at most `m` only ever grows with `m`,
so the smallest `m` whose count reaches `k` can be bisected out of
`[1, n]`, each probe costing one square-root paired walk — about ten
probes at `n <= 1000`, a log-factor surcharge in time that buys `O(1)`
space and deletes the bookkeeping. The pairing scan pays that same walk
once, stepping candidate divisors `d` upward and pairing each small
divisor with its complement `n / d` — the faster of the two, and the
direct answer to the follow-up.

## Binary Search On The Answer

For any threshold `m`, let `f(m)` count the factors of `n` that are at
most `m`. `f` only ever grows as `m` grows, and the `k`-th factor — when
it exists — is exactly the smallest `m` with `f(m) >= k`. That
monotonicity invites bisection: keep a window `[lo, hi]` opening on
`[1, n]`, test its middle each round, drop the upper half when
`f(mid) >= k` because `mid` already works and nothing larger is needed,
drop the lower half otherwise, and the window closes on one value. When
`n` has fewer than `k` factors every probe fails, the window closes on
`n` itself, and the closing test reports `-1`.

The probe is the divisor pairing borrowed whole: for every `d` with
`d * d <= n` that divides `n`, count `d` when `d <= m`, and count its
distinct complement `n / d` when that complement is at most `m`. At
these bounds that is roughly `log2(1000) ~ 10` probes of a walk of
about 32 steps — more arithmetic in total than the scan's single pass,
the price of `O(1)` space: no divisor list is kept, and the
perfect-square and complement-index arithmetic of the scan disappear
into the predicate.

**Complexity:** `O(sqrt n log n)` time, `O(1)` space.

## Pair Small Divisors With Their Complements

Walk `i` from `1` while `i * i <= n`, counting every divisor as you meet
it in ascending order. When `k` is reached at some `i <= sqrt(n)`, return
`i` immediately. Otherwise let `c` be the count of divisors found up to
the square root; each remaining divisor is a complement `n / d` for a
small divisor `d < i`, met in descending complement order, so the wanted
index maps back through the count: if `k > 2 * c - (perfect square ? 1 :
0)` there is no k-th factor; else take the `(2c - k + 1)`-th smallest
small divisor's complement. Constant arithmetic per candidate.

**Complexity:** `O(sqrt n)` time, `O(sqrt n)` space for the recorded
small divisors.
