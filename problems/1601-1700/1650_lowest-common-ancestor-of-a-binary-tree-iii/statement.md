# Lowest Common Ancestor of a Binary Tree III

## Description

Given the `root` of a binary tree and two values `p` and `q` that label
two distinct nodes in the tree, return the value of their lowest common
ancestor (LCA).

Per the usual definition, the LCA of two nodes `p` and `q` is the lowest
node in the tree that has both `p` and `q` as descendants (a node counts
as a descendant of itself). All node values in the tree are unique, so a
value identifies a node unambiguously.

On LeetCode, this variant hands the solver two node references directly,
each carrying its own `parent` pointer back up the tree — and gives no
`root` reference at all; the intended technique walks `p` up to the root
via `.parent`, records every value on that path, then walks `q` up the
same way until it lands on a value already seen from `p`. This judge's
wire format has no way to hand a solver "a node with no root context" —
trees cross the wire top-down, as a level-order array — so the tree
arrives the usual way here: as `root` plus the two target values `p` and
`q`. The intended approach still carries over almost unchanged: recover
each node's parent with a single pass over the tree from `root`, then
walk `p` and `q` up toward the root exactly as the original does with
`.parent`.

### Example 1

![diagram](figures/1650-1.svg)

```text
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of the nodes valued 5 and 1 is the node valued 3.
```

### Example 2

![diagram](figures/1650-2.svg)

```text
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of the nodes valued 5 and 4 is the node valued 5,
since a node counts as a descendant of itself.
```

### Example 3

```text
Input: root = [1,2], p = 1, q = 2
Output: 1
```

### Constraints

- The number of nodes in the tree is in the range `[2, 10⁵]`.
- `-10⁹ <= Node.val <= 10⁹`
- All `Node.val` are unique.
- `p != q`
- `p` and `q` both label nodes in the tree.

## Hints

### Hint 1

Store the path from the node valued `p` up to the root.

### Hint 2

Walk the path from the node valued `q` up to the root; the first value
that also appears on `p`'s path is the LCA.
