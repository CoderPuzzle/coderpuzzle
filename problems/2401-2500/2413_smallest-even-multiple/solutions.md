# Solutions — Smallest Even Multiple

## Parity branch on lcm(2, n)

The positive integers divisible by both 2 and `n` are exactly the multiples
of `lcm(2, n)`, and the smallest of them is that lcm itself. Because 2 is
prime, the lcm collapses to a single parity test: if `n` is even then 2
already divides `n`, the two divisors impose no combined demand beyond
`n` itself, and the answer is `n` — a number is a multiple of itself, as
the second example notes. If `n` is odd, its factorization lacks the 2, so
the lcm must be `2 * n`.

Both branches are a single arithmetic expression. With `n <= 150` the
answer never exceeds 300, nowhere near any integer-width concern.

**Complexity:** `O(1)` time, `O(1)` space.
