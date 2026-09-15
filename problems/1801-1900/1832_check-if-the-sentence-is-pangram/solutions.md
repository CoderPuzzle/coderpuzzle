# Solutions — Check if the Sentence Is Pangram

A pangram asks exactly one question about the input: how many distinct
lowercase letters does it contain? Everything else — order, repetition,
length beyond 26 — is irrelevant. So the sentence is a pangram precisely
when its set of distinct characters equals the full 26-letter alphabet.

## Distinct-character set

Collect every character of `sentence` into a hash set and compare its size
with 26. The set collapses duplicates for free, so `"leetcode"` yields
`{l, e, t, c, o, d}` of size 6, while the fox sentence yields all 26. An
early exit keeps the common non-pangram inputs cheap: as soon as the set
reaches 26 during the scan we can answer `true`, since the alphabet only
has 26 letters to find and the rest of the string cannot change the
verdict.

The work is one pass over the string with constant-time set operations —
at most 26 useful inserts, though the loop still walks every character.
Space is bounded by the alphabet itself, never more than 26 entries
regardless of input length (up to 1000 here).

**Complexity:** `O(n)` time, `O(1)` space (the set holds at most 26
characters), where `n` is `sentence.length`.
