# Solutions — Split Array by Prime Indices

## Sieve of Eratosthenes, then a single pass

The split is decided entirely by the index, so the work divides into two
independent halves: learn which positions are prime, then sum each side. A
trial-division primality test per index would cost `O(sqrt(i))` for the
`i`-th index, which is wasteful when the array is large; the Sieve of
Eratosthenes instead marks every composite index once in `O(n log log n)`
by crossing off multiples of each prime as soon as it is found. Indices 0
and 1 are marked non-prime before the loop starts, which is the whole
statement of the "prime index" rule — index 1 is never prime.

With the boolean table in hand, one pass over `nums` adds the element to
`sumA` when its index is prime and to `sumB` otherwise; the answer is
`|sumA - sumB|`. The two sums are the only numbers that grow with the
input, and they can reach `10^5 * 10^9 = 10^14`, comfortably past 32-bit
range, so every language keeps them in a 64-bit integer (Python and
JavaScript integers are naturally unbounded or exact below `2^53`, which
`10^14` respects). The empty side is handled for free: a length-one array
has no prime index, so `sumA` stays 0 and the note "an empty array has a
sum of 0" is exactly what the accumulator already says.

**Complexity:** `O(n log log n)` time, `O(n)` space.
