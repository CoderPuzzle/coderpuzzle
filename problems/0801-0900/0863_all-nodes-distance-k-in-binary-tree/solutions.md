# Solutions — All Nodes Distance K in Binary Tree

The distance asked for runs over the tree's edges as an undirected graph: a
node at distance `k` from the target may sit above it, across the root, in a
sibling subtree — anywhere at all, not only inside the target's own subtree.
A tree node knows its children but not its parent, so the one missing edge
direction must be manufactured before any search can walk outward; and
because the statement pins the output to ascending order, the collected
values are sorted before they come back.

## Parent links and a level-synchronized walk from the target

The first pass makes the hidden upward edges explicit. One breadth-first
walk from the root visits every node once and records, for each child it
enqueues, a parent link in a hash map; the same walk collects the nodes in
an array, and scanning that array for the target value locates the node the
search must start from. Nothing here recurses — the queue is an explicit
array with a moving head — so a 500-node chain stresses no call stack.

The second pass spreads outward from that node one edge per step through
each node's three neighbors — parent, left child, right child — holding the
walk level-synchronized and never revisiting a node. After exactly `k`
steps the frontier is precisely the set of nodes at distance `k`, which the
statement asks for: `k = 0` leaves the frontier as the target itself, and a
`k` larger than every distance empties the frontier early, so the answer is
the empty array. Every node enters the frontier at most once because the
tree has a unique path between any two nodes.

Collecting the frontier's values and sorting them ascending settles the
output pin. Both passes touch each node and edge a constant number of
times, so the walk is linear; only the final sort adds a logarithmic factor,
and the parent map plus the frontier dominate the memory.

**Complexity:** `O(n log n)` time, `O(n)` space.
