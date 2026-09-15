# Solutions — Depth of BST Given Insertion Order

Simulating the insertions is easy; doing it in better than `O(n²)` on a
degenerate order is the actual problem — a sorted insertion order builds a
chain, and every node of it walks that chain again. The way out is to notice
that the insertion order alone fixes the tree completely, so the depth can
be read off a structure that never touches a child pointer.

## Monotonic-stack parents on the inverted permutation

Invert `order` into `pos[v]` — the insertion time of each value. The BST
grown by these insertions is exactly the min-Cartesian tree of the array
`pos[1..n]`: the first-inserted value is the root, its left and right
subtrees span the values below and above it, and the split recurses. That
tree's parents fall out of one monotonic stack sweep over values
`1..n`, keeping the stack's positions increasing bottom to top: popping
while `pos[top] > pos[v]` removes exactly the values `v` lands between —
its predecessor and successor among the values already swept — and the last
one popped re-hangs as `v`'s left child, because it is the later-inserted
of those two neighbours (consecutive values in a BST are always
ancestor and descendant, so the later one hangs deeper). Every other popped
value keeps the stack-below parent it received when pushed.

Depths then need no tree at all. A parent is always inserted before its
children, so walking `order` once and setting `depth[v] = depth[parent[v]]

- 1`(root at 1) sees every parent's depth before it is read, and the
answer is the maximum. Both sweeps are flat loops — no recursion — so the`10⁵`-node chains the constraints allow cost `O(n)`time and`O(n)` space
  with no stack-limit risk in any language.

**Complexity:** `O(n)` time, `O(n)` space.
