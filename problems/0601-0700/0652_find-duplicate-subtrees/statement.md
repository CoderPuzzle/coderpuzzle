# Find Duplicate Subtrees

## Description

Given the `root` of a binary tree, return all **duplicate subtrees**.

For each kind of duplicate subtree, you only need to return the root node of
any one of them.

Two trees are **duplicate** if they have the same structure with the same node
values.

### Example 1

```text
Input: root = [1,2,3,4,null,2,4,null,null,4]
Output: [[2,4],[4]]
```

![The tree [1,2,3,4,null,2,4,null,null,4] with the duplicated subtrees [2,4] and [4] highlighted.](figures/example-1.svg)

### Example 2

```text
Input: root = [2,1,1]
Output: [[1]]
```

![Both leaves of [2,1,1] are the duplicated subtree [1].](figures/example-2.svg)

### Example 3

```text
Input: root = [2,2,2,3,null,3,null]
Output: [[2,3],[3]]
```

![The tree [2,2,2,3,null,3,null] with the duplicated subtrees [2,3] and [3] highlighted.](figures/example-3.svg)

### Constraints

- The number of the nodes in the tree will be in the range `[1, 5000]`.
- `-200 <= Node.val <= 200`

## Hints

### Hint 1

Serialize each subtree into a string that captures both its structure and its values.

### Hint 2

A post-order walk can build each subtree's serialization from the serializations of its left and right children.

### Hint 3

Keep a hash map from serialization to count; the first time a serialization reaches two occurrences, its root is a duplicate subtree.
