# Solutions — Number of Nodes in the Sub-Tree With the Same Label

## Breadth-first order, then a reverse pass

Hang the tree from node 0 and walk it breadth-first with an explicit
queue, recording each node the first time it is reached along with its
parent. That single sweep produces `order`, a list of every node arranged
so a parent always appears before its children — and, read backwards, so
every child appears before its parent. Give each node its own 26-slot
counter, one slot per lowercase letter, and set its own label's slot to 1.

Walking `order` in reverse then folds each node's counters into its
parent's, one node at a time: because children come before parents in
that reversed walk, a node's counters are already final — no more
descendants will ever add to them — by the time its parent absorbs them.
After the fold, `ans[i]` is simply node `i`'s own counter at its own
label's slot, since a node's final counters hold the label tally over its
whole subtree.

Recording the traversal order with a queue rather than recursing keeps
the whole computation on the heap instead of the call stack, so a tree
shaped like a straight chain of 10⁵ nodes — the constraint's worst case —
never risks blowing a fixed-size call stack the way a recursive
post-order walk would.

**Complexity:** `O(n)` time, `O(n)` space.
