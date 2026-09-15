# Solutions — Populating Next Right Pointers in Each Node II

Both solutions hang off one fact: threading a level only needs its nodes
in left-to-right order. The breadth-first queue buys that order directly —
it dequeues each level in sequence and links every node to the node
dequeued after it. The chain walk derives the same order without a queue
at all, reading the already-wired level above to append the level below.
The queue is the direct reading of the task; the chain walk is where the
follow-up's constant-space demand leads, and it is the tighter of the two.

## BFS Level Queue

Breadth-first search visits the tree level by level, left to right —
exactly the order the `next` links have to encode. A queue carries the
whole scheme: it starts out holding the root, hands back one level's
nodes in sequence, and collects the next level's children behind them.
The level boundary is a width snapshot taken before each round — the
queue then holds precisely one level's worth of nodes, and the round
drains exactly that many, so children enqueued along the way wait for
the following round.

A `previous` cursor, reset to empty at the start of every round, does
the linking: each dequeued node is attached to the `next` slot its
predecessor on the level left open. Children enqueue left before right,
so the order the queue hands back is the reading order. The round's last
node finds nothing dequeued after it and keeps the empty `next` it
started with, closing the level.

Every node is enqueued once, dequeued once, and linked once. The queue
is the extra storage: it peaks at one full level, and on a bushy tree a
level can hold a constant fraction of all nodes — exactly the spending
the follow-up's constant-space clause disallows.

**Complexity:** `O(n)` time, `O(n)` space.

## Next-level chain building

The 116 trick — each parent links its own two children and bridges to the
next parent's child — breaks here, because a level's nodes may be missing
either child entirely. What survives is the outer shape: a level whose
`next` pointers are already wired is a linked list, and walking it visits
the level's nodes left to right without a queue.

So each pass walks the current level's chain and builds the next level's
chain as it goes: every child found (left first, then right) is appended
to a growing `next` chain through a `head`/`tail` pair. Gaps disappear on
their own — missing children are simply never appended, so the surviving
children close ranks. The walk restarts from the head of the freshly built
chain and stops when a pass finds no children at all.

Every node is appended exactly once and read exactly once; the only state
is the two chain cursors, which is the constant extra space the follow-up
asks for. The returned serialization walks the same chains level by level.

**Complexity:** O(n) time, O(1) extra space.
