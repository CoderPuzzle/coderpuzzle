# Sort Linked List Already Sorted Using Absolute Values

## Description

Given the head of a singly linked list that is sorted in non-decreasing order using the absolute values of its nodes, return the list sorted in non-decreasing order using the actual values of its nodes.

### Example 1

![diagram](figures/2046-1.svg)

```text
Input: head = [0,2,-5,5,10,-10]
Output: [-10,-5,0,2,5,10]
Explanation:
The list sorted in non-descending order using the absolute values of the nodes is [0,2,-5,5,10,-10].
The list sorted in non-descending order using the actual values is [-10,-5,0,2,5,10].
```

### Example 2

![diagram](figures/2046-2.svg)

```text
Input: head = [0,1,2]
Output: [0,1,2]
Explanation:
The linked list is already sorted in non-decreasing order.
```

### Example 3

```text
Input: head = [1]
Output: [1]
Explanation:
The linked list is already sorted in non-decreasing order.
```

### Constraints

- The number of nodes in the list is the range `[1, 10⁵]`.
- `-5000 <= Node.val <= 5000`
- head is sorted in non-decreasing order using the absolute value of its nodes.

### Follow up

Can you think of a solution with O(n) time complexity?

## Hints

### Hint 1

The nodes with positive values are already in the correct order.

### Hint 2

Nodes with negative values need to be moved to the front.

### Hint 3

Nodes with negative values are in reversed order.
