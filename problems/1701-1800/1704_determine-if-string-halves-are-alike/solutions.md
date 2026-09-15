# Solutions — Determine if String Halves Are Alike

Nothing about a vowel matters beyond its membership in the ten-letter set:
which vowel it is, where it sits in its half, and whether it is upper- or
lowercase all drop out of the comparison, leaving only two totals to match.
And since the halves have equal length, the two totals do not even need to
be stored separately — one counter can hold their difference.

## One pass, one counter

Walk `s` a single time with an integer counter starting at zero: over the
first half every vowel increments it, over the second half every vowel
decrements it. The counter ends at exactly zero when the two halves hold the
same number of vowels, which is the definition of alike. Membership in the
vowel set is the only per-character question, answered by the hint's helper —
a function that checks a character against all ten vowel letters, both cases,
as one if-chain or set lookup.

A single counter is safe as well as sufficient: it moves by at most one per
character, so it stays within ±n/2 ≤ 500 and never overflows a 32-bit
integer, and the answer is one comparison against zero at the end. No per
vowel tally, no slicing, and no second pass are ever needed.

**Complexity:** `O(n)` time, `O(1)` extra space.
