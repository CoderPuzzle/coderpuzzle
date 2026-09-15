# Solutions — Create Binary Tree From Descriptions

## Wire every parent-child edge into a value-keyed node map

Each description is one edge: create (or reuse) the nodes for both values
and attach the child on the requested side, recording every child value in
a set as you go. The tree's root is then simply the single created value
that never appears in that set — everything else was attached to a parent
by construction. One linear pass to build, one pass over the map to find
the root; the level-order serialization the judge expects falls out of the
assembled tree itself.

**Complexity:** `O(n)` time for `n` descriptions, `O(n)` space.
