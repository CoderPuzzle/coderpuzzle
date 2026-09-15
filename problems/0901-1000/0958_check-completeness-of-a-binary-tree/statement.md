# Check Completeness of a Binary Tree

## Description

Given the `root` of a binary tree, determine if it is a complete binary
tree.

In a complete binary tree, every level, except possibly the last, is
completely filled, and all nodes in the last level are as far left as
possible. It can have between `1` and `2^h` nodes inclusive at the last
level `h`.

### Example 1

![diagram](figures/958-1.svg)

```text
Input: root = [1,2,3,4,5,6]
Output: true
Explanation: Every level before the last is completely filled (levels with
node values {1} and {2, 3}), and all nodes in the last level ({4, 5, 6})
are as far left as possible.
```

### Example 2

![diagram](figures/958-2.svg)

```text
Input: root = [1,2,3,4,5,null,7]
Output: false
Explanation: The node with value 7 is not as far left as possible.
```

### Constraints

- The number of nodes in the tree is in the range `[1, 100]`.
- `1 <= Node.val <= 1000`
