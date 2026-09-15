# Linked List in Binary Tree

## Description

Given a binary tree `root` and a linked list with `head` as the first node.

Return true if all the elements in the linked list starting from the `head`
correspond to some downward path connected in the binary tree, otherwise return
false.

In this context, a downward path means a path that starts at some node and goes
downwards.

### Example 1

![diagram](figures/1367-1.svg)

```text
Input: head = [4,2,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: true
Explanation: Nodes in the third row form a subpath in the binary tree: 4 -> 2 -> 8.
```

### Example 2

![diagram](figures/1367-2.svg)

```text
Input: head = [1,4,2,6], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: true
Explanation: The downward path 1 -> 4 -> 2 -> 6 exists in the tree.
```

### Example 3

```text
Input: head = [1,4,2,6,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: false
Explanation: There is no path in the binary tree that contains all the elements
of the linked list from head.
```

### Constraints

- The number of nodes in the tree will be in the range `[1, 2500]`.
- The number of nodes in the list will be in the range `[1, 100]`.
- `1 <= Node.val <= 100` for each node in the linked list and binary tree.

## Hints

### Hint 1

Create recursive function, given a pointer in a Linked List and any node in the
Binary Tree. Check if all the elements in the linked list starting from the
head correspond to some downward path in the binary tree.
