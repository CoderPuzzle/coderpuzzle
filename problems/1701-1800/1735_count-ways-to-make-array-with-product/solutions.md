# Solutions — Count Ways to Make Array With Product

## Prime Factorization with Stars and Bars

By unique factorization, the ways to fill the array factor independently per prime. Writing each slot's value as a product of primes, the product of the whole array is `k` exactly when, for every prime `p` with exponent `x` in `k`, the total exponent of `p` across all `n` slots is `x`. Distributing `x` identical copies of one prime among `n` distinguishable slots is a stars-and-bars count of `C(x + n - 1, n - 1)`, and the counts for different primes multiply because the primes never interact.

Each query factorizes its `k` by trial division up to `sqrt(k)` — at most about 100 divisions for `k <= 10^4` — collecting the exponents, with a leftover factor greater than 1 being a prime of exponent 1. The answer is the product of `C(x + n - 1, n - 1)` over those exponents, taken modulo 10^9 + 7.

The binomials come from factorial tables precomputed once up to `_MAX = 20000`, comfortably above the largest needed argument (a `k` below 10^4 has no prime exponent beyond 13, so `x + n - 1 <= 13 + 10^4 - 1`). Modular inverse factorials are derived from a single Fermat inversion `pow(fact[max], MOD - 2, MOD)` run backwards, after which every binomial is three multiplications. The precompute is paid once across all queries, and each query then costs only its factorization plus a handful of multiplications. Writing `M` for the precompute bound (20000), `Q` for the number of queries, and `K` for the largest queried `k`, the totals follow directly.

**Complexity:** `O(M + Q sqrt(K))` time, `O(M)` space.
