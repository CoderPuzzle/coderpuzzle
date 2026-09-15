# Solutions — N-ary Tree Level Order Traversal

## Level sweeping

The traversal keeps the current level as a plain list and rebuilds the next
level from it wholesale: every node in the current level contributes its
value to one output row and all of its children — in their given order — to
the next level's list. The loop starts from the one-node list holding the
root and stops when a level contributes no children, so the empty tree
produces no rows at all and a leaf root produces exactly one.

Reading one row while assembling the next means each node is visited exactly
once and no per-node depth bookkeeping is needed — the row boundaries are
the loop iterations. The walk is breadth-first by construction but touches
no shared queue: the current list is consumed while its replacement grows,
and the extra memory is just the frontier being built plus the output.

**Complexity:** O(n) time, O(n) space, where n is the number of nodes.
