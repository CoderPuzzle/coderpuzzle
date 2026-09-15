# Solutions — Construct the Longest New String

## Alternate the doubles, ride along with every AB

Every `"AB"` rides along for free, so `2 * z` characters are always
available. Suppose a valid string left `k` of the `"AB"`s unused. If it
starts with `'A'`, prepending all `k` of them is safe: the fragment
`"ABAB…AB"` contains no triple itself, and each prepend seats a `'B'`
against an `'A'`. If it starts with `'B'`, its first block must have been
`"BB"`, and sliding all `k` fragments between those two `'B'`s is safe too
— the seams read `'B'|'A'` and `'B'|'B'`. Either way the string grows by
`2k` characters without forming `"AAA"` or `"BBB"`, so some optimal string
uses all `z` copies. Deleting them again leaves a valid pure-`"AA"`/`"BB"`
string, never longer than `f(x, y)`, the best length obtainable from the
doubled blocks alone — so the answer is exactly `f(x, y) + 2 * z`.

The doubled blocks price out by alternation: a legal `"AA"`/`"BB"`
concatenation reads as whole blocks alternating `"AABB…"` or `"BBAA…"`,
since two same-letter blocks in a row would already make a triple. Each
run of one letter consumes one block, and neighboring runs alternate
letters, so the run counts differ by at most one — equal unless the string
both starts and ends with the same letter, which grants that side exactly
one extra run. At most `min(x, y)` paired rounds fit, plus a single spare
round for whichever side is larger when `x != y`, giving
`f(x, y) = 4 * min(x, y) + (2 if x != y else 0)`, attained by chaining
`"AABB"` pairs and bookending with the majority side's spare block. Both
statement examples agree: `(2, 5, 1)` yields `8 + 2 + 2 = 12` through
`"BBAABBAABBAB"`, and `(3, 2, 2)` yields `8 + 2 + 4 = 14` through
`"ABABAABBAABBAA"`. Answers stay below `400`, comfortably inside 32-bit
range.

**Complexity:** `O(1)` time, `O(1)` space.
