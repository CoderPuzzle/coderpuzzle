# Solutions — Check If a Word Occurs As a Prefix of Any Word in a Sentence

## Walk the words with a running index

Splitting the sentence on its single spaces yields the words in order, so
the first match while enumerating from 1 is by construction the minimum
index — no bookkeeping of best-so-far needed. Each word needs only a
prefix test: does it start with `searchWord`? Lengths never exceed 100
characters, so the per-word test is a handful of comparisons.

The scan returns the 1-based position of the first word that passes and
`-1` when none does. A search word longer than every word simply fails
every test, and a word equal to the search word counts as its own prefix.

**Complexity:** `O(n)` time over the sentence's `n` characters, `O(n)`
space for the split.
