# Solutions — Largest Prime from Consecutive Prime Sum

The whole problem lives in one observation: a "consecutive prime sum
starting from 2" is just a prefix sum of the prime sequence. There are
only about `n / ln n` primes below `n`, and their prefix sums grow even
faster (roughly quadratically), so the list of candidate sums that stays
within `n` is tiny — under 400 candidates for the full constraint range.
Every approach therefore reduces to generating that short candidate list
and remembering the largest entry that is itself prime.

## Sieve Prefix Scan

Sieve of Eratosthenes up to `n` decides primality for every value that can
ever come up: each prime itself and, more importantly, each running total.
The sieve is built once with the usual two-row loop — clear 0 and 1, then
for every surviving `i` strike out multiples starting at `i * i` — which
costs `O(n log log n)` time and one flag byte per number.

With the sieve in hand the scan is a single walk over the primes in order,
carrying the running total. Each step adds the next prime; once the total
passes `n` every later total is larger still, so the walk stops there.
Whenever the current total is flagged prime in the sieve it becomes the
best answer so far — and because totals only grow, the last qualifying
total is automatically the largest, so no comparison bookkeeping beyond
the overwrite is needed.

**Complexity:** `O(n log log n)` time, `O(n)` space.
