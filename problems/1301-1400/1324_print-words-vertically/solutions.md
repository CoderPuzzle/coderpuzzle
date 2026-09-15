# Print Words Vertically

## Approach: Index-driven column build

Splitting on the single guaranteed space gives the words in order; the
output has one row per index of the longest word, and row `k` collects
character `k` from each word in order. Words shorter than `k` contribute a
padding space, and each row is trimmed of trailing spaces so no column
ends in blanks — the two rules the statement insists on.

Building each row as a fixed buffer of spaces and writing characters where
they exist keeps the work proportional to the output size; a final trim
per row removes the padding in one pass.

**Complexity:** O(n · w) time and space, with n the longest word's length
and w the number of words (the output size itself).
