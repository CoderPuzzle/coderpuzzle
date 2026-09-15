# Solutions — Word Abbreviation

## Collective prefix growth

Every word starts at a one-letter prefix — first character, count of the
middle, last character — and the abbreviations are bucketed by their string.
A bucket holding more than one word is a clash, and the fix is collective:
every word in that bucket grows its prefix by exactly one letter and the
bucketing repeats. Nothing else ever needs to move, because an abbreviation
reads back unambiguously (letters, then the middle count, then the final
letter): two of them can only be equal when the words share the same length,
the same prefix and the same last letter. So clashes never reach across
depths, and a settled word can never be dragged back into one — each round
only refines the buckets that still hold a clash.

The process must end. Two clashing words agree on their first `p` letters
and their last letter, yet the input words are distinct, so they differ
somewhere in the middle; once the prefix swallows that position the two
abbreviations part ways, which happens at the latest when the prefix covers
all but the final letter. This is exactly what Example 1 shows:
`"internal"` and `"interval"` walk together through `i6l`, `in5l`,
`int4l`, `inte3l`, `inter2l` before their sixth letters separate them, while
`"intension"` and `"intrusion"` shake hands as early as `inte4n` versus
`intr4n`.

The last pass applies the statement's escape hatch: an abbreviation that is
not strictly shorter than its word buys nothing, so the word itself is kept.
That covers `"god"` (`g1d` only ties it), the two-letter words (their
`a0b`-shaped abbreviations are longer), and the deep pairs that only
separate once the prefix has swallowed nearly the whole word.

**Complexity:** `O(n * L^2)` time in the worst case (`L` = word length, at
most `L - 2` rounds each rebuilding all `n` abbreviations), `O(n * L)` space.
