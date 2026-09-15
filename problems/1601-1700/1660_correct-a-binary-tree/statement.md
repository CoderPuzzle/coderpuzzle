# Correct a Binary Tree

## Description

You are given the `root` of a binary tree with a small defect: exactly one
node in it is invalid — its right child incorrectly points to another node of
the tree that sits at the same depth but to the invalid node's right.

Return the root of the tree after removing this invalid node and every node
underneath it (minus the node it incorrectly points to).

Custom testing:

The test input is read as 3 lines:

    TreeNode root
    int fromNode (not available to correctBinaryTree)
    int toNode (not available to correctBinaryTree)

After the binary tree rooted at `root` is parsed, the `TreeNode` with value of
`fromNode` will have its right child pointer pointing to the `TreeNode` with a
value of `toNode`. Then, `root` is passed to `correctBinaryTree`.

### Example 1

![diagram](figures/1660-1.svg)

```text
Input: root = [1,2,3], fromNode = 2, toNode = 3
Output: [1,null,3]
Explanation: The node with value 2 is invalid, so remove it.
```

### Example 2

![diagram](figures/1660-2.svg)

```text
Input: root = [8,3,1,7,null,9,4,2,null,null,null,5,6], fromNode = 7, toNode = 4
Output: [8,3,1,null,null,9,4,null,null,5,6]
Explanation: The node with value 7 is invalid, so remove it and the node
underneath it, node 2.
```

### Constraints

- The number of nodes in the tree is in the range `[3, 10⁴]`.
- `-10⁹ <= Node.val <= 10⁹`
- All `Node.val` are unique.
- `fromNode != toNode`
- `fromNode` and `toNode` exist in the tree and are on the same depth.
- `toNode` is to the right of `fromNode`.
- `fromNode.right` is null in the initial tree from the test data.

## Hints

### Hint 1

If you traverse the tree from right to left, the invalid node will point to a
node that has already been visited.
