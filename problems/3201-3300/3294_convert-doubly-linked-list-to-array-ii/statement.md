# Convert Doubly Linked List to Array II

## Description

A node picked from somewhere inside a doubly linked list is handed to
you. Every node of the list holds an integer value and both direction
pointers — `prev` toward the node before it and `next` toward the node
after it — and the chain is linked consistently in both directions.

Return the array of the whole list's elements, read from the head to
the tail. The input names the list by its sequence of values together
with the value of the handed node; values are unique within a list, so
that node is identified without ambiguity.

### Example 1

```text
Input: head = [1,2,3,4,5], node = 5
Output: [1,2,3,4,5]
Explanation: The handed node is 5, the list's tail. Retracing `prev`
back to the head 1 and then sweeping forward reads out all five
elements in order.
```

### Example 2

```text
Input: head = [4,5,6,7,8], node = 8
Output: [4,5,6,7,8]
Explanation: The tail is handed over again; rewinding to the head 4
leaves the whole list one forward walk away.
```

### Constraints

- The number of nodes in the list is in the range `[1, 500]`.
- `1 <= Node.val <= 1000`
- All values in a list are unique.

## Hints

### Hint 1

The `prev` pointers lead back to the head: from the handed node, keep
stepping to the previous node until none remains, then one forward
sweep over `next` collects the elements in order.
