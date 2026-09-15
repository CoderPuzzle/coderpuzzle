# Solutions — Numbers At Most N Given Digit Set

Length does most of the sorting: every writable number with fewer
digits than `n` is automatically below it, and among numbers of `n`'s
own length a digit-by-digit walk separates the prefixes that have
already fallen behind from the single prefix still tracking `n`
exactly. Both groups are pure counting — no number is ever built.

## Counting lengths, then walking `n`

Write `k` for the size of the digit set and `L` for the number of
digits of `n`. A writable number of length `l` is a free choice of `l`
digits, so there are exactly `k^l` of them, and every one with
`l < L` is smaller than `n` regardless of the digits chosen — the
shorter lengths contribute `k¹ + k² + … + k^(L-1)` outright. Example 2
is this sum alone: with three digits and `n = 10⁹`, the nine shorter
lengths total 3 + 9 + … + 19683 = 29523, and the equal path dies
immediately because `0` is not in the set.

The same-length numbers are counted by walking `n`'s digits left to
right under one invariant: the digits before position `i` match `n`
exactly. At position `i`, every set digit strictly below `n`'s digit
already makes the number smaller, and the remaining `L-1-i` positions
are then free — `below(i) · k^(L-1-i)` numbers per position. Only if
`n`'s digit itself is in the set does the equal prefix survive to the
next position; the first missing digit kills the walk, which is why
`n = 100` in Example 1 stops right after its leading `1`. If the walk
survives all `L` positions, `n` itself is writable and counts one more.

The counts are bounded by `n ≤ 10⁹`, but the powers they multiply are
not — `9^10` overflows 32 bits — so the sums accumulate in 64-bit
arithmetic and narrow on return. The walk touches each of the `L`
positions once and each position consults a per-digit table built in
one pass over the set.

**Complexity:** `O(D·L)` time, `O(1)` space.
