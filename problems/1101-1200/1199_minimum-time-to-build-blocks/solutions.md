# Solutions — Minimum Time to Build Blocks

## Min-heap, merge the two cheapest trees

Every schedule is a binary tree: leaves are blocks, each internal node one
split, and a block finishes at its build time plus the splits along its
root-to-leaf path (splits on disjoint branches run in parallel). The makespan
of a tree is the heaviest such path, so the task is choosing the tree that
minimizes the maximum path weight.

The optimum is built bottom-up with a min-heap of subtree completion times:
repeatedly pop the two cheapest subtrees and push `max(a, b) + split` —
mounting both under one new split. The two cheapest are the right pair to
combine because they are the subtrees no path wants to lengthen: any deeper
pairing only adds splits above work that is already cheap, and by an
exchange argument the optimal tree has this greedy shape (heavier blocks sit
shallower, near the root's parallel fan-out). When one item remains, it is
the root's makespan.

**Complexity:** `O(n log n)` time — n−1 heap merges at `O(log n)` each —
and `O(n)` space for the heap.
