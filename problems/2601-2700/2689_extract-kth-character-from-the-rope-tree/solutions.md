# Solutions — Extract Kth Character From The Rope Tree

## Descend the rope by subtree string length

The level-order serialization decodes with a plain queue: the first entry
is the root, and only internal nodes — entries of decimal digits — occupy
child slots, two per node, where an empty entry or the end of the array
marks an absent child. Each decoded node keeps just its `val` and child
indices in an arena; the stored `node.len` value is never parsed, because
a node's length is already implied by the subtree below it.

`node.len` records how long the whole substring under a node is, but not
how it splits between the children — and the split is what locating `k`
needs. One explicit-stack post-order pass therefore totals every node's
string length from the leaves upward: a leaf contributes `len(val)`, an
internal node the sum of its children's totals. The walk itself then stays
purely arithmetic: at an internal node the left subtree owns the first
`total[left]` characters of `S`, so `k` either falls inside that range and
the walk continues left, or drops by that many and continues right. A leaf
ends the walk with the answer `val[k-1]` — no substring of the rope is
ever assembled, which for a single character is exactly the point of the
representation.

Reconstruction and the totaling pass each visit every node once, and the
descent visits at most one node per tree level, so the whole run is linear
in the node count; the arena holds the decoded tree.

**Complexity:** `O(n)` time, `O(n)` space.
