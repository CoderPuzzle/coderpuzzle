# Solutions — Construct the Lexicographically Largest Valid Sequence

The target sequence has `2n - 1` cells: one for the singleton `1`, two for
every `i` from `2` to `n` at distance exactly `i`. A valid sequence always
exists, several usually do, and the task is the lexicographically largest of
them — which the search order itself can enact, with no candidate
comparisons at all.

## Descending-order backtracking

Fill the sequence from left to right. At each step take the first empty
cell and try the still-unused values from `n` down to `1`: the pair value
`i` occupies both that cell and the cell `i` steps to its right, while the
`1` fills its cell alone. Whenever a choice cannot be completed, undo it
and step down to the next value.

The first complete sequence this DFS returns is the lexicographically
largest. The search commits cells in reading order and always tries the
largest still-placeable value first, so it attempts prefixes in strictly
decreasing lexicographic preference: a value at a cell is abandoned only
when no valid completion of the prefix through it exists, so the choice
that survives at each cell is the largest completable one. Every valid
sequence either shares that committed prefix or falls below it at some
cell, so none can end up lexicographically greater.

In practice the search is tiny at `n <= 20`: the largest values are the
hardest to fit, so an over-greedy branch dies within a few cells of where
it goes wrong and the walk down to the answer stays short.

**Complexity:** exponential in the worst case but effectively
`O((2n - 1) * n)` per accepted branch at `n <= 20`; `O(n)` space beyond
the output.
