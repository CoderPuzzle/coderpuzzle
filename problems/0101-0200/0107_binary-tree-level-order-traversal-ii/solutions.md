# Solutions — Binary Tree Level Order Traversal II

## Breadth-first search, one level per round

A queue turns a tree into level order: when a round begins, the queue holds exactly the nodes of one level, left to right. Each round remembers that count, drains exactly that many nodes off the front, records their values, and appends their children at the back — so by the time the round ends the queue holds exactly the next level. Fixing the count up front is what keeps levels from bleeding into each other when children arrive mid-round.

Collecting this way yields the root level first, but the statement asks for leaf first, so a single `reverse` of the level list at the end flips top-down into bottom-up — no per-node depth bookkeeping and no double-ended trickery. An empty tree never enters the loop and returns `[]`, while a single node produces the one-level answer `[[root.val]]` with no special cases.

**Complexity:** `O(n)` time — every node enters and leaves the queue exactly once — and `O(n)` space for the queue and the output.
