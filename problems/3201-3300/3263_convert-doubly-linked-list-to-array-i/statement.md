# Convert Doubly Linked List to Array I

## Description

You are given the head of a linked list, whose nodes each carry a value and a
`next` pointer. Return a doubly linked list which contains the elements of the
linked list in order: the same values, one node apiece, every node chained
forward through `next` and — except for the head — pointing back through
`prev` at the node before it. The head's `prev` stays null and the tail's
`next` stays null.

On this wire the answer is read back by walking it forward through `next`,
which must repeat the input's value sequence, and every `prev` back-link is
verified along the way — a chain wired in one direction only does not count.

### Example 1

```text
Input: head = [1,2,3,4,3,2,1]
Output: [1,2,3,4,3,2,1]
Explanation: The list you return reads back as the same seven values, and
every node but the head points back at the node before it.
```

### Example 2

```text
Input: head = [2,2,2,2,2]
Output: [2,2,2,2,2]
Explanation: Repeated values change nothing — nodes are wired per position,
so the walk still visits five distinct nodes.
```

### Example 3

```text
Input: head = [3,2,3,2,3,2]
Output: [3,2,3,2,3,2]
Explanation: Six nodes need five forward links and five back-links.
```

### Constraints

- The number of nodes in the given list is in the range `[1, 50]`.
- `1 <= Node.val <= 50`

### Follow-up

Could you wire the answer in a single pass over the input, holding nothing
beyond the nodes of the list you are building?

## Hints

### Hint 1

Walk the input once, hanging a fresh node off the growing tail for every
value you see; the only state you need besides the answer is the node you
just wired.

### Hint 2

The first append is the awkward one — its `prev` is null while every later
node points back at its predecessor, so branch once on whether the tail
exists yet.
