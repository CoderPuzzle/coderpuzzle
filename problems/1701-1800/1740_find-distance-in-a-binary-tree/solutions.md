# Solutions — Find Distance in a Binary Tree

The path between two nodes of a tree always bends through their lowest
common ancestor: it climbs from one node up to the LCA, then descends to
the other, so its edge count is the two nodes' depths minus twice the
LCA's. The single solution below records a parent and a depth for every
node in one iterative pass, then reads that formula straight off the maps.

## Parent and depth maps through the LCA

The build is a pre-order walk on an explicit stack — never recursion, as
a skewed tree runs 10^4 nodes deep — writing each value's depth and its
parent's value; values are unique, so a value keys both maps. The query
then resolves in three climbs: lift the deeper of `p` and `q` to the
other's depth, walk both up in lockstep until they meet — that meeting
point is the LCA — and return `depth[p] + depth[q] - 2 * depth[lca]`,
counting each leg of the path exactly once. The root rides with a parent
that is never a real value's entry to follow, because no climb ever
passes the LCA, and the LCA is at the latest the root.

Every query shape falls out of the same three loops by construction. A
query with `p == q` needs no special case: the depth lifts make no move,
the lockstep walk finds the two already equal, and the formula cancels
to 0. An ancestor-descendant query, the distance being the depth
difference, stops the lifts exactly at the ancestor and leaves the
lockstep walk nothing to do. Nodes in opposite subtrees meet at the
branching node, while a parent-child pair — distance 1 — lifts the child
one level and meets immediately.

**Complexity:** `O(n)` time, `O(n)` space.
