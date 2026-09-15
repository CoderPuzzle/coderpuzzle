# Solutions — Divide Array Into Increasing Sequences

## Count the maximum frequency and compare with `n / k`

A strictly increasing sequence can hold each value at most once, so every
copy of the most frequent value must land in a different sequence. If `m` is
that maximum frequency, any valid division therefore uses at least `m`
sequences — and using exactly `m` is always the best try, because fewer
sequences only makes the length budget tighter while more of them can never
be formed (each sequence needs a distinct copy of the frequent value).

With `n` elements split across `m` sequences, the pigeonhole principle caps
the shortest sequence at `floor(n / m)`, so `n >= m * k` is necessary. It is
also sufficient, by an explicit construction: deal the sorted array
round-robin over the `m` sequences, giving element `i` to sequence
`i mod m`. Two equal values sit at most `m - 1` positions apart (a value
with frequency `c <= m` occupies `c` consecutive slots), so they always
receive different remainders — no sequence repeats a value — and the array's
sorted order makes every sequence increasing. The lengths differ by at most
one, so all of them reach `k` exactly when `n >= m * k`.

The code is one counting pass for `m` and one product comparison; the
product `m * k` can reach `10⁵ × 10⁵ = 10¹⁰`, so it is computed in 64-bit
arithmetic.

**Complexity:** `O(n)` time — one scan for the maximum run of equal values —
and `O(1)` extra space when counting on the fly (the sorted order means a
frequency map is unnecessary).
