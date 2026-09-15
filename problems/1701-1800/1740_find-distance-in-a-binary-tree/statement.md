# Find Distance in a Binary Tree

## Description

Given the `root` of a binary tree and two integers `p` and `q`, return the
distance between the node of value `p` and the node of value `q` in the tree.

The distance between two nodes is the number of edges on the path from one
to the other.

### Example 1

![diagram](figures/1740-1.svg)

```text
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 0
Output: 3
Explanation: There are 3 edges between 5 and 0: 5-3-1-0.
```

### Example 2

![diagram](figures/1740-2.svg)

```text
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 7
Output: 2
Explanation: There are 2 edges between 5 and 7: 5-2-7.
```

### Example 3

![diagram](figures/1740-3.svg)

```text
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 5
Output: 0
Explanation: The distance between a node and itself is 0.
```

### Constraints

- The number of nodes in the tree is in the range `[1, 10⁴]`.
- `0 <= Node.val <= 10⁹`
- All `Node.val` are unique.
- `p` and `q` are values in the tree.

## Hints

### Hint 1

Find the lowest common ancestor of the nodes valued `p` and `q`.

### Hint 2

The answer is the sum of the distance from `p` to the LCA and the distance
from the LCA to `q`.
