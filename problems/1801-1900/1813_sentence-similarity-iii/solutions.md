# Solutions — Sentence Similarity III

An insertion splices whole words into one sentence, so similarity is a
property of the two word lists: the sentence that receives the insertion
must be the other one with one contiguous run of extra words somewhere
between its ends.

## Match a common prefix and suffix

Split both sentences on spaces and walk two pointers. Pointer `i` advances
while the words agree from the front, and pointer `j` advances while they
agree from the back, so together they measure the longest common prefix and
suffix. The suffix walk is capped at `len - i` on both sides, which keeps
the prefix and the suffix from overlapping and counting the same word of
the shorter sentence twice — without that guard a sentence such as
`"a b a"` versus `"a"` would wrongly claim a one-word prefix and a one-word
suffix out of a single word.

The shorter word list can be similar only if the inserted run is absent
from it entirely, so the test is `i + j` covering the shorter list: prefix
plus suffix account for every word, and the words between position `i` and
the mirrored position on the longer side are exactly what an insertion
would supply. Equal sentences have the prefix walk consume the whole list,
and the "possibly empty" insertion is the case where the two walks meet
with nothing left over.

**Complexity:** `O(n)` time, `O(n)` space, where `n` is the length of the
sentences.
