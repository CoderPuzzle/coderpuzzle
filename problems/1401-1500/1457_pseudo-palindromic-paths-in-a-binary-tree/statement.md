# Pseudo-Palindromic Paths in a Binary Tree

## Description

Given a binary tree where node values are digits from 1 to 9. A path in
the binary tree is said to be pseudo-palindromic if at least one
permutation of the node values in the path is a palindrome.

Return the number of pseudo-palindromic paths going from the root node to
leaf nodes.

### Example 1

![diagram](figures/1457-1.svg)

```text
Input: root = [2,3,1,3,1,null,1]
Output: 2
Explanation: The figure above represents the given binary tree. There
are three paths going from the root node to leaf nodes: the red path
[2,3,3], the green path [2,1,1], and the path [2,3,1]. Among these paths
only red path and green path are pseudo-palindromic paths since the red
path [2,3,3] can be rearranged in [3,2,3] (palindrome) and the green
path [2,1,1] can be rearranged in [1,2,1] (palindrome).
```

### Example 2

![diagram](figures/1457-2.svg)

```text
Input: root = [2,1,1,1,3,null,null,null,null,null,1]
Output: 1
Explanation: The figure above represents the given binary tree. There
are three paths going from the root node to leaf nodes: the green path
[2,1,1], the path [2,1,3,1], and the path [2,1]. Among these paths only
the green path is pseudo-palindromic since [2,1,1] can be rearranged in
[1,2,1] (palindrome).
```

### Example 3

```text
Input: root = [9]
Output: 1
```

### Constraints

- The number of nodes in the tree is in the range `[1, 10⁵]`.
- `1 <= Node.val <= 9`

## Hints

### Hint 1

Note that the node values of a path form a palindrome if at most one
digit has an odd frequency (parity).

### Hint 2

Use a Depth First Search (DFS) keeping the frequency (parity) of the
digits. Once you are in a leaf node check if at most one digit has an odd
frequency (parity).
