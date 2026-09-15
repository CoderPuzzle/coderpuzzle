# Solutions — Insert into a Binary Search Tree

## Iterative descent to the empty slot

The value to insert is guaranteed absent, so a plain search for it must fail
— and the place where it fails is the answer. Walking from the root, right
when `val` exceeds the current node's value and left when it is smaller,
follows exactly the path a lookup would take; since `val` sits nowhere in
the tree, that path necessarily ends at an empty child slot, and hanging a
fresh leaf there is precisely what keeps the search-tree property: every
ancestor above the slot already brackets `val` on the correct side. The slot
is also the only place that works — an empty slot off the search path lies
inside a subtree the descent skipped, whose root's value already excludes
`val` — so the output tree is forced, never a choice, and no rotation or
rebalancing is ever needed.

The walk carries a single mutable pointer and nothing else. An empty tree
never enters the loop at all: the fresh node is the root handed back to the
caller. Iterating instead of recursing is deliberate: the tree may legally
be a single 10^4-node chain, and the descent down it would nest 10000 calls
— past CPython's default recursion limit and over the 512k stacks the judge
hands Java and Node.

**Complexity:** `O(h)` time, `O(1)` space, where `h` is the tree's height —
`O(log n)` on a balanced tree and `O(n)` on a chain at its worst.
