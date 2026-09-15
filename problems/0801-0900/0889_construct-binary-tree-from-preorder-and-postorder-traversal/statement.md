# Construct Binary Tree from Preorder and Postorder Traversal

## Description

Given two integer arrays `preorder` and `postorder`, where `preorder` is the
preorder traversal of a binary tree of distinct values and `postorder` is the
postorder traversal of the same tree, reconstruct and return the binary tree.

The two traversals do not always pin the tree down exactly. Whenever a node
has a single child, the pair looks the same whether that child hangs on the
left or on the right, so one input can describe several trees. Among those
trees this problem expects one particular answer: the one that attaches
every only child as the **left** child.

### Example 1

![diagram](figures/889-1.svg)

```text
Input: preorder = [1,2,4,5,3,6,7], postorder = [4,5,2,6,7,3,1]
Output: [1,2,3,4,5,6,7]
Explanation: every internal node of this tree has two children, so the pair
admits exactly one tree.
```

### Example 2

```text
Input: preorder = [1], postorder = [1]
Output: [1]
```

### Constraints

- `1 <= preorder.length <= 30`
- `1 <= preorder[i] <= preorder.length`
- All the values of `preorder` are unique.
- `postorder.length == preorder.length`
- `1 <= postorder[i] <= postorder.length`
- All the values of `postorder` are unique.
- It is guaranteed that `preorder` and `postorder` are the preorder traversal
  and postorder traversal of the same binary tree.
