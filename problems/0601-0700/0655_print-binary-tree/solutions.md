# Solutions — Print Binary Tree

## Measure the height, then place on an explicit stack

The layout is fully determined before any cell is written: the grid has
`height + 1` rows and `2^(height+1) - 1` columns, the root sits at the exact
middle of the top row, and a node's children step `2^(height-r-1)` columns
sideways on the next row. So the algorithm is two passes. The first measures
the tree's height — in edges, the unit the formulas are stated in: a single
node measures 0, its child 1, and so on — walking the nodes on an explicit
stack, because the placement formulas consume that number and guessing it
wrong would shift every cell in the grid.

The second pass fills a grid born as every cell `""`. A placement stack
starts with the root at row 0, column `(n-1)/2`; popping a node writes
`str(val)` at its spot and pushes each child at the parent's column shifted
by the row's offset. An internal node always sits above the last row, so the
exponent `height - r - 1` never goes negative, and untouched cells simply
keep their `""` — the empties are the layout: a 10-node left chain prints as
a 10 x 1023 matrix, as wide as the deepest path alone, not as the node
count.

Both passes are `O(n)` over the tree's nodes; everything else is the grid
itself, which the answer's shape — not the traversal — fixes.

**Complexity:** `O(H * 2^H)` time and space — the `(H + 1) x (2^(H+1) - 1)`
cells are each written once and dominate the `O(n)` node traversal.
