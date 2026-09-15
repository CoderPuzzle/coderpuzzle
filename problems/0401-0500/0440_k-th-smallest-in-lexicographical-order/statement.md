# K-th Smallest in Lexicographical Order

## Description

Given two integers `n` and `k`, return the kth lexicographically smallest integer in the range `[1, n]`.

### Example 1

```text
Input: n = 13, k = 2
Output: 10
Explanation: The lexicographical order is [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9], so the second smallest number is 10.
```

### Example 2

```text
Input: n = 1, k = 1
Output: 1
```

### Constraints

- `1 <= k <= n <= 10⁹`

## Hints

### Hint 1

The integers 1 to n form a denary (base-10) tree where each node's children are obtained by appending a digit from 0 to 9.

### Hint 2

A preorder traversal of that tree visits the numbers in lexicographical order.

### Hint 3

To skip whole subtrees, count how many numbers lie under a given prefix without enumerating them.
