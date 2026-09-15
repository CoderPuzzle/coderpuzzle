# Solutions — Occurrences After Bigram

## Sliding window over the word list

Split `text` on spaces into a word array, then walk every index `i` from `0`
up to (but not including) `len(words) - 2`. At each `i`, check whether
`words[i]` equals `first` and `words[i + 1]` equals `second`; whenever both
hold, append `words[i + 2]` to the answer. Bounding the walk at
`len(words) - 2` guarantees a third word always exists at `words[i + 2]`, so
a bigram that lands on the last two words of `text` — with nothing left to
follow it — is never inspected and never contributes to the output.

Each index is checked independently against its own pair, so overlapping
matches are not special-cased: if `words[i]` and `words[i + 1]` match and
then `words[i + 1]` and `words[i + 2]` also match, both trigger and both
contribute a `third` word, even though they share a word between them. The
scan makes one pass over the word array, doing constant work per index.

**Complexity:** `O(n)` time, `O(n)` space, where `n` is the number of words
in `text`.
