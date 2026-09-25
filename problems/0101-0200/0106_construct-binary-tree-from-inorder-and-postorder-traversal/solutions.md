# Solutions — Construct Binary Tree from Inorder and Postorder Traversal

## Divide and conquer with an inorder index map and an explicit stack

Postorder ends with the root, so the last unconsumed value of `postorder` names the root of whatever subtree is being built. Locating that value inside `inorder` splits the work cleanly: every inorder entry to the left of it belongs to the left subtree and every entry to the right belongs to the right subtree, because inorder visits left subtree, root, right subtree. Repeating the argument on the two ranges reconstructs the whole tree, and a hash map from each value to its inorder index makes every split an `O(1)` lookup instead of a linear scan. Values are unique per the constraints, so a lookup identifies exactly one split point, with no ambiguity to resolve.

Rather than recursing, the code keeps an explicit stack of frames `(parent, attach_left, low, high)` over inorder ranges, seeded with a dummy parent so the real root passes through the same attach logic as every other node. Popping a frame claims the next root value from a cursor walking `postorder` backwards — reversed postorder lists root, right subtree, left subtree, exactly the order in which the frames claim roots — attaches the fresh node to its parent, and pushes the node's left range and then its right range so the right frame pops first. An empty range means a missing subtree and claims nothing. The explicit stack is deliberate: the constraints allow a chain of 3000 nodes, and recursion that deep is not safe in every judge language, while the frame stack carries the same `O(h)` of pending state without touching the call stack at all.

![For inorder = [9, 3, 15, 20, 7] and postorder = [9, 15, 7, 20, 3], postorder's last value 3 splits the inorder into the ranges [9] and [15, 20, 7] while the backwards cursor claims 3, then 20, then 7 and 15, building the tree [3, 9, 20, null, null, 15, 7].](figures/solution-postorder-split.svg)

**Complexity:** `O(n)` time — one map build plus one frame and one node per tree node — and `O(n)` space for the index map, the frame stack, and the tree itself.
