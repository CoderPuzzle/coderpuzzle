# Solutions — Flip Binary Tree To Match Preorder Traversal

## One greedy descent in lockstep with the voyage

The walk and the voyage run in lockstep. A preorder descent — carried by an
explicit stack — consumes one voyage value per node visited, and whenever the
value that comes next names a node's right child rather than its left, that
node is flipped and recorded: the two subtrees trade places and the descent
continues into what is now the first-visited side. Flipped values are
recorded at the moment of the decision, so the list comes out in the order
the resulting preorder meets the flipped nodes. The first value that
disagrees with the node being visited — or voyage entries left over once the
tree is exhausted — means no flip set can work, and the answer is `[-1]`.

No backtracking is ever needed, and the statement's constraints are why:
values are unique in both the tree and the voyage. At a two-child node the
next voyage value belongs to exactly one child's subtree, so whether that
child must come first — whether the node must be flipped — is forced, not
chosen; at a one-child or childless node no flip changes the preorder, and
the smallest flip set touches none of them. The forced choices compose: the
descent either realizes the voyage with exactly the forced flips, or it runs
into a value no flip can supply.

Every node is visited once and the voyage is read once, so the whole pass is
linear. The stack holds at most one pending subtree per level, and while the
statement's `n <= 100` would keep even a recursive descent a hundred frames
deep safe, the explicit stack keeps the walk off the call stack regardless.

**Complexity:** `O(n)` time, `O(h)` space.
