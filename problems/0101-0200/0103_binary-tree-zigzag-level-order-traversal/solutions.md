# Solutions — Binary Tree Zigzag Level Order Traversal

## BFS level by level with a direction flag

The answer is organized by depth, and breadth-first search discovers nodes in exactly that order. Holding one level's nodes in a queue at a time — always gathered left to right, because each node's children are appended left child first — reduces the zigzag to a single question per level: which way should this level be emitted? A boolean flag answers it, starting `true` at the root's level and flipping after every level is produced.

Every round collects the current level's values left to right, reverses that list when the flag says right to left, appends it to the result, and finally spreads the children into the next level. Reversing after collection, rather than pushing values in from alternating ends of a double-ended queue, keeps the traversal one uniform idiom: append-only growth, which is the natural (and in several languages the only constant-time) array operation. The flag flips once per level, so levels 0, 2, 4, … come out left to right and levels 1, 3, 5, … right to left, exactly alternating from the root down.

The empty tree returns `[]` before the loop ever runs, a single node yields `[[val]]`, and skewed chains produce singleton levels on which the direction flag is invisible — all edge cases fall out of the invariant with no special handling.

**Complexity:** `O(n)` time — each node enters and leaves the queue exactly once, and the reversals together still touch each value a constant number of times — and `O(n)` space for the queue (never more than one level, so at most about half the nodes) plus the output itself.
