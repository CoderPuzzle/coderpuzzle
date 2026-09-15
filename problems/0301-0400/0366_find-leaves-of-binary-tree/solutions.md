# Solutions — Find Leaves of Binary Tree

## Post-order height grouping

A node leaves the tree in round k exactly when its subtree's height is k. A
leaf has height 0 and is collected first; a parent whose children stand at
heights a and b holds height `1 + max(a, b)`, because its tallest child leaves
in the last round before it does, and once that child is gone the parent is
itself a leaf. Collecting and removing in rounds is therefore nothing more
than sorting the nodes by height — no node is ever actually deleted, and the
groups need no second pass to be built.

One post-order sweep computes every height bottom-up and files each node's
value into its height's group as the recursion unwinds. The groups grow one
list at a time: the first node of any height h to be visited always arrives
after some node of every smaller height — its own subtree contains a chain h
levels deep below it, and post-order bottoms out there first — so
`h == len(groups)` marks a first sighting and appends a fresh list, while
every later node lands in a list that already exists. Post-order also fixes
the order inside a group: it finishes a left subtree before entering a right
one, so values enter each group left to right, which is exactly the pinned
order, and the root — visited last, with the largest height — closes the
final group alone.

**Complexity:** `O(n)` time — each node is visited exactly once — and `O(h)`
space for the recursion, where `h` is the tree's height (at most 100 nodes),
plus the `O(n)` output.
