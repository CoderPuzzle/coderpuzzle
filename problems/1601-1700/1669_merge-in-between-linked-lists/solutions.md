# Solutions — Merge In Between Linked Lists

The result keeps list1's first `a` nodes and its nodes from `b+1` onward,
with all of list2 welded between them — so only two edges anywhere change:
the one into list2's head and the one out of its tail. The single solution
below finds the three landmarks those edges connect with one sweep over
the nodes and rewires exactly those two links, never building or copying a
node.

## Splice in place, two edges

The sweep tracks two cursors from list1's head: `pre` stops on the
`(a-1)`th node — the last node that keeps its place in front of the
removed stretch — while `after` runs alongside it and then continues
`b-a+2` more steps to land on the `(b+1)`th node, the first survivor
behind it. Both positions are pinned before any pointer moves, so no walk
ever depends on a link that has already been rewritten; `a >= 1` and
`b < list1.length - 1` guarantee both nodes exist and are distinct from
each other.

With the landmarks found, the splice is two assignments. `pre.next` is
pointed at list2's head — the old stretch from `a` to `b` simply loses its
only reference — and after a walk down list2 to its last node, that tail's
`next` is pointed at `after`. Nothing before, behind, or inside either list
is otherwise touched, and the answer is list1's original head.

Each node of list1 up to `b+1` and each node of list2 is visited exactly
once, and the walk holds nothing but the two cursors. The result always
exists: it has `a + m + (list1.length - 1 - b)` nodes, at least the two
endpoint nodes list1 always keeps.

**Complexity:** `O(n + m)` time, `O(1)` extra space.
