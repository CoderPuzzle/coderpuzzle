# Solutions — Vowel-Consonant Score

## One pass, two counters

The score is a function of exactly two totals — how many vowels and how
many consonants s holds — so a single left-to-right pass over the
characters is all the work there is. Each character falls into exactly
one of three buckets: one of the five vowels bumps v, any other
lowercase letter bumps c, and the spaces and digits the constraints
allow bump neither bucket. Two comparisons per character decide the
bucket, and the pass allocates nothing beyond the two counters.

With the totals in hand the definition collapses to one integer
operation. When c > 0 the score rounds v / c down to the nearest
integer — native integer division in five of the languages, and
`Math.floor` over an exact small quotient in JavaScript. When there are
no consonants at all the statement pins the score to 0, which the guard
returns before any division can happen. Both counters are bounded by
s.length and the quotient by v, so every value fits in a 32-bit integer
with room to spare.

**Complexity:** `O(n)` time, `O(1)` space.
