# Solutions — Minimum Edge Toggles on a Tree

## Rooted parity propagation

Only parities matter: a node's final color depends on the parity of chosen edges
incident to it, so node `x` needs an odd count exactly when
`start[x] != target[x]`. On a tree this system has at most one solution — a
leaf's parity can only be corrected by its single incident edge, and removing
that forced choice recurses on the smaller tree — so the minimum-length
requirement and the increasing-order requirement take care of themselves: the
one valid edge set is the answer, listed ascending. (Equivalently: the tree's
incidence matrix over GF(2) has a trivial kernel.) Each toggle flips two nodes,
so the difference count's parity is invariant; an odd count can never be fixed,
which is exactly when `[-1]` is returned.

The sweep roots the tree at node 0 with a breadth-first discovery that records
each node's parent and the edge leading to it — an explicit queue, because the
constraints allow a 10⁵-node path deep enough to overflow every default call
stack. Walking the discovery order in reverse guarantees a node is handled only
after everything below it: if its accumulated parity (own need XOR the
contributions of already-decided child edges) is still 1, the parent edge is
the only remaining toggle touching it, so marking that edge is forced and the
unmatched parity moves one level up. Whatever parity survives at the root
cannot be fixed anywhere and signals impossibility.

Marked edges land in a `take` flag per edge index, and a final ascending scan
collects them, so the output is sorted without a sort. All values stay below
10⁵ — 32-bit integers throughout, and JavaScript numbers are exact far below
2⁵³.

**Complexity:** `O(n)` time, `O(n)` space.
