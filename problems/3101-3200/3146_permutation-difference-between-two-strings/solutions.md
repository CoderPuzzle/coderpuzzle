# Solutions — Permutation Difference between Two Strings

Both strings hold the same letters with no repeats, so a character's
contribution to the permutation difference never interacts with the other
characters — it is pinned down entirely by where the character sits in `s`
and where it sits in `t`. The whole task therefore collapses into computing
one table of positions and walking one string once.

## Position table and one pass

Record, for each of the 26 letters, its only index in `s`. Then stream `t`
left to right: when position `i` holds letter `c`, that letter's
contribution is exactly `|i - pos[c]|`, so each term costs one array lookup
and one subtraction. Summing as we go yields the answer without ever
touching any character twice.

Correctness is immediate from the definition: the permutation difference is
a sum over characters, each term being an absolute index difference between
the two occurrences of one letter, and the sweep accounts for precisely one
term per letter because both strings share their alphabet. The length cap
of 26 keeps every intermediate value tiny — at most 26 terms of magnitude
at most 25 — so plain machine integers carry the sum in every language.

**Complexity:** `O(n)` time, `O(1)` extra space.
