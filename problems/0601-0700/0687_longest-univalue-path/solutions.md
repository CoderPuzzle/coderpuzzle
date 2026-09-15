# Solutions — Longest Univalue Path

## Bottom-up arms in one post-order pass

A same-value path reaches some highest node and falls into at most two arms,
one down each child, so every node can summarize its whole subtree in a
single number: the length, in edges, of the longest downward path of its own
value leaving it. That arm is one plus the longer arm of a child carrying the
same value — zero when neither child matches — and the best path bending at
the node is simply the sum of its two arms. Settling arms children-first
leaves every needed number already computed, and a running maximum over all
bend points, single-armed ones included (the other arm contributes zero), is
the answer.

The walk collects nodes with an explicit stack and then reads the collection
backwards: a parent always precedes its descendants in the collection, so the
reversed order settles every child before its parent, which is exactly the
post-order the recurrence needs. Each node then looks its two children's arms
up in a map keyed by node identity and files its own. The stack, not the call
stack, carries the descent — the constraints allow a 1000-deep same-value
chain, and a recursive pass would nest a thousand frames, past CPython's
default limit and over the 512k stacks this judge hands Java and Node.

The numbers stay small and the bookkeeping flat: an arm never exceeds the
node count, so every counter fits the plain integer width of each language,
and nothing beyond the node order and the arm map is ever stored.

**Complexity:** `O(n)` time, `O(n)` space.
