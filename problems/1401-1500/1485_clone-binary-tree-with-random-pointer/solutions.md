# Solutions — Clone Binary Tree With Random Pointer

A deep copy has to allocate exactly one fresh node per original and replay
every pointer — left, right, and random — onto the copies, and the random
pointers are what make that hard: they can reach any node from anywhere, so
node identity matters and a node that merely repeats the original's value is
still a different node. The clone-map approach tracks the pairings in a
registry keyed by the original nodes; the weaving approach lets the tree
hold its own pairings for the duration of the copy, so no registry is ever
built.

## Clone map over node identity

The empty tree clones to nothing. Anything else clones by traversal: on
each original node, create its fresh copy and register the pair immediately
— before descending — then fill the copy's left, right, and random with
whatever the recursive walk returns for the original's targets. Registering
before descending is what terminates the walk: random pointers reach
backwards and even to the node itself, and an already-registered copy
answers such a repeat visit in constant time instead of cloning the same
node twice. The key must be the node itself — the object, or its address —
never the value, since values repeat freely. The same registry equally
drives the two-pass iterative form, which first creates a copy of every
node and then wires each copy's pointers by lookup. A 1000-node chain
nests 1000 recursive calls, which the code must allow for.

**Complexity:** `O(n)` time, `O(n)` space — every node is cloned exactly
once, and the registry and the call stack both grow with the tree.

## Interleaved clones, then split

The registry is only a naming device, and the tree can hold the pairings
itself. A first pass weaves: every original node gets its copy inserted
between the node and the node's left child, so `node.left` is the node's
own copy and `copy.left` is the original's former left child — the original
structure stays walkable, because an original's left child now lives one
step down at `copy.left` while the right pointers are untouched. A second
pass copies the far links for free: an original's copy is `node.left`, so
the clone of anything the original points at across the tree — its random
target, and its right child — is simply that target's own `left`. A third
pass splits the weave, restoring each `node.left` from its copy and handing
the copy the clone of that subtree — the copy's own left's left. The root's
copy, captured before the split, is the answer: the judge's clone check
sees only freshly allocated nodes, and the input tree comes out of the
split exactly as it went in.

**Complexity:** `O(n)` time, `O(1)` extra space — no registry is ever
built; the only auxiliary storage is the passes' walk stacks, `O(h)` for
the tree's height.
