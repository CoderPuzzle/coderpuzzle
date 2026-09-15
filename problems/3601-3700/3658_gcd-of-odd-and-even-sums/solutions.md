# Solutions — GCD of Odd and Even Sums

## Closed-form parity identity

Both sums have closed forms, so the loops the statement seems to ask for
are never needed. The first `n` odd numbers pair up around the middle —
`1` with `2n - 1`, `3` with `2n - 3`, and so on — and every pair totals
`2n`, giving `sumOdd = n * n`. The even side factors as twice a
triangular sum: `sumEven = 2 * (1 + 2 + ... + n) = n * (n + 1)`.

The requested quantity is therefore `gcd(n * n, n * (n + 1))`. Factoring
the shared `n` out of both arguments turns this into
`n * gcd(n, n + 1)`, and consecutive integers are always coprime: any
common divisor of `k` and `k + 1` also divides their difference, which
is `1`. The whole expression collapses to `n` itself — exactly what the
examples show, where `n = 4` answers `4` and `n = 5` answers `5`.

That reduces the implementation to returning `n` directly. No loop runs
and no arithmetic happens, so the bound on `n` is irrelevant in practice:
even far beyond `n <= 1000` there is no accumulation to overflow and no
cost that grows with the input.

**Complexity:** `O(1)` time, `O(1)` space.
