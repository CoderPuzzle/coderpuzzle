# Solutions — Longest Special Path

## DFS with a Sliding Distinct-Value Window

The key observation is that every special path is a downward path in the tree, so a single depth-first traversal from the root can consider all of them: while descending, keep the current root-to-node path (its nodes and the prefix distances from the root, where `dist_path[t]` is the distance to the node at depth `t`). Any downward path ending at the current node is a suffix of this path, so its length can be read in constant time as `d - dist_path[start]` once we know the smallest depth `start` from which all node values on the path are distinct.

To maintain that window, keep a dictionary `last` mapping each value to the depth of its most recent occurrence on the current path, plus the current window start `start_depth`. When entering a node whose value `val` last occurred at depth `prev_last`, the window must jump past that occurrence whenever it lies inside the current window (`prev_last >= start_depth`), i.e. `start_depth = prev_last + 1`. The window start only ever moves down while descending, like the left pointer of a sliding window. The candidate path ending here has length `d - dist_path[start_depth]` and `depth - start_depth + 1` nodes; track the best length and, among equal lengths, the minimum node count.

![Example 1's tree with edge lengths and node values: the paths 0-1-4 and 2-5 both have length 6, and 2-5 wins the tie with only 2 nodes.](figures/solution-tree-window.svg)

Because DFS backtracks, the window state must be restored exactly when leaving a subtree. Before entering a node the code saves the previous `last` entry for its value, the previous `start_depth`, and the path tail; an explicit exit event on the stack pops them back on the way up. The whole traversal is done with an explicit stack (each node is pushed once as an enter event and once as an exit event) to avoid recursion-depth limits, since `n` can be `5 * 10^4`.

Edge cases: a single node is always a valid special path, so the answer starts at `[0, 1]`; this also covers a two-node tree whose values collide (example 2). Equal values at depths outside the current window never move the start, and the minimum-node tie-break naturally prefers shorter windows of the same length.

**Complexity:** `O(n)` time, `O(n)` space.
