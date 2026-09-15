# Solutions — Binary Tree Postorder Traversal

## Iterative postorder as a reversed preorder

Postorder is left, right, root — the one depth-first order whose root comes last, which is exactly why the iterative version is fiddly: a stack hands you a node the moment you first reach it, not after both of its subtrees are finished. The way out is a reversal observation: left-right-root read backwards is root-right-left, and root-right-left is ordinary preorder with the two children swapped.

The code runs that swapped preorder on an explicit stack. Each round pops a node and emits its value immediately, then pushes the left child before the right one, so the right child sits on top and its entire subtree is expanded before any left descendant is touched — every node's value lands in the output ahead of everything below it. Reversing the emitted list at the end turns root-right-left into postorder. Empty tree, single node, and skewed chains all fall out of the invariant with no special cases beyond never pushing null children, and nothing recurses, so a deep chain cannot overflow any call stack.

Compared with the classic single-stack form that peeks at the top and tracks a last-visited pointer to decide "go left, go right, or finally visit", this loop does no peeking and no revisiting: every node is pushed exactly once and popped exactly once, and the stack only ever holds the pending left children along the current right-leaning path — at most one per level.

**Complexity:** `O(n)` time — each node is pushed and popped exactly once, plus a final `O(n)` reversal — and `O(h)` space for the stack, where `h` is the tree's height: `O(n)` worst case for a skewed chain, `O(log n)` for a balanced tree.
