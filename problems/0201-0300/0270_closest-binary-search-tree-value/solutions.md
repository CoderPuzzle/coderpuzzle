# Solutions — Closest Binary Search Tree Value

## Binary search walk

The input is already a search structure, so no full traversal is needed: start
at the root, step left when `target` is smaller than the node's value and
right otherwise. That one root-to-leaf descent is the search path for
`target`, and it visits the two bracketing candidates — the largest value
below `target` and the smallest value above it. Any value off the path lies
beyond one of those brackets, so it can only be farther away; the closest
value is decided on the path alone.

The walk carries the best `(distance, value)` pair seen so far. A node
replaces the incumbent only when it is strictly closer — or, at exactly equal
distance, when its value is smaller, the explicit rule that settles a tie such
as `target = 3.5` between values 3 and 4 in favor of 3. Node values and
`target` are bounded by 10⁹, and half-integer midpoints like that 3.5 are
exactly representable IEEE-754 doubles, so the equal-distance comparison is
exact rather than tolerance-based.

The loop touches one pointer and at most `h` nodes, where `h` is the tree's
height — no recursion, no auxiliary container.

**Complexity:** `O(h)` time, `O(1)` space — `h` is `O(log n)` for a balanced
tree and `O(n)` for a degenerate chain.
