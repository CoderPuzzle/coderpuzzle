# Solutions — Find Root of N-ary Tree

Both methods stand on the same fact: every node except the root appears
exactly once in some parent's children list, so the root is the one node
that never shows up as a child — indegree zero. Where the methods differ
is how that membership is tracked: one keeps an explicit set of
candidates and strikes out every child sighting, while the other lets
values cancel — each non-root value enters the accounting twice, once as
a node and once as a child, and cancels itself, leaving the root's value
for a final scan to turn back into its node.

## Child set

Collect every node of the array into a set, then walk the array a second
time and remove each node found in a children list. Every non-root is
removed exactly once — values are unique, so a child sighting always
names the same node — and the root is never removed, since it appears in
nobody's list. What remains in the set is exactly the root, and the
answer is its lone survivor.

The set is the method's whole personality: constant work per node, a
single membership structure, and O(n) auxiliary space doing the
bookkeeping. Nothing about the tree's shape is consulted — only the
parent-child pairs.

**Complexity:** `O(n)` time, `O(n)` space — one pass to build the set,
one pass over all children to empty it, and the set itself holds every
node until the walk removes the non-roots.

## Value cancellation

The set only ever answered one question — which node never appeared as a
child — and the values alone can answer it. Add every node's value to a
running total, then walk the children and subtract every child's value.
Each non-root's value is added once and subtracted once, cancelling
exactly; the root's value is added once and never subtracted, so the
total is the root's value. A second scan of the array then returns the
node whose value equals the total.

The arithmetic needs one wider register: 5·10⁴ values at the 32-bit
limits push the running total past 2⁴⁵, so the accumulator is a 64-bit
integer (a plain `number` in JavaScript, where the total stays far below
2⁵³). Nothing is stored between the scans — no set, no map, no counters —
which is precisely the follow-up's constant-space bill. XOR cancels the
same idea bitwise, each value appearing twice except the root's; the sum
needs the wider accumulator, the XOR does not, and either scan turns the
surviving value into the answer node.

**Complexity:** `O(n)` time, `O(1)` space — two linear passes over the
array and its children, and one accumulator.
