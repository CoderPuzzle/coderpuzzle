# Solutions — Deepest Leaves Sum

## Level-order sweep

The deepest leaves are exactly the leaves on the last level of the tree, so a breadth-first walk that keeps a running sum per level needs no extra bookkeeping: when the walk is exhausted, the sum it last finished belongs to the deepest level.

The code keeps a queue of the current level's nodes and loops until it is empty. At the start of each round it resets `levelSum` to 0, drains the whole level adding every node's value, and enqueues the next level's children in their place. Because the reset happens once per level, the final value of `levelSum` after the last round is precisely the sum of the deepest leaves. The `null` children of a leaf simply never enter the queue, so the walk terminates with the queue holding nothing.

Every node is visited exactly once and each visit does constant work, making the walk linear in the tree's size. The queue holds at most one full level, which is the breadth of the tree.

**Complexity:** `O(n)` time, `O(w)` space where `n` is the number of nodes and `w` is the tree's maximum width.
