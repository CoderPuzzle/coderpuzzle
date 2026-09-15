# Remove Zero Sum Consecutive Nodes from Linked List

## Description

Given the `head` of a linked list, we repeatedly delete consecutive sequences
of nodes that sum to `0` until there are no such sequences.

After doing so, return the head of the final linked list. You may return any
such answer.

### Example 1

```text
Input: head = [1,2,-3,3,1]
Output: [3,1]
Note: The answer [1,2,1] would also be accepted.
```

### Example 2

```text
Input: head = [1,2,3,-3,4]
Output: [1,2,4]
```

### Example 3

```text
Input: head = [1,2,3,-3,-2]
Output: [1]
```

### Constraints

- The given linked list will contain between `1` and `1000` nodes.
- Each node in the linked list has `-1000 <= Node.val <= 1000`.

## Hints

### Hint 1

Work with prefix sums as you walk the list, starting from a dummy node with sum 0.

### Hint 2

If the current prefix sum was seen before, every node between the earlier occurrence and the current node sums to 0 and can be removed.

### Hint 3

A hash map from prefix sum to node finds that earlier occurrence in O(1); rescan after each removal.
