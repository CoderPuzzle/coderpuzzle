# Solutions — Design Add and Search Words Data Structure

## Trie with Dot Backtracking

The dictionary is the same trie as in _Implement Trie (Prefix Tree)_: one node per character, a 26-slot child array per node, and an `end` flag marking complete words. What changes is the query — a dot matches any letter, so the walk is no longer a single path.

`search` recurses over (node, index) pairs. When `query[index]` is a letter, exactly one child slot can continue the match; when it is a dot, every non-empty child slot is a candidate and the search succeeds if any branch does. Because a stored word must match the query character for character over the same length, a branch dies the moment it runs out of nodes or reaches a node without the `end` flag at the final position.

The constraints keep the fan-out small: queries are at most 25 characters with at most 2 dots, so there are at most `26² = 676` root paths to explore, each no deeper than 25. The trie's prefix sharing prunes far more than that in practice — the branches below the second dot are plain single-path walks.

**Complexity:** `O(L)` per `addWord`; up to `26^D * L` per `search` with `D <= 2` dots in the query and `L` its length; space is the total stored characters times 26 slots per node.
