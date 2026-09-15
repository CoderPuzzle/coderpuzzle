# Swapping Nodes in a Linked List

## Description

You are given the `head` of a linked list, and an integer `k`.

Return the head of the linked list after swapping the values of the `k`th node
from the beginning and the `k`th node from the end (the list is 1-indexed).

### Example 1

![diagram](figures/1721-1.svg)

```text
Input: head = [1,2,3,4,5], k = 2
Output: [1,4,3,2,5]
Explanation:
The 2nd node from the beginning carries 2 and the 2nd node from the end
carries 4; after swapping their values the list reads [1,4,3,2,5].
```

### Example 2

```text
Input: head = [7,9,6,6,7,8,3,0,9,5], k = 5
Output: [7,9,6,6,8,7,3,0,9,5]
Explanation:
The 5th node from the beginning carries 7 and the 5th node from the end
carries 8; after swapping their values the list reads
[7,9,6,6,8,7,3,0,9,5].
```

### Constraints

- The number of nodes in the list is `n`.
- `1 <= k <= n <= 10⁵`
- `0 <= Node.val <= 100`

## Hints

### Hint 1

We can traverse the linked list and store the elements in an array.

### Hint 2

Upon conversion to an array, we can swap the required elements by indexing the
array.

### Hint 3

We can rebuild the linked list using the order of the elements in the array.
