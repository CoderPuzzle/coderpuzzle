# Solutions — Count Primes

Two sieves; both tabulate primality below `n` in one pass over a flag
array, differing in whether a composite is crossed off repeatedly or
exactly once.

## eratosthenes

Testing each number below `n` for primality wastes work re-discovering the same divisors; the sieve inverts the task. It assumes every number from 2 upward is prime, then for each prime `i` marks all of its multiples as composite in one stroke. Whatever remains unmarked was never a multiple of anything smaller and is therefore prime.

The implementation uses a `bytearray` of flags indexed by the number itself, which is both compact and fast to update. The outer loop runs only while `i * i < n` — any composite below `n` has a factor no larger than its square root, so beyond that point every composite has already been marked. When `is_prime[i]` is still set, the slice assignment `is_prime[i*i :: i] = bytearray(len(range(i*i, n, i)))` zeros out the multiples of `i` in a single C-level operation, starting at `i*i` because smaller multiples were crossed off earlier by their smaller factors.

The answer is simply the sum of the surviving flags. Inputs below 3 (n = 0, 1, 2) return 0 up front since there are no primes strictly less than 2.

**Complexity:** `O(n log log n)` time, `O(n)` space.

## linear_sieve

Eratosthenes writes the same composite many times — 60 is crossed off by 2, 3 and 5 — which is why its bound carries the `log log n`. The linear sieve arranges for every composite to be written exactly once, by its smallest prime factor. It keeps an `spf` table (`spf[x]` = smallest prime factor of `x`, still 0 while `x` is untouched) and the list of primes found so far; scanning `i` upward, an untouched `spf[i]` means nothing smaller ever marked `i`, so `i` is prime. Then for each prime `p` in order it writes `spf[i·p] = p`, stopping at the first `p` that exceeds `spf[i]` (or leaves the range) — that stop is the whole trick: by always pairing a composite with its smallest factor, no pair is ever produced twice, and the total number of writes is exactly the number of composites below `n`.

One pass, one write per composite: the time bound is a clean `O(n)` and the prime list is filled in ascending order as a by-product. The costs are bookkeeping (`spf` holds an int per number rather than one flag bit) and a branchier inner loop, which is why the simpler Eratosthenes — with its C-level bulk clearing — usually wins in practice despite the worse asymptotics. Inputs below 3 return 0 up front as before.

**Complexity:** `O(n)` time, `O(n)` space.
