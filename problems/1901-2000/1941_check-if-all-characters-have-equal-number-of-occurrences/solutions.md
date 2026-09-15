# Solutions — Check if All Characters Have Equal Number of Occurrences

A string is good when every character that appears in it occurs the same
number of times.

## Count each character, then compare the frequencies

The string is good exactly when every character that occurs at all does so
the same number of times, so the first step is to tally the occurrences of
each letter. One pass over `s` fills a frequency table — a `Counter`/map in
the high-level languages, a fixed `26`-slot array where the alphabet size
makes the table trivial.

The equal-frequency test then reduces to a single question about the
collected counts: do all non-zero frequencies agree? Collecting the
distinct count values into a set and checking that the set has size one
answers it directly, and it naturally ignores characters that never appear
in `s`, since their count of zero is never part of the set.

A string with a single distinct character is good (one frequency), a string
where every letter appears once is good, and any string with two letters at
different counts is not. The count table is bounded by the 26-letter
alphabet regardless of `s.length`, keeping both the pass and the comparison
tight.

**Complexity:** `O(n)` time, `O(26)` space, where `n` is the length of `s`.
