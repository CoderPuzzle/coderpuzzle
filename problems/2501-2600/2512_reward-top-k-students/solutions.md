# Solutions — Reward Top K Students

The whole problem is bookkeeping around one small fact: a student's
score is just three times their positive-word mentions minus one times
their negative-word mentions across every report they sent. Ranking in
non-increasing score order with lower ID breaking ties is then a single
comparison key, and the answer is that ranking's first `k` entries.

## Hash sets plus a sort on the negated key

Hash both feedback dictionaries into membership sets, so classifying any
report token costs `O(1)` expected. Walk each report with its owner ID,
splitting on single spaces (the constraints guarantee exactly one space
between words), and accumulate `+3` / `-1` per recognized word — every
occurrence counts, repeated words included. Collect each student's
tally into a pair `(-points, id)`.

Sorting those pairs ascending produces precisely the required order:
negated points put the biggest scores first without a descending
comparator, and equal scores fall back to ascending IDs, which matches
the tie rule exactly. The first `k` second components are returned.
Word lengths and token counts are bounded by the statement (`10⁴`
reports of at most 100 characters), points never leave a few million,
and identifiers stay below `10⁹` — everything fits comfortably in 32-bit
integers well under JavaScript's exact-number bound `2⁵³`.

**Complexity:** `O(C + n log n)` time for `C` total input characters,
`O(W + n)` space for the word sets and rankings.
