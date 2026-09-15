# Solutions — Index Pairs of a String

## Brute-force substring matching

For each starting index `i` in `text`, check every word in `words`: if
`word` fits starting at `i` (`i + word.length <= text.length`) and the
slice `text[i .. i + word.length)` equals `word` exactly, then
`[i, i + word.length - 1]` is a match. Every word is tested against
every starting index independently, so overlapping matches (the same
or different words covering overlapping ranges) and repeated matches
of the same word at different positions are all collected without any
special-casing. Because the constraints guarantee every string in
`words` is unique, two different words can never produce the same
`[i, j]` pair — an equal substring range would force the two words to
be equal, contradicting uniqueness — so the collected pairs are
already free of duplicates and need no deduplication step. Once every
`(i, word)` combination has been checked, the collected pairs are
sorted by their first coordinate, then their second, matching the
required output order.

**Complexity:** `O(text.length * sum(words[i].length))` time,
`O(text.length * words.length)` space for the output in the worst
case.
