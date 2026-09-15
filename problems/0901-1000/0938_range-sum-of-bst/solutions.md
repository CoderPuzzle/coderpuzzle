# Solutions — Range Sum of BST

## Pruned descent with an explicit stack

A search tree sorts its contents by position: every value in a node's left
subtree is smaller than the node, every value in its right subtree larger. So
a node below `low` drags its whole left subtree below `low` with it — the
answer there is impossible, and only the right subtree deserves a look. A
node above `high` is the mirror image. A node inside the window counts once,
and either of its subtrees may still hold hits, so both go on visiting. That
one three-way rule, applied from the root down, visits exactly the nodes that
can matter and sums the in-window ones.

The walk carries an explicit stack. Each pop applies the rule: a node below
`low` pushes only its right child, a node above `high` only its left child,
an in-window node adds its value and pushes both children. Nothing pruned is
ever missed — the ordering law puts an entire pruned subtree on the wrong
side of the window — and every node is pushed at most once, so the walk is
linear even though it may roam the whole tree.

The stack, not the call stack, carries the descent: the constraints allow a
single 2·10⁴-node chain, whose recursion would nest twenty thousand calls
— past CPython's default limit and over the 512k stacks this judge hands Java
and Node. The running total needs no widening either: values are distinct and
at most 10⁵, so even 2·10⁴ of them sum to less than 1.8·10⁹, inside every
language's plain integer width, and each partial sum only climbs toward that
bound.

**Complexity:** `O(n)` time, `O(h)` space, where `h` is the tree's height.
