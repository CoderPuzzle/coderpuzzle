# Solutions — Construct String from Binary Tree

## Preorder walk with deferred parentheses

The rules describe a preorder walk written left to right: a node emits its
value, then everything its left subtree will produce inside one pair of
parentheses, then everything its right subtree will produce inside another.
A node with no child at all writes nothing for it, so the two omission rules
collapse into one test per child — open a group exactly when the child exists.
Leaf nodes contribute their bare value and stop; a node with only a left child
writes `val(left…)` with no trailing pair; a node with both writes
`val(left…)(right…)`.

The one exception carries the whole encoding's unambiguity: when the right
child exists but the left does not, the left's empty pair `()` is written as a
placeholder before the right's group, exactly as in Example 2's
`1(2()(4))(3)`. Dropping it would make a right-only child indistinguishable
from a left-only one — `1(2)` is already taken by the left child — so the
placeholder is what keeps the mapping between tree and string one-to-one.
Emitting it needs no special machinery: the walk knows both children at the
moment it opens the groups, and the placeholder is just what the left slot
writes when its child is absent but its sibling's group is coming.

The walk is iterative in every language, its explicit stack interleaving the
pending nodes with the literal parentheses in exactly the order they must be
written. That choice is forced by the constraints, not taste: the tree may be
a chain 10⁴ nodes deep, which nests ten times past CPython's default
recursion limit and over the small stacks the judge hands the managed
runtimes. The explicit stack is one entry per pending node or paren and never
nests a call, so the deepest legal tree encodes without a single recursive
frame.

**Complexity:** `O(n)` time, `O(h)` space beyond the output string for the
stack, where `h` is the tree's height.
