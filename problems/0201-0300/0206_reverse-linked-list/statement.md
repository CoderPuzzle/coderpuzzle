# Reverse Linked List

## Description

Given the `head` of a singly linked list, reverse the list, and return the
reversed list.

### Example 1

```text
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
```

![The list 1 -> 2 -> 3 -> 4 -> 5 and its reversal.](figures/example-1.svg)

### Example 2

```text
Input: head = [1,2]
Output: [2,1]
```

![The list 1 -> 2 and its reversal.](figures/example-2.svg)

### Example 3

```text
Input: head = []
Output: []
```

### Constraints

- The number of nodes in the list is in the range `[0, 5000]`.
- `-5000 <= Node.val <= 5000`

### Follow-up

A linked list can be reversed either iteratively or recursively. Could you
implement both?

## Hints

### Hint 1

Walk the list once, reversing one pointer at a time: keep track of the previous node while moving forward.

### Hint 2

Save the next node before overwriting the current node's next pointer, or you lose the rest of the list.

### Hint 3

The recursive alternative reverses the tail first, then points the node after head back at head.
