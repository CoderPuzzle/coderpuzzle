# Solutions — Find and Replace Pattern

The permutation the statement asks for never names actual letters — it only
requires that the word repeats its letters in exactly the places the pattern
does. That structure is captured by a string's _signature_: the sequence of
first-appearance indices of its letters. The whole problem is one
normalization pass.

## First-Appearance Signatures

Reduce a string to its signature by replacing each letter with the index of
its first appearance: `"abb"` becomes `[0, 1, 1]`, and so does `"mee"`. Two
equal-length strings admit a bijection between their letters exactly when
their signatures are equal. If the signatures agree, pairing `pattern[i]`
with `word[i]` is consistent — a repeated pattern letter always meets the
same word letter — and injective — two different pattern letters never meet
the same word letter — so the pairing extends to a full permutation of the
alphabet. If they disagree, some pair of positions contradicts the bijection
in one direction or the other, as with `"ccc"` under `"abb"`: the two pattern
letters `a` and `b` would both map to `c`.

The pattern's signature is computed once; each word is then normalized with
one left-to-right pass and kept iff its signature matches, so the answer
carries the matching words in input order, duplicates included. Here `W` is
the number of words and `L` the common word length.

**Complexity:** `O(W·L)` time, `O(L)` space.
