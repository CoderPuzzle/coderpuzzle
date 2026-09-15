# Solutions — Cousins in Binary Tree

Cousinhood is a fact about two coordinates, not a property either node
carries alone: where a node sits is fully described by the depth it rests
at and the parent it hangs from. The single solution below walks the tree
once, records those two coordinates for the nodes valued `x` and `y`, and
reads the definition straight off the result — same depth, different
parents.

## One descent recording depth and parent

The walk is a depth-first descent carried by an explicit stack, in the
bank's iterative convention. Each frame is a triple — the node, the depth
it sits at, and the value of its parent — and pushing a child means
writing down both facts the child will ever be asked about. Values in the
tree are unique, so the first frame that meets `x` (or `y`) has found the
one node the statement asks about: its coordinates are recorded and the
search for that value is over. The descent stops the moment the second of
the two targets is recorded; whatever remains unvisited can no longer
change either coordinate.

The verdict is then a single comparison on the two records: equal depths
and different parents. Two boundary details make the comparison safe as
written. The root rides with the sentinel parent `0`, which no node value
can equal — the tree's values start at 1 — and which can never be compared
against a genuine parent anyway, because the root is alone at depth 0, so
no second node can match its depth. And two nodes that merely share a
depth but hang from the same parent — siblings — fail the second half of
the test, which is exactly the case the definition excludes.

Every node is visited at most once, and the walk stops early when the
targets are shallow, so the whole pass is linear in the number of nodes.
The stack holds one frame per open level of the descent, never more than
the tree's height, and the explicit stack keeps even a 100-node chain off
the call stack entirely.

**Complexity:** `O(n)` time, `O(h)` space (traversal stack; h = height).
