# Merge k Sorted Lists

## Description

You are given an array of `k` linked-lists `lists`, each linked-list is
sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

### Example 1

```text
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted linked list:
1->1->2->3->4->4->5->6
```

### Example 2

```text
Input: lists = []
Output: []
```

### Example 3

```text
Input: lists = [[]]
Output: []
```

### Constraints

- `k == lists.length`
- `0 <= k <= 10^4`
- `0 <= lists[i].length <= 500`
- `-10^4 <= lists[i][j] <= 10^4`
- `lists[i]` is sorted in ascending order.
- The sum of `lists[i].length` will not exceed `10^4`.

## Hints

### Hint 1

Pairwise merging is O(k) passes; a min-heap of the current head of every list gives O(N log k).

### Hint 2

Pop the smallest head, append its value, then push its successor into the heap.

### Hint 3

A sentinel (dummy) head node keeps the merge loop free of special cases; empty and empty-list entries must all collapse to a single empty result.
