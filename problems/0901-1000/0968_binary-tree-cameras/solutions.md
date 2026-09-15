# Solutions — Binary Tree Cameras

Both approaches walk the tree in postorder and distill each subtree into one
of three facts about its root — it holds a monitor, it is covered without
one, or it waits uncovered for its parent. The dynamic program is the general
machinery: it prices every state as the cheapest monitor count achievable for
that subtree and combines child prices by recurrence, so optimality holds by
construction rather than by argument. The greedy sharpens the same walk into
a single state per node and one forced move — place a monitor exactly when a
child reports being uncovered — with each placement provably unavoidable.

## Three-State Postorder DP

Each subtree root is summarized by three numbers: the fewest monitors that
cover the whole subtree while the root itself holds one, the fewest while it
is covered without holding one, and the fewest that leave everything covered
except the root, which waits for its parent. That third state is the device
that makes the recurrence work — deferring one node's coverage upward is
exactly the option a global optimum may want, so it gets a table entry
rather than a judgment call.

The combinations follow from what a monitor observes. One placed at the node
sees both children, so each child contributes the cheapest of its three
states. Covering the node without its own monitor requires a child to hold
one — take the cheaper side — while the other child must already be covered
from below, since nothing here can help it. Staying uncovered forbids
monitors at the node and at both children, because a child's monitor would
cover the node, so both children must manage from below. A missing child
folds in as free-but-never-the-monitor-holder, and leaves fall out of the
recurrence as `(1, impossible, 0)` with no special case.

No counter and no placement decision exist anywhere — three numbers simply
flow up the postorder, each node's triple being exactly the entry a
tabulated program would memoize. They ride the recursion itself, so the only
storage beyond the input is the call stack, which grows with the tree's
height `h`. The root has no parent to wait for, so the answer is the smaller
of its first two states.

**Complexity:** `O(n)` time, `O(h)` space.

## Post-Order Greedy with Three States

A camera covers its own node, its parent, and its children, so a camera on a leaf wastes one of its three coverage slots on a nonexistent child. The greedy therefore works bottom-up: the parent of any uncovered node should be the one to place a camera. A post-order DFS classifies each subtree with three states — 0 = the subtree's root is not covered, 1 = it has a camera, 2 = it is covered without a camera — and a null child reports state 2 so that leaves correctly start out uncovered and push the first camera one level up.

At each node the children's states decide everything: if either child is uncovered (0), this node must place a camera to watch it, returning 1; otherwise, if either child has a camera (1), this node is already watched, returning 2; with both children merely covered (2), the node itself is uncovered and returns 0, delegating coverage upward. Cameras thus land exactly on parents of uncovered nodes and are pushed as high as they stay useful, which is optimal because every placement forced by an uncovered child is unavoidable — skipping it would leave a node unmonitored.

![root = [0, 0, null, 0, 0]: the leaves' parent hosts the one camera that covers the whole tree.](figures/solution-camera-tree.svg)

After the traversal, the root may itself have ended in state 0, with no parent above it to help, so one final camera is added there. Each node is visited exactly once and the counter is a nonlocal updated during the DFS, so the whole computation is a single linear traversal with recursion depth bounded by the tree height `h`.

**Complexity:** `O(n)` time, `O(h)` space.
