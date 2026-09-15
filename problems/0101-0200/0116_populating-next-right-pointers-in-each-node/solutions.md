# Solutions — Populating Next Right Pointers in Each Node

Both wirings visit every node once and differ only in how a node learns
who stands at its right. The queue reads the neighbor straight off the
traversal order: drain one level's worth of the frontier, and every
node's neighbor is the node dequeued immediately before it. The
level-chain walk extracts the same pairing structurally — perfection
pre-wires each level into a linked list as it goes, so the walk rides
that list for free and stores nothing beyond two cursors, which is the
constant extra space the follow-up asks for.

## Level-order queue

Plain breadth-first search: a queue holds the frontier, and every round
drains exactly one level's worth of it. The round snapshots the queue's
width up front, then dequeues that many nodes. Within the round a single
`previous` cursor — reset to null at the top — remembers the node
dequeued just before the current one, and that is the whole wiring:
`previous.next` points at the node in hand, then `previous` retires into
it. The level's last node is dequeued with nothing after it, so its
`next` is never assigned and stays empty, as the statement guarantees it
begins.

Between two dequeues the round also enqueues the current node's
children — the null checks keep leaves from adding anything, which is
why the queue empties once the last level has drained and the search
ends. The method then hands back the very same `root`, now threaded.

The cost is the frontier itself. A perfect tree twelve levels deep holds
2¹¹ nodes on its last level alone, so the queue is linear extra space —
the direct reading the follow-up's constant-space demand pushes beyond.

**Complexity:** `O(n)` time, `O(n)` space — the queue holds at most one
level, 2¹¹ nodes on the deepest tree.

## Level-chain walk

The tree is perfect, so a parent's two children sit side by side in the next
level: `left.next` is always `right`, and `right.next` is always the next
parent's `left`. That turns each already-wired level into a linked list the
walk can traverse for free — no queue, no recursion.

Start from the root (a one-node level whose `next` stays null) and walk
downward: `level` always names the leftmost node of the current level, and
the inner walk hops along its `next` chain wiring the level below — each
parent links its own pair, then bridges to the next parent's `left`. When
the current level's first node has no left child the tree's leaves are
reached (a perfect tree ends everywhere at once) and the walk stops.

Every node is visited exactly once and the only state is the two walk
cursors — the constant extra space the follow-up asks for.

**Complexity:** O(n) time, O(1) extra space.
