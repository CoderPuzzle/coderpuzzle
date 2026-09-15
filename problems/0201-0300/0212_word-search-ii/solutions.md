# Solutions — Word Search II

## Trie-Guided Backtracking

Running one board DFS per word is hopeless with up to 3 × 10^4 words, but the words share prefixes, so the solution builds a trie of all words and searches the board _through_ the trie. A DFS from a board cell walks trie edges in lockstep with board moves, and the moment the board letter is not a child of the current trie node, the entire subtree of words with that prefix is ruled out at once — this shared-prefix pruning is the entire speedup over per-word search.

The trie is a tree of nested dicts; a special `"#"` key at a terminal node stores the complete word so it can be recovered without rebuilding it letter by letter. The DFS marks cells in a `seen` grid while they are on the current path (a cell may be used at most once _within_ a word) and unmarks them on the way out, so the same cell can serve other paths and other words. Whenever the walk reaches a `"#"` marker, the stored word goes into a `found` set, which deduplicates words discoverable along several paths.

![The 4x4 example board with the two found words traced: oath walks o -> a -> t -> h down the left side, eat walks e -> a -> t along the second row, both reusing the same t cell.](figures/solution-board-dfs.svg)

The outer double loop starts a DFS from every cell, since a word may begin anywhere; starting cells whose letter is absent from the trie root return immediately. The final result is `sorted(found)` for deterministic output. With board size M × N, W words of maximum length L, the trie costs one pass over all characters to build, and each DFS branch has at most 3 continuations per step after the first move (the previous cell is marked), giving the classic `M·N·3^L` search bound.

**Complexity:** `O(W·L + M·N·3^L)` time, `O(W·L)` space.
