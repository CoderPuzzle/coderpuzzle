# Solutions — Implement Trie (Prefix Tree)

Two ways to answer the three questions without ever scanning the stored
words. The hash variant precomputes, at insert time, every beginning of
every word as a flat set member, giving up the sharing of common beginnings;
the tree spells each word down a path of characters and lets shared
beginnings share nodes. Both make each query cost depend only on the word at
hand — the hash set by hashing the argument once, the tree by walking one
node per character — and both draw the whole-word/prefix distinction the
same way: one membership test against words, another against beginnings.

## Hash Prefixes

The statement's follow-up asks which operation forces a plain word set to
scan everything stored: `startsWith`, because "does any word begin with
this?" is a question about all beginnings at once. This variant refuses to
scan by materializing the answer in advance — two hash sets, one holding
whole words, the other holding every beginning of every word.

`insert("train")` puts `train` in the word set and `t`, `tr`, `tra`,
`trai`, `train` in the prefix set — the word itself is included, since a
word begins with itself. After that, every query is a single membership
test: `search` hashes its argument against the words, `startsWith` against
the beginnings, and neither ever looks at the rest of the data. The
whole-word distinction the trie keeps as a node flag becomes, here, the
choice of which set to ask.

The bill moves to insert time and space. A word of length `L` contributes
`L` prefixes, so storing it costs `L` hash inserts and up to `L` new set
entries — no sharing, so words with a common beginning pay for it twice.
That is the trade the trie exists to refuse: the hash sets spend one entry
per inserted character to keep every lookup at a single hash of its own
argument, while the trie spends `26` pointers per node to buy the sharing
and the same query cost.

**Complexity:** `O(L)` expected time per query on a length-`L` argument;
`insert` costs `O(L²)` character work and adds up to `L` entries; space
`O(total inserted characters)` across the two sets.

## Fixed-Array Trie

A trie stores words as root-to-node paths: each character of a word selects one child slot of the current node, so words that share a prefix share those nodes and that prefix is stored exactly once. The `Trie` class keeps one node type with two fields — an array of 26 child references indexed by `c - 'a'`, and a boolean `end` flag marking that a complete word terminates at this node.

All three operations are the same walk. `insert` follows the path character by character, allocating a node the first time a slot is empty, and sets `end` on the final node. `search` follows the path without allocating and answers `node != null && node.end`; `startsWith` answers only `node != null`. That flag is the entire difference between the two queries — a prefix that was never inserted as a whole word leads to a live node without the flag, which is why `search("app")` is false while `startsWith("app")` is true after inserting `"apple"`.

The fixed 26-slot array beats a hash map per step here: indexing is a subtraction and an array access with no hashing, at the cost of `26 * pointers` bytes per node. Walking stops the instant a slot is empty, so a mismatching query costs only the length of the shared prefix.

**Complexity:** `O(L)` time per operation for a word or prefix of length `L`, `O(total characters * 26)` space in the worst case.
