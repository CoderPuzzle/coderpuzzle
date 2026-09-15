# Solutions — Properties Graph

The graph is never handed over; it hides inside a predicate on row pairs —
two indices are adjacent when their rows share at least `k` distinct integer
values. Counting components is therefore a two-stage job: materialize the
predicate as an adjacency list, then sweep the components.

## Distinct-value sets, then an iterative depth-first sweep

Each row first collapses to a set of its distinct values. This step is not
cosmetic: `intersect` counts distinct integers, so `[1, 1]` and `[1, 1]`
share exactly one value, not two — duplicates inside a row must vanish
before any pair is compared. With sets in hand, every unordered pair is
compared once, and a shared-count of `k` or more records both directions of
the edge. With at most 100 rows, the 4,950 pairwise intersections of at
most 100 values each are about half a million set probes — comfortably
inside the budget, so no per-value bookkeeping (such as value-to-rows
inverted indexes) is worth its weight.

Components then come from a depth-first search with an explicit stack.
Nodes are marked the moment they are pushed, not when they are popped, so a
node can never sit twice on the stack; each outer loop iteration that finds
an unmarked start therefore discovers exactly one fresh component. The
stack replaces recursion deliberately — nothing here depends on call-stack
depth, and marking-on-push keeps the whole sweep linear in nodes plus edges
regardless of graph shape.

**Complexity:** `O(n² · m)` time (each of the `n²` pair comparisons costs at
most `O(m)` set probes), `O(n² + n · m)` space for the adjacency lists and
the value sets.
