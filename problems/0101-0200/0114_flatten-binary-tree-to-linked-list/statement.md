# Flatten Binary Tree to Linked List

## Description

Given the `root` of a binary tree, flatten the tree into a "linked list":

- The "linked list" should use the same `TreeNode` class where the `right` child pointer points to the next node in the list and the `left` child pointer is always null.
- The "linked list" should be in the same order as a pre-order traversal of the binary tree.

On LeetCode the function returns nothing and the judge inspects the mutated tree; here the judge observes only the return value, so flatten `root` in place and return it — the returned tree is the flattened list.

### Example 1

![diagram](figures/114-1.svg)

```text
Input: root = [1,2,5,3,4,null,6]
Output: [1,null,2,null,3,null,4,null,5,null,6]
```

### Example 2

```text
Input: root = []
Output: []
```

### Example 3

```text
Input: root = [0]
Output: [0]
```

### Constraints

- The number of nodes in the tree is in the range `[0, 2000]`.
- `-100 <= Node.val <= 100`

### Follow-up

Can you flatten the tree in-place (with O(1) extra space)?

## Hints

### Hint 1

If you notice carefully in the flattened tree, each node's right child points to the next node of a pre-order traversal.
