# Solutions — Maximum Distance Between Unequal Words in Array II

## Two-end scan

An optimal pair can always be slid onto the boundary. If the first and last
words already differ, the pair (0, n - 1) spans the whole array and the answer
is n. Otherwise both ends hold the same word, and any valid pair (i, j) has a
widening move: when words[j] differs from that shared end word, pairing index 0
with j is valid and at least as wide; when words[j] equals it, words[i] must
differ from it, so pairing i with index n - 1 is valid and at least as wide.
Only two candidates therefore matter: the last index whose word differs from
the end word (paired with index 0) and the first index whose word differs from
it (paired with index n - 1).

Each candidate costs one linear sweep: a forward pass stops at the first index
holding a word different from words[0], since the earliest such index maximizes
the span to n - 1, and a backward pass stops at the last index holding a word
different from words[n - 1], which maximizes the span from 0. Both sweeps come
up empty exactly when every word is equal — including the single-word array,
whose two end words are one word — and the sentinel answer is 0.

**Complexity:** `O(n)` time, `O(1)` space.
