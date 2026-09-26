# Solutions — Find Number of Coins to Place in Tree Nodes

## Subtree selections of three largest and two smallest

Rooting the tree at node `0` turns every subtree into a contiguous
parent/child region, so one bottom-up pass over the tree settles every
answer. The maximum product of three distinct cost values in a set is
always achieved either by the three largest values or by the two
smallest values together with the largest one (two big negatives make a
positive when multiplied by a big positive). So each subtree only needs
to remember its three largest and its two smallest cost values — six
numbers, exactly as the hints suggest — together with its size.

Merging a child into its parent is a constant-size selection: pool the
parent's and the child's stored values, keep the three largest and the
two smallest. A node whose subtree has fewer than three nodes places 1
coin; otherwise it computes the two candidate products, and clamps a
negative best to 0.

![On example 2 with cost = [1,4,2,3,5,7,8,-4,2], each subtree pools its children into three largest and two smallest costs: node 1 takes max(7×5×4, 3×4×7) = 140, node 2 takes max(8×2×2, −4×2×8) = 32, the root takes max(8×7×5, −4×1×8) = 280, and every leaf places 1 coin.](figures/solution-top3-low2-merge.svg)

Because `|cost[i]| <= 10⁴`, every product fits in
64-bit integers (at most `10¹²`), which the wide return type carries
directly.

The tree can be a single chain of `2 * 10⁴` nodes, so the pass avoids
recursion: a first sweep from the root records each node's parent in
breadth-first order, then a reverse sweep processes every subtree before
its parent, merging stored selections upward.

**Complexity:** `O(n)` time in constant-bounded selection merges,
`O(n)` space.
