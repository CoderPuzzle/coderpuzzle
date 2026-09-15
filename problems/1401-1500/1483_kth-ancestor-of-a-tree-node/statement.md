# Kth Ancestor of a Tree Node

## Description

You are given a tree with `n` nodes numbered from `0` to `n - 1`, described
by a parent array `parent` where `parent[i]` is the parent of node `i`. The
root is node `0`, and `parent[0]` is `-1`.

The **kth ancestor** of a node is the kth node on the path from that node up
to the root: the 1st ancestor is its parent, the 2nd its grandparent, and so
on. The 0th ancestor is the node itself.

Implement the `TreeAncestor` class:

- `TreeAncestor(int n, int[] parent)` Initializes the object with the number
  of nodes in the tree and the parent array.
- `int getKthAncestor(int node, int k)` Returns the kth ancestor of `node`,
  or `-1` if the path to the root is shorter than `k` steps.

### Example 1

```text
Input:
["TreeAncestor", "getKthAncestor", "getKthAncestor", "getKthAncestor"]
[[7, [-1, 0, 0, 1, 1, 2, 2]], [3, 1], [5, 2], [6, 3]]
Output: [null, 1, 0, -1]
Explanation:
TreeAncestor treeAncestor = new TreeAncestor(7, [-1, 0, 0, 1, 1, 2, 2]);
treeAncestor.getKthAncestor(3, 1); // returns 1, the parent of 3
treeAncestor.getKthAncestor(5, 2); // returns 0, the grandparent of 5
treeAncestor.getKthAncestor(6, 3); // returns -1, node 6 is only 2 steps below the root
```

### Example 2

```text
Input:
["TreeAncestor", "getKthAncestor", "getKthAncestor", "getKthAncestor", "getKthAncestor"]
[[5, [-1, 0, 1, 2, 3]], [4, 0], [4, 2], [4, 4], [4, 5]]
Output: [null, 4, 2, 0, -1]
Explanation:
TreeAncestor treeAncestor = new TreeAncestor(5, [-1, 0, 1, 2, 3]);
treeAncestor.getKthAncestor(4, 0); // returns 4, the 0th ancestor is the node itself
treeAncestor.getKthAncestor(4, 2); // returns 2
treeAncestor.getKthAncestor(4, 4); // returns 0, the root
treeAncestor.getKthAncestor(4, 5); // returns -1, one step past the root
```

### Constraints

- `1 <= n <= 5 * 10⁴`
- `parent.length == n`
- `parent[0] == -1`
- `0 <= parent[i] < i` for all `0 < i < n`
- `0 <= node < n`
- `0 <= k <= n`
- At most `5 * 10⁴` calls will be made to `getKthAncestor`.

## Hints

### Hint 1

Answering a query by walking up one parent at a time costs as many steps as
`k`, and a chain-shaped tree makes that the depth of the tree on every
query — far too slow when both the tree and the query count reach `5 * 10⁴`.
Preprocessing in the constructor is where the time has to go.

### Hint 2

You cannot afford to store every ancestor of every node, but you can store a
sparse subset: for each node, remember its 2⁰-th, 2¹-th, 2²-th, … ancestor.
That table has only `n log n` entries, and each row is built from the
previous one — the 2ʲ-th ancestor of `v` is the 2ʲ⁻¹-th ancestor of the
2ʲ⁻¹-th ancestor of `v`.

### Hint 3

Any `k` is a sum of distinct powers of two, so a query is just its binary
expansion: for every set bit `j` of `k`, jump to the stored 2ʲ-th ancestor of
the current node. Once a jump runs past the root the answer is `-1`, so
propagate that sentinel through the table and stop early.
