# Solutions — Flip Equivalent Binary Trees

## One stack of node pairs

Flip equivalence is a question of pairing: the trees are flip equivalent
exactly when some way of walking them together — at each paired node
committing to either the straight or the swapped alignment of children —
runs out of nodes without a disagreement. The method carries an explicit
stack of pairs. Pop `(a, b)`: two missing nodes pass, one missing node or
two different values fail the whole walk, and anything else still has
children to pair.

The commitment needs no backtracking, and the statement's constraints are
why: values are unique within each tree. If both the straight and the
swapped alignment lined up at a node, `a`'s left child would have to pair
with both of `b`'s children, which — distinct values — happens only when
every child involved is missing, and then the two alignments are the same
pairing anyway. So the walk tests the straight alignment — each child
either missing on both sides or equal in value — commits to it when it
holds, otherwise commits to the swapped one, and when neither lines up no
flip anywhere in the trees can repair the pairing.

Both trees are consumed pair by pair, each node entering at most one pair,
so the walk touches every node once. It stays off the call stack on
purpose: a chain at the node bound of 100 nodes would make a recursive
walk a recursion-depth problem, while the explicit stack holds at most one
pending pair per level.

**Complexity:** `O(n)` time, `O(n)` space.
