# Solutions — Number of Sets of K Non-Overlapping Line Segments

## Combinatorial identity via an index shift

Order the `k` segments by left endpoint: `l_1 < r_1`, `l_2 < r_2`, ...,
`l_k < r_k`, with `r_i <= l_(i+1)` between consecutive segments — strict
within a segment because it must cover two or more points, non-strict
between segments because touching at a shared endpoint is allowed. Shifting
the `i`-th pair by `i - 1` — `a_i = l_i + (i - 1)`, `b_i = r_i + (i - 1)` —
turns every inequality strict: the within-segment gap is untouched by an
equal shift, and the between-segment one becomes
`b_i = r_i + (i - 1) < l_(i+1) + i = a_(i+1)`, since `r_i <= l_(i+1)` means
`r_i < l_(i+1) + 1`. The result, `(a_1, b_1, ..., a_k, b_k)`, is a strictly
increasing sequence of `2k` integers drawn from `[0, n - 1 + (k - 1)]`, a
range of `n + k - 1` values.

This shift is a bijection: any strictly increasing sequence of `2k` values
in that range reverses uniquely to a valid set of `k` segments by undoing
the same per-pair offset, and reversing never breaks `l_i < r_i` or
`r_i <= l_(i+1)`. So choosing a set of segments is exactly choosing which
`2k` of the `n + k - 1` shifted positions appear, and the answer is
`C(n + k - 1, 2k)`. Factorials and their modular inverses up to `n + k - 1`
(at most `1998` at the bounds) are precomputed once per call — the inverses
via Fermat's little theorem, since `10⁹ + 7` is prime — and the binomial
coefficient reduces to three multiplications modulo `10⁹ + 7`.

**Complexity:** `O(n + k)` time, `O(n + k)` space.
