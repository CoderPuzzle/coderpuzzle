# Solutions — Minimum Deletions to Make Character Frequencies Unique

## Count, sort, greedily lower collisions

Deletions only ever lower a frequency, so the first step is to count how
many times each of the 26 letters appears. From there the problem reduces
to a pure frequency-shaping puzzle: given a multiset of frequencies, lower
some of them (each lowering step costs one deletion) until no two nonzero
frequencies coincide, using as few steps as possible.

Processing frequencies from largest to smallest makes the greedy choice
obvious. A `used` set tracks the frequency values already claimed by
letters handled so far. For each new frequency, while it collides with a
value already in `used` (and it is still positive), decrement it by one
and count a deletion; once it either escapes every collision or hits zero,
record it in `used` if it survived above zero. Sorting descending, and
always resolving the largest surviving collision first, guarantees each
frequency only ever competes against strictly larger values already
settled, which is exactly what keeps the total number of decrements
minimal — no letter is ever forced down further than the nearest free
value below its starting count.

**Complexity:** `O(n + k log k)` time, `O(k)` space, where `n` is the length
of `s` and `k` is the size of the alphabet (at most 26).
