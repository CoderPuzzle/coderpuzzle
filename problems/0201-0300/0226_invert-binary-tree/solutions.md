# Solutions — Invert Binary Tree

## Recursive swap

Inverting a tree means producing its mirror image: every node's left and right children trade places, all the way down. The structure is self-similar — a mirrored tree is a root whose two subtrees are themselves mirrored and crossed — so the recursion is not a tactic but the definition itself: invert both children, then swap the two finished subtrees at the node, then return it. The base case is the empty tree, which is its own mirror.

Each call inverts `root.left` and `root.right` first, so by the time the two pointers trade places they hold subtrees already mirrored end-to-end, and one pass over the tree suffices. Nodes are only ever relinked, never rebuilt, so the very same `root` handle — now the root of the mirrored tree — is returned to the judge. A symmetric tree such as `[1,2,2,3,4,4,3]` comes back unchanged, its own expected output, and inverting twice always reproduces the original wire.

Recursion is the right shape here rather than a queue or an explicit stack because the ceiling is tiny: at most 100 nodes bound the height by 100, so the call stack never exceeds 100 frames — an order of magnitude under CPython's default limit and trivial for any native stack — while an iterative version would need an auxiliary container to buy nothing. Rust's nodes are owned `Box`es rather than shared pointers, so there each swap takes the two children out with `take` and hands each to its opposite field; the pointer writes become ownership moves, but the algorithm is the identical swap in every one of the seven languages.

**Complexity:** `O(n)` time — each node is visited exactly once — and `O(h)` space for the call stack, where `h` is the tree's height: `O(log n)` for a balanced tree, `O(n)` worst case for a skewed chain.
