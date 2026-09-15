# House Robber III

## Description

The thief has found himself a new place for his thievery. There is only one
entrance to this area, called `root`.

Besides the `root`, each house in this place has one and only one parent house.
After a tour around the area, the smart thief realized that all houses in this
place form a binary tree. It will automatically contact the police if two
directly-linked houses were broken into on the same night.

Given the `root` of the binary tree, return the maximum amount of money the
thief can rob without alerting the police.

### Example 1

```text
Input: root = [3,2,3,null,3,null,1]
Output: 7
Explanation: Maximum amount of money the thief can rob = 3 + 3 + 1 = 7.
```

![The binary tree with the robbed houses highlighted: 3 + 3 + 1 = 7](figures/example-1.svg)

### Example 2

```text
Input: root = [3,4,5,1,3,null,1]
Output: 9
Explanation: Maximum amount of money the thief can rob = 4 + 5 = 9.
```

![The binary tree with the two robbed middle houses highlighted: 4 + 5 = 9](figures/example-2.svg)

### Constraints

- The number of nodes in the tree is in the range `[1, 10⁴]`.
- `0 <= Node.val <= 10⁴`

## Hints

### Hint 1

Whether a house can be robbed depends only on its direct parent and its direct
children — so the best plan for a subtree depends on the subtrees below it,
which suggests a bottom-up traversal.

### Hint 2

For each subtree, keep a pair of numbers: the best loot if its root house is
robbed, and the best loot if it is skipped. Robbing the root forbids robbing
its children but leaves the grandchildren free.

### Hint 3

Compute the pair for each node from the pairs of its two children in one
post-order traversal — the final answer is the larger of the two values at the
root, giving O(n) time overall.
