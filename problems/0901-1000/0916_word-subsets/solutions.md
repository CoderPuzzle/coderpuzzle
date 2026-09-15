# Solutions — Word Subsets

The naive shape is a cross product: test every word of `words1` against
every `b` in `words2`. But subset-hood is letter-count domination, and the
definition checks each `b` independently, so the demands never accumulate
across `words2` — they only ever take a maximum. The whole of `words2`
therefore folds into one 26-slot requirement vector, and each word of
`words1` faces a single dominance test.

## Max Demand Vector, One Dominance Test

Collapse `words2` first. Tally each `b` into 26 counters and keep, per
letter, the maximum count any single `b` demands — a word covering that
maximum covers every `b`, because the same letter occurrence in a word can
serve all of `words2` at once. The collapse is why summation and
concatenation are wrong: `"ab"` and `"bc"` together still demand only one
`b`, not two, while `"aab"` genuinely demands two `a`'s — multiplicity
counts inside a `b` but never adds across them.

Then each word of `words1` is tallied into its own 26 counters and kept iff
every slot meets the demand — `have[i] >= need[i]` for all 26 letters, with
equality passing, since a letter occurring exactly as often as demanded
still occurs "at least as many times". Survivors are collected in input
order, and because the strings of `words1` are unique, that list is the one
determinate answer.

Every string is read exactly once: each `b` for the collapse, each word of
`words1` for its own test, each with a fixed 26-slot comparison.

**Complexity:** `O(total characters)` time, `O(1)` space (26 counters).
