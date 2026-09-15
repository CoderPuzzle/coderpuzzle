# Solutions — Split a Circular Linked List

## Count, walk to the cut, close both rings

The first half must hold exactly `ceil(n / 2)` nodes read from the given head,
so the split point is a fixed distance from the head — the only wrinkle is
that a ring has no end marker, so the length must be measured first: one lap
counts the nodes and lands on the tail (the node whose next is the head). With
`n` known, a second short walk of `ceil(n / 2) - 1` steps stops at the last
node of the first half; the node after it is the second half's head, and
another lap from there stops at the original tail, which is the second half's
last node.

Cutting is then two pointer writes per ring: the first half's last node points
back to the original head, and the tail — which still pointed at the original
head — points back to the second half's head instead. Both halves come out as
genuine rings sharing no nodes, in their original order, with sizes
`ceil(n / 2)` and `floor(n / 2)`. Nothing is allocated; the solution returns
the original head and the second half's head as the two-element answer.

Every loop is a flat iteration bounded by one lap (or half of one), so the
100 000-node maximum costs at most two laps and no recursion. Node values are
ignored throughout — only the ring's shape matters.

**Complexity:** `O(n)` time — one counting lap plus walks totaling one more
lap — and `O(1)` extra space beyond the two-element answer.
