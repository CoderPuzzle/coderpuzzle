# Solutions — Valid Word

## Single pass validation

The definition decomposes into independent checks, so a single scan over the
characters settles everything. A length gate rejects words shorter than
three characters up front; during the scan, any character that is neither a
digit nor an ASCII letter fails the word immediately, while letters are
classified on sight — a lowercase or uppercase `a`, `e`, `i`, `o`, `u` marks
the vowel flag and every other letter (including `y`) marks the consonant
flag.

Because digits belong to neither class, a word made only of digits and
symbols can never acquire both flags even when its characters are legal,
which is exactly what the final `hasVowel && hasConsonant` requirement
enforces; returning `true` only after the loop ends keeps one rejected
character from being masked by later valid ones. Total work is linear in
the word length with constant extra state — two booleans — since the input
is bounded at twenty characters this is trivially fast in every language.

**Complexity:** `O(n)` time, `O(1)` space.
