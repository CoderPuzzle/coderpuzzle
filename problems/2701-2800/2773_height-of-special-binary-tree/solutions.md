# Solutions — Height of Special Binary Tree

Both methods stand on the same fact: the ring rewires only the leaves, so
the one thing a traversal can get wrong is stepping onto a leaf's sideways
pointers — chase them and the walk circles the ring forever, measuring
nothing. And the wiring itself tells you which nodes those are: a leaf's
left child is the previous leaf in the ring, whose right child points
straight back, so a node is a leaf exactly when it has a left child whose
right child is the node again. An internal node can never pass that test —
its left child is a genuine child, and a child's own right child is never
its parent. What the methods differ in is how they meter distance: one
sweeps the tree in waves from the root, counting one wave per level and
never carrying a depth, while the other folds heights upward through a
recursion, every node answering with its own longest downward path.

## Waves From the Root

The height is the number of descents the deepest path makes, and whole
levels can be crossed without tracking any single node's depth. The first
frontier is the root alone; each round builds the next frontier from the
children — both of them, where they exist — of only the frontier nodes the
leaf test clears. A leaf is absorbed where it stands: it belongs to the
level it was reached at, and it passes nothing along, so the ring's
sideways edges are never followed and every node enters a frontier at most
once. The round counter ticks once per non-empty frontier, and when a
round collects nothing, the count of completed rounds is the height.

The bill is the widest frontier. A bottom-heavy tree parks its whole last
level in memory at once — on a complete tree that is half the nodes — even
though most of the tree has already been drained by the time the wide
level arrives.

**Complexity:** `O(n)` time, `O(n)` space.

## Recursion on the Leaf Property

With the leaf test settled, the height returns to the ordinary definition:
a leaf stands at height zero, and any other node stands one above its
taller child. A two-line recursion says exactly that — `height(v)` answers
zero for a node the leaf test clears, and otherwise is `1 +` the taller of
the calls on its children, with an absent child reading as zero so a node
with one child still measures the arm that exists.

The descent needs no visited set, because the recursion never walks a
sideways edge. It starts on the root, an internal node whose children are
genuine tree children; the leaf test runs before any step, so the first
ring-wired node a path reaches stops that path at height zero instead of
stepping around the ring. Every call therefore lands on a distinct node of
the underlying tree, the call tree is the tree itself, and the only memory
beyond the input is the recursion stack — as deep as the tree is tall,
which a degenerate chain pushes to a full `n`.

**Complexity:** `O(n)` time, `O(n)` space.
