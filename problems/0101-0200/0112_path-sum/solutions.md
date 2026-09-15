# Solutions — Path Sum

## Iterative depth-first with a remaining-sum stack

The question is whether some root-to-leaf path adds up to `targetSum`, and a depth-first walk answers it by carrying one number per open path: the sum still owed. The stack holds `(node, remaining)` pairs, where `remaining` is `targetSum` minus every value strictly above `node`; children are pushed with `remaining - node.val`, so the debt shrinks as the path grows. When a node with no children comes off the stack its path is complete, and it decides the whole question in a single comparison — the path qualifies exactly when the leaf's own value covers what is still owed.

Two rules of the statement shape the code. Only leaves decide: an internal node never returns `true`, even when the running sum already equals `targetSum`, which is exactly the trap of a chain like `[1, 2]` with `targetSum = 1` — the root sums to 1 but is not a leaf, so the answer is `false`. And the empty tree returns `false` before the loop starts: with no root there is no root-to-leaf path, so even `targetSum = 0` fails, as the third example states.

The traversal is deliberately iterative rather than the classic recursive `hasPathSum(child, targetSum - root.val)`. The tree may hold up to `5000` nodes, and a skewed chain makes recursion depth grow with the node count — around `5000` nested calls, past the default recursion limit of some language runtimes (Python's is 1000), deep enough to overflow the call stack. The explicit stack is the same order of memory without touching any call stack, and it behaves identically on chains, balanced trees, and the empty tree. It also exits at the first qualifying leaf, so the false cases cost a full walk but no true case ever walks more than it must.

**Complexity:** `O(n)` time — each node enters the stack exactly once — and `O(h)` space for the stack, where `h` is the tree height: `O(n)` worst case on a skewed chain, `O(log n)` on a balanced tree.
