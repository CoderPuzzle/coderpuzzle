# Inorder Successor in BST

## Description

Given the `root` of a binary search tree and a node `p` in it, return the
in-order successor of that node in the BST. If the given node has no in-order
successor in the tree, return `null`.

The successor of a node `p` is the node with the smallest key greater than
`p.val`.

On LeetCode both `p` and the answer are node objects; here the tree crosses
the wire as a level-order array, so a node cannot be passed as an argument.
The judge instead identifies `p` by its value — all node values are unique —
and the returned successor node itself crosses the wire as its subtree in
level-order form; an empty array `[]` means there is no in-order successor.

### Example 1

![diagram](figures/285-1.svg)

```text
Input: root = [2,1,3], p = 1
Output: [2,1,3]
Explanation: 1's in-order successor node is 2. Note that both p and the
return value is of TreeNode type.
```

### Example 2

![diagram](figures/285-2.svg)

```text
Input: root = [5,3,6,2,4,null,null,1], p = 6
Output: []
Explanation: There is no in-order successor of the current node, so the
answer is null.
```

### Constraints

- The number of nodes in the tree is in the range `[1, 10⁴]`.
- `-10⁵ <= Node.val <= 10⁵`
- All Nodes will have unique values.
