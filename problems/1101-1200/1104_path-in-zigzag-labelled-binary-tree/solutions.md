# Solutions — Path In Zigzag Labelled Binary Tree

## Hop from the node up to the root, mirroring each row

In a normally-labelled tree the parent of a node is simply half its label,
but the zigzag numbering flips the direction on alternating rows. The trick
is to work with a node's position within its row rather than its label: the
parent of the node at position `p` is the node at position `p // 2` in the
row above, in every row, because the tree's underlying shape is untouched —
only the labels have been shuffled.

So walk up level by level. From the current node's label, recover its
left-to-right position within its row (subtract the row's smallest label for
a left-to-right row, or subtract from the largest for a right-to-left row),
halve that position to find the parent's slot in the row above, and convert
that slot back into a zigzag label using the parent row's direction. The
path is collected in a buffer sized to the tree's height and filled from the
back, so it comes out root-first without a separate reverse.

**Complexity:** `O(log label)` time and `O(log label)` space — the path has
one entry per level of the tree.
