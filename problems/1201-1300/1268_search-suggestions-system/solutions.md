# Solutions — Search Suggestions System

Both variants do their dictionary-order thinking once, up front, so that no
keystroke ever rescans the products. The sort lays that order out as a flat
list and pays a logarithmic search per prefix to find where its block
begins; the trie bakes the order into the shape of a tree and caches the
best three words at every node, so a keystroke is a single pointer move.

## Sort and Binary Search

Once the products are sorted lexicographically, every set of products sharing a given prefix forms a contiguous run in the array, and the three lexicographically smallest suggestions are simply the first three entries of that run. This turns each typed character into a pure array-lookup question: extend the prefix by one character, locate where that prefix would be inserted to keep the array sorted, and read off up to three consecutive words.

The solution uses `bisect_left` (a hand-rolled lower-bound binary search in the Java version) to find the insertion point of the growing prefix. It then walks forward over at most the next three words, keeping those that still start with the prefix and stopping at the first that does not. Stopping early is what makes the per-step cost independent of how many products match: a prefix with zero matches costs one failed `startsWith`, and a prefix with thousands of matches still only examines three.

Because each prefix extends the previous one by a single character, the scan over `searchWord` naturally produces one suggestion list per typed character. Fewer than three matches (or none) yield shorter or empty lists, exactly as the problem requires; the prefix string is grown incrementally so no character of `searchWord` is reprocessed.

With `n` products, search-word length `m`, and maximum product length `L`, sorting costs `O(n · L · log n)` (each comparison may inspect up to `L` characters), and each of the `m` prefixes costs `O(L · log n)` for the binary search plus `O(L)` for the few prefix checks.

**Complexity:** `O((n + m) · L · log n)` time, `O(n · L + m)` space, where `n` is the number of products, `m` is the length of `searchWord`, and `L` is the maximum product length.

## Trie with Per-Node Top-Three

The sort keeps dictionary order as a flat list and re-finds the prefix's
block at every keystroke. The trie makes the same order physical instead:
one node per character position, words sharing nodes until they diverge,
children held in letter slots so a path down the tree reads words in
dictionary order by construction. After one bottom-up pass every node also
carries the three best words passing through it.

Building is plain trie insertion: spell each products word down from the
root, creating nodes lazily, and record on the landing node that this word
ends there. The best-three lists are then filled in deepest-first. A
node's own word comes first — it is a prefix of every other word through
the node, so it beats them all — and the rest is the children's lists read
in slot order, which is dictionary order of the next character. Every
existing child has at least one word through it, so no consulted list is
ever empty and gathering stops by the third child; the fixed 26-slot child
array is the constant factor behind both that scan and the space bill.

The searchWord loop never searches. A cursor starts at the root and follows the
typed characters edge by edge; each step emits the node's cached list, and
once an edge is missing the cursor stays dead — a longer prefix cannot
start matching again. Every keystroke costs one array read no matter how
many words share the prefix, which is the whole trade: the comparison work
is spent once, over the tree, instead of logarithmically per keystroke.

**Complexity:** `O(S + m)` time, `O(26 · S + m)` space, with `S` the total
length of the products's words and `m` the searchWord length.
