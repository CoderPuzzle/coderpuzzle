# Solutions — Correct a Binary Tree

Under this judge the tree arrives clean: the method receives `root` together
with the `fromNode` and `toNode` values, and the defect exists only once the
solution has wired it, exactly as the statement's custom testing describes —
one walk records every node by value, and the fromNode-valued node's empty
right slot is pointed at the toNode-valued node. From there the problem is
the original one, and the single solution below hunts the wired node down and
removes it with its whole subtree.

## Right-to-left breadth-first sweep

The sweep is a level-order walk that takes each level from right to left —
the right child is enqueued before the left — marking every node as seen the
moment it is enqueued and carrying each node's parent alongside it. The
ordering is the whole trick: `toNode` sits to the right of `fromNode` on the
same depth, so every node right of `fromNode` at that depth is enqueued
before `fromNode` is dequeued, and when `fromNode` finally comes up its right
child — the wired edge — stares at a node already in the seen set.

That test can fire at exactly one node, which is what makes the sweep a
correction rather than a guess. In a tree every child is enqueued exactly
once, by its own parent, so no node's right child can predate its own
dequeue; the wired edge is the only place where a right child was enqueued by
somebody else. The fix is one pointer write: compare the carried parent's
left link for identity to tell which side the offender hangs from, clear that
link, and return the root — the entire subtree below the invalid node,
except the node it pointed at, goes unreachable with it. The queue is
explicit and the walk is iterative throughout, as a tree up to 10⁴ deep
demands; both passes touch each node once.

**Complexity:** `O(n)` time, `O(n)` space.
