# Solutions — Increasing Order Search Tree

## In-order relink with an explicit stack

Read the required tree from its root down its only right links and the
values come out ascending — exactly the order an in-order walk of a binary
search tree visits. That observation forces the whole answer: the leftmost
node of the tree is visited first and becomes the new root, every visited
node severs its left link and points its right link at the next visited
node, and the last node visited keeps no right child. Nothing is chosen
anywhere — the spine is the visit order — so the output tree is unique.

The walk carries its own stack of deferred nodes. Descending one left
spine pushes every node on it; the stack top is then the leftmost
unvisited node, which is visited and popped before the walk continues
into its right subtree and repeats. Each node is pushed once and popped
once, and the stack never grows past one left spine. After the walk the
visited nodes are relinked in a single pass: left to null, right to the
successor — the nodes are rearranged, their values never move. Only Rust
differs in mechanics, not in result: its owned boxes cannot be rewired in
place, so its walk consumes the tree and folds the visited values back
into the same spine.

At this statement's bounds even a single 100-node chain would nest at
most 100 recursive frames, but the traversal ships iterative anyway, so
no runtime's call stack is involved at all. What the walk stores is the
collected node list plus the stack — at most one entry per node each.

**Complexity:** `O(n)` time, `O(n)` space.
