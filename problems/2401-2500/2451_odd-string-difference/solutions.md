# Solutions — Odd String Difference

## Difference signatures, count the odd one out

Every word is reduced to its difference integer array: the `n - 1` consecutive
letter differences, using each letter's alphabet position ('a' is 0 through
'z' is 25). The statement guarantees all but one word share one signature, so
the odd word is precisely the one whose signature is not the shared one.

The code builds a signature for every word — in Python and Rust a tuple of
differences, in the other languages a delimiter-joined string of the same
values — and tallies the signatures in a hash map. A second pass walks the
words again and returns the first word whose signature has frequency exactly
one. Because the odd word is unique, that word is the answer, whatever its
position in the input.

The two passes are both linear in the total number of letters, and the map
holds one entry per word, so the space is proportional to the number of words
times the word length.

**Complexity:** `O(m * n)` time, `O(m * n)` space, where `m` is the number of
words and `n` their common length.
