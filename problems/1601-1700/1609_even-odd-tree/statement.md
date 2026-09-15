# Even Odd Tree

## Description

A binary tree is called Even-Odd if it satisfies the following rules:

The root sits at level index `0`, its children sit at level index `1`,
their children at level index `2`, and so on.

For every even-indexed level, every node on that level must hold an odd
value, and those values must strictly increase reading left to right.

For every odd-indexed level, every node on that level must hold an even
value, and those values must strictly decrease reading left to right.

Given the `root` of a binary tree, return `true` if the tree is
Even-Odd, otherwise return `false`.

### Example 1

![diagram](figures/1609-1.svg)

```text
Input: root = [1,10,4,3,null,7,9,12,8,6,null,null,2]
Output: true
Explanation: The node values on each level are:
Level 0: [1]
Level 1: [10,4]
Level 2: [3,7,9]
Level 3: [12,8,6,2]
Levels 0 and 2 hold odd values in strictly increasing order, and levels
1 and 3 hold even values in strictly decreasing order, so the tree is
Even-Odd.
```

### Example 2

![diagram](figures/1609-2.svg)

```text
Input: root = [5,4,2,3,3,7]
Output: false
Explanation: The node values on each level are:
Level 0: [5]
Level 1: [4,2]
Level 2: [3,3,7]
Level 2's values must be strictly increasing, but 3 is repeated, so the
tree is not Even-Odd.
```

### Example 3

![diagram](figures/1609-3.svg)

```text
Input: root = [5,9,1,3,5,7]
Output: false
Explanation: Node values on level 1 should be even integers, but the
level reads [9,1], both odd, so the tree is not Even-Odd.
```

### Constraints

- The number of nodes in the tree is in the range `[1, 10⁵]`.
- `1 <= Node.val <= 10⁶`

## Hints

### Hint 1

Traverse the tree level by level with breadth-first search, checking
each level's parity and strict ordering as you go.
