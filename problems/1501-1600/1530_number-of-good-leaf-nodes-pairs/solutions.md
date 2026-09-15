# Solutions — Number of Good Leaf Nodes Pairs

## Merge per-subtree leaf-depth counts bottom-up

Every good pair's path bends at exactly one node — the pair's lowest common
ancestor — so counting pairs reduces to counting, at each node, how many
ways a leaf on one side can meet a leaf on the other within the remaining
budget. Post-order gives each node its two children's answers first: a
frequency table indexed by relative depth (0 up to `distance`) counting how
many leaves sit that many edges below the child. At a node with both
children, every `(d1, d2)` combination with `d1 + d2 + 2 <= distance` pairs
`left[d1]` leaves against `right[d2]` leaves and adds their product to the
running total; a node with only one child forwards its child's table
untouched, since no new pair can be anchored there. The node's own table for
its parent is just those counts shifted one level deeper, dropping any depth
that would already exceed `distance` — a leaf that far away can never help
an ancestor either, so there is no reason to keep carrying it.

Both the traversal and the depth tables are built without the call stack.
The tree can hold up to 2¹⁰ nodes, and a skewed instance packs all of them
into one chain — deep enough to blow past CPython's default recursion limit
of 1000 and to sit uncomfortably close to the 512 KB stacks the judge hands
Java and Node. An explicit node stack turns the recursive "root, then
right, then left" walk into its reverse, which read backwards is exactly
postorder; a second explicit stack of depth tables replays that same order
to merge children into parents, so the whole computation runs iteratively
however deep the tree leans.

**Complexity:** `O(n · distance²)` time — each of the `n` nodes does
`O(distance)` work merging tables and, when it has two children, an
`O(distance²)` scan pairing depth buckets — and `O(n · distance)` space for
the depth tables carried on the explicit stack.
