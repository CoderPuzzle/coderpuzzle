# Solutions — Binary Search Tree Iterator

## Left-Spine Stack over the Rebuilt Tree

The iterator must produce the in-order sequence lazily, and the follow-up asks for `O(h)` memory rather than a flattened array. The `BSTIterator` first rebuilds the tree from the level-order input — a queue walk that attaches each non-marker value as the next child of the oldest node still missing one, with `-1` slots simply not joining the queue — and then keeps only a **stack holding the left spine** of the current subtree.

That stack invariant makes both methods trivial. After construction the top is the leftmost (smallest) node of the whole tree, so `hasNext` is just a non-emptiness check. `next` pops the top and returns its value, but before doing so it pushes the left spine of the popped node's right child — because in-order visits that entire subtree before any ancestor. Every node is pushed exactly once and popped exactly once, and at any moment the stack holds a single root-to-current path, which is why its size is bounded by the height `h` and the amortized work per call is constant.

Building the tree up front costs `O(n)` time and space; the iteration itself then meets the `O(h)`/average-`O(1)` target. Deep degenerate trees (a pure chain) are safe because both the build and the traversal are iterative — no recursion.

**Complexity:** `O(n)` construction, average `O(1)` per `next` (`O(h)` worst case for a single call), `O(h)` iterator memory (plus the `O(n)` rebuilt tree).
