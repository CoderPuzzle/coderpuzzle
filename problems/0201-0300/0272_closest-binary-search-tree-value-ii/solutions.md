# Solutions — Closest Binary Search Tree Value II

Both solutions stand on the same ground: a search tree keeps its values in
sorted order, so the `k` values nearest `target` are the sorted sequence's
window around where `target` would sit. The inorder walk makes that window
literal — flatten the tree into its sorted list, then grow two frontiers over
the array — paying a visit to every node. The two-stack expansion grows the
same two frontiers but never builds the list, advancing them through the tree
itself, so a balanced tree answers after touching only the search path and
the picks.

## Inorder walk, then grow the window

An explicit-stack inorder walk flattens the BST to its sorted list of values, and over a sorted list the distance to `target` is a V-shaped curve — decreasing up to the target, increasing after it. The k closest values are therefore a contiguous window of that list, and the hints' predecessor/successor expansion becomes a plain two-frontier scan: find the split where `target` falls, then k times take whichever frontier value is nearer, expanding outward. This is that expansion run on the flattened array instead of on parent pointers and path stacks.

The pinned order falls out of the scan directly. A frontier only ever moves away from the target, so both frontier distances are non-decreasing and each pick is the smaller of the two — the picks come out ordered by non-decreasing distance. When the frontiers are exactly equidistant the left one is taken, and it always holds the smaller value. Node values and `target` are bounded by 10⁹, so the half-integer midpoints that create such ties — and both sides of every subtraction — are exactly representable IEEE-754 doubles; one subtraction and an absolute value decide each comparison, with no tolerance anywhere.

The walk is iterative, so a degenerate 10^4-node chain cannot overflow the call stack, and `k <= n` guarantees the loop never exhausts both frontiers. On a balanced tree the two-stack version of the same expansion, walking predecessors and successors through the tree itself, answers in `O(h + k)` without materializing the whole list — the follow-up's less-than-`O(n)` target — but for an arbitrary BST the full walk is already optimal, since reading the values alone takes n steps.

**Complexity:** `O(n)` time, `O(n)` space.

## Two-Stack Expansion

The descent from the root sorts the tree around `target` as it goes. A node at
or below `target` is a candidate predecessor, and any value nearer to `target`
on that side lives in its right subtree, so the walk pushes the node and steps
right; a node above `target` mirrors onto the successor stack and steps left.
When the walk runs out, each stack's top is the nearest value on its side of
`target`, with the rest of that side stacked underneath in order — the hints'
imagined parent pointers, materialized as two explicit paths.

Each of the `k` picks pops whichever top sits nearer to `target` — a tie goes
to the predecessor, which holds the smaller value, exactly the statement's
rule — and then advances its own stack by pushing the popped node's inner
spine: the next predecessor is the right edge of the popped node's left
subtree, the next successor the left edge of its right subtree. Each stack
therefore sweeps outward from `target` one value per pick, never crossing
sides, and every push in the whole run happens at most once per node — the
work stays at the initial descent plus the picks.

The statement's pinned output order falls out for free: a stack's next pop is
never nearer than its last, so distances never decrease across picks, and a
tie's smaller value is the predecessor by construction. Every comparison is
one subtraction and an absolute value — the half-integer midpoints that
create ties inside 10⁹ are exactly representable doubles, so `<=` decides
them with no tolerance. Nothing recurses and nothing is fully traversed: a
degenerate 10⁴-node chain only deepens the two stacks, never the call stack,
and a balanced tree answers in `O(log n + k)` — the follow-up's
better-than-`O(n)` target.

**Complexity:** `O(h + k)` time, `O(h)` space.
