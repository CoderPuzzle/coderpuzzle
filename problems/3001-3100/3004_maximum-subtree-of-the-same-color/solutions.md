# Solutions — Maximum Subtree of the Same Color

## Breadth-first order, then a reverse pass

Hang the tree from node 0: build an adjacency list from the undirected
edge pairs, then walk it breadth-first with an explicit queue, recording
each node the first time it is reached along with its parent. That single
sweep produces `order`, a list of every node arranged so a parent always
appears before its children — and, read backwards, so every child appears
before its parent. Each node starts out monochrome with a run size of 1.

Walking `order` in reverse folds every node into its parent one at a
time: because children come before parents in that reversed walk, a
node's own subtree summary is already final when the fold reaches it. The
fold carries two facts per node — whether the subtree is monochrome, and
if so how many nodes it holds. A child whose subtree already mixes colors
poisons its parent outright; a clean child poisons the parent too when
its color differs, and otherwise simply adds its count to the parent's
run. Every monochrome node's final size is a candidate for the answer,
and since each node alone counts, the answer is at least 1.

Recording the traversal order with a queue rather than recursing keeps
the whole computation on the heap instead of the call stack, so a tree
shaped like a straight chain of 5 × 10⁴ nodes — the constraint's worst
case — never risks blowing a fixed-size call stack or Python's recursion
limit the way a recursive post-order walk would.

**Complexity:** `O(n)` time, `O(n)` space.
