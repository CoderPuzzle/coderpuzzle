# Solutions — Find Bottom Left Tree Value

## Right-to-left breadth-first search

Depth alone does not pick the answer: the deepest row can be wide, and its leftmost node can sit anywhere in the tree — in the right subtree, or even as a right child whose left sibling is missing. What fixes it is row order. Breadth-first search drains the tree row by row, and reversing only the enqueue order — right child before left — makes each row drain right-to-left, so the very last node the queue ever hands out is the leftmost node of the deepest row. Every dequeue simply overwrites a running answer, and the deepest row drains last, so it wins.

The queue's FIFO discipline is what carries the argument. A node at depth d is enqueued only while row d−1 is draining, so rows never interleave and the final dequeue is guaranteed to come from the last row. Within a row the right-first rule composes across parents: parents pop right-to-left, and each contributes its own children right first, which is exactly the next row read backwards. The tree holds at least one node, so the loop runs at least once and the answer is always assigned; no row bookkeeping, sentinels, or depth counters are needed.

Each node enters and leaves the queue exactly once and does constant work, so the sweep is linear. The queue holds at most one row plus the next one being formed — bounded by the tree's widest row, at most about half the nodes — and nothing else is stored. The recursion depth never grows with the tree, so a 10⁴-node chain costs the same stack as a perfect tree, which is exactly why the iterative queue is the right shape here.

**Complexity:** `O(n)` time, `O(w)` space for the queue, where `w` is the width of the tree's widest row.
