# Solutions — Distribute Coins in Binary Tree

## Post-Order Excess Flow

Think per edge rather than per move. A subtree containing `s` nodes and `c` coins must end with one coin per node, so exactly `c - s` coins — the subtree's excess — have to cross the edge joining it to its parent: flowing out if positive, flowing in if negative. Each coin movement across an edge is one move, so the total number of moves is the sum of the absolute excesses over all edges.

A post-order DFS computes this directly: each call returns the excess of its subtree as `node.val + left + right - 1`, keeping one coin for the node itself, with null subtrees contributing 0; on the way up it adds `abs(left) + abs(right)` — the flows on the two child edges — to the move counter. No explicit routing of coins is needed, because any long-distance transfer decomposes into edge-by-edge flows and flows on separate edges never interfere with each other.

![root = [3, 0, 0]: each child edge carries exactly one coin, so two moves suffice.](figures/solution-coin-flow.svg)

The guarantee that the tree holds exactly `n` coins in total means the root's final excess is 0, so nothing leaks out of the tree. Example 1 (`[3,0,0]`) flows one coin out of each child edge for 2 moves; example 2 (`[0,3,0]`) pushes two coins up the left edge and one down the right edge for 3. The traversal is a single linear pass with recursion depth bounded by the tree height `h`.

**Complexity:** `O(n)` time, `O(h)` space.
