# Solutions — Path Sum II

## Iterative preorder with a shared path buffer

A depth-first walk from the root keeps one running remainder that starts at `targetSum` and drops by each visited node's value; a leaf whose remainder lands exactly on zero is a matching root-to-leaf path. Rather than materializing a fresh path at every node, the walk maintains a single shared `path` buffer and appends a copy to the result only at a matching leaf, so intermediate nodes cost nothing but a push and a pop.

The explicit stack carries frames of (node, remaining sum, buffer length on entry). Popping a frame first truncates `path` back to the recorded length — every descendant appended by a previously explored sibling disappears — and that truncation is precisely the backtracking a recursive call stack would have performed when its frame unwound. Children are pushed right before left, so the left subtree is always popped first and paths are discovered in preorder, left to right: the leftmost matching path is reported first, exactly as the example output lists them.

The stack is deliberate: the tree may be a skewed chain of up to 5000 nodes, and 5000 nested calls would overflow Python's default call-stack limit — an explicit stack of frames is the same memory with no call stack involved, and it keeps all seven languages on one identical shape. Every frame on the stack is a real node (the empty tree returns `[]` immediately), and the whole traversal touches each node exactly once.

**Complexity:** `O(n + P)` time, where `P` is the total length of the matching paths (`O(n²)` in the degenerate dense case) — and `O(n)` space for the stack and the shared buffer, excluding the output.
