# Solutions — Logical OR of Two Binary Grids Represented as Quad-Trees

## Recursive intersect with leaf shortcuts and sibling merge

OR the two trees structurally, never materializing a grid. Two shortcuts
come from OR's algebra: a leaf holding 1 ORs with anything to a leaf
holding 1, and a leaf holding 0 vanishes into its operand — so if either
node is a leaf, the answer is immediate without visiting the other tree's
subtree. Otherwise both nodes split: recurse quadrant by quadrant into a
fresh internal node.

One repair closes the algorithm: if the four merged children all turn out
to be leaves sharing one value, the parent must collapse back to that leaf
— the canonical quad tree never keeps an internal node over a uniform
region, and a correct answer has to preserve that invariant. Depth is
bounded by the constraint's `n <= 2^9`, ten levels at most.

![On Example 1's two quad-trees, the four quadrant calls return by the leaf shortcuts — 1 or 1 directly, tree1's leaf 1 swallowing tree2's split top-right, tree1's leaf 0 vanishing into tree2's leaf 1, and 0 or 0 = 0 — and the merged children 1, 1, 1, 0 are not uniform, so the result root stays internal.](figures/solution-leaf-shortcuts-merge.svg)

**Complexity:** `O(min(n1, n2))` node-pair visits for trees of `n1`, `n2`
nodes — the leaf shortcuts stop the walk at the sparser tree's structure —
with `O(log n)` recursion depth.
