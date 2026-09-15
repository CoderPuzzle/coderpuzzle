# Solutions — Prime Arrangements

## Count Primes with a Sieve, Multiply Two Factorials

Which arrangements are valid? A permutation places the primes somewhere;
the requirement pins every prime to a prime index. That fixes nothing about
the _order within_ each group — it only partitions the positions: if `n`
holds `p` primes, the `p` prime numbers may be arranged among the `p` prime
indices in `p!` ways, and the remaining `n − p` values (1 together with the
composites — 1 is not prime, so it sits on a non-prime index) fill the
other slots in `(n − p)!` ways. The two choices are independent, so the
answer is their product.

Counting the primes up to 100 is the sieve of Eratosthenes' home turf:
mark composites by crossing out multiples from each surviving prime, then
tally what remains. The factorials are computed under the modulus, one
multiply-and-reduce per factor, so intermediate values never leave machine
range.

**Complexity:** `O(n log log n)` time for the sieve plus `O(n)` for both
factorial products, `O(n)` space for the sieve table.
