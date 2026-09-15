# Solutions — Four Divisors

## Square-root divisor enumeration per element

Divisors of `n` come in pairs `(d, n/d)` with the smaller member at most `√n`, so a single loop up to the square root enumerates all of them: each divisor found contributes both members to the sum and two to the count, collapsing to a single contribution when `d·d == n`. A number has exactly four divisors precisely when that loop ends with count 4 — either a product of two distinct primes or the cube of a prime — and only then does its divisor sum join the total.

Numbers failing the count add nothing, which keeps the common case (primes, squares of primes, anything else) to the same square-root scan with no extra bookkeeping. The grand total stays within 32 bits: the largest four-divisor sum for a value ≤ 10⁵ is `1 + 2 + 49999 + 99998 = 150000`, and even ten thousand copies of it total `1.5 × 10⁹ < 2³¹`.

Each of the `n` array elements costs `O(√v)` divisions, and only the running total is carried between them.

**Complexity:** `O(n·√v)` time, `O(1)` extra space, where `v` is the largest value in `nums`.
