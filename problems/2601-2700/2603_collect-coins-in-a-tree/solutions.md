# Solutions — Collect Coins in a Tree

## Iterative Leaf Pruning

Two pruning phases shrink the tree to exactly the vertices a shortest collecting tour must enter. First, repeatedly delete coinless leaves: a leaf holding no coin is never worth stepping onto, and deleting it may expose a new useless leaf, so the removals cascade like a topological sort until every remaining leaf carries a coin.

Second, since coins can be collected from distance 2, a walk never needs to descend into the last two layers of the coin-bearing tree. Two more rounds of leaf deletion — dropping every leaf regardless of coins — strip those layers, and within each round the removals again cascade because earlier deletions can create fresh leaves.

![Example 2's tree through the two phases: coinless leaf 6 goes first, then two leaf layers are stripped, leaving the edge 0-2 worth (2-1)*2 = 2 moves.](figures/solution-leaf-pruning.svg)

Whatever survives is the minimal subtree the tour must traverse. Visiting a tree of `r` vertices and returning to the start crosses each of its `r - 1` edges exactly twice, so the answer is `(r - 1) * 2`. The `max(0, ...)` clamp covers fully pruned inputs, such as a single vertex or coins reachable within distance 2 of one spot, where `r` is 0 or 1 and no movement is needed.

**Complexity:** `O(n)` time, `O(n)` space.
