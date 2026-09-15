# Solutions — Verify Preorder Sequence in Binary Search Tree

Both sweeps enforce the same law: the search-tree property confines every
node to the open interval its ancestors stake out, so a sequence is a legal
preorder exactly when each value lands inside the first interval it reaches.
The monotonic stack rebuilds that ancestry by hand — the falling run is the
open left spine, the first larger value closes it, and the deepest closed
ancestor becomes a floor every later value must clear. The recursive descent
inherits the interval from the ancestors instead, and the call chain itself
is the ancestry the stack had to rebuild.

## Monotonic stack, running lower bound

While the values fall, the walk is descending a left spine; the first larger
value closes it. Every ancestor smaller than that value has just had its left
subtree finished, and the new value must be its right descendant — so the
deepest such ancestor becomes a floor that all later values must clear,
wherever they end up in the tree.

A stack holds the values of the current left spine, which strictly decrease,
and `low` holds the deepest ancestor closed so far. Each incoming value is
first checked against `low`: a smaller value would have to sit in some
ancestor's left subtree, which is already finished, so the answer is `false`
at once. Otherwise the stack is popped while its top is smaller — each pop
moves the value's future position one ancestor to the right and raises `low`
to the popped value — and the newcomer is pushed as the new spine bottom.

A full pass without a violation means every value found a legal place, so the
sequence is the preorder of some binary search tree. The follow-up's constant
space is within reach too: the popped prefix of `preorder` is dead once
popped, so the spine can be written back into the array itself and the
explicit stack dropped, leaving only the index of its top.

**Complexity:** `O(n)` time, `O(n)` space.

## Recursive descent, inherited bounds

A preorder walk names the root, then the whole left subtree, then the whole
right subtree — and the search-tree property hands each subtree an open
interval it must stay inside: `(low, root)` on the left, `(root, high)` on
the right, each inherited from the levels above. So the array can be read
the way the tree would have been built: a cursor rests on the next
unclaimed value, and a call charged with an interval claims that value only
when the interval admits it, then tightens the two child intervals to
`(low, value)` and `(value, high)` around it.

A value landing outside its interval settles the answer. Preorder leaves no
choice about where the next value goes: it is the next node the walk
reaches, and the search-tree property says that node must sit inside the
interval its ancestors stake out — a breach means the sequence assigns a
value to a finished subtree, which no tree does. The check is almost lazy:
the cursor never backs up, a value the current interval rejects waits in
place while the call unwinds, and the first ancestor whose other subtree
still admits it picks the value up there. If no ancestor ever does, the
array ends with unclaimed values, which is exactly what no BST preorder can
produce.

Draining the array is the success condition: every value found the one slot
the ordering rules leave open, so the sequence is the preorder of the tree
the calls implicitly built, at one comparison and one claim per value. The
storage is the call chain itself. Its depth is the height of the implied
tree — the full length on a sorted spine, which outgrows Python's default
recursion limit, lifted for the run in the Python variant.

**Complexity:** `O(n)` time, `O(n)` space — the call chain, `O(h)` frames
for a tree of height `h` and the full `n` on a sorted spine.
