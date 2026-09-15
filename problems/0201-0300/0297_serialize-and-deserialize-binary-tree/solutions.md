# Solutions — Serialize and Deserialize Binary Tree

Both encodings pay the same toll the tree demands of any rendering: a token
not just for every node but for every slot where a child is absent, because
missing structure is structure too. What separates them is the order the
tokens come out in, and what that order then allows. The breadth-first walk
reads the tree level by level and earns the right to throw away the markers
that pile up at the tail of the last level. The depth-first walk follows the
tree's own recursion — value, left subtree, right subtree — so every subtree
is one contiguous run of tokens, the replay is a plain stack of open child
slots, and the empty tree needs no special form at all.

## Level-Order Codec with Explicit Null Markers

A tree encoding is only recoverable if it records where every subtree is _absent_, not just where nodes are. The level-order format does exactly that: one slot per child position of every real node, with a marker (`#` here) filling the empty positions. Children of markers never exist, so they occupy no slots — which is why the trimmed sequence still rebuilds the tree uniquely. The judge never inspects the string, only that `deserialize(serialize(root))` returns the same tree, so this format is a choice rather than a requirement — preorder with markers or a parenthesised encoding would pass just as well.

`serialize` walks the tree breadth-first over a frontier that also holds absent children: each real node emits its value and contributes both child slots; each absent slot emits `#` and contributes nothing. Trimming the trailing markers shortens the string without losing recoverability. `deserialize` is the exact mirror: split on commas, then rebuild by consuming tokens as child slots in queue order — a `#` fills the slot without adding to the queue. The empty tree is handled up front as the empty string.

Both directions run iteratively over an explicit queue, so the `10⁴`-node degenerate chains that would overflow a recursive encoder are plain linear passes.

**Complexity:** `O(n)` time and `O(n)` space per call for a tree of `n` nodes.

## Depth-First Encoding With Null Markers

The depth-first rendering writes the tree's structural recursion out in
order: a node's value, then all of its left subtree, then all of its right
one, with `#` closing any child slot that is empty. Each subtree is one
contiguous run of tokens, which is why the replay needs no queue discipline
at all — when a run ends, the next token belongs to the nearest ancestor
still owed a child. For the Example 1 tree the string is
`4,2,#,3,#,#,7,6,#,#,9,#,#`: the `#` after `2` closes its empty left slot,
`3` then lands in the right one, and the run `6,#,#` is the whole left
subtree of `7`.

`serialize` runs preorder on an explicit stack: pop a node, emit its value,
push the right child, then the left, so the left subtree is always written
first. `deserialize` keeps a stack of open child slots instead — each token
takes the slot on top; a `#` fills it with nothing, a value makes the node
that fills it and opens two fresh slots of its own, right pushed before
left again. Every value token opens two slots and only slots consume
tokens, so the counts match exactly: `2n + 1` tokens for `n` nodes, the
last one always a marker, and no end-of-input guards anywhere. The empty
tree is the single token `#` — no special case in either direction.

Nothing is trimmed here, and that is the one thing this format gives up.
In the level walk the tail markers describe slots that would have led
nowhere, so dropping them loses nothing; in this walk every closing marker
tells the replay when to ascend, and dropping one would leave a slot
waiting for a token that never comes. So the follow-up's question has a
clean answer: this string is never shorter than the trimmed breadth-first
one — both pay one token per node plus one per child slot before trimming
— and it is longer by exactly the markers the level walk could discard.
Both directions are iterative, so the deepest legal chain (`10⁴` nodes)
is as safe as a shallow bushy tree.

**Complexity:** `O(n)` time, `O(n)` space.
