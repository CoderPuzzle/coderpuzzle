# Lowest Common Ancestor of a Binary Tree II

## Description

Given the `root` of a binary tree and two values `p` and `q`, return the
value of the lowest common ancestor (LCA) of the nodes with those
values. Unlike the classic LCA problem, `p` and `q` are **not**
guaranteed to exist in the tree — if either one does not label any node,
return `null`.

Per the usual definition, the LCA of two nodes `p` and `q` is the lowest
node in the tree that has both `p` and `q` as descendants (a node counts
as a descendant of itself).

On LeetCode, `p` and `q` are passed and returned as node objects; here
the tree crosses the wire as a level-order array, so nodes cannot be
passed as arguments directly. The judge instead identifies `p` and `q`
by their values — all node values in the tree are unique — and the
returned node crosses the wire as its own subtree in level-order form
(so the output includes everything hanging below the LCA, not just its
value); an empty array `[]` means there is no LCA, i.e. `null`.

### Example 1

![diagram](figures/1644-1.svg)

```text
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: [3,5,1,6,2,0,8,null,null,7,4]
Explanation: The LCA of the nodes valued 5 and 1 is the node valued 3 —
here, the root — so the output is the whole tree, serialized as its own
subtree.
```

### Example 2

![diagram](figures/1644-2.svg)

```text
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: [5,6,2,null,null,7,4]
Explanation: The LCA of the nodes valued 5 and 4 is the node valued 5,
since a node counts as a descendant of itself. The output is the
subtree rooted there.
```

### Example 3

![diagram](figures/1644-3.svg)

```text
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 10
Output: []
Explanation: No node is valued 10, so the answer is null.
```

### Constraints

- The number of nodes in the tree is in the range `[1, 10⁴]`.
- `-10⁹ <= Node.val <= 10⁹`
- All `Node.val` are unique.
- `p != q`

### Follow up

Can you find the LCA while traversing the tree only once, without a
separate pass to check whether `p` and `q` exist?

## Hints

### Hint 1

Traverse the tree visiting root, left, root, right, root, to build an
Euler path of the node values.

### Hint 2

The LCA of `p` and `q` is the value that occurs at the lowest depth
between an occurrence of `p` and an occurrence of `q` in that Euler
path.
