# Solutions — Verifying an Alien Dictionary

The permutation `order` defines a total order on the 26 lowercase letters,
and the question is whether `words` rises through it. Lexicographic
comparison is a pairwise judgment, so a list is sorted exactly when every
adjacent pair is in order — the whole task reduces to walking neighbors
with the alphabet's rank map in hand.

## Rank Map, Adjacent-Pair Scan

Translate `order` into a rank map once — each letter to its position in the
permutation. Then walk the adjacent pairs of `words`. For a pair, march
index by index to the first position where the letters disagree: that is
the only position that orders the two words, so compare ranks there. A
larger rank on the left word is the violation that falsifies the whole
list; a smaller one proves this pair sorted and moves on to the next.

If the shorter word instead ends with no disagreement, the pair shares a
prefix and the verdict rests on lengths alone: a proper prefix is the
smaller word, so the left word being longer is again a violation, while
two equal words pass. Each character is read at most twice — once as part
of a left word, once as part of a right one — and never compared past the
first difference, so the scan is linear in `C`, the total number of
characters across all words.

**Complexity:** `O(C)` time, `O(1)` space.
