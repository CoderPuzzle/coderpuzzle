# Solutions — Tree of Coprimes

## Depth-first sweep with per-value ancestor stacks

A node's answer involves only the ancestors on its root path, and node
values live in the tiny range 1..50, so the search never has to look at
nodes at all — it can look at values. Walking down from the root, keep one
stack per value holding the nodes on the current root path that carry that
value, deepest last. For a node of value `v`, the closest coprime ancestor
is the deepest stack top among the values coprime with `v`, found by
scanning `v`'s precomputed coprime list; any older node with the same
value is strictly farther away, which is exactly the first hint.
Coprimality is fixed for the whole input, so the 50 by 50 gcd table is
built once up front.

The traversal is iterative because the tree may be a single chain of 10⁵
nodes, past every default recursion budget. An explicit frame stack
handles enter and exit events: on enter a node is answered against the
current stacks and pushed onto its own value's stack, on exit it is
popped, so every stack always mirrors exactly the current root path. Child
order never matters — an answer depends only on the ancestor chain, never
on sibling subtrees.

**Complexity:** `O(50n)` time, `O(n)` space.
