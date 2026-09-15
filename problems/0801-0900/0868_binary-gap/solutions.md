# Solutions — Binary Gap

Adjacency is what keeps this a scan instead of a search: only consecutive
1's can bound a gap, so nothing beyond the position of the previous 1 is
worth remembering, and the whole answer falls out of one walk over the bits.

## One pass, remembering the previous 1

Walk the bits from low to high, keeping a running index and the index of the
most recent 1, initialized to a sentinel that means "none yet". Every time
the scan meets a 1 after that, the distance `index - previous` is exactly
the distance the statement defines for that adjacent pair, so it becomes a
candidate for the maximum and `previous` moves up; a 0 does nothing but
advance the index.

The sentinel settles every edge case without special-casing. A leading run
of zeros below the first 1 is never measured, because no earlier 1 exists
to close a pair with; a single 1 leaves the maximum at its initial `0`; and
the zeros trailing past the final 1 close no pair at all — `20`, which is
`10100`, answers `2` for the pair it contains, not more, and `8`, which is
`1000`, answers `0` even though its tail of zeros is the longest run in the
number. Under the bound `n` fits in thirty bits, so a 32-bit integer carries
the index, the distance, and the answer in every language.

**Complexity:** `O(log n)` time, `O(1)` space.
