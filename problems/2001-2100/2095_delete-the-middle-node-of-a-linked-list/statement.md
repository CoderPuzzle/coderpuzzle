# Delete the Middle Node of a Linked List

## Description

You are given the head of a linked list. Delete the middle node, and return the head of the modified linked list.

The middle node of a linked list of size n is the ⌊n / 2⌋th node from the start using 0-based indexing, where ⌊x⌋ denotes the largest integer less than or equal to x.

For n = 1, 2, 3, 4, and 5, the middle nodes are 0, 1, 1, 2, and 2, respectively.

### Example 1

![diagram](figures/2095-1.svg)

```text
Input: head = [1,3,4,7,1,2,6]
Output: [1,3,4,1,2,6]
Explanation:
Since n = 7, node 3 with value 7 is the middle node.
We return the new list after removing this node.
```

### Example 2

![diagram](figures/2095-2.svg)

```text
Input: head = [1,2,3,4]
Output: [1,2,4]
Explanation:
For n = 4, node 2 with value 3 is the middle node.
```

### Example 3

![diagram](figures/2095-3.svg)

```text
Input: head = [2,1]
Output: [2]
Explanation:
For n = 2, node 1 with value 1 is the middle node.
Node 0 with value 2 is the only node remaining after removing node 1.
```

### Constraints

- The number of nodes in the list is in the range `[1, 10⁵]`.
- `1 <= Node.val <= 10⁵`

## Hints

### Hint 1

If a point with a speed s moves n units in a given time, a point with speed 2 * s will move 2 * n units at the same time. Can you use this to find the middle node of a linked list?

### Hint 2

If you are given the middle node, the node before it, and the node after it, how can you modify the linked list?
