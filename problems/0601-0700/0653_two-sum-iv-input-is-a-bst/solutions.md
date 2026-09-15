# Solutions — Two Sum IV - Input is a BST

## Seen-set walk

A value `x` finishes the pair exactly when `k - x` also sits somewhere in the
tree, so the whole problem reduces to set membership: keep the values visited
so far in a hash set, and each new node settles its own fate with a single
lookup asking whether its partner appeared earlier. The BST ordering turns
out to be incidental to this walk — it compares no node with its relatives
and needs no sorted sequence — which is why the traversal order is
irrelevant: any walk that reaches every node sees one member of a summing
pair before the other, and true is returned at the first hit while a walk
that exhausts the tree without one returns false.

The one ordering that matters is internal to a step: the lookup precedes the
insert. A node's complement may be an earlier node's value, never the node's
own — it is not in the set yet — so a `k` equal to twice a value that occurs
once is correctly answered false: no element pairs with itself.

The traversal is iterative in every language: the constraint ceiling is a
single `10^4`-node chain, and walking it recursively nests 10000 calls —
past CPython's default recursion limit and over the 512k stacks the judge
hands Java and Node — so an explicit stack of pending nodes stands in for
the call stack instead.

**Complexity:** `O(n)` time, `O(n)` space.
