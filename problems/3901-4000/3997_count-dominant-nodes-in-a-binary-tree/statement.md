# Count Dominant Nodes in a Binary Tree

## Description

You are given the root of a complete binary tree.

A node x is called dominant if its value is equal to the maximum value among all nodes in the subtree rooted at x.

Return the number of dominant nodes in the tree.

### Example 1

![diagram](figures/3997-1.svg)

Input: root = [5,3,8,2,4,7,1]

Output: 5

Explanation:

    The leaf nodes with values 2, 4, 7, and 1 are dominant.
    The node with value 8 is dominant because its value is the maximum value in its subtree [8, 7, 1].
    Thus, the answer is 5.

### Example 2

![diagram](figures/3997-2.svg)

Input: root = [1,2,3,1,2]

Output: 4

Explanation:

    The leaf nodes with values 1, 2, and 3 are dominant.
    The node with value 2 whose subtree is [2, 1, 2] is dominant because its value is the maximum value in its subtree.
    Thus, the answer is 4.

### Constraints

    The number of nodes in the tree is in the range [1, 10⁵].
    1 <= Node.val <= 10⁹
    The tree is guaranteed to be a complete binary tree.

## Hints

### Hint 1

Process the tree using postorder traversal, so both child subtrees are handled before their parent.

### Hint 2

For each node, compute the maximum value in its subtree from its own value and the maximum values returned by its children.

### Hint 3

A node is dominant if its value is equal to this subtree maximum.
