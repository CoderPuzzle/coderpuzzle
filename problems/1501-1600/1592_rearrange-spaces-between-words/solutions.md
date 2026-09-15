# Solutions — Rearrange Spaces Between Words

## Count, then rebuild

Splitting `text` on whitespace throws away the exact spacing but keeps
every word in order, and a single pass over the characters (or a call to
a space-counting primitive) recovers how many spaces existed in total.
Those two numbers are all the output depends on: the statement never asks
to preserve where the original spaces sat, only how many there were.

With `n` words and `n - 1` gaps between them, dividing the total space
count by `n - 1` gives the largest count that fits evenly in every gap,
and the remainder is exactly what integer division leaves over — the
spaces that could not be split fairly, appended once at the end. A single
word has zero gaps, so that division would be by zero; the statement
handles this by defining it as a base case where all the spaces are
simply trailing. Rebuilding then joins the words with that many spaces
between each pair and appends the leftover run.

**Complexity:** `O(n)` time, `O(n)` space.
