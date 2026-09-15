# Closest Binary Search Tree Value II

## Description

Given the `root` of a binary search tree, a target value, and an integer `k`,
return the k values in the BST that are closest to the target.

You are guaranteed to have only one unique set of k values in the BST that are
closest to the target.

For a deterministic answer, return the k values ordered by increasing distance
to the target; when two values are equally close, the smaller value comes
first.

### Example 1

![diagram](figures/272-1.svg)

```text
Input: root = [4,2,5,1,3], target = 3.714286, k = 2
Output: [4,3]
```

### Example 2

```text
Input: root = [1], target = 0.000000, k = 1
Output: [1]
```

### Constraints

- The number of nodes in the tree is `n`.
- `1 <= k <= n <= 10⁴`
- `0 <= Node.val <= 10⁹`
- `-10⁹ <= target <= 10⁹`

### Follow-up

Assume that the BST is balanced. Could you solve it in less than `O(n)` runtime
(where `n` = total nodes)?

## Hints

### Hint 1

Consider implement these two helper functions:

- `getPredecessor(N)`, which returns the next smaller node to N.
- `getSuccessor(N)`, which returns the next larger node to N.

### Hint 2

Try to assume that each node has a parent pointer, it makes the problem much
easier.

### Hint 3

Without parent pointer we just need to keep track of the path from the root to
the current node using a stack.

### Hint 4

You would need two stacks to track the path in finding predecessor and
successor node separately.
