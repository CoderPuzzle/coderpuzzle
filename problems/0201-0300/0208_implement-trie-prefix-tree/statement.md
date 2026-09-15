# Implement Trie (Prefix Tree)

## Description

A **trie** (pronounced "try"), or prefix tree, is a tree data structure used to
store a set of strings so that inserting, looking up, and asking about prefixes
costs time proportional to the length of the key rather than the size of the
set. It is the structure behind features such as autocomplete and spell
checking.

Implement the `Trie` class:

- `Trie()` Initializes the trie object.
- `void insert(String word)` Inserts the string `word` into the trie.
- `boolean search(String word)` Returns `true` if the exact string `word` was
  inserted before, and `false` otherwise.
- `boolean startsWith(String prefix)` Returns `true` if there is a previously
  inserted string `word` that starts with `prefix`, and `false` otherwise.

### Example 1

```text
Input:
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output: [null, null, true, false, true, null, true]
Explanation:
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return true — the exact word was inserted
trie.search("app");     // return false — only a prefix, never inserted whole
trie.startsWith("app"); // return true — "apple" starts with "app"
trie.insert("app");
trie.search("app");     // return true
```

### Example 2

```text
Input:
["Trie", "insert", "search", "startsWith", "insert", "search", "startsWith"]
[[], ["app"], ["app"], ["ap"], ["apple"], ["app"], ["apples"]]
Output: [null, null, true, true, null, true, false]
Explanation:
Trie trie = new Trie();
trie.insert("app");
trie.search("app");     // return true
trie.startsWith("ap");  // return true
trie.insert("apple");   // "app" is a proper prefix of "apple"
trie.search("app");     // return true — still present as a whole word
trie.startsWith("apples"); // return false — no word extends that far
```

### Constraints

- `1 <= word.length, prefix.length <= 2000`
- `word` and `prefix` consist only of lowercase English letters.
- At most `3 * 10⁴` calls in total will be made to `insert`, `search`, and
  `startsWith`.

### Follow-up

A plain hash set answers `search` in the same asymptotic time. Which of the
three operations is impossible for a hash set to answer without scanning every
stored word, and how does the trie avoid that scan?

## Hints

### Hint 1

Store each word as a path of nodes, one per character, so that words sharing a
prefix share those nodes. A child link is found by offset — index
`c - 'a'` — so a fixed 26-slot array per node turns every step into a constant
time lookup.

### Hint 2

`search` and `startsWith` walk the same path; the only difference is what is
required at the end. Mark the node that terminates a complete word with a flag,
then `search` demands both that the walk reaches a node and that this flag is
set, while `startsWith` only demands the walk succeeds.

### Hint 3

If a walk steps off the trie — a null child slot — the answer is immediately
false for both queries. `insert` is the only operation that creates nodes, and
it creates them lazily, exactly when a missing child is first needed.
