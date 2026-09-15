# Solutions — Even Odd Tree

## BFS Levels With a Parity and Monotonicity Check

The rule is entirely level-local: whether level `k` is valid never depends
on any other level, so a breadth-first sweep that peels one level at a time
— emptying exactly the nodes queued at the round's start — gives a natural
place to check each rule as the level is read. Level index and node index
are the two pieces of state the check needs, and BFS already hands both to
you for free: the round counter is the level index, and the queue order is
the left-to-right reading order.

Reading a level left to right, track the previous value seen on that level
(starting from none). Even-indexed levels demand an odd value that is
strictly greater than the previous one; odd-indexed levels demand an even
value that is strictly less than the previous one. Any node that fails its
level's parity or ordering check fails the whole tree, and the search can
stop the moment that happens — no need to finish the remaining levels.

Enqueuing children left-before-right, exactly as an ordinary level-order
traversal does, is what keeps the reading order correct; nothing about the
check requires buffering a level's values in a separate list first, since
each new value only needs to be compared with the one immediately before
it. Every node is visited once and does constant work, so the whole
traversal is linear in the number of nodes.

**Complexity:** `O(n)` time, `O(n)` space.
