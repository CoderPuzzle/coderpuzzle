# Solutions — Three Divisors

## Perfect square of a prime

Positive divisors pair off: for every divisor `d` of `n`, `n/d` is also a
divisor, and the two coincide only when `d = n/d`, i.e. `d = √n`. A count of
three is therefore possible only when `√n` is an integer and the divisor
list is exactly `1, √n, n` — a perfect square `n = x²` that has no divisors
other than `1`, `x`, and `x²`. Such a square has exactly three positive
divisors precisely when its root `x` is prime: a composite root `x = a·b`
factors `n` in a way that adds `a·b` as a fourth divisor, while a prime root
contributes only `1`, the prime, and the square.

The check is then `x*x == n` with `x = √n` (the multiplication avoids
floating point) plus a primality test of `x` by trial division up to `√x`.
Since `n <= 10⁴`, the root is at most `100`, so the trial division runs at
most a dozen iterations; every intermediate value fits a 32-bit integer in
every language, and the JS/TS numbers stay exact small integers throughout.
A direct divisor count is equivalent — scan `1..√n` and stop at three — and
agrees on every input, since the only three-divisor integers are exactly
these prime squares.

**Complexity:** `O(√n)` time, `O(1)` space.
