# Maximum Sum BST in Binary Tree

## Description

Given a binary tree `root`, return the maximum sum of all keys of any
sub-tree which is also a **Binary Search Tree (BST)**.

Assume a BST is defined as follows:

- The left subtree of a node contains only nodes with keys **less than** the
  node's key.
- The right subtree of a node contains only nodes with keys **greater than**
  the node's key.
- Both the left and right subtrees must also be binary search trees.

### Example 1

```text
Input: root = [1,4,3,2,4,2,5,null,null,null,null,null,null,4,6]
Output: 20
Explanation: Maximum sum in a valid Binary Search Tree is obtained in the root node with key equal to 3.
```

![The tree rooted at 1 with the subtree rooted at 3 enclosed in a dashed blue box; its keys 3, 2, 5, 4 and 6 sum to 20.](figures/example-1.svg)

### Example 2

```text
Input: root = [4,3,null,1,2]
Output: 2
Explanation: Maximum sum in a valid Binary Search Tree is obtained in a single root node with key equal to 2.
```

![The tree 4 - 3 with children 1 and 2; node 2 is highlighted as the best BST with sum 2, since 3's right child 2 breaks the ordering.](figures/example-2.svg)

### Example 3

```text
Input: root = [-4,-2,-5]
Output: 0
Explanation: All values are negative. Return an empty BST.
```

### Constraints

- The number of nodes in the tree is in the range `[1, 4 * 10^4]`.
- `-4 * 10^4 <= Node.val <= 4 * 10^4`

## Hints

### Hint 1

Use a post-order DFS that returns four values per subtree: (is_bst, min_value, max_value, key_sum).

### Hint 2

At each node, check the BST condition against the left subtree's maximum and the right subtree's minimum, then combine sums.

### Hint 3

The answer is the maximum key sum over all valid BST subtrees, and it can be 0 when every BST subtree has a negative sum.
