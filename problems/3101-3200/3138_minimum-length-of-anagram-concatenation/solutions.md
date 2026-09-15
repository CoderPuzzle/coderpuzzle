# Solutions — Minimum Length of Anagram Concatenation

## Divisor sweep with chunk multiset checks

Because `s` is a concatenation of anagrams of one string `t`, all chunks
have the same length `L = len(t)` and `n = L * m`, so candidate answers are
exactly the divisors of `n`. For a fixed divisor, validity is a purely
counting property: cutting `s` into consecutive `n / L` chunks must give
every chunk the same letter-frequency vector as the first chunk — the
actual arrangement inside each chunk is irrelevant. The smallest surviving
divisor is the answer; single-chunk case `L = n` always works since `t` may
equal `s` itself.

Each candidate is tested in one pass with two running counters over the 26
letters: the first chunk seeds the reference vector, and a per-chunk
accumulator fails fast on any letter whose count exceeds the reference
before the chunk boundary, since no suffix can undo an overshoot. Chunk
boundaries compare the accumulator with the reference and reset it. With at
most 128 divisors for `n <= 10⁵` the scan does `O(n * d(n))` character
work in the worst case (`d(n)` = number of divisors) while typical failing
candidates abort after a few letters; extra space is just two 26-slot
arrays.

**Complexity:** `O(n * d(n))` time, `O(1)` space.
