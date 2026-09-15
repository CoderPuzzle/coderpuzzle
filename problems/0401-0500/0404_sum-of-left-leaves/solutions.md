# Solutions — Sum of Left Leaves

## Depth-first walk carrying the side

Whether a node belongs in the sum is settled one edge before the node is
reached: a left leaf is a leaf that is the left child of another node, so the
one fact a leaf needs beyond its own leaf-ness is which side of its parent it
hangs from. The code recurses pre-order with exactly that flag in tow — `true`
into every left child, `false` into every right one — and the moment the walk
enters a node with no children it adds that node's value precisely when the
flag is set. No leaf is ever revisited and no parent re-inspected; each node
is judged exactly once, in place.

The root enters flagged as a right child — it is nobody's left leaf — so the
single-node tree of Example 2 sums to 0 without a special case, and the empty
subtree base case can only fire just below an internal node, because a leaf
never recurses. That base case returning 0 is also what keeps a node with one
child honest: such a node is by definition not a leaf, keeps descending, and
can never be counted through the null beside its real child. Only the
both-children-absent test in the code decides leaf-ness.

Every node is visited once and does constant work, so the walk is linear in
the tree's size. The flag rides inside the call itself — no extra structure —
leaving the recursion stack as the only auxiliary space, which is the tree's
height: `O(log n)` when the tree is balanced, `O(n)` worst case for the
skewed 1000-node chain (Python lifts its recursion limit for exactly that
case).

**Complexity:** `O(n)` time, `O(h)` space for the recursion stack, where `h`
is the tree's height.
