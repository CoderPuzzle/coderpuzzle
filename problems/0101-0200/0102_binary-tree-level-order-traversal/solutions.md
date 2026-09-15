# Solutions — Binary Tree Level Order Traversal

Both walks visit every node once and drop each value into a list owned by its
depth; both keep left-to-right order inside a depth. What differs is the
frontier. The breadth-first walk holds a whole depth in a queue and drains it
before meeting the next, so the output is built depth by depth. The
depth-first walk carries only a depth counter down one root-to-leaf path at a
time, so the output grows sideways — each depth's list is opened the first
time any walk reaches it and receives arrivals ever after.

## Breadth-First Search

The queue in a breadth-first traversal naturally holds whole levels at a
time. The invariant is that whenever the outer loop begins a new round, the
queue contains exactly the nodes of one level and nothing else. So the code
drains exactly `len(queue)` nodes, collects their values into one list, and
while doing so enqueues each node's non-null children — which, by the same
invariant, become precisely the next level.

The walk starts by seeding the queue with the root. Each round pops the
current level's nodes one by one, appends their values, and pushes left
then right children. Skipping `None` children on enqueue means no sentinel
markers are needed; the level's list is complete exactly when the round's
pop count is exhausted.

![The queue holds [3], then [9, 20], then [15, 7] — one full level per round — for the tree 3 / 9 20 / 15 7.](figures/solution-bfs-queue.svg)

An empty tree is handled up front by returning `[]` before the queue is
created; a single-node tree produces the single-level `[[root.val]]`.

**Complexity:** `O(n)` time, `O(n)` space — every node is enqueued and
dequeued exactly once, and the queue peaks at one full level, which for a
complete tree holds about half of all nodes.

## Recursive Dfs

The depth-first walk needs no frontier at all — just a depth counter that
starts at 0 for the root and gains one on every descent. Arriving at a node,
it records the value into `grouped[depth]`, then recurses into the left
child before the right. Pre-order recording is what keeps left-to-right
order inside each depth: within any subtree, a depth's left-side nodes are
all visited before that depth's right-side nodes, and that recurse down
through the whole tree.

The one wrinkle is that depths are met out of order — the walk may be
appending to `grouped[2]` long before any path first reaches depth 5. The
list for a depth is therefore created exactly when the walk first arrives
at it: `grouped` grows by one list whenever `depth == len(grouped)`, which
can only happen along the leftmost descent (every other path arrives at a
depth some earlier path already opened). The empty tree never starts the
walk and keeps the output empty; a lone root yields `[[root.val]]`.

Each node is visited once with constant work, so time is linear. The
storage is the output plus the call stack, and the stack is exactly one
frame per level along the current path — `O(h)`, the tree's height, at
`O(n)` for a chain and `O(log n)` for a balanced tree. That is the trade
against the queue: one path in memory instead of a whole frontier.

**Complexity:** `O(n)` time, `O(h)` space beyond the output.
