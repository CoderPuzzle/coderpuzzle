# Solutions — Encode N-ary Tree to Binary Tree

## First child left, next sibling right

`encode` walks the n-ary tree breadth-first carrying each node beside its
fresh binary shell. For every node the children group is consumed in one
pass: the first child's shell is hung on the current shell's left, and each
later child is hung on the previous child's right — so a children group
becomes exactly one right-going chain under the parent's single left
pointer, and a childless group contributes nothing. The children join the
queue as their shells are linked, and every n-ary node is visited once.

The mapping is invertible by construction: descending a parent's left gives
the head of its children group, and walking right from there recovers the
group in order, which is why this encoding round-trips the tree. It also
preserves node count — one binary shell per n-ary node — and never deepens
the structure by more than a constant per level.

The walk is iterative throughout: a 1000-high chain or a 1000-long sibling
group costs queue slots, not stack frames.

**Complexity:** O(n) time, O(n) space, where n is the number of nodes.
