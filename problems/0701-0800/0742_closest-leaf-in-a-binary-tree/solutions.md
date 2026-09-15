# Solutions — Closest Leaf in a Binary Tree

## Parent links and one breadth-first walk from the target

The distance asked for runs over the tree's edges as an undirected graph:
the nearest leaf may sit in a different subtree entirely, up through
parents and across the root, so a search that only descends can never
prove a leaf nearest. The walk therefore first makes the hidden upward
edges explicit — one breadth-first pass over the tree from the root
records every node's parent in a map, and the same pass locates the node
whose value is `k`.

From that node a level-synchronized breadth-first search spreads outward
one edge per step through each node's three neighbors — parent, left
child, right child — never revisiting a node. The first level that
contains a leaf holds every leaf at the smallest distance; the smallest
value among them is the answer, which settles the statement's tie rule.
The `k` node can itself be a leaf — the single-node tree answers with its
own value — and the level-zero check catches that before any step is
taken.

Both passes carry their own queue, so nothing is recursive, and each node
and edge is touched a constant number of times. The parent map dominates
the memory.

**Complexity:** `O(n)` time, `O(n)` space.
