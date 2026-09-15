# Solutions — Find Largest Value in Each Tree Row

## Breadth-first search, one maximum per level

A row of the tree is exactly a level — the set of nodes at one depth — and a
queue visits levels whole: when a round of the outer loop begins, the queue
holds precisely that level's nodes, left to right. Each round fixes that
count up front, drains exactly that many nodes off the front while appending
their children at the back, and so hands the next level, intact, to the
following round. Fixing the count is what keeps a child enqueued mid-round
from being measured against its own parents.

Inside a round the code keeps a single running maximum and appends it once
when the round closes, so a row of tied values still yields exactly one
entry. That maximum is seeded from the round's first node rather than from
zero or a sentinel: every round holds at least one node, so the first value
is always a legitimate seed, and with `-2³¹` in play a zero seed would
silently ruin every all-negative row. An empty tree never enters the loop
and returns `[]` without a special case, and a skewed tree needs no
adjustment either — its levels are singletons.

**Complexity:** `O(n)` time — every node enters and leaves the queue exactly
once — and `O(width)` space for the queue, where `width` is the tree's widest
level (a full bottom row holds about half the tree).
