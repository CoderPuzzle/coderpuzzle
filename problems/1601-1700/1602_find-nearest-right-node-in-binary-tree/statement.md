# Find Nearest Right Node in Binary Tree

## Description

Given the `root` of a binary tree and the value `u` of a node in it,
return the node immediately to the right of that node on the same
level — reading the level left to right, in level order — or `null` if
`u` is the rightmost node on its level.

On LeetCode both `u` and the answer are node objects; here the tree
crosses the wire as a level-order array, so a node cannot be passed as
an argument. The judge instead identifies `u` by its value — all node
values are unique — and the returned node itself crosses the wire as
its subtree in level-order form; an empty array `[]` means there is no
such node.

### Example 1

![diagram](figures/1602-1.svg)

```text
Input: root = [1,2,3,null,4,5,6], u = 4
Output: [5]
Explanation: Node 4 is on the tree's third level, alongside nodes 5 and
6. Reading that level left to right, the node immediately to the right
of 4 is 5.
```

### Example 2

![diagram](figures/1602-2.svg)

```text
Input: root = [3,null,4,2], u = 2
Output: []
Explanation: Node 2 is the only node on its level, so there is no node
to its right, and the answer is null.
```

### Constraints

- The number of nodes in the tree is in the range `[1, 10⁵]`.
- `1 <= Node.val <= 10⁵`
- All values in the tree are distinct.
- `u` equals the value of some node in the tree rooted at `root`.

## Hints

### Hint 1

Traverse the tree level by level with BFS, always pushing the left
child before the right child.

### Hint 2

When the traversal reaches the node with value `u`, mark it found.

### Hint 3

If another node on the same level is reached after that, it is the
answer.

### Hint 4

If the level ends — or the traversal moves to a new level — without
reaching another node, the answer is `null`.
