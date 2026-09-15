# Solutions — Lowest Common Ancestor of a Binary Tree III

## Parent map and a stored path

The original problem hands each target node a live `parent` pointer and
no root at all, so the natural technique is to store the path from one
target up to the root, then walk the other target upward until it lands
on an already-seen value. Here the tree arrives as `root` plus two
values instead, so the first job is to reconstruct what `parent` would
have given directly: one iterative pre-order pass over the tree (a
stack, not recursion, since a skewed tree can nest as deep as the node
count) builds a value-to-parent-value map. Node values are unique, so a
value is a safe, hashable stand-in for a node reference everywhere that
follows.

With the map in hand, the rest is exactly the original's two-pass idea.
Walking `p` up to the root and recording every value visited gives its
full ancestor path. Walking `q` up the same way, checking each value
against that stored path, finds the first point where the two climbs
meet — the lowest common ancestor. Because `p != q` and both are
guaranteed to label real nodes, this walk always terminates: if one
target is already an ancestor of the other, that is caught on `q`'s very
first check, since a node counts as a descendant of itself.

The parent map takes one linear pass to build, and each of the two path
walks costs at most the tree's height, so the whole approach stays
linear in the number of nodes despite the extra reconstruction step the
adaptation requires.

**Complexity:** `O(n)` time, `O(n)` space for the parent map.
