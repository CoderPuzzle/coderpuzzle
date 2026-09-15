# Solutions — Validate Binary Search Tree

## Bounded DFS with an explicit stack

The definition demands more than well-behaved direct children: every key in a node's left subtree is strictly smaller and every key in its right subtree strictly larger, all the way down. Checking only each node against its two children is the classic trap — in `[5,4,6,null,null,3,7]` every parent-child pair is ordered, yet the 3 sits in the root's right subtree and falsifies it. The fix is to make the ancestors' accumulated constraints explicit: each subtree is confined to an open interval `(lo, hi)`, a node must land strictly inside it, and its children inherit tightened intervals — `(lo, node.val)` and `(node.val, hi)`.

The walk is a preorder traversal with an explicit stack of `(node, lo, hi)` frames, and the explicit stack is the point: the constraints allow a degenerate chain of 10⁴ nodes, and recursive validation would nest that many frames, which overflows Python's default call-stack limit — so the same iterative shape is used in all seven languages. The initial interval must be strictly wider than any key can be, so the bounds live at 64-bit width (`long`, `long long`, `i64`, `int64`; ±`inf` where numbers are unbounded): node values reach the int32 extremes, and a value of −2³¹ would be indistinguishable from an `INT_MIN` sentinel if the bounds were only 32 bits wide. Both interval edges are exclusive, because the definition is — a single duplicated key anywhere, direct child or distant descendant, makes the comparisons fail.

An empty tree satisfies every bound vacuously, so `[]` and `None` children simply pass through; the first node outside its interval settles the answer false on the spot, and a drained stack means every subtree stayed inside its bounds.

**Complexity:** `O(n)` time — each node is pushed and popped at most once — and `O(n)` space for the stack in the worst case (a chain; a balanced tree needs only `O(h)` frames, `h` its height).
