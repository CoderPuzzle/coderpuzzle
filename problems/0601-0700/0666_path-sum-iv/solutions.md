# Solutions — Path Sum IV

## One map, every leaf walked upward

Every code already carries its node's coordinates: the hundreds digit is
the depth `d`, the tens digit the position `p` within the level, and the
units digit the value. One pass over `nums`, keying a map by those first
two digits — a `(d, p)` pair in Python, the integer `d * 10 + p`
elsewhere — stores every value where the tree puts it. The tree is never
built as linked nodes; the map is the tree.

A node is a leaf exactly when neither child exists one level down, and
children sit at fixed coordinates: `(d, p)` owns `(d + 1, 2p - 1)` and
`(d + 1, 2p)`. Two membership tests classify each code, so the second pass
over `nums` simply skips every node that has a child.

What is left are the leaves, and each leaf's path is its ancestor chain —
computable from coordinates alone, because the parent of `(d, p)` is
`(d - 1, (p + 1) / 2)`: positions halve as depths drop. Walking a leaf up
to the root accumulates its whole path, and summing those walks over all
leaves is the answer. Depth never exceeds 4, so each walk costs at most
four lookups.

![On nums = [113, 215, 221], the decoded tree holds 3 at (1, 1), 5 at (2, 1), and 1 at (2, 2), and both leaves walk up the halving positions to (1, 1), summing (3 + 5) + (3 + 1) = 12.](figures/solution-leaf-walks-upward.svg)

**Complexity:** `O(n * depth)` time, `O(n)` space.
