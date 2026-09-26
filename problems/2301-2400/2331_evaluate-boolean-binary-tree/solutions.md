# Solutions — Evaluate Boolean Binary Tree

The tree is a formula, not a search structure: leaves carry the literals
(1 is true, 0 is false) and every internal node applies its operator —
value 2 is OR, value 3 is AND — to exactly two finished subresults.
Nothing about paths or search matters; the answer is fixed bottom-up,
and one post-order pass over the whole tree computes it. The single
solution below runs that pass on an explicit stack.

## Post-order fold on an operator shelf

Combining a node before its children finish is the only way to get this
wrong, which makes the dependency structure pure post-order — exactly
what the hints' recursive version expresses. The catch is shape: the
node budget allows spines several hundred nodes deep, past what fixed
call stacks (and Python's recursion ceiling) are willing to hold, so
the fold runs on two explicit structures instead. The work stack holds
instructions — expand this node, or apply this operator — and the
operand shelf holds finished bits. Expanding an internal node pushes
its operator first with its two children above it, left on top;
expanding a leaf just deposits its literal. Because the tree is full,
every subtree's entries net out to exactly one bit, so an operator can
only resurface once everything above it — both of its subtrees — has
collapsed; the two bits it pops then are precisely its children's
results, and the last application leaves the root's bit alone on the
shelf.

![On Example 1's tree the work stack expands 2 (OR) and 3 (AND) with the left child on top, the leaves deposit 1, 0, 1, the AND folds 1 AND 0 = 0, and the OR folds 0 OR 1 = 1, leaving true alone on the shelf.](figures/solution-postorder-stack-fold.svg)

Both structures live on the heap and grow with the tree's size, never
with nesting depth; no call frame recurses at any point, so even the
deepest spine the constraints allow evaluates comfortably.

**Complexity:** `O(n)` time, `O(n)` space.
