# Solutions — Boundary of Binary Tree

## Three iterative sweeps

The answer is four pieces glued together, and each piece has its own sweep.
The left boundary starts at the root's left child and keeps descending — left
child when present, otherwise the right child — recording nodes on the way
down. The leaves are every childless node in left-to-right order, collected by
a pre-order walk driven by an explicit stack: pop a node, and if it is not a
leaf push its right child then its left, so pops always run left to right. The
right boundary is the mirror walk from the root's right child, right child
preferred, recorded on the way down to be emitted in reverse at the end.

What keeps a node from printing in two pieces is where each sweep stops. The
left walk tests for a leaf before recording, so it halts at — but never takes —
the leftmost leaf, which then prints only among the leaves; the right walk does
the same at its own last leaf. The leaves sweep is seeded with the root's
children rather than the root, so the root — never a leaf by the problem's
definition — prints only as the head of the answer, and a one-node tree yields
just the root. Beyond these endpoints no overlap is possible: the boundary
walks record only non-leaves, the leaves sweep records only leaves, and the
walks live in disjoint subtrees whenever both children of the root exist.

Assembly is then a plain concatenation: the root, the left boundary downward,
the leaves left to right, the right boundary reversed. Every sweep is a loop
over an explicit stack or a single descending cursor, so nothing recurses and a
10^4-node chain — the worst depth — costs the same stack as a perfect tree.

**Complexity:** `O(n)` time, `O(h)` space beyond the output, where `h` is the
height of the tree.
