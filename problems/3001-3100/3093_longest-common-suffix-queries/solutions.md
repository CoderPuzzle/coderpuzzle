# Solutions — Longest Common Suffix Queries

## Trie of reversed words with best-index annotations

Reversing every string turns longest common suffix into longest common prefix, the natural Trie operation. Insert each `wordsContainer` word backwards, and at every node — including the root, which represents the empty suffix — store the best container index under the tie-break rules: shortest word length first, then earliest index. The `better` predicate applies it as each word's characters descend through the trie, so a node's stored index is the winner among all words sharing exactly that reversed prefix.

A query then walks its reversed string as deep as the trie allows, carrying the best index of each node it reaches; the deepest reached node corresponds to the longest suffix shared with any container word, and since every word with that suffix passes through it, its precomputed winner is the answer. If the very first character already misses, the walk never leaves the root, and the root's best — the globally shortest (then earliest) word — correctly answers the empty-suffix case, including queries that match nothing.

Building costs one trie insert per container word; each query costs at most its own length. Writing `C` and `Q` for the total character counts of `wordsContainer` and `wordsQuery` (each at most 5 * 10^5), both phases are linear in input size, and dictionary-based nodes pay only for characters actually present.

**Complexity:** `O(C + Q)` time, `O(C)` space.
