# Solutions — Power of Three

## Divisibility by the ceiling power

`3¹⁹ = 1162261467` is the largest power of three a signed 32-bit integer
can hold — `3²⁰ = 3486784401` is already past the `2³¹ - 1` cap and never
arrives on the wire. Because 3 is prime, the positive divisors of `3¹⁹`
are exactly the powers `3⁰` through `3¹⁹`: a divisor's factorization can
contain nothing but 3s, at most nineteen of them, and every such product
is a lower power of three. Across the whole domain, then, the questions
"is `n` a power of three" and "is `n` positive and a divisor of
`1162261467`" have the same answer, which makes the method the single
expression `n > 0 && 1162261467 % n == 0` — one modulo, no loop, no
recursion, the follow-up met outright.

The guard carries everything the divisibility test cannot see. Zero and
every negative down to `-2³¹` are rejected by `n > 0` before the modulo
runs, which is also what keeps the divisor from ever being 0: the
short-circuit evaluates `1162261467 % n` only once `n >= 1` holds, so the
division-by-zero fault (a trap in C++ and Java, a panic in Rust) is
unreachable in every language. Magnitude settles the top of the range —
no value above `3¹⁹` can divide `3¹⁹`, so `1162261468` through `2³¹ - 1`
all fail on size alone — and below the ceiling the primality argument
leaves nothing lurking: no in-range value divides `3¹⁹` without being a
power of three.

Concretely, `27` divides (`1162261467 = 27 × 43046721`), and so do `1`,
`3`, `9`, and every other power up to the ceiling — nothing else does.
`6 = 2 × 3` is divisible by 3 yet fails: `3¹⁹` is odd, so no even number
divides it, and `1162261467 % 6` leaves `3`. The values just below and
just above each power flank divisors without being divisors —
`1162261466` and `1162261468`, the two neighbors of the ceiling, both die
this way — and the negatives `-3`, `-9`, `-27`, `-3¹⁹` are powers in
magnitude only, rejected on sight.

**Complexity:** `O(1)` time and `O(1)` space.
