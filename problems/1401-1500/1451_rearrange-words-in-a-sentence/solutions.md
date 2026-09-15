# Solutions — Rearrange Words in a Sentence

## Stable sort on length, then re-capitalize

Three format rules drive the plan: words go out in increasing length,
ties keep their input order, and only the first word of the result is
capitalized. The order is exactly what a stable sort by word length
produces — appending words in input order and sorting by length alone
preserves the relative order of equal-length words, so no explicit index
tiebreaker is needed.

Case handling is a pair of local edits rather than a pass of
per-word surgery: the input's first word is lowercased before sorting
(its capital is an artifact of position, not of the word), and after
joining the sorted words the new first word is capitalized. Every other
word travels through untouched.

The sentence can hold up to `10⁵` characters, but the sort is over words
with a cheap key; Python and the script languages' stable sorts, and a
stable merge sort where needed, keep it `O(w log w)` for `w` words.

**Complexity:** `O(n log n)` time dominated by the sort (`n` characters
total), `O(n)` space for the word list and result.
