# Convert Sorted List to Binary Search Tree

## Description

Given the `head` of a singly linked list where elements are sorted in
ascending order, convert it to a **height-balanced** binary search tree.

For a deterministic answer, build the tree recursively: the root of each
subtree is the middle node of the current sorted segment, and when the segment
has an even number of nodes, pick the second of the two middle nodes. The
nodes before the middle form the left subtree and the nodes after it form the
right subtree.

### Example 1

```text
Input: head = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: [0,-3,9,-10,null,5] represents the given height-balanced BST.
```

![The sorted list and the height-balanced BST built from it.](figures/example-1.svg)

### Example 2

```text
Input: head = []
Output: []
```

### Constraints

- The number of nodes in `head` is in the range `[0, 2 * 10^4]`.
- `-10^5 <= Node.val <= 10^5`

## Hints

### Hint 1

Find the middle of the current segment with two pointers (slow moves one step, fast moves two).

### Hint 2

The middle node becomes the subtree root; for an even-length segment use the second of the two middle nodes.

### Hint 3

Cut the list at the middle so the two halves can be converted independently into the left and right subtrees.
