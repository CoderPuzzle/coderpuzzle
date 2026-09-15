# Solutions — Count the Number of Good Nodes

## Breadth-first order, then a reverse pass

Hang the tree from node 0: build an adjacency list from the undirected
edge pairs, then walk it breadth-first with an explicit queue, recording
each node the first time it is reached along with its parent. That single
sweep produces `order`, a list of every node arranged so a parent always
appears before its children — and, read backwards, so every child appears
before its parent. Every node starts out as a subtree of size 1.

Walking `order` in reverse folds each node's finished size into its
parent, one node at a time: because children come before parents in that
reversed walk, `size[i]` is already final — no descendant will ever add
to it again — by the time it is absorbed upward. A second pass over the
children then decides the good condition: each node compares every
child's subtree size against its first child's and stays good only while
they all agree. Leaves never appear in the parent role at all, so they
count as good outright, and one mismatched child condemns exactly that
one node.

Recording the traversal order with a queue rather than recursing keeps
the whole computation on the heap instead of the call stack, so a tree
shaped like a straight chain of 10⁵ nodes — the constraint's worst case —
never risks blowing a fixed-size call stack or Python's recursion limit
the way a recursive post-order walk would.

**Complexity:** `O(n)` time, `O(n)` space.
