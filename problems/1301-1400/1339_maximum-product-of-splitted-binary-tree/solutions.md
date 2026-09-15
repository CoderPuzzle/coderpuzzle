# Maximum Product of Splitted Binary Tree

## Approach: Subtree sums, then evaluate every edge

Cutting one edge splits the tree into a subtree and its complement, so the
product for a cut below node `v` is `sum(v) * (total - sum(v))` — both
factors known once every subtree sum and the grand total are. One iterative
post-order pass computes every subtree sum (an explicit stack, since the
tree may be a 5·10⁴-node chain); a second pass over the nodes evaluates
the cut product for each non-root node.

The products are compared in full 64-bit arithmetic and reduced modulo
10⁹ + 7 only once, after the maximum is chosen — the statement requires
maximizing before the modulo. With node values up to 10⁴ and 5·10⁴ nodes,
a product reaches ~6·10¹⁶, far past 32 bits but comfortably inside a
64-bit integer.

**Complexity:** O(n) time, O(n) space for the sums.
