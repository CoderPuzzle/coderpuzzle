# Solutions — Sum of Primes Between Number and Its Reverse

## Sieve and range sum

First build a boolean prime table for values up to 1000 with a standard
sieve. Reverse `n` by repeatedly extracting its last digit, which naturally
drops leading zeroes from the reversed representation. The answer is the
prefix-sum difference over the prime table between the smaller and larger
endpoint.

Every total fits comfortably in a 32-bit integer because the input limit is
small. The sieve also keeps repeated prime checks constant-time.

**Complexity:** `O(1000 log log 1000 + log n)` time, `O(1000)` space.
