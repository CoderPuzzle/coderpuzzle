# Solutions — Find Nearest Right Node in Binary Tree

## Level-order BFS

"Immediately to the right on the same level" is exactly what a
level-order traversal exposes for free: process the tree one level at a
time, and within a level the nodes come out in left-to-right order
already. So the walk keeps a queue seeded with the root, and on each
level it drains exactly the nodes currently in the queue (not the whole
queue as it grows), pushing left before right so children re-enter in
the same left-to-right order their parents did.

While draining a level, the walk watches for the node whose value is
`u`. The moment it is found, the very next node the drain visits — if
the level has one — is the answer, whether that node shares `u`'s
parent or hangs off a completely different subtree; level order does
not care which parent a node came from, only its position in the scan.
If `u` turns out to be the last node drained on its level, the walk has
already finished that level with no answer found, and the result is
`null`.

**Complexity:** `O(n)` time, `O(n)` space — the queue holds a tree
level, which is at most every node in a maximally wide tree.
