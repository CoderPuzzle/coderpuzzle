# Solutions — Split BST

The split boundary lives on one root-to-null path: from the root, step right
whenever a node's value is at most `target` and left whenever it is greater,
and exactly the nodes this walk visits are the ones whose child pointers must
change. Every subtree hanging off the path holds values on a single side of
`target` already, so it moves with its root untouched — which is the
structure preservation the statement demands, for free.

## One walk, two dangling tails

The algorithm keeps two attachment slots — one per output tree — and threads
each path node onto its side as it descends. A node at most `target` belongs
to the first tree: unhook it from its right child (that child is the next
path node), link it in at the small side's slot, and advance the slot to its
freshly emptied right child — the next small-side node on the path is always
a right descendant, so that slot is precisely where it must land. A node
greater than `target` mirrors this on the left toward the second tree. When
the walk falls off the tree, the collected path nodes form the right spine
of the first tree and the left spine of the second; the two roots those
spines hang from are the answer.

Both outputs are forced, never chosen. Each spine descends through strictly
increasing values (first tree) or strictly decreasing ones (second tree), and
every node hanging off a spine kept its original subtree, so both results are
BSTs whose value sets partition the input exactly — the same pair the classic
recursive split produces, unrolled into a single loop. That loop touches each
path node once and allocates nothing beyond the two slots, and its depth is
the height of the tree no matter how the boundary weaves, so no runtime
stack is spent at all; on the 50-node chains the constraint allows, the walk
is 50 pointer rewirings and done.

**Complexity:** `O(h)` time, `O(1)` space, where `h` is the tree's height —
`O(log n)` on a balanced tree and `O(n)` on a chain at its worst.
