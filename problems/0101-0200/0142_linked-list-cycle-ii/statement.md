# Linked List Cycle II

## Description

Given `head`, the head of a linked list, return the node where the cycle
begins. If there is no cycle, return `null`.

There is a cycle in a linked list if there is some node in the list that can
be reached again by continuously following the `next` pointer. Internally,
`pos` is used to denote the index of the node that tail's `next` pointer is
connected to (0-indexed). It is `-1` if there is no cycle. Note that `pos` is
not passed as a parameter.

Do not modify the linked list.

Because the judge passes plain arrays, the linked list arrives in wire form
as two arguments: `values`, the node values in order, and `pos`, the
0-based index of the node the tail's `next` pointer connects to (`-1` if
there is no cycle). First build the linked list from `values` — linking the
tail back to the node at index `pos` when `pos` is not `-1` — then locate
the node where the cycle begins.

Since the judge compares values rather than node references, return the
**0-based index** of the cycle-entry node — the index within `values` of the
first node of the cycle. Return `-1` if the list is acyclic.

### Example 1

```text
Input: values = [3,2,0,-4], pos = 1
Output: 1
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed). The cycle starts at index 1, so we return 1.
```

### Example 2

```text
Input: values = [1,2], pos = 0
Output: 0
Explanation: The tail connects to the 0th node, so the cycle starts at index 0.
```

### Example 3

```text
Input: values = [1], pos = -1
Output: -1
Explanation: There is no cycle in the linked list, hence -1.
```

### Constraints

- The number of the nodes in the list is in the range `[0, 10⁴]`.
- `-10⁵ <= Node.val <= 10⁵`
- `pos` is `-1` or a valid index in the linked list.

Follow up: Can you solve it using `O(1)` (i.e. constant) memory?

## Hints

### Hint 1

Build the node objects first, link them in order, and finally connect the tail back to node index `pos` when `pos` is not `-1`. The answer is an index into `values`, so once you know the entry node, count how far it sits from the head.

### Hint 2

Floyd's tortoise and hare: advance a slow pointer one step and a fast pointer two steps. If the fast pointer reaches `null`, there is no cycle. Otherwise the two are guaranteed to meet inside the cycle.

### Hint 3

Once slow and fast meet, reset one pointer to the head and advance both one step at a time; they meet again exactly at the cycle-entry node. To output an index, count the steps the head pointer takes before that meeting.
