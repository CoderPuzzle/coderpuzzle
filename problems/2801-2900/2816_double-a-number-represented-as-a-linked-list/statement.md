# Double a Number Represented as a Linked List

## Description

You are given the head of a non-empty linked list representing a
non-negative integer without leading zeroes.

Return the head of the linked list after doubling it.

### Example 1

![diagram](figures/2816-1.svg)

```text
Input: head = [1,8,9]
Output: [3,7,8]
Explanation: The figure above corresponds to the given linked list which represents the number 189. Hence, the returned linked list represents the number 189 * 2 = 378.
```

### Example 2

![diagram](figures/2816-2.svg)

```text
Input: head = [9,9,9]
Output: [1,9,9,8]
Explanation: The figure above corresponds to the given linked list which represents the number 999. Hence, the returned linked list reprersents the number 999 * 2 = 1998.
```

### Constraints

- The number of nodes in the list is in the range `[1, 10⁴]`.
- `0 <= Node.val <= 9`
- The input is generated such that the list represents a number that does
  not have leading zeros, except the number `0` itself.

## Hints

### Hint 1

Traverse the linked list from the least significant digit to the most
significant digit and multiply each node's value by 2

### Hint 2

Handle any carry-over digits that may arise during the doubling process.

### Hint 3

If there is a carry-over digit on the most significant digit, create a new
node with that value and point it to the start of the given linked list and
return it.
