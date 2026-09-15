# Solutions — Serialize and Deserialize BST

## Preorder with null markers

`serialize` walks the tree in preorder — the root, then its entire left
subtree, then its right — with an explicit stack writing each visited node's
decimal value and the letter `x` for every absent child, the pieces joined by
single commas. Because every null is written down, the string carries the
tree's exact shape by itself: `[2,1,3]` becomes `2,1,x,x,3,x,x`, a one-node
tree becomes `7,x,x`, and the empty tree is the single token `x`.

`deserialize` replays that walk with a stack of open child slots. The first
token builds the root and opens its left slot; every later token fills the
slot on top of the stack — a value creates the node, attaches it left or right
as the slot says, and opens the node's own left slot, while an `x` merely
closes the slot. Filling a left slot re-opens the same parent's right slot
beneath it, so the tokens are consumed in exactly the order the walk produced
them and the shape rebuilds node for node.

The BST property is never consulted in either direction: the structure
traveled in full, so the round trip restores the identical binary search tree
whatever order its values satisfy. Both methods touch each node and each of
its two child positions once, and the string holds one token per node or null
child — the encoding pays a marker per absent child for being self-delimiting,
which is also what keeps both directions a single linear pass with no
lookahead.

**Complexity:** `O(n)` time, `O(n)` space per direction, where `n` is the
number of nodes.
