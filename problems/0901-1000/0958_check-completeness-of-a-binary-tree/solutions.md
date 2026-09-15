# Solutions — Check Completeness of a Binary Tree

Completeness is a statement about positions, not values: a tree is
complete exactly when its nodes occupy the positions a perfect tree
fills first — the heap numbering, with the root at slot 1 and the
children of slot `i` at `2i` and `2i+1`, holds every node with no hole
before the last occupied slot. The single solution below reads the tree
level by level and watches for the first hole.

## Level order with a gap flag

The walk keeps a queue seeded with the root and drains it front-first,
which surfaces nodes in exactly slot order: each popped node's children
join the back, left before right, and children of earlier slots are
smaller than children of later ones. Absent children ride the queue as
`null` placeholders — a missing child is information, and dropping it
would let a right-shifted node hide behind an absent parent.

The flag does the judging. The first `null` to surface marks the first
unoccupied slot, and from there on the tree can only still be complete
if nothing but `null`s remain, because any real node that follows sits
in a slot beyond the hole while the nodes of a complete tree are
supposed to form a prefix. So the walk returns `false` the moment a
node pops after the gap, and `true` when the queue drains without that
ever happening. A chain of three or more nodes fails this test like any
other hole: its third node sits at slot 4 while slot 3 stays empty,
leaving a level above the last unfilled.

Every node enters the queue once, plus at most two placeholders per
node, and the walk is iterative throughout — a chain of any length
never touches the call stack.

**Complexity:** `O(n)` time, `O(n)` space.
