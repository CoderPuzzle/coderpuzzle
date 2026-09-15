# Solutions — Binary Tree Pruning

## Post-order prune

A node's subtree is the node together with everything below it, so "contains
a 1" is a fact about an entire subtree — and the smallest subtrees are
decided first: a leaf keeps existing exactly when its own value is 1. That
observation is the whole algorithm, and it forces the traversal order: a
node's keep decision depends on what survives below it, so the children must
be pruned before the node itself is judged — post-order.

The method walks the tree once. Each step prunes the left subtree, prunes the
right subtree, reattaches whatever survives, and then applies the keep test:
the node stays when its value is 1 or when at least one pruned child remains.
A 0 node whose children both came back empty is itself a subtree with no 1
anywhere in it, so it is dropped too — and that drop can cascade one level
up, where the parent's keep test reruns against the already-updated children.
An all-zero tree unwinds all the way to an empty root; a 0 root above a
surviving branch stays, because its own subtree does contain that 1.

Recursion is safe under this statement's bounds: the tree holds at most 200
nodes, so even a single chain nests at most 201 calls — far under CPython's
default 1000-frame limit and trivial against the 512k stacks the judge hands
Java and Node — so the natural recursive post-order ships instead of an
explicit stack. The keep test is deterministic at every node, so the pruned
tree is unique, and every node is judged exactly once.

**Complexity:** `O(n)` time, `O(h)` space for the recursion, where `h` is the
tree's height.
