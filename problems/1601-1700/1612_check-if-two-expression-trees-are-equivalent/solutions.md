# Solutions — Check If Two Expression Trees are Equivalent

## Leaf-variable multiset, one stack pass per tree

The only operator here is `+`, and addition is commutative and
associative, so an expression tree's value never depends on the shape of
its `+` nodes — only on which variables appear among its leaves and how
many times each one does. Two trees are equivalent exactly when their
multisets of leaf variables match: `a + (b + c)` and `(b + c) + a` are the
same sum for every assignment, while swapping one leaf letter changes the
multiset and breaks equivalence for some assignment. So the whole problem
collapses to counting leaves by variable and comparing the two counts.

Because this judge's `TreeNode` carries an integer value, each leaf's
lowercase letter is encoded as `ord(letter) - ord('a')`, an integer in
`[0, 25]`, and the `+` operator is encoded as the sentinel `-1`, which
falls outside that range so a node's kind is recovered from its value
alone. Each tree is walked with an explicit stack rather than recursion —
node counts run up to 4999, and the worst-case tree is a single long
chain of `+` nodes, deep enough to threaten a recursive walk's call
stack. A node with no children is a leaf and bumps a 26-slot counter at
its encoded index; a node with children (guaranteed exactly two, by the
problem's own contract) pushes both onto the stack instead. The two
26-slot counters, one per tree, are compared once both walks finish.

**Complexity:** `O(n)` time, `O(n)` space, where `n` is the number of
nodes in the larger tree.
