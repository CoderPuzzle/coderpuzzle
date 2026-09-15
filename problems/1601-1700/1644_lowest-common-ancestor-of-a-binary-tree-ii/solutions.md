# Solutions — Lowest Common Ancestor of a Binary Tree II

## Parent map with an existence check

A single iterative traversal from `root` — an explicit stack, never
recursion, since a skewed tree can be as deep as the node count — builds
two maps at once: every node's value to the node itself, and every
node's value to its parent's value (the root maps to no parent). Because
that traversal necessarily visits every node in the tree, checking
whether `p` and `q` are present is just a membership test against the
value-to-node map once the walk finishes; if either is missing, the
answer is `null` before any ancestor logic runs.

With existence confirmed, the LCA falls out of the parent map directly.
Climb from `p` to the root, recording every value passed along the way —
that is `p`'s full ancestor chain, including `p` itself. Then climb from
`q`, checking at each step (starting with `q` itself) whether the
current value is already in that chain; the first hit is the lowest
common ancestor. This one rule handles every shape of the answer for
free: `p == q` and either node being an ancestor of the other resolve on
the very first check, and two nodes in unrelated subtrees converge only
once the climb from `q` reaches the point where the two ancestor paths
actually meet.

**Complexity:** `O(n)` time, `O(n)` space — the traversal and both maps
touch every node once, and the ancestor climbs are bounded by the tree's
height.
