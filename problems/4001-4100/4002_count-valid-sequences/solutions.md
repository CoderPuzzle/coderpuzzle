# Solutions — Count Valid Sequences

## Stars and Bars with an All-Odd Correction

Every valid sequence is an ordered composition of `n` into `k` positive parts
whose product is even, so count all compositions first, then subtract the
odd-product ones. Stars and bars gives the total: an ordered composition of
`n` into `k` positive parts places `k - 1` dividers into the `n - 1` gaps
between unit cells, which is `C(n - 1, k - 1)`.

A product is odd exactly when every part is odd. Writing each part as
`x_i = 2*y_i + 1` with `y_i >= 0`, the sum condition `x_1 + ... + x_k = n`
becomes `k + 2*(y_1 + ... + y_k) = n`. If `n - k` is odd this has no
solution and nothing is subtracted; otherwise it distributes `(n - k) / 2`
over `k` non-negative parts, which stars and bars counts again as
`C((n + k) / 2 - 1, k - 1)`.

Both binomials are evaluated modulo `10^9 + 7` from factorials and inverse
factorials precomputed up to `n`; the single needed inverse comes from
Fermat's little theorem, `x^(p - 2) mod p` for the prime `p`, entirely in
integer arithmetic. The answer is the total minus the odd count, normalized
back into range.

**Complexity:** `O(n)` time, `O(n)` space.
