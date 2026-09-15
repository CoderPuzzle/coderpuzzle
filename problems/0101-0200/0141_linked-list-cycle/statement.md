# Linked List Cycle

## Description

Given `head`, the head of a linked list, determine if the linked list has a
cycle in it.

There is a cycle in a linked list if there is some node in the list that can
be reached again by continuously following the `next` pointer. Internally,
`pos` is used to denote the index of the node that tail's `next` pointer is
connected to. Note that `pos` is not passed as a parameter.

Return `true` if there is a cycle in the linked list. Otherwise, return
`false`.

Because the judge passes plain arrays, the linked list arrives in wire form
as two arguments: `values`, the node values in order, and `pos`, the
0-based index of the node the tail's `next` pointer connects to (`-1` if
there is no cycle). First build the linked list from `values` — linking the
tail back to the node at index `pos` when `pos` is not `-1` — then run your
cycle detection on that list and return whether it contains a cycle.

### Example 1

```text
Input: values = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
```

![The list 3 -> 2 -> 0 -> -4 whose tail connects back to node 2.](figures/example-1.svg)

### Example 2

```text
Input: values = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
```

![The list 1 -> 2 whose tail connects back to node 1.](figures/example-2.svg)

### Example 3

```text
Input: values = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.
```

![A single node 1 with no cycle.](figures/example-3.svg)

### Constraints

- The number of the nodes in the list is in the range `[0, 10^4]`.
- `-10^5 <= Node.val <= 10^5`
- `pos` is `-1` or a valid index in the linked list.

Follow up: Can you solve it using `O(1)` (i.e. constant) memory?

## Hints

### Hint 1

Build the node objects first, link them in order, and finally connect the tail back to node index pos when pos is not -1.

### Hint 2

Floyd's algorithm: advance a slow pointer one step and a fast pointer two steps; if they ever meet, there is a cycle.

### Hint 3

If the fast pointer reaches the end of the list (null), there is no cycle — an acyclic list always terminates.

### Hint 4

An alternative for the follow-up's O(1) memory constraint is exactly Floyd's tortoise and hare; a hash set of visited nodes works but uses O(n) memory.
