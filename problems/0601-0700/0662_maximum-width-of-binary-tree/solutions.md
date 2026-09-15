# Solutions — Maximum Width of Binary Tree

Both traversals lean on the same numbering: label every node the way a
complete binary tree would be numbered — the root at 0, the children of
`i` at `2i` and `2i + 1` — and a level's span is exactly its last index
minus its first plus one, the null slots in between counted by the
arithmetic, never materialized. The breadth-first pass earns that
arithmetic from a queue that drains one level per round and hands each
level over in index order. The depth-first walk carries the same labels
down an explicit stack, re-bases them before every doubling so they stay
representable, and keeps just two running extremes per depth.

## Breadth-first search, re-based heap indices

Number the nodes the way a complete binary tree would be numbered: the root
gets index 0, and the children of index `i` get `2i` and `2i + 1`. Under that
numbering a level's width is exactly its last index minus its first index plus
one — the null nodes between the end-nodes are counted by the arithmetic,
never materialized — and a queue that drains one level per round hands over
each level in index order, so the two ends of the queue are the end-nodes the
definition speaks of. A one-node level has width 1, a chain keeps every level
a one-node level, and the answer is the maximum over the rounds.

The trap is that heap indices double every level, so on a sparse-but-deep tree
they grow exponentially: a one-sided chain of 3000 nodes — well inside the
constraints — ends at raw index `2^2999`, far past the 64 bits every integer
in the judge's languages has, and the 32-bit guarantee covers only the answer,
not the indices along the way. The fix is to re-base each level before
doubling: subtract the level's first index from every node's index, so a
stored index never exceeds twice its level's width. A width is a difference
between two indices of one level, and a shift by the level's own constant
leaves every such difference unchanged — the measured widths, and only those,
survive intact. Even re-based, a child index can reach twice the level's
width — one bit past the 32-bit answer itself — so the indices stay 64-bit.

The traversal iterates in every language, which the breadth-first shape
supplies for free: there is no recursion to cap, and a 3000-node chain is just
3000 ordinary queue rounds. The queue never holds more than one level, so a
dense tree costs its widest level, and a sparse one — where the width lives in
the gaps, not the nodes — costs almost nothing.

**Complexity:** `O(n)` time, `O(width)` space.

## Depth-first search, re-based positions

Walk the tree root-first, left subtree before right, and carry each node's
complete-tree index down the walk. Preorder visits every depth in index
order — everything in a left subtree comes before everything in the right
one — so the first node the walk reaches at a depth is that depth's
leftmost node, and every later arrival can only stretch the right end. A
map holding two running extremes per depth, `leftmost` and `rightmost`,
therefore absorbs each level entirely: no queue, no per-level vectors, and
the answer is the largest `rightmost - leftmost + 1` over the map.

The breadth-first pass re-bases each level before doubling its indices,
and the walk needs exactly the same discipline: before an index doubles on
the way down, subtract the depth's stored leftmost, so the children's
positions never exceed twice the level's span. A span is a difference
between two indices of one depth, and the shift leaves every such
difference unchanged — but here the shift is also what keeps the walk
itself representable: a one-sided chain of 3000 nodes — well inside the
constraints — ends at raw index `2^2999`, far past the 64 bits every
integer in the judge's languages has, while the re-based positions never
leave twice the level's span. Even re-based, a child position can reach
twice the span — one bit past the 32-bit answer itself — so the positions
stay 64-bit.

The walk runs on an explicit stack in every language, so there is no
recursion to cap and a 3000-node chain is just 3000 ordinary pushes. The
stack only ever holds the deferred right subtrees of the current path — at
most one per ancestor — and the extremes map holds one entry per depth, so
the memory is the tree's height, not its widest level.

**Complexity:** `O(n)` time, `O(height)` space.
