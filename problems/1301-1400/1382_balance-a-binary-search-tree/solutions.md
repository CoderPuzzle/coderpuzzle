# Solutions — Balance a Binary Search Tree

## In-order traversal plus midpoint rebuild

The values of any BST come out sorted under in-order traversal, and conversely any sorted array can be turned into a balanced BST by choosing the middle element as the root and recursing on the two halves — each split puts at most half the remaining values on either side, so every node's subtrees differ in depth by no more than one. The plan is therefore a two-phase rebuild: flatten, then reassemble.

![The input chain 1 → 2 → 3 → 4 and the balanced tree produced by the midpoint rebuild.](figures/solution-rebalance.svg)

Phase one is an iterative in-order walk with an explicit stack: keep descending left, pushing nodes; when the descent bottoms out, pop a node, record its value, and continue from its right child. This avoids recursion-depth limits for degenerate inputs of up to `10^4` nodes (an input that is itself a straight line is exactly the unbalanced case the problem feeds in) and produces the values in ascending order.

Phase two is the recursive `build(lo, hi)`: take `mid = (lo + hi) // 2` as the new node, build the left child from `values[lo..mid-1]` and the right from `values[mid+1..hi]`, returning `None` when the range empties. Its recursion depth is `O(log n)`, so it is safe even though phase one was made iterative. The result is a brand-new tree containing the same values as the input, which the problem explicitly permits ("return any" balanced tree with the same values).

Edge cases: a single-node tree rebuilds to itself, and the smallest case (`n = 1`) never recurses. The traversal allocates the value list and the new nodes — both linear.

**Complexity:** `O(n)` time, `O(n)` space.
