# Solutions — Longest Special Path II

## DFS with Two Sliding Windows (Strict and One-Duplicate)

Like the single-duplicate-free version, one depth-first walk from the root maintains the current root-to-node path and `dist_path`, the prefix distances from the root, so the length of any downward window ending at the current node is `d - dist_path[start]`. The relaxation is that a special path may now contain one duplicated value, which calls for two window starts over the same path: `top`, the shallowest depth from which all values are distinct, and `second`, a never-smaller depth from which at most one value repeats. The candidate at each node is the window `[second .. depth]`.

Both pointers are maintained from `last`, the map from value to the depth of its most recent occurrence. Entering a node whose value previously occurred at `prev_last`: if `prev_last >= top`, the duplicate now sits inside the all-distinct window — that window becomes the new one-duplicate window (`second = top`) and `top` jumps past the occurrence (`top = prev_last + 1`); otherwise, if `prev_last >= second`, the second repeat falls inside the one-duplicate window and pushes it (`second = prev_last + 1`); a repetition outside both windows moves nothing. Thus `top <= second` always holds, `second` never exceeds `top` by more than one duplicated value, and the best (length, node count) pair is updated with the window ending at each node.

Backtracking restores state exactly as in the stricter problem: on entering a node the code saves the previous `last` entry for its value plus both window starts, and a matching exit event on the explicit stack pops the path tail and all three saved values, so sibling subtrees see pristine windows. The explicit stack keeps the traversal safe for `n = 5 * 10^4` regardless of recursion limits.

Edge cases: paths where the duplicate is the current node's own previous occurrence far above the window (both pointers unchanged), a second repeat arriving while one is already tolerated (only `second` moves), and the minimum-node tie-break among equal maximal lengths, tracked exactly as in the base problem with the initial answer `[0, 1]` for the single-node path.

**Complexity:** `O(n)` time, `O(n)` space.
