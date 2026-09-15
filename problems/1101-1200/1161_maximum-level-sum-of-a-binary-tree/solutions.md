# Solutions — Maximum Level Sum of a Binary Tree

## Level-by-level frontier walk

The level sums must be compared in level order anyway, so the natural shape
is breadth-first with an explicit frontier: start with the root's level,
sum its values, then rebuild the frontier from the frontier's real children.
Each pass of the outer loop handles exactly one level, which makes the level
counter and the sum live in the same loop iteration — no per-node depth
bookkeeping.

The champion update uses a strict `>` comparison, initialized with level 1
and the root's value, so an equal sum found later never displacements an
earlier level: that is precisely the "smallest level" tie rule. Node values
can be negative, which is why the initial champion is the root's own value
rather than zero — a tree of only negative levels still reports level 1.

Level sums reach `10⁴ · 10⁵ = 10⁹` in the extreme, so the running sum uses a
64-bit accumulator where the language distinguishes. The traversal never
recurses, so a 10⁴-deep degenerate chain is as safe as a balanced tree.

**Complexity:** `O(n)` time — each node enters the frontier exactly once —
and `O(w)` space for the frontier and its rebuild, `w` the tree's width.
