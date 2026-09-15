# Solutions — Word Pattern II

## Backtracking with a two-way map

The mapping is not known in advance, so the search has to build it: walk the
pattern one character at a time and, at each position, decide what chunk of
the remaining `s` this character owns. A character seen for the first time
tries every non-empty prefix of what is left of `s`; a character already
mapped has no choice at all — its word is fixed, and either `s` continues
with exactly that word or the branch dies. Two indexes, one into the pattern
and one into `s`, therefore carry the whole state.

The bijection is what turns the forward map into two. Keeping `word ->
char` alongside `char -> word` lets a candidate prefix be rejected the moment
it is already another character's image, which is the definition's "no two
characters map to the same string" enforced as a pruning rule rather than a
final check. When a prefix is accepted tentatively, both maps are extended
and the walk recurses on the next pattern position; when that recursion
comes back empty the extension is undone and the next prefix is tried, so
every assignment combination is reachable along some branch. The walk
succeeds exactly when the pattern and `s` run out together — a mapping that
consumes all of `s` early, or leaves some of it over, fails at the base
case.

**Complexity:** `O(n^m)` time in the worst case, where `n` is the length of
`s` and `m` the number of distinct pattern characters — exponential in
general, but the `20 / 20` constraint keeps the search tree tiny; `O(m + n)`
space for the maps and the recursion.
