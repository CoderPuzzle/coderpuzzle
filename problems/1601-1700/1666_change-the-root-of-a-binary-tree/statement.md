# Change the Root of a Binary Tree

## Description

Given the `root` of a binary tree and a leaf node, reroot the tree so that
the leaf is the new root.

You can reroot the tree with the following steps for each node `cur` on the
path starting from the leaf up to the root, excluding the root:

1. If `cur` has a left child, then that child becomes `cur`'s right child.
2. `cur`'s original parent becomes `cur`'s left child. Note that in this
   process the original parent's pointer to `cur` becomes null, making it
   have at most one child.

Return the new root of the rerooted tree.

Note: Ensure that your solution sets the Node.parent pointers correctly
after rerooting or you will receive "Wrong Answer".

On LeetCode, this variant hands the solver node references whose nodes
carry `parent` pointers, and the leaf as a reference too. This judge's
wire has no per-node parent pointers — trees cross it top-down, as a
level-order array — so here the tree arrives as `root` and the leaf
arrives as its integer value, unique among the tree's values. The
rerooting rule above is applied unchanged; the parent pointers the note
demands are the solver's own bookkeeping on the way up, and the rerooted
tree is judged by its level-order array alone.

### Example 1

![diagram](figures/1666-1.svg)

```text
Input: root = [3,5,1,6,2,0,8,null,null,7,4], leaf = 7
Output: [7,2,null,5,4,3,6,null,null,null,1,null,null,0,8]
Explanation: The path from the leaf up is 7 -> 2 -> 5 -> 3. Rerooting
hangs 2 below 7, then 5 below 2 (keeping 4 as 2's right child), then 3
below 5 (whose left child 6 moves across to the right), leaving 1 with
its children 0 and 8 below 3.
```

### Example 2

```text
Input: root = [3,5,1,6,2,0,8,null,null,7,4], leaf = 0
Output: [0,1,null,3,8,5,null,null,null,6,2,null,null,7,4]
Explanation: The path from the leaf up is 0 -> 1 -> 3. Rerooting hangs 1
below 0, then 3 below 1 (keeping 8 as 1's right child); the whole 5
subtree stays as 3's left child.
```

### Constraints

- The number of nodes in the tree is in the range `[2, 100]`.
- `-10⁹ <= Node.val <= 10⁹`
- All `Node.val` are unique.
- `leaf` exists in the tree.

## Hints

### Hint 1

Start traversing from the leaf. Always go up till you reach the root.

### Hint 2

Change pointers as asked, make the current node's parent its left child,
and make the left child the right one if needed.
