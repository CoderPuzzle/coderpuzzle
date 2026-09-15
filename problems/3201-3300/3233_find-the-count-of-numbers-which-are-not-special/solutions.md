# Solutions — Find the Count of Numbers Which Are Not Special

A number is special exactly when it is the square of a prime. If `x = p²`
for a prime `p`, its only divisors are `1`, `p`, and `x`, so its proper
divisors are exactly `1` and `p`. Conversely, being special means three
divisors in total, and a divisor count of `3` forces the factorization to
be `p²`: divisor counts are products of (exponent + 1) factors, `3` is
prime, so exactly one prime carries exponent exactly `2`. Every other
number fails from one side or the other — `1` has no proper divisors at
all, plain composites like `6` have too many, and squares of composites
like `16 = 2⁴` inherit extra factors.

## Sieve the primes up to sqrt(r)

The specials in `[l, r]` are therefore the squares `p²` with `l <= p² <= r`
— equivalently, the primes `p` in `[ceil(sqrt(l)), floor(sqrt(r))]`. Since
`r <= 10⁹`, that window holds at most about `31623` candidates, so one
Eratosthenes sieve over `0..floor(sqrt(r))` settles every primality verdict
before a single boundary is examined. The special count is the number of
surviving primes between the two bounds; both bounds come from an integer
square root whose floating estimate is only a hint, corrected by exact
multiplications so rounding can never place a prime on the wrong side
(`ceil(sqrt(l))` is recovered as `isqrt(l - 1) + 1`).

The answer is the range width `r - l + 1` minus that special count. Width
and answer stay at or below `10⁹` and fit 32 bits, but the boundary
arithmetic runs in 64-bit integers in every typed language: the correction
probes around the square root must stay exact no matter how far the initial
floating estimate drifts before the fixup loops converge. JavaScript needs
no wider type — every value involved stays far below `2^53`, so doubles
carry them exactly.

**Complexity:** `O(sqrt(r))` time (sieve), `O(sqrt(r))` space.
