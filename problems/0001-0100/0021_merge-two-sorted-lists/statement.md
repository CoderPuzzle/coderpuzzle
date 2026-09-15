# Merge Two Sorted Lists

## Description

You are given the heads of two sorted linked lists `list1` and `list2`.

Merge the two lists into one sorted list. The list should be made by splicing
together the nodes of the first two lists.

Return the head of the merged linked list.

### Example 1

```text
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
```

![The two input lists and the merged list, each node colored by the list it came from.](figures/example-1.svg)

### Example 2

```text
Input: list1 = [], list2 = []
Output: []
```

### Example 3

```text
Input: list1 = [], list2 = [0]
Output: [0]
```

### Constraints

- The number of nodes in both lists is in the range `[0, 50]`.
- `-100 <= Node.val <= 100`
- Both `list1` and `list2` are sorted in non-decreasing order.

## Hints

### Hint 1

Use a dummy head node so attaching the first node is never a special case.

### Hint 2

Repeatedly link the smaller of the two current heads to the merged tail and advance that list.

### Hint 3

When one list runs out, splice the remainder of the other list onto the tail.
