# Solutions — Super Ugly Number

## One pointer per prime

The sequence generates itself. Every super ugly number past 1 has at least one prime factor in `primes`, and dividing that factor out leaves a smaller number whose prime factors are still all in `primes` — an earlier member of the sequence. So each new value is exactly a listed prime times an earlier value, which means the sequence can be built in ascending order: keep the built prefix in `ugly`, and for each prime a pointer to the earliest value it has not yet been multiplied past, together with its cached candidate `primes[p] * ugly[index[p]]`. The next element is always the smallest candidate.

One value can be reachable several ways — 6 is both 2 · 3 and 3 · 2 — so after taking the minimum, every pointer whose candidate equals it is advanced, leaving each pointer at the first not-yet-produced product of its prime; that is what keeps duplicates out of the array. The candidates themselves must be held in a wider integer than the answer: they routinely overshoot the final value by one factor of the largest prime, past the 32-bit cap the statement promises the answer itself fits under.

For the first example all four pointers start at 1, the candidates 2, 7, 13, 19 elect 2, then 4, then 7, and the pointer walk reproduces the given sequence `[1,2,4,7,8,13,14,16,19,26,28,32]`. With `n = 1` no step runs at all: 1 has no prime factors, so it is the first super ugly number for every `primes`. Each of the `n` elements costs one scan of the `k` candidates.

**Complexity:** `O(nk)` time, `O(n + k)` space.
