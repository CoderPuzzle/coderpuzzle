# Solutions — Number of Strings That Appear as Substrings in Word

Each pattern contributes independently: it either appears as a contiguous
substring of `word` or it does not, and the answer is simply the number of
patterns that do. Nothing in the statement couples the patterns together —
duplicates are counted once per copy, which is why `["a","a","a"]` against
`"ab"` returns `3` — so there is no benefit to pre-processing `word` or
deduplicating the input.

## Scan with substring containment

A single pass over `patterns` tests every pattern with the language's
built-in substring check and increments a counter when it matches. Each
test is an exact contiguous occurrence search, so a pattern that appears
several times still contributes just one, and a pattern longer than `word`
simply fails.

The constraints are deliberately small — at most 100 patterns of 100
characters against a 100-character `word` — so the built-in scan finishes
far inside the limits with no extra structure needed.

**Complexity:** `O(patterns.length * word.length * patterns[i].length)`
time worst case, `O(1)` space.
