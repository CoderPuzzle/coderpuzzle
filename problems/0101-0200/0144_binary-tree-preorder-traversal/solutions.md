# Solutions — Binary Tree Preorder Traversal

## Iterative preorder with an explicit stack

Preorder visits a node, then its left subtree, then its right subtree. The recursive form is a three-line special case of that sentence, and with at most 100 nodes it could never overflow a call stack — the iterative form here is the statement's follow-up challenge and the family convention set by the sibling traversal problems, not a safety measure. It replaces the recursion's implicit memory with an explicit stack whose single invariant is: the stack holds exactly the discovered-but-unvisited nodes, in the order preorder wants them next.

Each round pops the top node and records its value immediately — visiting a node before either of its subtrees is precisely what makes this preorder — then pushes the right child before the left. A stack reverses push order into pop order, so the left child surfaces first and its entire subtree runs to completion before the right child is ever revisited. An empty tree never enters the loop, and a single node, a skewed chain, and a complete tree all fall out of the same two rules with no special cases.

**Complexity:** `O(n)` time — each node is pushed and popped exactly once — and `O(h)` space for the stack, where `h` is the tree's height: `O(n)` worst case for a skewed chain, `O(log n)` for a balanced tree.
