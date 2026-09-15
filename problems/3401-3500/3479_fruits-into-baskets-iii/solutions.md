# Solutions — Fruits Into Baskets III

Same rules as the small version, but with `n` up to `10⁵` the quadratic scan
no longer fits the time limit: finding the leftmost free basket that fits has
to cost `O(log n)`, not `O(n)`.

## Max segment tree with leftmost descent

Build a segment tree over basket indices whose leaves hold the basket
capacities and whose internal nodes hold the maximum capacity in their range;
consuming a basket writes 0 into its leaf, which sits below every legal
capacity (`>= 1`), so a used basket can never match again. Each internal
node's maximum then answers "does this range still hold a basket that fits"
in one comparison.

For a fruit of quantity `q`, first check the root: if the global maximum is
below `q`, no free basket fits and the fruit stays unplaced. Otherwise descend
from the root, going into the left child whenever its maximum is `>= q` and
only falling back to the right child when the left side is exhausted. Because
every index in the left subtree precedes every index in the right one, this
greedy walk lands on precisely the leftmost qualifying basket — the same
basket the linear scan of the easy version would have found. The walk is one
root-to-leaf path, and retiring the chosen basket refreshes the `O(log n)`
ancestors above it, so the whole simulation runs in `O(n log n)` time with
`O(n)` space for the doubled array that holds the tree. Capacities fit in
32-bit integers throughout; the unplaced counter is bounded by `n`.

**Complexity:** `O(n log n)` time, `O(n)` space.
