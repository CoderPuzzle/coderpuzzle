# Solutions — Count Nodes Equal to Sum of Descendants

## Reverse preorder walk with bottom-up subtree sums

A node counts when its value equals the sum of all values strictly below
it. Rather than computing that sum with a post-order recursion, the
solution walks the tree in a reverse preorder — visiting a node, then
pushing its right and left children onto a stack — and records the visit
order. Because children are pushed before parents are processed, every
node appears in the list after both of its children, so scanning the list
back-to-front visits parents strictly after their descendants.

Each node's subtree sum (its own value plus the subtree sums of its two
children) is stored in a map; a node qualifies exactly when its value
equals its subtree sum minus itself. The traversal is fully iterative, so
a skewed tree with up to 10^5 nodes cannot overflow any runtime stack.
Subtree sums can reach 10^5 × 10^5 = 10^10, so the accumulation uses
64-bit integers in C++/Java/Go/Rust, and JavaScript numbers are exact far
beyond that range.

**Complexity:** `O(n)` time, `O(n)` space, where `n` is the number of
nodes in the tree.
