# Solutions — Implement Trie II (Prefix Tree)

## Counted trie

Every node of the trie carries two counters: how many inserted instances
end exactly at that node (`word_count`) and how many pass through it
(`prefix_count`). `insert` walks the word one character at a time,
creating missing children as it goes, increments `prefix_count` on every
node it touches, and finally increments `word_count` at the terminal.
`countWordsStartingWith` walks the prefix as far as its nodes exist and
returns the `prefix_count` found there; when the walk falls off the trie
the answer is 0. `countWordsEqualTo` walks the whole word the same way and
returns the terminal's `word_count`.

`erase` — which the constraints guarantee is only called for a word
currently in the trie — first walks the path to confirm a live instance,
then walks it a second time decrementing `prefix_count` along the way and
`word_count` at the end. Children whose counters reach zero are left in
place: no live instance's path crosses a dead node any more, so both
queries answer 0 through it, and lazy decrements keep every count exact
without ever rewiring the tree. The confirming walk is also what makes an
erase of an absent word a harmless no-op.

Each call is a single root-to-node walk, so every operation costs time
proportional to the word or prefix length `L`; `insert` is the only one
that allocates, at most `L` new tail nodes. Because erases free nothing,
the trie's size is bounded by the `C` total characters ever inserted
across the call history.

**Complexity:** `O(L)` time per call, `O(C)` space for `C` inserted
characters.
