# Solutions — Binary Tree Maximum Path Sum

Both solutions price every node with the same two quantities — the best path
that bends there, and the best path that descends from it into one side —
and fold the maximum bend over the whole tree. Both visit each node after
its children. The difference is who holds the in-progress work: the
recursive version lets the call stack carry a node's pending combine, one
frame per level, while the explicit-stack version carries those pending
combines in a frame stack of its own and passes finished gains upward
through a second stack of numbers.

## Post-Order Path-Gain Recursion

Every path in a tree has a unique highest node where it bends: from that node the path extends downward into the left subtree, the right subtree, both, or neither. The recursion exploits this by computing, for each node, the gain of the best path that starts at the node and descends into at most one child, while folding each node's bend candidate into a global `best` tracked outside the recursion.

Concretely, `gain` clamps each child's returned gain at 0 — a negative branch is better left unvisited — then updates `best` with `node.val + left + right`, the best path bending through this node, and returns `node.val + max(left, right)` for the parent to build on. The post-order evaluation resolves both children before the node forms its own candidates, and because every node's bend is considered, paths that never touch the root are covered automatically.

`best` is initialized to negative infinity rather than 0 because a path must contain at least one node: on an all-negative tree the zero clamps make both branches contribute nothing, and the answer is the largest single node value. The recursion depth equals the tree height, which is the only extra storage beyond a couple of scalars.

**Complexity:** `O(n)` time, `O(h)` space.

## Explicit Stack

The same post-order, driven by hand. Each node is visited in three phases —
before its children, after the left one, after both — so a frame holding
`(node, phase)` is pushed for each visit, and the loop pops, advances the
phase, and re-pushes: phase 0 reschedules the node as phase 1 and puts the
left child on top; phase 1 reschedules it as phase 2 and puts the right child
on top. Because anything pushed sits above the rescheduled frame, each
subtree runs to completion before its parent's next phase surfaces — the
stack of frames reproduces exactly the ordering the call stack gave the
recursion.

The child gains travel on a second stack of numbers. A subtree that finishes
pushes its root's gain; the parent's combine phase then pops what its
children left. The left child ran first and the right child's subtree piled
its own gains on top, so at a combine the top of the gain stack is the right
child's gain with the left child's just beneath — and a missing child simply
never pushed, so there is nothing to pop for it. The combine itself is the
familiar arithmetic: clamp both gains at zero, offer `val + left + right` to
the running best, and push `val + max(left, right)` back for the parent.

Every node enters the frame stack three times and the gain stack once, so the
sweep is still linear. The two stacks are what the recursion kept in
registers and frames: the frame stack is as deep as the tree (its high-water
mark again the height), and the gain stack holds at most one gain per
awaiting parent — also bounded by the height. Nothing is memoized beyond
that; a chain of 30,000 nodes that would overflow a default call stack in
some settings just makes the frame stack long.

**Complexity:** `O(n)` time, `O(h)` space.
