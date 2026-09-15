# Solutions — Binary Tree Paths

## Depth-first search carrying the path

Every path starts at the root, so one depth-first walk sees them all: the code descends carrying the half-built string, and each step appends `->` and the child's value. When the walk reaches a leaf, the string it holds is one complete root-to-leaf path and is committed on the spot. Recursing into the left subtree before the right at every node emits the paths in exactly the order the statement pins — the order the walk meets the leaves — with no post-processing of the collected list.

The one subtlety is the leaf test: a leaf is a node with no children at all, so the terminal check requires both children to be absent. A node with exactly one child is a pass-through, not a terminal — the walk simply recurses only into the child that exists, and the path continues through it. Ending a path at a half-empty node instead would cut `[1,2,3,null,5]` short at `2` and emit `1->2` alongside `1->3`.

Because each value is rendered as part of the string it ends up in, a negative value contributes its own minus sign — a leaf holding `-100` closes its path with `->-100` — so the separator never merges with a number and every emitted path is unambiguous. The constraints guarantee at least one node, so the walk always starts on a real node and never needs a null guard.

**Complexity:** `O(n·h)` time, with `h` the tree's height — each of the `n` nodes appends to a carried string as long as its own depth: `O(n log n)` for a balanced tree, `O(n²)` worst case for a skewed chain (at most 100 nodes) — and `O(h)` space for the call stack, plus the emitted output itself.
