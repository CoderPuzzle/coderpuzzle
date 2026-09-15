# Convert Binary Search Tree to Sorted Doubly Linked List

## Description

Convert a Binary Search Tree to a sorted Circular Doubly-Linked List in place.

You can think of the left and right pointers as synonymous to the predecessor and successor pointers in a doubly-linked list. For a circular doubly linked list, the predecessor of the first element is the last element, and the successor of the last element is the first element.

We want to do the transformation in place. After the transformation, the left pointer of the tree node should point to its predecessor, and the right pointer should point to its successor. You should return the pointer to the smallest element of the linked list.

On this wire the tree crosses as a level-order array of values, and the returned ring serializes as its values read from the head — smallest first, up the successor chain and around the ring; an empty tree returns `[]`.

### Example 1

![diagram](figures/426-1.svg)

```text
Input: root = [4,2,5,1,3]
Output: [1,2,3,4,5]
Explanation: The solid line indicates the successor relationship, while the dashed line means the predecessor relationship.
```

![diagram](figures/426-2.svg)

![diagram](figures/426-3.svg)

### Example 2

```text
Input: root = [2,1,3]
Output: [1,2,3]
```

### Constraints

- The number of nodes in the tree is in the range `[0, 2000]`.
- `-1000 <= Node.val <= 1000`
- All the values of the tree are unique.
