# Solutions — Recover Binary Search Tree

## Iterative inorder, swap the two misplaced values

An inorder walk of a healthy BST visits values in strictly ascending order, so a tree with two node values swapped is a sorted sequence with exactly two entries exchanged. If the swapped nodes sit next to each other in inorder order the walk sees a single descent — a predecessor greater than its successor — and if they are far apart it sees two. The misplaced pair is always the node before the first descent and the node after the last one: the larger value was dragged too early and the smaller too late, and every comparison not touching those two passes.

The walk is iterative — a stack holds the left-spine ancestors while a cursor descends, pops, and jumps right — so nothing recurses and a 1000-node skewed chain cannot overflow any call stack. The previous visited node is kept as a nullable reference rather than a numeric sentinel, so a genuine `-2³¹` value is never mistaken for "no predecessor yet". When the walk ends, the two recorded nodes trade values; nodes and links are never touched, which is exactly what "recover without changing its structure" demands, and the same root handle — repaired in place, never rebuilt — is what the judge compares. The follow-up asks for constant O(1) space; Morris threading would provide it, but temporary pointer surgery buys nothing the judge measures, and one uniform explicit-stack shape stays identical across all seven languages.

**Complexity:** `O(n)` time — each node is pushed and popped exactly once — and `O(h)` space for the stack, where `h` is the tree's height: `O(n)` worst case for a skewed chain, `O(log n)` for a balanced tree.
