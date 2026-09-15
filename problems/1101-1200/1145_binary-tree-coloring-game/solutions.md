# Solutions — Binary Tree Coloring Game

## Count the three regions cut off by x

Wherever the second player colors, the blue region can only grow outward
from `y` through uncolored neighbors, so the whole game collapses once `x`
is colored: the three components adjacent to `x` — its left subtree, its
right subtree, and everything above `x` — are each reachable by at most one
of the two players. A player who takes a component keeps all of it, because
the opponent can never enter through `x`.

The second player should grab the largest of the three, and that move is
always available: the component's root is a direct neighbor of `x`. Whoever
holds a component with more than half of all `n` nodes finishes with the
majority — the first player can reach at most the other two components
combined. So the answer is exactly `max(left, right, above) > n / 2`, and
counting the two subtree sizes of `x` gives all three, since `above = n -
left - right - 1`.

The code finds the node with value `x` by one traversal and counts its two
subtrees; `n` is at most 100, so the traversal cost is trivial.

**Complexity:** `O(n)` time — one search for `x` plus two subtree counts —
and `O(h)` space for the traversal stack, `h` the tree height.
