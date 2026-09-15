# Remove Nodes From Linked List

## Description

You are given the `head` of a linked list.

Remove every node which has a node with a **strictly greater** value anywhere
to the right side of it.

Return the `head` of the modified linked list.

### Example 1

```text
Input: head = [5,2,13,3,8]
Output: [13,8]
Explanation: The nodes that should be removed are 5, 2 and 3.
- Node 13 is to the right of node 5.
- Node 13 is to the right of node 2.
- Node 8 is to the right of node 3.
```

![List [5,2,13,3,8]; nodes 5, 2 and 3 are removed, leaving 13 -> 8.](figures/example-1.svg)

### Example 2

```text
Input: head = [1,1,1,1]
Output: [1,1,1,1]
Explanation: Every node has value 1, so no nodes are removed.
```

### Constraints

- The number of nodes in the list is in the range `[1, 10⁵]`.
- `1 <= Node.val <= 10⁵`

## Hints

### Hint 1

Iterate over the nodes in reversed order.

### Hint 2

While iterating in reversed order, keep track of the maximum value seen so far; a node survives only if its value is at least that maximum.

### Hint 3

Build the result by prepending surviving nodes (or reverse the collected values at the end).
